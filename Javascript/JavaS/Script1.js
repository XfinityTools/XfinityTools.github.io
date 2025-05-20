
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('excelFileInput');
    const metadataOutput = document.getElementById('metadataOutput');
    const outputSection = document.getElementById('outputSection');
    const downloadTxtBtn = document.getElementById('downloadTxtBtn');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');

    let currentMetadataText = '';

        dropZone.addEventListener('click', () => fileInput.click());

        dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
    dropZone.style.backgroundColor = '#e0e0e0';
        });

        dropZone.addEventListener('dragleave', () => {
        dropZone.style.backgroundColor = '#f9f9f9';
        });

        dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
    dropZone.style.backgroundColor = '#f9f9f9';
    handleFile(e.dataTransfer.files[0]);
        });

        fileInput.addEventListener('change', (e) => {
        handleFile(e.target.files[0]);
        });

    function handleFile(file) {
        metadataOutput.textContent = '';
    outputSection.style.display = 'none';

    if (!file || !/\.(xlsx|xls)$/.test(file.name)) {
        metadataOutput.textContent = 'Please upload a valid Excel file (.xlsx or .xls).';
    outputSection.style.display = 'block';
    return;
            }

    const reader = new FileReader();
    reader.onload = function (e) {
                const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, {type: 'array' });

    let result = `File Name: ${file.name}\n`;
    result += `File Size: ${(file.size / 1024).toFixed(2)} KB\n`;
    result += `Last Modified: ${file.lastModifiedDate ? file.lastModifiedDate.toLocaleString() : 'Unknown'}\n`;
    result += `Number of Sheets: ${workbook.SheetNames.length}\n\n`;

                workbook.SheetNames.forEach((sheetName, index) => {
                    const worksheet = workbook.Sheets[sheetName];
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    const numRows = range.e.r - range.s.r + 1;
    const numCols = range.e.c - range.s.c + 1;

    result += `Sheet ${index + 1}: ${sheetName}\n`;
    result += ` - Rows: ${numRows}\n`;
    result += ` - Columns: ${numCols}\n\n`;
                });

    currentMetadataText = result;
    metadataOutput.textContent = result;
    outputSection.style.display = 'block';
            };
    reader.readAsArrayBuffer(file);
        }

        downloadTxtBtn.addEventListener('click', () => {
            const blob = new Blob([currentMetadataText], {type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'excel_metadata.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
        });

        downloadPdfBtn.addEventListener('click', () => {
            const {jsPDF} = window.jspdf;
    const doc = new jsPDF();
    const lines = currentMetadataText.split('\n');

    let y = 10;
    doc.setFont('Courier', 'normal');
    doc.setFontSize(10);

            lines.forEach(line => {
                if (y > 280) {
        doc.addPage();
    y = 10;
                }
    doc.text(line, 10, y);
    y += 6;
            });

    doc.save('excel_metadata.pdf');
        });
