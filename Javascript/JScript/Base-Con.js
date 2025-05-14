
        document.addEventListener("DOMContentLoaded", () => {
            const form = document.getElementById("baseConverterForm");
    const inputNumber = document.getElementById("inputNumber");
    const fromBase = document.getElementById("fromBase");
    const toBase = document.getElementById("toBase");
    const resultDiv = document.getElementById("result");
    const resultText = document.getElementById("convertedResult");
    const historyList = document.getElementById("conversionHistory");

            form.addEventListener("submit", () => convertBase());

    function convertBase() {
                const value = inputNumber.value.trim();
    const from = parseInt(fromBase.value);
    const to = parseInt(toBase.value);

    if (!isValidBaseInput(value, from)) {
        alert(`Invalid input for base ${from}.`);
    return;
                }

    try {
                    const decimal = parseInt(value, from);
    const converted = decimal.toString(to).toUpperCase();

    resultText.textContent = converted;
    resultDiv.style.display = "block";

    const historyItem = document.createElement("li");
    historyItem.textContent = `${value} (Base ${from}) → ${converted} (Base ${to})`;
    historyList.prepend(historyItem);
                } catch (err) {
        alert("Conversion failed. Please check your input.");
                }
            }

    function isValidBaseInput(value, base) {
                const charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, base);
    const regex = new RegExp(`^[${charset}]+$`, "i");
    return regex.test(value);
            }

    window.copyResult = function () {
                const text = resultText.textContent;
                navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard: " + text);
                });
            };
        });



document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('compoundInterestForm');
    const resultDiv = document.getElementById('result');
    const finalAmountText = document.getElementById('finalAmount');

    const formatNumber = (num) => {
        return new Intl.NumberFormat().format(num);
    };

    // Format numbers with commas as the user types or pastes
    const formatOnInput = (input) => {
        input.addEventListener('input', () => {
            let value = input.value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters except for '.'

            // Handle value to add commas
            if (value) {
                let [integerPart, decimalPart] = value.split('.');
                integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas every 3 digits
                input.value = decimalPart ? `${integerPart}.${decimalPart}` : integerPart; // Add decimal part back
            }
        });

        // Handle pasting numbers
        input.addEventListener('paste', (e) => {
            let pastedValue = e.clipboardData.getData('text');
            pastedValue = pastedValue.replace(/[^0-9.]/g, ''); // Remove non-numeric characters except for '.'
            let [integerPart, decimalPart] = pastedValue.split('.');
            integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas every 3 digits
            input.value = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
        });
    };

    const principalInput = document.getElementById('principal');
    const rateInput = document.getElementById('rate');
    const timesCompoundedInput = document.getElementById('timesCompounded');
    const yearsInput = document.getElementById('years');

    formatOnInput(principalInput);
    formatOnInput(rateInput);
    formatOnInput(timesCompoundedInput);
    formatOnInput(yearsInput);

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get values from the input fields (strip commas for calculation)
        const principal = parseFloat(principalInput.value.replace(/,/g, ''));
        const rate = parseFloat(rateInput.value.replace(/,/g, ''));
        const timesCompounded = parseInt(timesCompoundedInput.value.replace(/,/g, ''));
        const years = parseInt(yearsInput.value.replace(/,/g, ''));

        // Validate inputs
        if (isNaN(principal) || principal <= 0) {
            alert("Please enter a valid principal amount greater than zero.");
            return;
        }

        if (isNaN(rate) || rate <= 0) {
            alert("Please enter a valid interest rate greater than zero.");
            return;
        }

        if (isNaN(timesCompounded) || timesCompounded <= 0) {
            alert("Please enter a valid number of times interest is compounded per year.");
            return;
        }

        if (isNaN(years) || years <= 0) {
            alert("Please enter a valid number of years.");
            return;
        }

        // Calculate compound interest
        const compoundInterest = principal * Math.pow(1 + rate / 100 / timesCompounded, timesCompounded * years);
        const finalAmount = compoundInterest.toFixed(2);

        // Display result with comma formatting
        finalAmountText.textContent = `Final Amount: $${formatNumber(finalAmount)}`;
        resultDiv.style.display = 'block';
    });
});
