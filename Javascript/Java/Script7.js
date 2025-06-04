function calculateBusinessDays(event) {
    event.preventDefault();

    const start = new Date(document.getElementById('startDate').value);
    const end = new Date(document.getElementById('endDate').value);
    let count = 0;

    if (end < start) {
        document.getElementById('result').innerText = "End date must be after start date.";
        return;
    }

    let current = new Date(start);

    while (current <= end) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) {
            count++;
        }
        current.setDate(current.getDate() + 1);
    }

    document.getElementById('result').innerText = `Business Days: ${count}`;
  }


function encodeBase64(event) {
    event.preventDefault();
    const inputText = document.getElementById('plainText').value;
    const encoded = btoa(unescape(encodeURIComponent(inputText)));
    document.getElementById('encodedText').value = encoded;
}

function copyToClipboard() {
    const output = document.getElementById('encodedText');
    output.select();
    output.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    alert("Encoded text copied to clipboard.");
}

function decodeBase64(event) {
    event.preventDefault();
    try {
        const encodedInput = document.getElementById('encodedInput').value;
        const decoded = decodeURIComponent(escape(atob(encodedInput))); // UTF-8 safe
        document.getElementById('decodedText').value = decoded;
    } catch (error) {
        alert("Invalid Base64 input. Please ensure the text is correctly encoded.");
    }
}

function copyDecoded() {
    const decodedOutput = document.getElementById('decodedText');
    decodedOutput.select();
    decodedOutput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Decoded text copied to clipboard.");
}

function reverseText(event) {
    event.preventDefault();
    const input = document.getElementById('inputText').value;
    const reversed = input.split('').reverse().join('');
    document.getElementById('reversedText').value = reversed;
}

function copyReversed() {
    const output = document.getElementById('reversedText');
    output.select();
    output.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Reversed text copied to clipboard.");
}

function clearInput() {
    document.getElementById('inputText').value = '';
    document.getElementById('reversedText').value = '';
}