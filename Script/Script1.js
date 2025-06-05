function calculateDiscount(event) {
    event.preventDefault();

    const original = parseFloat(document.getElementById('originalPrice').value);
    const percent = parseFloat(document.getElementById('discountPercent').value);
    const final = parseFloat(document.getElementById('finalPrice').value);

    let output = "";

    if (!isNaN(original) && !isNaN(percent) && isNaN(final)) {
        const calculatedFinal = original - (original * percent / 100);
        document.getElementById('finalPrice').value = calculatedFinal.toFixed(2);
        output = `Final Price: $${calculatedFinal.toFixed(2)}`;
    } else if (!isNaN(original) && isNaN(percent) && !isNaN(final)) {
        const calculatedPercent = ((original - final) / original) * 100;
        document.getElementById('discountPercent').value = calculatedPercent.toFixed(2);
        output = `Discount Percentage: ${calculatedPercent.toFixed(2)}%`;
    } else if (isNaN(original) && !isNaN(percent) && !isNaN(final)) {
        const calculatedOriginal = final / (1 - percent / 100);
        document.getElementById('originalPrice').value = calculatedOriginal.toFixed(2);
        output = `Original Price: $${calculatedOriginal.toFixed(2)}`;
    } else {
        output = "Please fill in exactly two fields to calculate the third.";
    }

    document.getElementById('resultText').innerText = output;
    document.getElementById('result').style.display = 'block';
}

function clearDiscountFields() {
    document.getElementById('originalPrice').value = '';
    document.getElementById('discountPercent').value = '';
    document.getElementById('finalPrice').value = '';
    document.getElementById('resultText').innerText = '';
    document.getElementById('result').style.display = 'none';
}


function calculatePercentage(event) {
    event.preventDefault();

    const part = parseFloat(document.getElementById('part').value);
    const whole = parseFloat(document.getElementById('whole').value);
    const percent = parseFloat(document.getElementById('percentage').value);
    let result = "";

    if (!isNaN(part) && !isNaN(whole) && isNaN(percent)) {
        const calculatedPercent = (part / whole) * 100;
        document.getElementById('percentage').value = calculatedPercent.toFixed(2);
        result = `${part} is ${calculatedPercent.toFixed(2)}% of ${whole}`;
    } else if (!isNaN(part) && isNaN(whole) && !isNaN(percent)) {
        const calculatedWhole = (part * 100) / percent;
        document.getElementById('whole').value = calculatedWhole.toFixed(2);
        result = `${part} is ${percent}% of ${calculatedWhole.toFixed(2)}`;
    } else if (isNaN(part) && !isNaN(whole) && !isNaN(percent)) {
        const calculatedPart = (percent / 100) * whole;
        document.getElementById('part').value = calculatedPart.toFixed(2);
        result = `${calculatedPart.toFixed(2)} is ${percent}% of ${whole}`;
    } else {
        result = "Please fill in exactly two fields to calculate the third.";
    }

    document.getElementById('percentageResultText').innerText = result;
    document.getElementById('percentageResult').style.display = 'block';
}

function clearPercentageFields() {
    document.getElementById('part').value = '';
    document.getElementById('whole').value = '';
    document.getElementById('percentage').value = '';
    document.getElementById('percentageResultText').innerText = '';
    document.getElementById('percentageResult').style.display = 'none';
}


function convertRoman(event) {
    event.preventDefault();
    const num = parseInt(document.getElementById('number').value, 10);
    if (isNaN(num) || num < 1 || num > 3999) {
        document.getElementById('romanOutput').innerText = "Please enter a number between 1 and 3999.";
        document.getElementById('romanResult').style.display = 'block';
        return;
    }

    const romanNumerals = [
        ["M", 1000],
        ["CM", 900],
        ["D", 500],
        ["CD", 400],
        ["C", 100],
        ["XC", 90],
        ["L", 50],
        ["XL", 40],
        ["X", 10],
        ["IX", 9],
        ["V", 5],
        ["IV", 4],
        ["I", 1]
    ];

    let result = '';
    let value = num;

    for (let [roman, val] of romanNumerals) {
        while (value >= val) {
            result += roman;
            value -= val;
        }
    }

    document.getElementById('romanOutput').innerText = `${result}`;
    document.getElementById('romanResult').style.display = 'block';
}

function clearRomanFields() {
    document.getElementById('number').value = '';
    document.getElementById('romanOutput').innerText = '';
    document.getElementById('romanResult').style.display = 'none';
}

function convertToDecimal(event) {
    event.preventDefault();
    const roman = document.getElementById('romanInput').value.toUpperCase();
    const romanMap = {
        I: 1, V: 5, X: 10, L: 50,
        C: 100, D: 500, M: 1000
    };

    let prev = 0, total = 0;
    for (let i = roman.length - 1; i >= 0; i--) {
        const current = romanMap[roman[i]];
        if (!current) {
            document.getElementById('decimalOutput').innerText = "Invalid Roman numeral entered.";
            document.getElementById('decimalResult').style.display = 'block';
            return;
        }
        if (current < prev) {
            total -= current;
        } else {
            total += current;
        }
        prev = current;
    }

    document.getElementById('decimalOutput').innerText = `${total}`;
    document.getElementById('decimalResult').style.display = 'block';
}

function clearDecimalFields() {
    document.getElementById('romanInput').value = '';
    document.getElementById('decimalOutput').innerText = '';
    document.getElementById('decimalResult').style.display = 'none';
}



function calculateFactorial(event) {
    event.preventDefault();
    const num = parseInt(document.getElementById('numberInput').value);

    if (isNaN(num) || num < 0) {
        document.getElementById('factorialOutput').innerText = 'Please enter a non-negative integer.';
        document.getElementById('factorialSteps').innerText = '';
        document.getElementById('factorialResult').style.display = 'block';
        return;
    }

    let result = BigInt(1);
    let steps = [];

    for (let i = 1; i <= num; i++) {
        result *= BigInt(i);
        steps.push(i);
    }

    document.getElementById('factorialOutput').innerText = `${num}! = ${result.toString()}`;
    document.getElementById('factorialSteps').innerText = steps.join(' x ') + ' = ' + result.toString();
    document.getElementById('factorialResult').style.display = 'block';
}

function clearFactorialFields() {
    document.getElementById('numberInput').value = '';
    document.getElementById('factorialOutput').innerText = '';
    document.getElementById('factorialSteps').innerText = '';
    document.getElementById('factorialResult').style.display = 'none';
}

function printFactorialResult() {
    const output = document.getElementById('factorialOutput').innerText;
    const steps = document.getElementById('factorialSteps').innerText;

    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>Factorial Result</title></head><body>');
    printWindow.document.write('<h1>XfinityTools</h1>');
    printWindow.document.write('<h2>Factorial Result</h2>');
    printWindow.document.write('<p>' + output + '</p>');
    printWindow.document.write('<pre style="font-family: monospace;">' + steps + '</pre>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}


function calculateHypotenuse(event) {
    event.preventDefault();

    const sideA = parseFloat(document.getElementById('sideA').value);
    const sideB = parseFloat(document.getElementById('sideB').value);

    if (isNaN(sideA) || isNaN(sideB) || sideA < 0 || sideB < 0) {
        document.getElementById('hypotenuseOutput').innerText = 'Please enter valid positive numbers for both sides.';
        document.getElementById('pythagorasResult').style.display = 'block';
        return;
    }

    const hypotenuse = Math.sqrt(sideA * sideA + sideB * sideB);
    document.getElementById('hypotenuseOutput').innerText =
        `The length of the hypotenuse (side C) is: ${hypotenuse.toFixed(4)}`;
    document.getElementById('pythagorasResult').style.display = 'block';
}

function clearPythagorasFields() {
    document.getElementById('sideA').value = '';
    document.getElementById('sideB').value = '';
    document.getElementById('hypotenuseOutput').innerText = '';
    document.getElementById('pythagorasResult').style.display = 'none';
}


function calculateSquareRoot(event) {
    event.preventDefault();

    const num = parseFloat(document.getElementById('numberInput').value);

    if (isNaN(num) || num < 0) {
        document.getElementById('sqrtOutput').innerText = 'Please enter a valid non-negative number.';
        document.getElementById('sqrtResult').style.display = 'block';
        return;
    }

    const sqrt = Math.sqrt(num);
    document.getElementById('sqrtOutput').innerText = `${sqrt.toFixed(6)}`;
    document.getElementById('sqrtResult').style.display = 'block';
}

function clearSqrtFields() {
    document.getElementById('numberInput').value = '';
    document.getElementById('sqrtOutput').innerText = '';
    document.getElementById('sqrtResult').style.display = 'none';
}
