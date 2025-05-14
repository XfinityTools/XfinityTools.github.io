// WebP to BMP - Multiple Upload Support
const dropArea = document.getElementById("webpToBmpDropArea");
const fileInput = document.getElementById("webpToBmpInput");
const convertBtn = document.getElementById("convertWebpToBmp");
const previewContainer = document.getElementById("webpToBmpPreviewContainer");
let selectedFiles = [];

// Trigger file input on click
dropArea.addEventListener("click", () => fileInput.click());

// Handle file input selection
fileInput.addEventListener("change", (e) => {
    selectedFiles = Array.from(e.target.files);
    updateDropAreaText(selectedFiles);
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
    selectedFiles = Array.from(e.dataTransfer.files);
    fileInput.files = e.dataTransfer.files; // sync with input
    updateDropAreaText(selectedFiles);
});

function updateDropAreaText(files) {
    const names = files.map(file => file.name).join(", ");
    dropArea.querySelector("p").textContent = names || "Drag and drop WebP files here";
}

// Convert button click handler
convertBtn.addEventListener("click", () => {
    if (!selectedFiles.length) {
        alert("Please select one or more WebP files.");
        return;
    }

    previewContainer.innerHTML = "";

    selectedFiles.forEach(file => {
        if (file.type !== "image/webp") {
            const errorMsg = document.createElement("p");
            errorMsg.textContent = `${file.name} is not a valid WebP image.`;
            previewContainer.appendChild(errorMsg);
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

                const bmpDataUrl = canvas.toDataURL("image/bmp");
                const downloadLink = document.createElement("a");
                downloadLink.href = bmpDataUrl;
                downloadLink.download = file.name.replace(/\.[^/.]+$/, "") + ".bmp";
                downloadLink.textContent = "Download " + downloadLink.download;
                downloadLink.style.display = "inline-block";
                downloadLink.style.marginBottom = "10px";
                downloadLink.style.background = "#000";
                downloadLink.style.color = "#fff";
                downloadLink.style.padding = "6px 12px";
                downloadLink.style.textDecoration = "none";
                downloadLink.style.borderRadius = "4px";

                previewContainer.appendChild(img);
                previewContainer.appendChild(document.createElement("br"));
                previewContainer.appendChild(downloadLink);
                previewContainer.appendChild(document.createElement("hr"));
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
});
