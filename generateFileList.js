const fs = require('fs');
const path = require('path');

// Pfad zum Zielordner
const targetDir = path.join(__dirname, './src/assets/images/newPortfolio');
const outputFile = path.join(__dirname, './src/data/imageData.json');

function readFilesRecursively(dir, basePath = '') {
    let fileList = [];

    // Lese alle Dateien und Unterordner aus dem aktuellen Verzeichnis
    const entries = fs.readdirSync(dir);

    entries.forEach((entry) => {
        const fullPath = path.join(dir, entry);
        const relativePath = path.join(basePath, entry);

        if (fs.statSync(fullPath).isDirectory()) {
            // Wenn es ein Ordner ist, rufe die Funktion rekursiv auf
            fileList = fileList.concat(readFilesRecursively(fullPath, relativePath));
        } else if (fs.statSync(fullPath).isFile()) {
            // Wenn es eine Datei ist, füge sie zur Liste hinzu
            fileList.push({
                title: entry,
                image: `${relativePath.replace(/\\/g, '/')}`,
                filter: entry.split('_')[0],
                upright: imageDirection(entry),
            });
        }
    });

    return fileList;
}

// Hauptfunktion zum Generieren der JSON-Datei
function generateFileList(dir, output) {
    try {
        const fileList = readFilesRecursively(dir);


        const outputData = {
            portfolio: {
                defaultFilter: "weddings",
                projects: fileList,
            }
        };

        // Schreibe die Dateiliste in eine JSON-Datei
        fs.writeFileSync(output, JSON.stringify(outputData, null, 2));

        console.log('✅ JSON-Datei erfolgreich erstellt:', output);
    } catch (error) {
        console.error('❌ Fehler beim Erstellen der Dateiliste:', error.message);
    }
}

function imageDirection(fileName) {
    var fileDirection = fileName.split('_')[2];
    fileDirection = fileDirection.split('.')[0];
    if (fileDirection === "H"){
        return false;
    }else {
        return true;
    }

}
// Starte die Funktion
generateFileList(targetDir, outputFile);