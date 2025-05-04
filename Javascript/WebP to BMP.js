    // WebP to BMP
    const dropArea = document.getElementById("webpToBmpDropArea");
    const fileInput = document.getElementById("webpToBmpInput");
    const convertBtn = document.getElementById("convertWebpToBmp");
    const previewContainer = document.getElementById("webpToBmpPreviewContainer");
    let selectedFile = null;

    // Trigger file input on click
    dropArea.addEventListener("click", () => fileInput.click());

    // Handle file input selection
    fileInput.addEventListener("change", (e) => {
        selectedFile = e.target.files[0];
    dropArea.querySelector("p").textContent = selectedFile.name;
    });

    // Drag and drop behavior
    ["dragenter", "dragover"].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropArea.classList.add("dragover");
        });
    });

    ["dragleave", "drop"].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropArea.classList.remove("dragover");
        });
    });

    dropArea.addEventListener("drop", (e) => {
        selectedFile = e.dataTransfer.files[0];
    fileInput.files = e.dataTransfer.files; // sync with input
    dropArea.querySelector("p").textContent = selectedFile.name;
    });

    convertBtn.addEventListener("click", () => {
        if (!selectedFile || selectedFile.type !== "image/webp") {
        alert("Please select a valid WebP file.");
    return;
        }

    const reader = new FileReader();
    reader.onload = function (e) {
            const img = new Image();
    img.onload = function () {
                const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const bmpDataUrl = canvas.toDataURL("image/bmp"); // Simulated BMP
    const downloadLink = document.createElement("a");
    downloadLink.href = bmpDataUrl;
    downloadLink.download = "converted.bmp";
    downloadLink.textContent = "Download BMP";

    previewContainer.innerHTML = "";
    previewContainer.appendChild(img);
    previewContainer.appendChild(document.createElement("br"));
    previewContainer.appendChild(downloadLink);
            };
    img.src = e.target.result;
        };

    reader.readAsDataURL(selectedFile);
    });

