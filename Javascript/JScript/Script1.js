    document.getElementById('mortgageForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const loanAmount = parseFloat(document.getElementById('loanAmount').value);
        const annualInterestRate = parseFloat(document.getElementById('interestRate').value) / 100;
        const loanTermYears = parseInt(document.getElementById('loanTerm').value);

        const monthlyRate = annualInterestRate / 12;
        const totalPayments = loanTermYears * 12;
        const monthlyPayment = loanAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -totalPayments));
        document.getElementById('monthlyPayment').textContent = `Monthly Payment: $${monthlyPayment.toFixed(2)}`;
        document.getElementById('mortgageResults').style.display = 'block';

        const tableBody = document.querySelector('#amortizationSchedule tbody');
        tableBody.innerHTML = '';
        let balance = loanAmount;

        for (let i = 1; i <= totalPayments; i++) {
            const interest = balance * monthlyRate;
            const principal = monthlyPayment - interest;
            balance -= principal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${i}</td>
                <td>${monthlyPayment.toFixed(2)}</td>
                <td>${principal.toFixed(2)}</td>
                <td>${interest.toFixed(2)}</td>
                <td>${Math.max(balance, 0).toFixed(2)}</td>
            `;
            tableBody.appendChild(row);
        }
    });

    function printSchedule() {
        const content = document.getElementById('amortizationScheduleContainer').innerHTML;
        const printWindow = window.open('', '', 'width=900,height=700');
        printWindow.document.write('<html><head><title>Amortization Schedule</title></head><body>');
        printWindow.document.write('<h1>Amortization Schedule</h1>');
        printWindow.document.write(content);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }

    function exportPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'pt', 'a4');
        doc.text("Amortization Schedule", 40, 40);

        const rows = [];
        document.querySelectorAll("#amortizationSchedule tbody tr").forEach(tr => {
            const cells = tr.querySelectorAll("td");
            const row = Array.from(cells).map(td => td.innerText);
            rows.push(row);
        });

        doc.autoTable({
            head: [["Month", "Payment ($)", "Principal ($)", "Interest ($)", "Remaining Balance ($)"]],
            body: rows,
            startY: 60
        });

        doc.save("Amortization_Schedule.pdf");
    }
