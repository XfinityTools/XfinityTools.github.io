 function convertCSVtoExcel() {
            const fileInput = document.getElementById('csvFileInput');
            if (!fileInput.files.length) {
                alert('Please select a CSV file first.');
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                const csvData = e.target.result;
                const workbook = XLSX.utils.book_new();
                const worksheet = XLSX.utils.csv_to_sheet(csvData);
                XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

                const excelFileName = "converted_excel_file.xlsx";
                XLSX.writeFile(workbook, excelFileName);
            };
            reader.readAsText(fileInput.files[0]);
}


function parseFixedWidthLine(line) {
    return [
        line.substring(0, 15).trim(),     // ID
        line.substring(15, 34).trim(),    // Code/Type
        line.substring(34, 54).trim(),    // Amount
        line.substring(54, 84).trim(),    // Name
        line.substring(84, 112).trim(),   // Ref Code
        line.substring(112).trim()        // Note
    ];
}

function handleTxtUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const lines = e.target.result.split(/\r?\n/).filter(line => line.trim() !== '');
        const data = [["ID", "Type", "Amount", "Name", "Ref Code", "Note"]];
        lines.forEach(line => {
            data.push(parseFixedWidthLine(line));
        });

        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "converted_data.xlsx");
    };
    reader.readAsText(file);
}

let latestJsonOutput = '';

function parseCSV(csvText) {
    const lines = csvText.trim().split(/\r?\n/);
    const headers = lines[0].split(',');
    const json = lines.slice(1).map(line => {
        const values = line.split(',');
        let obj = {};
        headers.forEach((h, i) => {
            obj[h.trim()] = values[i]?.trim();
        });
        return obj;
    });
    return JSON.stringify(json, null, 4);
}

function handleCSVUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const csvContent = e.target.result;
        const jsonOutput = parseCSV(csvContent);
        latestJsonOutput = jsonOutput;
        document.getElementById('jsonOutput').value = jsonOutput;
    };
    reader.readAsText(file);
}

function downloadJSON() {
    if (!latestJsonOutput) return alert("Please upload and convert a CSV first.");
    const blob = new Blob([latestJsonOutput], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.json";
    a.click();
    URL.revokeObjectURL(url);
}

function convertTextToJson() {
    const input = document.getElementById("textFileInput");
    const output = document.getElementById("jsonOutput");

    if (!input.files.length) {
        alert("Please select a text file first.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const lines = e.target.result.trim().split(/\r?\n/);
        const jsonArray = [];

        for (const line of lines) {
            const parts = line.trim().split(/\s{2,}/);
            jsonArray.push(parts);
        }

        output.value = JSON.stringify(jsonArray, null, 2);
    };
    reader.readAsText(input.files[0]);
}

function downloadJson() {
    const content = document.getElementById("jsonOutput").value;
    if (!content) {
        alert("No JSON to download. Please convert a file first.");
        return;
    }

    const blob = new Blob([content], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function convertTextToJson() {
    const input = document.getElementById("textFileInput");
    const output = document.getElementById("jsonOutput");

    if (!input.files.length) {
        alert("Please select a text file first.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const lines = e.target.result.trim().split(/\r?\n/);
        const jsonArray = [];

        for (const line of lines) {
            const parts = line.trim().split(/\s{2,}/);
            jsonArray.push(parts);
        }

        output.value = JSON.stringify(jsonArray, null, 2);
    };
    reader.readAsText(input.files[0]);
}

function downloadJson() {
    const content = document.getElementById("jsonOutput").value;
    if (!content) {
        alert("No JSON to download. Please convert a file first.");
        return;
    }

    const blob = new Blob([content], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
