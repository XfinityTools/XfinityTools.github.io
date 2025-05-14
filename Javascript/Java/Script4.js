
    document.getElementById('convertBtn').addEventListener('click', function () {
            const input = document.getElementById('csvFileInput');
    if (!input.files.length) {
        alert("Please upload a CSV file.");
    return;
            }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
                const csv = e.target.result;

    try {

                    const workbook = XLSX.read(csv, {type: 'string' });


    const worksheet = workbook.Sheets[workbook.SheetNames[0]];


    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, worksheet, "Sheet1");


    XLSX.writeFile(newWorkbook, "converted.xlsx");
                } catch (error) {
        alert("Conversion failed: " + error.message);
                }
            };

    reader.onerror = function () {
        alert("Failed to read file!");
            };

    reader.readAsText(file);
        });
