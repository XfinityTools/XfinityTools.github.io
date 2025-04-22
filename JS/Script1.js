    const dropArea = document.getElementById('drop-area');
    const fileElem = document.getElementById('fileElem');
    const convertDownloadBtn = document.getElementById('convertDownloadBtn');
    let imageFiles = [];

                dropArea.addEventListener('click', () => {
        fileElem.click();
                });

                dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
    dropArea.style.borderColor = 'green';
                });

                dropArea.addEventListener('dragleave', () => {
        dropArea.style.borderColor = '#ccc';
                });

                dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
    dropArea.style.borderColor = '#ccc';
    handleFiles(e.dataTransfer.files);
                });

                fileElem.addEventListener('change', () => {
        handleFiles(fileElem.files);
                });

function handleFiles(files) {
    imageFiles = [];
    let validImageFound = false;
    const dropText = document.getElementById('drop-text');

    for (let file of files) {
        if (file.type === 'image/webp') {
            imageFiles.push(file);
            validImageFound = true;
        }
    }

    if (validImageFound) {
        dropText.textContent = `${imageFiles.length} image(s) submitted successfully!`;
        dropArea.style.borderColor = 'green';
    } else {
        dropText.textContent = "Invalid file. Please upload only .webp images.";
        dropArea.style.borderColor = 'red';
    }

    // Reset message after 3 seconds
    setTimeout(() => {
        dropText.textContent = "Drag & drop .webp images here or click to upload";
        dropArea.style.borderColor = '#ccc';
    }, 3000);
}


                convertDownloadBtn.addEventListener('click', () => {
                    if (imageFiles.length === 0) {
        alert("Please upload at least one WebP image.");
    return;
                    }

    const {jsPDF} = window.jspdf;
    const pdf = new jsPDF();

    let processedCount = 0;

                    imageFiles.forEach((file, index) => {
                        const reader = new FileReader();
    reader.onload = function (e) {
                            const img = new Image();
    img.onload = function () {
                                const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
                                if (index > 0) pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 10, 10, 190, 0);

    processedCount++;
    if (processedCount === imageFiles.length) {
        pdf.save("webp_to_pdf.pdf");
                                }
                            };
    img.src = e.target.result;
                        };
    reader.readAsDataURL(file);
                    });
                });
            