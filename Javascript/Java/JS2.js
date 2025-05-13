
    document.getElementById("downloadButton").addEventListener("click", function() {
            var textInput = document.getElementById("textInput").value;
    if (textInput.trim() === "") {
        alert("Please enter some text data.");
    return;
            }
    var csvContent = "data:text/csv;charset=utf-8,";
    var rows = textInput.split("\n");
    rows.forEach(function(row) {
                var columns = row.split(",");
    csvContent += columns.join(",") + "\n"; // Join values with commas and add new line
            });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "output.csv");
    link.click();
        });