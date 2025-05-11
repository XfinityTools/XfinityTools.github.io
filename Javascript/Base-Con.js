
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
