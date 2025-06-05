
    document.getElementById('fileInput').addEventListener('change', handleFileUpload);

    let lastResult = '';

    function handleFileUpload(event) {
        const file = event.target.files[0];
    if (!file) return;

    if (file.name.endsWith('.txt')) {
            const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('testText').value = e.target.result;
            };
    reader.readAsText(file);
        } else if (file.name.endsWith('.docx')) {
            const reader = new FileReader();
    reader.onload = function (e) {
                const arrayBuffer = e.target.result;
    mammoth.extractRawText({arrayBuffer: arrayBuffer })
                    .then(result => {
        document.getElementById('testText').value = result.value;
                    })
                    .catch(err => alert("Error reading DOCX file: " + err));
            };
    reader.readAsArrayBuffer(file);
        } else {
        alert("Unsupported file type. Please upload a .txt or .docx file.");
        }
    }

    function testRegex(event) {
        event.preventDefault();

    const patternInput = document.getElementById('pattern').value;
    const testText = document.getElementById('testText').value;

    try {
            const regex = new RegExp(patternInput, 'g');
    const matches = [...testText.matchAll(regex)];

    const resultElement = document.getElementById('matchResult');
            if (matches.length > 0) {
        let htmlResult = 'Matches found:<ul>';
                matches.forEach(m => htmlResult += `<li>${m[0]}</li>`);
        htmlResult += '</ul>';
    resultElement.innerHTML = htmlResult;
                lastResult = matches.map(m => m[0]).join('\n');
            } else {
        resultElement.innerText = 'No match found.';
    lastResult = 'No match found.';
            }

    document.getElementById('result').style.display = 'block';
        } catch (e) {
        document.getElementById('matchResult').innerText = 'Invalid regular expression.';
    document.getElementById('result').style.display = 'block';
    lastResult = 'Invalid regular expression.';
        }
    }

    function clearRegexFields() {
        document.getElementById('pattern').value = '';
    document.getElementById('testText').value = '';
    document.getElementById('fileInput').value = '';
    document.getElementById('matchResult').innerText = '';
    document.getElementById('result').style.display = 'none';
    }

    function downloadResult() {
        const blob = new Blob([lastResult], {type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'regex-results.txt';
    link.click();
    }
