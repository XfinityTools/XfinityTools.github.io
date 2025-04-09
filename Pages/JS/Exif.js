
    const dropArea = document.getElementById('dropArea');
    const imageInput = document.getElementById('imageInput');
    const output = document.getElementById('output');
    const downloadButtons = document.getElementById('downloadButtons');

    let exifText = '';
    let exifCSV = '';
    let exifJSON = { };

        dropArea.addEventListener('click', () => imageInput.click());
    imageInput.addEventListener('change', handleFiles);

        dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
    dropArea.classList.add('hover');
        });

        dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('hover');
        });

        dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
    dropArea.classList.remove('hover');
    const file = e.dataTransfer.files[0];
    handleFiles({target: {files: [file] } });
        });

    function handleFiles(e) {
            const file = e.target.files[0];
    if (!file) return;

    output.innerHTML = "<p>Extracting EXIF data...</p>";
    exifText = '';
    exifCSV = 'Tag,Value\n';
    exifJSON = { };

    const reader = new FileReader();
    reader.onload = function () {
                const img = new Image();
    img.onload = function () {
        EXIF.getData(img, function () {
            const allMetaData = EXIF.getAllTags(this);

            if (Object.keys(allMetaData).length === 0) {
                output.innerHTML = "<p>No EXIF data found.</p>";
                downloadButtons.style.display = "none";
                return;
            }

            let table = "<table><thead><tr><th>Tag</th><th>Value</th></tr></thead><tbody>";
            for (let tag in allMetaData) {
                const value = allMetaData[tag];
                table += `<tr><td>${tag}</td><td>${value}</td></tr>`;
                exifText += `${tag}: ${value}\n`;
                exifCSV += `"${tag}","${value}"\n`;
                exifJSON[tag] = value;
            }
            table += "</tbody></table>";
            output.innerHTML = table;
            downloadButtons.style.display = "block";
        });
                };
    img.src = reader.result;
            };
    reader.readAsDataURL(file);
        }

    function downloadText() {
        downloadFile(exifText, 'exif-data.txt', 'text/plain');
        }

    function downloadCSV() {
        downloadFile(exifCSV, 'exif-data.csv', 'text/csv');
        }

    function downloadJSON() {
            const jsonStr = JSON.stringify(exifJSON, null, 2);
    downloadFile(jsonStr, 'exif-data.json', 'application/json');
        }

    function downloadFile(content, filename, type) {
            const blob = new Blob([content], {type});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
        }


function generateMetrics() {
    let text = document.getElementById("textInput").value;
    let errorMessage = document.getElementById("error-message");
    let output = document.getElementById("output");

    // Clear previous outputs or error message
    errorMessage.textContent = "";
    output.innerHTML = "";

    // Check if text contains numbers
    if (/\d/.test(text)) {
        errorMessage.textContent = "Error: Please enter only text, no numbers allowed.";
        return;
    }

    if (text === "") {
        alert("Please enter some text.");
        return;
    }

    let characters = text.length;
    let words = text.trim().split(/\s+/).length;
    let sentences = text.split(/[.!?]+/).filter(Boolean).length;
    let vowels = text.match(/[aeiouAEIOU]/g) ? text.match(/[aeiouAEIOU]/g).length : 0;
    let consonants = text.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) ? text.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g).length : 0;
    let avgWordLength = (words > 0) ? (characters / words).toFixed(2) : 0;
    let charToWordRatio = (words > 0) ? (characters / words).toFixed(2) : 0;

    let outputHTML = `
                <h3>Text Metrics:</h3>
                
                    <li><strong>Character Count:</strong> ${characters}</li>
                    <li><strong>Word Count:</strong> ${words}</li>
                    <li><strong>Sentence Count:</strong> ${sentences}</li>
                    <li><strong>Vowel Count:</strong> ${vowels}</li>
                    <li><strong>Consonant Count:</strong> ${consonants}</li>
                    <li><strong>Average Word Length:</strong> ${avgWordLength} characters</li>
                    <li><strong>Character-to-Word Ratio:</strong> ${charToWordRatio}</li>
                
            `;

    output.innerHTML = outputHTML;
}