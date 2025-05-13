// Handle file input or drag & drop
document.getElementById('dropArea').addEventListener('click', function () {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', handleFileSelect);
document.getElementById('dropArea').addEventListener('dragover', function (e) {
    e.preventDefault();
});
document.getElementById('dropArea').addEventListener('drop', handleFileSelect);

function handleFileSelect(event) {
    event.preventDefault();

    let file;
    if (event.target.files) {
        file = event.target.files[0];
    } else if (event.dataTransfer) {
        file = event.dataTransfer.files[0];
    }

    if (file && file.type === "application/pdf") {
        extractPdfMetadata(file);
    } else {
        alert("Please upload a valid PDF file.");
    }
}

function extractPdfMetadata(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const pdfData = new Uint8Array(e.target.result);
        pdfjsLib.getDocument(pdfData).promise.then(function (pdf) {
            const metadata = pdf.getMetadata().then(function (data) {
                displayMetadata(data, pdf.numPages);
            }).catch(function (error) {
                alert("Failed to extract metadata: " + error.message);
            });
        }).catch(function (error) {
            alert("Failed to load PDF: " + error.message);
        });
    };

    reader.readAsArrayBuffer(file);
}

function displayMetadata(metadata, pageCount) {
    let outputHTML = `
                        <h3>PDF Metadata</h3>
                        <ul>
                            <li><strong>Title:</strong> ${metadata.info.Title || 'Not Available'}</li>
                            <li><strong>Author:</strong> ${metadata.info.Author || 'Not Available'}</li>
                            <li><strong>Subject:</strong> ${metadata.info.Subject || 'Not Available'}</li>
                            <li><strong>Creator:</strong> ${metadata.info.Creator || 'Not Available'}</li>
                            <li><strong>Producer:</strong> ${metadata.info.Producer || 'Not Available'}</li>
                            <li><strong>Creation Date:</strong> ${metadata.info.CreationDate || 'Not Available'}</li>
                            <li><strong>Modification Date:</strong> ${metadata.info.ModDate || 'Not Available'}</li>
                            <li><strong>PDF Version:</strong> ${metadata.info.PDFFormatVersion || 'Not Available'}</li>
                            <li><strong>Number of Pages:</strong> ${pageCount}</li>
                        </ul>
                    `;

    document.getElementById('output').innerHTML = outputHTML;
}



