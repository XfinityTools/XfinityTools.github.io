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


function calculateGcdLcm(event) {
            event.preventDefault();

            const num1 = parseInt(document.getElementById('number1').value);
            const num2 = parseInt(document.getElementById('number2').value);

            if (isNaN(num1) || isNaN(num2) || num1 < 1 || num2 < 1) {
                alert('Please enter valid positive integers.');
                return;
            }

            function gcd(a, b) {
                while (b !== 0) {
                    const temp = b;
                    b = a % b;
                    a = temp;
                }
                return a;
            }

            function lcm(a, b, gcdVal) {
                return (a * b) / gcdVal;
            }

            const gcdValue = gcd(num1, num2);
            const lcmValue = lcm(num1, num2, gcdValue);

            document.getElementById('gcdResult').innerText = `Greatest Common Divisor (GCD): ${gcdValue}`;
            document.getElementById('lcmResult').innerText = `Least Common Multiple (LCM): ${lcmValue}`;
            document.getElementById('result').style.display = 'block';
        }

        function clearFields() {
            document.getElementById('number1').value = '';
            document.getElementById('number2').value = '';
            document.getElementById('gcdResult').innerText = '';
            document.getElementById('lcmResult').innerText = '';
            document.getElementById('result').style.display = 'none';
        }

function calculateStandardDeviation(event) {
    event.preventDefault();

    const input = document.getElementById('dataInput').value.trim();
    if (!input) {
        alert('Please enter some numbers.');
        return;
    }

    const numbers = input.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));

    if (numbers.length === 0) {
        alert('Please enter valid numbers separated by commas.');
        return;
    }

    if (numbers.length === 1 && document.querySelector('input[name="stdType"]:checked').value === 'sample') {
        alert('Sample standard deviation requires at least two numbers.');
        return;
    }

    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const squaredDiffs = numbers.map(num => (num - mean) ** 2);

    let variance;
    const stdType = document.querySelector('input[name="stdType"]:checked').value;

    if (stdType === 'population') {
        variance = squaredDiffs.reduce((a, b) => a + b, 0) / numbers.length;
    } else {
        // sample standard deviation divides by (n-1)
        variance = squaredDiffs.reduce((a, b) => a + b, 0) / (numbers.length - 1);
    }

    const stdDev = Math.sqrt(variance);

    document.getElementById('stdDevResult').innerText = `${stdType.charAt(0).toUpperCase() + stdType.slice(1)} Standard Deviation: ${stdDev.toFixed(6)}`;
    document.getElementById('result').style.display = 'block';
}

function clearFields() {
    document.getElementById('dataInput').value = '';
    document.getElementById('stdDevResult').innerText = '';
    document.getElementById('result').style.display = 'none';
    document.querySelector('input[name="stdType"][value="population"]').checked = true;
}

function calculateInflation(event) {
    event.preventDefault();

    const initialAmount = parseFloat(document.getElementById('initialAmount').value);
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100;
    const years = parseInt(document.getElementById('years').value);

    if (initialAmount < 0 || inflationRate < 0 || years < 0) {
        alert('Please enter non-negative values.');
        return;
    }

    // Calculate value after inflation
    const inflatedValue = initialAmount * Math.pow(1 + inflationRate, years);
    const lossInValue = inflatedValue - initialAmount;

    document.getElementById('inflatedValue').innerText = `Value after ${years} year(s) considering inflation: ${inflatedValue.toFixed(2)}`;
    document.getElementById('lossValue').innerText = `Increase due to inflation: ${lossInValue.toFixed(2)}`;
    document.getElementById('result').style.display = 'block';
}

function clearFields() {
    document.getElementById('initialAmount').value = '';
    document.getElementById('inflationRate').value = '';
    document.getElementById('years').value = '';
    document.getElementById('inflatedValue').innerText = '';
    document.getElementById('lossValue').innerText = '';
    document.getElementById('result').style.display = 'none';
}

function testRegex(event) {
    event.preventDefault();

    const patternInput = document.getElementById('pattern').value;
    const testText = document.getElementById('testText').value;

    try {
        const regex = new RegExp(patternInput, 'g');
        const matches = [...testText.matchAll(regex)];

        const resultElement = document.getElementById('matchResult');
        if (matches.length > 0) {
            resultElement.innerHTML = `Match found:<br><ul>` +
                matches.map(m => `<li>${m[0]}</li>`).join('') + `</ul>`;
        } else {
            resultElement.innerText = 'No match found.';
        }

        document.getElementById('result').style.display = 'block';
    } catch (e) {
        document.getElementById('matchResult').innerText = 'Invalid regular expression.';
        document.getElementById('result').style.display = 'block';
    }
}

function clearRegexFields() {
    document.getElementById('pattern').value = '';
    document.getElementById('testText').value = '';
    document.getElementById('matchResult').innerText = '';
    document.getElementById('result').style.display = 'none';
}