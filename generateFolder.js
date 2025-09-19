// image-processor.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

sharp.concurrency(1); // Maximale Anzahl gleichzeitiger Prozesse

// =================== Wasserzeichen-Config ===================
const watermarkPath = path.join(__dirname, './src/assets/images/logo.png');
// Anteil der Zielbild-Breite, die das Wasserzeichen haben soll (z. B. 18%)
const WM_SCALE = 0.60;
// Gewünschte Deckkraft (0..1). Wir backen sie direkt in den Alpha-Kanal ein.
const WM_ALPHA = 0.35;
// Position: 'southeast' | 'southwest' | 'northeast' | 'northwest' | 'center' ...
const WM_GRAVITY = 'center';
// Randabstand (Pixel) – via transparentem Padding realisiert
const WM_PADDING = 24;

// =================== Quell- & Ziel-Ordner ===================
const sourceFolder = path.join(__dirname, './src/assets/images/newPortfolio');      // Originalordner
const destinationFolderPC = path.join(__dirname, './src/assets/images/portfolioPC'); // Zielordner groß
const destinationFolderMobile = path.join(__dirname, './src/assets/images/portfolioMobile'); // Zielordner mobil

// -----------------------------------------------------------
// Hilfsfunktion: Wasserzeichen skalieren + Alpha „einbacken“ + Padding
// -----------------------------------------------------------
async function buildWatermarkBuffer(targetWidth) {
    // 1) Original-Wasserzeichen auf Zielbreite skalieren, Alpha erzwingen
    const wmScaled = await sharp(watermarkPath)
        .resize({ width: targetWidth })
        .ensureAlpha() // RGBA sicherstellen
        // 2) Alpha-Kanal multiplicativ skalieren: RGBA * [1,1,1, WM_ALPHA]
        .linear([1, 1, 1, WM_ALPHA], [0, 0, 0, 0])
        .png()
        .toBuffer();

    // 3) Padding hinzufügen, damit es nicht direkt am Rand klebt
    const meta = await sharp(wmScaled).metadata();
    const padded = await sharp({
        create: {
            width: (meta.width || 0) + WM_PADDING,
            height: (meta.height || 0) + WM_PADDING,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
    })
        .composite([{ input: wmScaled, left: 0, top: 0 }])
        .png()
        .toBuffer();

    return padded;
}

// -----------------------------------------------------------
// Ordner rekursiv verarbeiten und Bilder exportieren (inkl. WM)
// -----------------------------------------------------------
async function processFolder(source, destination, widthFactor, quality) {
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
        console.log(`Ordner ${destination} wurde erstellt.`);
    }

    try {
        const entries = fs.readdirSync(source, { withFileTypes: true });

        // Dateien sortieren (nach erster Nummer im Namen)
        const sortedEntries = entries.sort((a, b) => {
            const numA = parseInt((a.name.match(/\d+/) || [0])[0], 10);
            const numB = parseInt((b.name.match(/\d+/) || [0])[0], 10);
            return numA - numB;
        });

        let counter = 1;

        for (const entry of sortedEntries) {
            const sourcePath = path.join(source, entry.name);
            let destPath = path.join(destination, entry.name);

            if (entry.isDirectory()) {
                await processFolder(sourcePath, path.join(destination, entry.name), widthFactor, quality);
                continue;
            }

            // Nur Bilddateien verarbeiten
            const ext = path.extname(entry.name).toLowerCase();
            if (!(entry.isFile() && ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.tiff'].includes(ext))) {
                continue;
            }

            console.log(`Bild ${entry.name} wird kopiert und verarbeitet...`);
            try {
                const input = sharp(sourcePath);
                const metadata = await input.metadata();

                if (!metadata.width) {
                    console.warn(`Breite unbekannt für ${entry.name}, wird übersprungen.`);
                    continue;
                }

                const targetWidth = Math.round(metadata.width * widthFactor);
                const orientation = (metadata.width > (metadata.height || 0)) ? 'H' : 'V';

                // Ordnername extrahieren (Fallback: aktueller Ordnername)
                const baseFolder = path.basename(source);
                const folderName = baseFolder.split('_')[1] || baseFolder;

                const formattedCounter = String(counter).padStart(2, '0');
                const fileName = `${folderName}_${formattedCounter}_${orientation}.webp`;
                destPath = path.join(destination, fileName);

                // Wasserzeichen vorbereiten (relativ zur Zielbreite)
                const wmTargetWidth = Math.max(1, Math.round(targetWidth * WM_SCALE));
                const wmPadded = await buildWatermarkBuffer(wmTargetWidth);

                // Bild skalieren, Wasserzeichen überlagern, als WebP speichern
                await sharp(sourcePath)
                    .resize({ width: targetWidth })
                    .toColourspace('srgb')
                    .composite([
                        {
                            input: wmPadded,
                            gravity: WM_GRAVITY, // setzt das (gepaddete) Wasserzeichen
                            blend: 'over'        // keine opacity hier – Alpha ist bereits im WM eingebaut
                        }
                    ])
                    .webp({
                        quality,           // visuelle Qualität
                        alphaQuality: 90,  // Qualität des Alpha-Kanals (für weiche Kanten)
                        effort: 4          // Kompromiss zwischen Zeit & Kompression (0..6)
                    })
                    .toFile(destPath);

                console.log(`${entry.name} wurde als ${fileName} gespeichert.`);
                counter++;
            } catch (err) {
                console.error(`Fehler beim Verarbeiten der Datei ${entry.name}:`, err);
            }
        }
    } catch (err) {
        console.error(`Fehler beim Lesen des Ordners ${source}:`, err);
    }
}

// -----------------------------------------------------------
// Hauptprozess starten
// -----------------------------------------------------------
(async () => {
    try {
        await processFolder(sourceFolder, destinationFolderPC, 0.8, 95); // Desktop-Variante
        await processFolder(sourceFolder, destinationFolderMobile, 0.6, 90); // Mobile-Variante
        console.log('Verarbeitung abgeschlossen.');
    } catch (err) {
        console.error('Fehler beim Verarbeiten:', err);
    }
})();
