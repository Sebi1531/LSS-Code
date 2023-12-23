async function checkVersion(scriptName, actVersion, scriptURL) {
    let searched = '@version';
    let versLine;
    try {
        let response = await fetch(scriptURL);
        if (!response.ok) {
            throw new Error("ERROR: '" + scriptURL + "' not reachable.");
        }
    
        const code = await response.text();
        const lineArr = code.split('\n');
        versLine = lineArr.find(line => line.includes(searched));
        if (versLine === undefined) {
            throw new Error("ERROR: version not found (link: '" + scriptURL + "')");
        }
    } catch (error) {
        console.error('Fehler beim Abrufen des JS-Dokuments:', error);
    }

    let newestVersion = versLine.split(searched)[1].replaceAll(' ', '');
    if (actVersion != newestVersion) {
        let divNode = document.createElement("div");
        divNode.className = "alert alert-info";
        divNode.appendChild(document.createTextNode("Beim Skript '" + scriptName + "' steht eine neue Version zu Verfügung. Neueste Version: " + newestVersion));
        divNode.appendChild(document.createElement("br"));
        divNode.appendChild(document.createTextNode("Es wird empfohlen, die neueste Version herunterladen, weil veraltete Versionen eventuell nicht mehr funktionieren."));
        document.insertBefore(divNode, document.firstChild);
    }
}
