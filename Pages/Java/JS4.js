const dropZone = document.getElementById("dropZone");
const webpInput = document.getElementById("webpInput");
const downloadLinks = document.getElementById("downloadLinks");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

dropZone.addEventListener("click", () => webpInput.click());

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    handleFiles(e.dataTransfer.files);
});

webpInput.addEventListener("change", () => {
    handleFiles(webpInput.files);
});

function handleFiles(files) {
    downloadLinks.innerHTML = ""; // Clear previous results

    Array.from(files).forEach((file, index) => {
        if (file.type !== "image/webp") {
            alert("Only .webp files are supported.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const jpegDataUrl = canvas.toDataURL("image/jpeg");

                const a = document.createElement("a");
                a.href = jpegDataUrl;
                a.download = file.name.replace(/\.webp$/i, ".jpeg");
                a.textContent = "Download " + a.download;
                a.className = "btn btn-default";
                downloadLinks.appendChild(a);
            };
            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    });
}


function calculateEarnings() {
    const rpm = parseFloat(document.getElementById("rpm").value);
    const impressions = parseInt(document.getElementById("impressions").value);
    const ctr = parseFloat(document.getElementById("ctr").value);
    const cpc = parseFloat(document.getElementById("cpc").value);
    const currency = document.getElementById("currency").value;
    const resultDiv = document.getElementById("result");

    if (isNaN(rpm) || isNaN(impressions)) {
        resultDiv.innerHTML = "<p>Please enter valid RPM and impression values.</p>";
        return;
    }

    const earningsFromRPM = (rpm / 1000) * impressions;
    const projectedRPM = (rpm / 1000) * 1000;
    const remaining = impressions < 1000 ? 1000 - impressions : 0;

    let clickEarnings = "";
    if (!isNaN(ctr) && !isNaN(cpc)) {
        const estimatedClicks = impressions * (ctr / 100);
        const earningsFromClicks = estimatedClicks * cpc;
        clickEarnings = `
                    <p><strong>Estimated Clicks:</strong> ${estimatedClicks.toFixed(2)}</p>
                    <p><strong>Estimated CPC Earnings:</strong> ${currency}${earningsFromClicks.toFixed(2)}</p>
                `;
    }

    resultDiv.innerHTML = `
                <p><strong>Estimated RPM Earnings:</strong> ${currency}${earningsFromRPM.toFixed(2)}</p>
                <p><strong>Projected Earnings @ 1000 Impressions:</strong> ${currency}${projectedRPM.toFixed(2)}</p>
                ${remaining > 0 ? `<p><strong>Impressions Remaining to Reach 1000:</strong> ${remaining}</p>` : ""}
                ${clickEarnings}
            `;
}

