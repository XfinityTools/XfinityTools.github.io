
    let currentResults = [];
    document.getElementById("salaryForm").addEventListener("submit", function (e) {
        e.preventDefault();
    const gross = parseFloat(document.getElementById("grossPay").value);
    const additional = parseFloat(document.getElementById("additionalPension").value || 0);
    const threshold = parseFloat(document.getElementById("taxThreshold").value);
    const period = parseInt(document.getElementById("payPeriod").value);

    const result = calculateDeductions(gross, additional, threshold, period);
    currentResults = [result];
    displayResult(currentResults);
        });

    document.getElementById("excelFile").addEventListener("change", function (e) {
            const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
                const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, {type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, {header: 1 });

    if (rows.length < 2) {
        alert("The Excel file does not contain enough data.");
    return;
                }

    const headers = rows[0];

    function getColumnIndex(headerName) {
                    return headers.findIndex(header => header.toLowerCase().includes(headerName.toLowerCase()));
                }

    const grossPayIndex = getColumnIndex("gross pay");
    const additionalPensionIndex = getColumnIndex("additional pension");
    const incomeTaxIndex = getColumnIndex("income tax");
    const payPeriodIndex = getColumnIndex("pay period");

    if (grossPayIndex === -1 || payPeriodIndex === -1 || incomeTaxIndex === -1) {
        alert("The Excel file does not contain required columns (Gross Pay, Income Tax, Pay Period).");
    return;
                }

    const firstRow = rows[1];

    document.getElementById("grossPay").value = firstRow[grossPayIndex] || 0;
    document.getElementById("additionalPension").value = firstRow[additionalPensionIndex] || 0;
    document.getElementById("payPeriod").value = firstRow[payPeriodIndex] || 12;
    document.getElementById("taxThreshold").value = firstRow[incomeTaxIndex] || 0;

    const threshold = parseFloat(firstRow[incomeTaxIndex]);
    const period = parseInt(firstRow[payPeriodIndex]);

                const results = rows.slice(1).map(row => {
                    return calculateDeductions(
    parseFloat(row[grossPayIndex]),
    parseFloat(row[additionalPensionIndex] || 0),
    threshold,
    period
    );
                });

    currentResults = results;
    displayResult(currentResults);
    document.getElementById("exportButtons").style.display = "block";
            };
    reader.readAsArrayBuffer(file);
        });

    function calculateDeductions(grossPay, additionalPension, annualThreshold, period) {
            const nht = grossPay * 0.02;
    const nisRaw = grossPay * 0.03;
    const nis = Math.min(nisRaw, 12500);
    const thresholdPerPeriod = annualThreshold / period;
    const taxableReduction = nis + additionalPension + thresholdPerPeriod;
    let paye = 0.25 * (grossPay - taxableReduction);
    if (paye < 0) paye = 0;
    const eduTax = (grossPay - (nis + additionalPension)) * 0.0225;
    const totalDeductions = nht + nis + additionalPension + eduTax + paye;
    const netPay = grossPay - totalDeductions;

    return {
        GrossPay: grossPay,
    NHT: nht,
    NIS: nis,
    AdditionalPension: additionalPension,
    PAYE: paye,
    EducationTax: eduTax,
    NetPay: netPay
            };
        }

    function displayResult(results) {
            const container = document.getElementById("result");
    container.innerHTML = "";
    document.getElementById("exportButtons").style.display = "block";

            results.forEach((r, i) => {
                const slip = document.createElement("div");
    slip.className = "pay-slip";

    slip.innerHTML = `
    <h3>Pay Slip ${i + 1}</h3>
    <table>
        <tr><td class="label">Gross Pay</td><td>$${formatCurrency(r.GrossPay)}</td></tr>
        <tr><td class="label">PAYE (25%)</td><td>$${formatCurrency(r.PAYE)}</td></tr>
        <tr><td class="label">NIS (3%)</td><td>$${formatCurrency(r.NIS)}</td></tr>
        <tr><td class="label">NHT (2%)</td><td>$${formatCurrency(r.NHT)}</td></tr>
        <tr><td class="label">Education Tax (2.25%)</td><td>$${formatCurrency(r.EducationTax)}</td></tr>
        <tr><td class="label">Additional Pension</td><td>$${formatCurrency(r.AdditionalPension)}</td></tr>
        <tr><td class="label"><strong>Net Pay</strong></td><td><strong>$${formatCurrency(r.NetPay)}</strong></td></tr>
    </table>
    `;
    container.appendChild(slip);
            });
        }

    function formatCurrency(value) {
            return parseFloat(value).toLocaleString("en-JM", {minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

    function exportPDF() {
            const {jsPDF} = window.jspdf;
    const doc = new jsPDF();

            currentResults.forEach((r, i) => {
        doc.text(`Pay Slip ${i + 1}`, 10, 10 + (i * 60));
    doc.text(`Gross Pay: $${formatCurrency(r.GrossPay)}`, 10, 20 + (i * 60));
    doc.text(`PAYE: $${formatCurrency(r.PAYE)}`, 10, 70 + (i * 60));
    doc.text(`NHT (2%): $${formatCurrency(r.NHT)}`, 10, 30 + (i * 60));
    doc.text(`NIS (3%): $${formatCurrency(r.NIS)}`, 10, 40 + (i * 60));
    doc.text(`Additional Pension: $${formatCurrency(r.AdditionalPension)}`, 10, 50 + (i * 60));
    doc.text(`Education Tax (2.25): $${formatCurrency(r.EducationTax)}`, 10, 60 + (i * 60));
    doc.text(`Net Pay: $${formatCurrency(r.NetPay)}`, 10, 80 + (i * 60));
            });

    doc.save('salary-slip.pdf');
        }

    function exportCSV() {
            const csv = currentResults.map(r => [
    r.GrossPay,
    r.NHT,
    r.NIS,
    r.AdditionalPension,
    r.EducationTax,
    r.PAYE,
    r.NetPay
    ]);
    csv.unshift([
    "Gross Pay",
    "NHT (2%)",
    "PAYE (25%)",
    "NIS (3%)",
    "Additional Pension",
    "Education Tax (2.25%)",
    "Net Pay"
    ]);

            const csvContent = csv.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "salary-slip.csv";
    link.click();
        }
