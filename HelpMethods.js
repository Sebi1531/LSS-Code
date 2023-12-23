async function checkVersion(scriptName, actVersion, scriptURL) {
    // Aktuellste Versionnummer aus GitHub ermitteln
    let searched = '@version';
    let newestVersion;
    try {
        let response = await fetch(scriptURL);
        if (!response.ok) {
            let divNode = document.createElement("div");
            divNode.className = "alert alert-info";
            divNode.appendChild(document.createTextNode("Die Update-Suche für das Skript '" + scriptName + "' ist fehlgeschlagen, weil die aktuellste Version auf GitHub nicht erreichbar war."));
            divNode.appendChild(document.createElement("br"));
            divNode.appendChild(document.createTextNode("Es wird empfohlen, selbst zu prüfen, ob ein Update releast wurde, weil veraltete Versionen eventuell nicht mehr funktionieren."));
            document.body.insertBefore(divNode, document.body.firstChild);
            return;
        }
    
        const code = await response.text();
        const lineArr = code.split('\n');
        let versLine = lineArr.find(line => line.includes(searched));
        if (versLine === undefined) {
            throw new Error("ERROR: version not found (link: '" + scriptURL + "')");
        }
        newestVersion = versLine.split(searched)[1].replaceAll(' ', '');
    } catch (error) {
        console.error('Fehler beim Abrufen des JS-Dokuments:', error);
        return;
    }

    // Versionnummern vergleichen & ggf. Info ausgeben
    if (actVersion != newestVersion) {
        let divNode = document.createElement("div");
        divNode.className = "alert alert-info";
        divNode.appendChild(document.createTextNode("Beim Skript '" + scriptName + "' steht eine neue Version zu Verfügung. Neueste Version: " + newestVersion));
        divNode.appendChild(document.createElement("br"));
        divNode.appendChild(document.createTextNode("Es wird empfohlen, die neueste Version herunterladen, weil veraltete Versionen eventuell nicht mehr funktionieren."));
        document.body.insertBefore(divNode, document.body.firstChild);
    }
}
