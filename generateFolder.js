const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

sharp.concurrency(1); // Maximale Anzahl an gleichzeitigen Prozessen
//
// Verzeichnis mit Bildern
const sourceFolder = path.join(__dirname, './src/assets/images/newPortfolio'); // Originalordner
const destinationFolderPC = path.join(__dirname, './src/assets/images/portfolioPC'); // Zielordner
const destinationFolderMobile = path.join(__dirname, './src/assets/images/portfolioMobile');

// Funktion zum Kopieren und Verarbeiten von Bildern in Unterordnern
async function processFolder(source, destination, width, quality) {
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, {recursive: true});
        console.log(`Ordner ${destination} wurde erstellt.`);
    }

    try {
        let entries = fs.readdirSync(source, {withFileTypes: true});

        // Dateien sortieren
        let sortedEntries = entries.sort((a, b) => {
            const numA = parseInt(a.name.match(/\d+/) || 0, 10);
            const numB = parseInt(b.name.match(/\d+/) || 0, 10);
            return numA - numB;
        });

        let counter = 1;

        for (const entry of sortedEntries) {
            const sourcePath = path.join(source, entry.name);
            let destPath = path.join(destination, entry.name);

            if (entry.isDirectory()) {
                await processFolder(sourcePath, path.join(destination, entry.name), width, quality);
            } else if (entry.isFile() && ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(entry.name).toLowerCase())) {
                console.log(`Bild ${entry.name} wird kopiert und verarbeitet...`);

                try {
                    const metadata = await sharp(sourcePath).metadata();
                    const newWidth = Math.round(metadata.width * width);
                    //const fileExtension = path.extname(destPath);
                    const formattedCounter = counter.toString().padStart(2, '0'); // Zähler formatieren
                    //const fileName = `${formattedCounter}_${path.basename(destPath, fileExtension)}.webp`;
                    const orientation = metadata.width > metadata.height ? 'H' : 'V'; // Orientierung bestimmen
                    const folderName = path.basename(source).split("_")[1]; // Ordnername extrahieren
                    const fileName = `${folderName}_${formattedCounter}_${orientation}.webp`;
                    destPath = path.join(destination, fileName);

                    await sharp(sourcePath)
                        .resize({width: newWidth})
                        .toColourspace('srgb')
                        .webp({quality: quality})
                        .toFile(destPath);

                    console.log(`${entry.name} wurde als ${fileName} gespeichert.`);
                    counter++;
                } catch (err) {
                    console.error(`Fehler beim Verarbeiten der Datei ${entry.name}:`, err);
                }
            }
        }
    } catch (err) {
        console.error(`Fehler beim Lesen des Ordners ${source}:`, err);
    }
}

// Hauptprozess starten
(async () => {
    try {
        await processFolder(sourceFolder, destinationFolderPC, 0.8, 95);
        await processFolder(sourceFolder, destinationFolderMobile, 0.6, 90);
        console.log('Verarbeitung abgeschlossen.');
    } catch (err) {
        console.error('Fehler beim Verarbeiten:', err);
    }
})();
