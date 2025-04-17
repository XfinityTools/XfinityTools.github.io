const dropArea = document.getElementById("drop-area");
const fileElem = document.getElementById("fileElem");
let files = [];

dropArea.addEventListener("click", () => fileElem.click());

fileElem.addEventListener("change", (e) => {
    files = Array.from(e.target.files);
    dropArea.querySelector("p").textContent = files.length + " file(s) selected.";
});

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.style.borderColor = "#000";
});

dropArea.addEventListener("dragleave", () => {
    dropArea.style.borderColor = "#ccc";
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    files = Array.from(e.dataTransfer.files);
    dropArea.querySelector("p").textContent = files.length + " file(s) selected.";
});

document.getElementById("mergeBtn").addEventListener("click", async () => {
    if (files.length === 0) {
        alert("Please upload some images.");
        return;
    }

    const layout = document.getElementById("layout").value;
    const images = await Promise.all(files.map(file => createImageBitmap(file)));
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    let widths = images.map(i => i.width);
    let heights = images.map(i => i.height);

    if (layout === "horizontal") {
        canvas.width = widths.reduce((a, b) => a + b);
        canvas.height = Math.max(...heights);
        let x = 0;
        images.forEach(img => {
            ctx.drawImage(img, x, 0);
            x += img.width;
        });
    } else if (layout === "vertical") {
        canvas.width = Math.max(...widths);
        canvas.height = heights.reduce((a, b) => a + b);
        let y = 0;
        images.forEach(img => {
            ctx.drawImage(img, 0, y);
            y += img.height;
        });
    } else if (layout === "grid") {
        const cols = Math.ceil(Math.sqrt(images.length));
        const rows = Math.ceil(images.length / cols);
        const cellWidth = Math.max(...widths);
        const cellHeight = Math.max(...heights);

        canvas.width = cols * cellWidth;
        canvas.height = rows * cellHeight;

        images.forEach((img, i) => {
            const x = (i % cols) * cellWidth;
            const y = Math.floor(i / cols) * cellHeight;
            ctx.drawImage(img, x, y);
        });
    }

    canvas.toBlob(blob => {
        const link = document.createElement("a");
        link.download = "merged-image.jpg";
        link.href = URL.createObjectURL(blob);
        link.click();
    }, "image/jpeg", 1);
});