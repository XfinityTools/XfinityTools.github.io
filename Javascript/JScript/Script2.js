
    let jsonResult = null;

    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const downloadBtn = document.getElementById('downloadBtn');

        // Open file dialog on click
        dropArea.addEventListener('click', () => fileInput.click());

        // Handle file input change
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
    handleFile(file);
        });

        // Drag-and-drop behavior
        dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
    dropArea.style.backgroundColor = '#e0e0e0';
        });

        dropArea.addEventListener('dragleave', () => {
        dropArea.style.backgroundColor = '#f8f8f8';
        });

        dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
    dropArea.style.backgroundColor = '#f8f8f8';
    const file = e.dataTransfer.files[0];
    handleFile(file);
        });

    function handleFile(file) {
            if (!file || file.type !== 'text/xml') {
        alert('Only .xml files are allowed.');
    return;
            }

    const reader = new FileReader();
    reader.onload = function (evt) {
                const xmlString = evt.target.result;
    try {
                    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
                    if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
                        throw new Error('Invalid XML format');
                    }

    const json = xmlToJson(xmlDoc.documentElement);
    jsonResult = JSON.stringify(json, null, 2);
    downloadBtn.disabled = false;

    alert('Conversion successful. Click "Download JSON" to save the file.');
                } catch (err) {
        alert('Error: ' + err.message);
    downloadBtn.disabled = true;
                }
            };
    reader.readAsText(file);
        }

    function xmlToJson(xml) {
        let obj = { };
    if (xml.nodeType === 1) {
                if (xml.attributes.length > 0) {
        obj['@attributes'] = {};
    for (let j = 0; j < xml.attributes.length; j++) {
                        const attribute = xml.attributes.item(j);
    obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
                    }
                }
            } else if (xml.nodeType === 3) {
                return xml.nodeValue.trim();
            }

    if (xml.hasChildNodes()) {
                for (let i = 0; i < xml.childNodes.length; i++) {
                    const item = xml.childNodes.item(i);
    const nodeName = item.nodeName;
    const value = xmlToJson(item);
    if (typeof value === "string" && value === "") continue;

    if (obj[nodeName] === undefined) {
        obj[nodeName] = value;
                    } else {
                        if (!Array.isArray(obj[nodeName])) {
        obj[nodeName] = [obj[nodeName]];
                        }
    obj[nodeName].push(value);
                    }
                }
            }

    return obj;
        }

    function downloadJSON() {
            if (!jsonResult) return;

    const blob = new Blob([jsonResult], {type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
        }
