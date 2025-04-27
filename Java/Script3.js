async function convertToPDF() {
    const { jsPDF } = window.jspdf;
    const input = document.getElementById('imageInput');
    if (!input.files.length) return alert("Please select at least one image.");

    const pdf = new jsPDF({ unit: 'pt' });
    let firstPage = true;

    for (const file of input.files) {
        const imgData = await readFileAsDataURL(file);
        const img = await loadImage(imgData);

        if (!firstPage) {
            pdf.addPage([img.width, img.height]);
        } else {
            pdf.setPage(1);
            pdf.setPageDimensions([img.width, img.height]);
            firstPage = false;
        }

        pdf.addImage(img, 'JPEG', 0, 0, img.width, img.height);
    }

    pdf.save("converted.pdf");
}

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function loadImage(dataUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = dataUrl;
    });
}
