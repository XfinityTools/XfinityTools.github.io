
    function formatNumber(num) {
            return Number(num).toLocaleString('en-US', {
        minimumFractionDigits: 2,
    maximumFractionDigits: 2
            });
        }

        // Format inputs live
        ['carPrice', 'downpayment'].forEach(id => {
        document.getElementById(id).addEventListener('input', function (e) {
            const cursorPos = e.target.selectionStart;
            let val = e.target.value.replace(/,/g, '');
            if (!isNaN(val) && val.length > 0) {
                const formatted = parseFloat(val).toLocaleString('en-US');
                e.target.value = formatted;
                e.target.setSelectionRange(cursorPos, cursorPos);
            }
        });
        });

    let lastResults = { };

    function calculateLoan() {
            const carPriceRaw = document.getElementById("carPrice").value.replace(/,/g, '');
    const downpaymentRaw = document.getElementById("downpayment").value.replace(/,/g, '');
    const vehicleYear = document.getElementById("vehicleYear").value;
    const loanPeriod = parseFloat(document.getElementById("loanPeriod").value);
    const loanType = document.getElementById("loanType").value;
    const inflationRate = parseFloat(document.getElementById("inflationRate").value);
    const carCondition = document.getElementById("carCondition").value;
    const interestRate = parseFloat(document.getElementById("interestRate").value);

    const principal = parseFloat(carPriceRaw);
    const downpayment = parseFloat(downpaymentRaw);
    if (isNaN(principal) || isNaN(downpayment) || isNaN(loanPeriod) || isNaN(interestRate)) {
        alert("Please enter valid values for price, downpayment, loan period, and interest rate.");
    return;
            }

    const months = loanType === 'years' ? loanPeriod * 12 : loanPeriod;
    const loanYears = loanType === 'years' ? loanPeriod : loanPeriod / 12;
    const adjustedInterestRate = interestRate / 100 / 12;
    const inflationFactor = (1 + (isNaN(inflationRate) ? 0 : inflationRate / 100));

    const adjustedPrincipal = principal - downpayment;
    const monthlyPayment = (adjustedPrincipal * adjustedInterestRate) / (1 - Math.pow(1 + adjustedInterestRate, -months));
    const totalPayment = monthlyPayment * months * (carCondition === "used" ? 1 : inflationFactor);
    const totalInterest = totalPayment - adjustedPrincipal;

    let resultHTML = `
    <strong>Price of Car:</strong> $${formatNumber(principal)}<br>
        <strong>Downpayment:</strong> $${formatNumber(downpayment)}<br>
            <strong>Year of Vehicle:</strong> ${vehicleYear || 'N/A'}<br>
                <strong>Monthly Payment:</strong> $${formatNumber(monthlyPayment)}<br>
                    <strong>Total Payment:</strong> $${formatNumber(totalPayment)}<br>
                        <strong>Total Interest Paid:</strong> $${formatNumber(totalInterest)}<br>
                            <strong>Interest Rate:</strong> ${interestRate}%<br>
                                `;

                                if (!isNaN(inflationRate)) {
                                    resultHTML += `<strong>Inflation Rate:</strong> ${inflationRate}%<br>`;
            }

                                document.getElementById("results").innerHTML = resultHTML;

                                lastResults = {
                                    carPrice: formatNumber(principal),
                                downpayment: formatNumber(downpayment),
                                monthly: formatNumber(monthlyPayment),
                                total: formatNumber(totalPayment),
                                interest: formatNumber(totalInterest),
                                interestRate: interestRate,
                                inflation: isNaN(inflationRate) ? null : inflationRate,
                                condition: carCondition,
                                vehicleYear: vehicleYear || "N/A",
                                loanYears: loanYears
            };
        }

                                function downloadFile(type) {
            const filename = document.getElementById("filename").value || "loan_result";
                                const {carPrice, downpayment, monthly, total, interest, interestRate, inflation, condition, vehicleYear, loanYears} = lastResults;

                                if (!monthly || !total) {
                                    alert("Please calculate the loan before downloading.");
                                return;
            }

                                const lines = [
                                `Price of Car: $${carPrice}`,
                                `Downpayment: $${downpayment}`,
                                `Year of Vehicle: ${vehicleYear}`,
                                `Monthly Payment: $${monthly}`,
                                `Total Payment: $${total}`,
                                `Total Interest Paid: $${interest}`,
                                `Interest Rate: ${interestRate}%`
                                ];

                                if (inflation !== null) {
                                    lines.push(`Inflation Rate: ${inflation}%`);
            }

                                lines.push(`Summary: Your car with a downpayment of $${downpayment} will cost you $${monthly} monthly, with a total interest of $${interest} and a total cost of $${total} over the span of ${loanYears} year(s).`);

                                const textData = `Car Loan Results:\n${lines.join('\n')}`;
                                const csvData = `Type,Value\n${lines.map(line => line.replace(': ', ',')).join('\n')}`;

                                if (type === "txt") {
                const blob = new Blob([textData], {type: "text/plain" });
                                const link = document.createElement("a");
                                link.href = URL.createObjectURL(blob);
                                link.download = `${filename}.txt`;
                                link.click();
            }

                                if (type === "csv") {
                const blob = new Blob([csvData], {type: "text/csv" });
                                const link = document.createElement("a");
                                link.href = URL.createObjectURL(blob);
                                link.download = `${filename}.csv`;
                                link.click();
            }

                                if (type === "pdf") {
                const {jsPDF} = window.jspdf;
                                const doc = new jsPDF();

                                const pageWidth = doc.internal.pageSize.getWidth() - 20;
                                const wrappedText = doc.splitTextToSize(textData, pageWidth);

                                doc.text(wrappedText, 10, 10);
                                doc.save(`${filename}.pdf`);
            }
        }
                            