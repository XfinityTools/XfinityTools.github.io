let currentResults = [];

document.getElementById("salaryForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const gross = parseFloat(document.getElementById("grossPay").value || 0);
    const additional = parseFloat(document.getElementById("additionalPension").value || 0);
    const threshold = parseFloat(document.getElementById("taxThreshold").value || 0);
    const period = parseInt(document.getElementById("payPeriod").value || 12);

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
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (rows.length < 2) {
            alert("The Excel file does not contain enough data.");
            return;
        }

        const headers = rows[0].map(h => h.toString().toLowerCase().trim());
        const getColumnIndex = (name) => headers.findIndex(h => h.includes(name.toLowerCase()));

        const grossPayIndex = getColumnIndex("gross");
        const pensionIndex = getColumnIndex("pension");
        const taxThresholdIndex = getColumnIndex("income");
        const payPeriodIndex = getColumnIndex("period");

        if (grossPayIndex === -1 || payPeriodIndex === -1 || taxThresholdIndex === -1) {
            alert("Required columns missing: Gross Pay, Income Tax Threshold, or Pay Period.");
            return;
        }

        const firstRow = rows[1];

        document.getElementById("grossPay").value = firstRow[grossPayIndex] || 0;
        document.getElementById("additionalPension").value = firstRow[pensionIndex] || 0;
        document.getElementById("taxThreshold").value = firstRow[taxThresholdIndex] || 0;

        // Handle Pay Period input (as number or label)
        let rawPeriod = (firstRow[payPeriodIndex] || "").toString().toLowerCase().trim();
        let periodMap = {
            "monthly": "12",
            "fortnightly": "26",
            "weekly": "52",
            "12": "12",
            "26": "26",
            "52": "52"
        };
        let mappedPeriod = periodMap[rawPeriod] || "12"; // Default to monthly
        document.getElementById("payPeriod").value = mappedPeriod;

        const threshold = parseFloat(firstRow[taxThresholdIndex] || 0);
        const period = parseInt(mappedPeriod);

        const results = rows.slice(1).map(row => {
            const gross = parseFloat(row[grossPayIndex] || 0);
            const pension = parseFloat(row[pensionIndex] || 0);
            return calculateDeductions(gross, pension, threshold, period);
        });

        currentResults = results;
        displayResult(currentResults);
        document.getElementById("exportButtons").style.display = "block";
    };

    reader.readAsArrayBuffer(file);
});



function calculateDeductions(grossPay, additionalPension, annualThreshold, period) {
    if (isNaN(grossPay) || isNaN(additionalPension) || isNaN(annualThreshold) || isNaN(period)) {
        return {
            GrossPay: grossPay,
            NHT: 0,
            NIS: 0,
            AdditionalPension: additionalPension,
            PAYE: 0,
            EducationTax: 0,
            NetPay: 0
        };
    }

    const nht = grossPay * 0.02;
    const nis = Math.min(grossPay * 0.03, 12500); // NIS is capped at 12,500 per month
    const thresholdPerPeriod = annualThreshold / period;
    const taxableIncome = grossPay - nis - additionalPension - thresholdPerPeriod;

    // PAYE calculation
    let paye = 0;
    if (taxableIncome > 0) {
        paye = taxableIncome * 0.25; // 25% tax on taxable income
    }

    const eduTax = (grossPay - (nis + additionalPension)) * 0.0225; // Education tax (2.25%) on taxable portion
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
                <tr><td class="label">NHT (2%)</td><td>$${formatCurrency(r.NHT)}</td></tr>
                <tr><td class="label">NIS (3%)</td><td>$${formatCurrency(r.NIS)}</td></tr>
                <tr><td class="label">Additional Pension</td><td>$${formatCurrency(r.AdditionalPension)}</td></tr>
                <tr><td class="label">Education Tax (2.25%)</td><td>$${formatCurrency(r.EducationTax)}</td></tr>
                <tr><td class="label"><strong>Net Pay</strong></td><td><strong>$${formatCurrency(r.NetPay)}</strong></td></tr>
            </table>
        `;
        container.appendChild(slip);
    });
}

function formatCurrency(value) {
    return parseFloat(value).toLocaleString("en-JM", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    currentResults.forEach((r, i) => {
        // slip content
        doc.text(`Pay Slip ${i + 1}`, 10, 20);
        doc.text(`Gross Pay: $${formatCurrency(r.GrossPay)}`, 10, 30);
        doc.text(`PAYE: $${formatCurrency(r.PAYE)}`, 10, 40);
        doc.text(`NHT (2%): $${formatCurrency(r.NHT)}`, 10, 50);
        doc.text(`NIS (3%): $${formatCurrency(r.NIS)}`, 10, 60);
        doc.text(`Additional Pension: $${formatCurrency(r.AdditionalPension)}`, 10, 70);
        doc.text(`Education Tax (2.25%): $${formatCurrency(r.EducationTax)}`, 10, 80);
        doc.text(`Net Pay: $${formatCurrency(r.NetPay)}`, 10, 90);

        // Add a new page unless it's the last item
        if (i !== currentResults.length - 1) {
            doc.addPage();
        }
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
        "NIS (3%)",
        "Additional Pension",
        "Education Tax (2.25%)",
        "PAYE (25%)",
        "Net Pay"
    ]);

    const csvContent = csv.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "salary-slip.csv";
    link.click();
}
