function generateRandomKey(length, chars) {
    let result = '';
    const characters = chars.split('');
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters[Math.floor(Math.random() * charactersLength)];
    }
    return result;
}

function segmentKey(key, segmentLength = 4) {
    return key.match(new RegExp('.{1,' + segmentLength + '}', 'g')).join('-');

}

$(document).ready(function () {
    const generateKeyButton = $('#generateKey');
    const downloadButton = $('#downloadKey');
    const copyButton = $('#copyKey');
    const exportPdfButton = $('#exportPdf');
    const keyLengthInput = $('#keyLength');
    const uppercaseCheckbox = $('#uppercase');
    const lowercaseCheckbox = $('#lowercase');
    const numbersCheckbox = $('#numbers');
    const specialCheckbox = $('#special');
    const excludeSimilarCheckbox = $('#excludeSimilar');
    const customCharsInput = $('#customChars');
    const segmentKeyCheckbox = $('#segmentKey');
    const generatedKeyBox = $('#generatedKeyBox');

    generateKeyButton.on('click', function () {
        const length = parseInt(keyLengthInput.val());
        let chars = customCharsInput.val().trim();

        if (!chars) {
            if (uppercaseCheckbox.is(':checked')) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (lowercaseCheckbox.is(':checked')) chars += 'abcdefghijklmnopqrstuvwxyz';
            if (numbersCheckbox.is(':checked')) chars += '0123456789';
            if (specialCheckbox.is(':checked')) chars += '!@#$%^&*()-_=+[]{ }|;:,.<>?';
        }

        if (excludeSimilarCheckbox.is(':checked')) {
            chars = chars.replace(/[lLI10O]/g, '');
        }

        if (!chars) {
            alert('Please select at least one character set or enter a custom set.');
            return;
        }

        let key = generateRandomKey(length, chars);

        if (segmentKeyCheckbox.is(':checked')) {
            key = segmentKey(key);
        }

        generatedKeyBox.val(key);
        downloadButton.prop('disabled', false);
        copyButton.prop('disabled', false);
        exportPdfButton.prop('disabled', false);

        const keyBlob = new Blob([key], { type: 'text/plain' });
        const downloadUrl = URL.createObjectURL(keyBlob);

        downloadButton.off('click').on('click', function () {
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'generated_key.txt';
            link.click();
        });

        copyButton.off('click').on('click', function () {
            navigator.clipboard.writeText(key).then(() => {
                alert('Key copied to clipboard!');
            });
        });

        exportPdfButton.off('click').on('click', async function () {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            doc.setFontSize(14);
            doc.text('Your Generated Key:', 10, 20);
            doc.setFont("Courier", "normal");
            doc.text(key, 10, 30);
            doc.save('generated_key.pdf');
        });
    });
});