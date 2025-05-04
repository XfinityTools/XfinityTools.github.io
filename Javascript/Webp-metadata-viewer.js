
    const dropAreaMeta = document.getElementById("webpMetadataDropArea");
    const fileInputMeta = document.getElementById("webpMetadataInput");
    const previewMetaContainer = document.getElementById("webpMetadataResultsContainer");

    // Make entire area clickable
    const clickableAreaMeta = document.querySelector(".webp-metadata-clickable-area");
    clickableAreaMeta.addEventListener("click", () => fileInputMeta.click());

    // File input handler
    fileInputMeta.addEventListener("change", (e) => {
        handleFilesMeta(e.target.files);
    });

    // Drag and drop behavior
    ["dragenter", "dragover"].forEach(eventName => {
        dropAreaMeta.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropAreaMeta.classList.add("dragover");
        });
    });

    ["dragleave", "drop"].forEach(eventName => {
        dropAreaMeta.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropAreaMeta.classList.remove("dragover");
        });
    });

    // Handle drop event
    dropAreaMeta.addEventListener("drop", (e) => {
        const files = e.dataTransfer.files;
    fileInputMeta.files = files;
    handleFilesMeta(files);
    });

    function handleFilesMeta(files) {
        previewMetaContainer.innerHTML = "";
        [...files].forEach(file => {
            if (file.type === "image/webp") {
                const reader = new FileReader();
    reader.onload = function (e) {
                    const arrayBuffer = e.target.result;
    const dataView = new DataView(arrayBuffer);
    const metadata = extractBasicMetadataFromWebP(dataView);

    const fileDiv = document.createElement("div");
    fileDiv.className = "metadata-entry";
    fileDiv.innerHTML = `<strong>${file.name}</strong><br>` + metadata;
        previewMetaContainer.appendChild(fileDiv);
                };
        reader.readAsArrayBuffer(file);
            }
        });
    }

        function extractBasicMetadataFromWebP(dataView) {
        const byteToString = (offset, length) => {
            return String.fromCharCode.apply(null, new Uint8Array(dataView.buffer, offset, length));
        };
        const riffHeader = byteToString(0, 4);
        const webpHeader = byteToString(8, 4);

        let info = `RIFF Header: ${riffHeader}<br>`;
            info += `WEBP Header: ${webpHeader}<br>`;
                info += `File Size: ${dataView.byteLength} bytes`;
                return info;
    }
           