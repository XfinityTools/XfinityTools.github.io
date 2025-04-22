function diffCompare() {
    const text1 = document.getElementById('diffText1').value.split('\n');
    const text2 = document.getElementById('diffText2').value.split('\n');
    const maxLength = Math.max(text1.length, text2.length);
    const resultDiv = document.getElementById('diffResults');

    let outputLeft = '', outputRight = '';

    for (let i = 0; i < maxLength; i++) {
        const line1 = text1[i] || '';
        const line2 = text2[i] || '';

        let leftClass = 'diff-unchanged', rightClass = 'diff-unchanged';

        if (line1 !== line2) {
            if (!line1) {
                leftClass = 'diff-removed';
                rightClass = 'diff-added';
            } else if (!line2) {
                leftClass = 'diff-removed';
                rightClass = 'diff-added';
            } else {
                leftClass = 'diff-removed';
                rightClass = 'diff-added';
            }
        }

        outputLeft += `<div class="${leftClass}"><span class="diff-line-number">${i + 1}</span> ${line1}</div>`;
        outputRight += `<div class="${rightClass}"><span class="diff-line-number">${i + 1}</span> ${line2}</div>`;
    }

    resultDiv.innerHTML = `
        <div class="diff-column">${outputLeft}</div>
        <div class="diff-column">${outputRight}</div>
    `;
}

document.getElementById('diffFile1').addEventListener('change', function (e) {
    readFileToTextArea(e.target.files[0], 'diffText1');
});

document.getElementById('diffFile2').addEventListener('change', function (e) {
    readFileToTextArea(e.target.files[0], 'diffText2');
});

function readFileToTextArea(file, elementId) {
    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById(elementId).value = e.target.result;
    };
    reader.readAsText(file);
}

function exportDiffToPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('landscape', 'pt', 'a4');

    html2canvas(document.getElementById('diffResults')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth - 40;
        const imgHeight = canvas.height * imgWidth / canvas.width;

        pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
        pdf.save('diff_comparison.pdf');
    });
}
