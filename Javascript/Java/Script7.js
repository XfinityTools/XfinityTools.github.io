
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




