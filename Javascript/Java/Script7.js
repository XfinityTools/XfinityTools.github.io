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


function countWords(event) {
    event.preventDefault();
    const text = document.getElementById('textInput').value;
    const words = text.toLowerCase().match(/\b\w+\b/g);
    const frequency = {};

    if (words) {
        words.forEach(function (word) {
            frequency[word] = (frequency[word] || 0) + 1;
        });
    }

    const resultArea = document.getElementById('frequencyResult');
    resultArea.innerHTML = '';

    const table = document.createElement('table');
    table.border = "1";
    const header = table.insertRow();
    header.insertCell().innerText = 'Word';
    header.insertCell().innerText = 'Frequency';

    for (const word in frequency) {
        const row = table.insertRow();
        row.insertCell().innerText = word;
        row.insertCell().innerText = frequency[word];
    }

    resultArea.appendChild(table);
}

function copyFrequencies() {
    const tempArea = document.createElement('textarea');
    const table = document.querySelector('#frequencyResult table');
    let content = '';

    for (let i = 1; i < table.rows.length; i++) {
        const cells = table.rows[i].cells;
        content += `${cells[0].innerText}: ${cells[1].innerText}\n`;
    }

    tempArea.value = content;
    document.body.appendChild(tempArea);
    tempArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempArea);
    alert("Word frequencies copied to clipboard.");
}

function clearFields() {
    document.getElementById('textInput').value = '';
    document.getElementById('frequencyResult').innerHTML = '';
}