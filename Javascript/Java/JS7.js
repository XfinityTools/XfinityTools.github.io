function generateSlug() {
    const input = document.getElementById('textInput').value;
    const slug = input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    document.getElementById('slugOutput').value = slug;
}

function copySlug() {
    const slugField = document.getElementById("slugOutput");
    slugField.select();
    slugField.setSelectionRange(0, 99999); // For mobile devices

    try {
        document.execCommand("copy");
        alert("Slug copied to clipboard!");
    } catch (err) {
        alert("Failed to copy slug.");
    }
}

function pasteText() {
    navigator.clipboard.readText()
        .then(text => {
            document.getElementById("textInput").value = text; // Use 'textInput' to match generateSlug
        })
        .catch(err => {
            alert("Failed to read clipboard: " + err);
        });
}

function clearFields() {
    document.getElementById("textInput").value = "";
    document.getElementById("slugOutput").value = "";
}

