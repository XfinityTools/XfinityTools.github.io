
    async function generateChecksum() {
    const inputText = document.getElementById("checksumInput").value;
    const algorithm = document.getElementById("algorithmSelect").value;
    const outputField = document.getElementById("checksumOutput");

    if (!inputText) {
        alert("Please enter some text to generate a checksum.");
    return;
    }

    try {
        const encoder = new TextEncoder();
    const data = encoder.encode(inputText);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    outputField.value = hashHex;
    } catch (error) {
        outputField.value = "Unsupported algorithm or error generating checksum.";
    }
}

    function copyChecksum() {
    const outputField = document.getElementById("checksumOutput");
    outputField.select();
    outputField.setSelectionRange(0, 99999); // For mobile compatibility

    try {
        document.execCommand("copy");
    alert("Checksum copied to clipboard!");
    } catch (err) {
        alert("Failed to copy checksum.");
    }
}

    function pasteText() {
        navigator.clipboard.readText()
            .then(text => {
                const inputField = document.getElementById("checksumInput");
                inputField.value = text;
            })
            .catch(err => {
                alert("Failed to read clipboard: " + err);
            });
}

    function clearFields() {
    const inputField = document.getElementById("checksumInput");
    const outputField = document.getElementById("checksumOutput");

    inputField.value = "";
    outputField.value = "";
}
