function handleFile(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true }); // parse dates
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Format dates properly
        const formattedData = rawData.map(row =>
            row.map(cell => {
                if (cell instanceof Date) {
                    return cell.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    });
                }
                return cell;
            })
        );

        const docDefinition = {
            content: [
                {
                    table: {
                        body: formattedData,
                    },
                },
            ],
        };

        const pdfDocGenerator = pdfMake.createPdf(docDefinition);

        pdfDocGenerator.getBlob(function (blob) {
            saveAs(blob, 'output.pdf');
            console.log('PDF file created successfully.');
        });
    };

    reader.readAsArrayBuffer(file);
}

const dropArea = document.getElementById('drop-area');

dropArea.addEventListener('dragenter', function (e) {
    e.preventDefault();
    dropArea.classList.add('active');
});

dropArea.addEventListener('dragover', function (e) {
    e.preventDefault();
});

dropArea.addEventListener('dragleave', function (e) {
    e.preventDefault();
    dropArea.classList.remove('active');
});

dropArea.addEventListener('drop', function (e) {
    e.preventDefault();
    dropArea.classList.remove('active');
    const file = e.dataTransfer.files[0];
    handleFile(file);
});

dropArea.addEventListener('click', function () {
    fileInput.click();
});

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.style.display = 'none';

fileInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    handleFile(file);
});

document.body.appendChild(fileInput);
var inputPdfData = null; // Stores the input PDF data