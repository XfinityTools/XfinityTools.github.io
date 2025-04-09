const downloadLink = document.getElementById('downloadLink');
      const fileInput = document.getElementById('fileInput');
      const selectedFilesList = document.getElementById('selectedFilesList');

      document.addEventListener('DOMContentLoaded', () => {
          const dropArea = document.getElementById('dropArea');

          dropArea.addEventListener('dragover', (e) => {
              e.preventDefault();
              dropArea.style.backgroundColor = '#f2f2f2';
          });

          dropArea.addEventListener('dragleave', () => {
              dropArea.style.backgroundColor = '#fff';
          });

          dropArea.addEventListener('drop', (e) => {
              e.preventDefault();
              dropArea.style.backgroundColor = '#fff';
              const files = e.dataTransfer.files;
              handleFiles(files);
          });

          dropArea.addEventListener('click', () => {
              fileInput.click();
          });

          fileInput.addEventListener('change', () => {
              const files = fileInput.files;
              handleFiles(files);
          });
      });

      async function handleFiles(files) {
          if (!files || files.length === 0) {
              alert('Please select a file to compress.');
              return;
          }

          try {
              const file = files[0];
              const compressedFile = await compressUsingGzip(file);
              setDownloadLink(compressedFile, `${file.name}.gz`);
              updateSelectedFilesList(files);
          } catch (error) {
              console.error('Error compressing the file:', error);
              alert('Error compressing the file. Please try again.');
          }
      }

      function setDownloadLink(file, filename) {
          downloadLink.href = URL.createObjectURL(file);
          downloadLink.download = filename;
          downloadLink.style.display = 'block';
      }

      async function compressUsingGzip(file) {
          const reader = new FileReader();

          return new Promise((resolve, reject) => {
              reader.onload = async () => {
                  try {
                      const data = reader.result;
                      const compressedData = await compressWithGzip(data);
                      resolve(new Blob([compressedData], { type: 'application/gzip' }));
                  } catch (error) {
                      reject(error);
                  }
              };

              reader.onerror = () => {
                  reject(new Error('Error reading the file.'));
              };

              reader.readAsArrayBuffer(file);
          });
      }

      async function compressWithGzip(data) {
          const encoder = new TextEncoder();
          const input = encoder.encode(data);

          const compressionStream = new CompressionStream('gzip');
          const writer = compressionStream.writable.getWriter();

          writer.write(input);
          writer.close();

          const compressedData = await new Response(compressionStream.readable).arrayBuffer();
          return compressedData;
      }

      function compressFile() {
          fileInput.click();
      }

      function updateSelectedFilesList(files) {
          selectedFilesList.innerHTML = '';
          for (const file of files) {
              const listItem = document.createElement('li');
              listItem.textContent = file.name;
              selectedFilesList.appendChild(listItem);
          }
}


        
    function convertJsonToCsv() {
            const jsonInput = document.getElementById('jsonInput').value.trim();
    const skipEmptyValues = document.getElementById('skipEmptyValues').checked;
    const delimiter = document.getElementById('csvDelimiter').value;

    try {
        
        let jsonData = JSON.parse(jsonInput);
    if (!Array.isArray(jsonData)) {
        jsonData = [jsonData]; // Ensure it's an array for uniformity
                }

    // Get the headers (keys from the first object)
    const headers = Object.keys(jsonData[0]);

                // Generate the rows based on the JSON data
                let rows = jsonData.map(item => headers.map(header => item[header] || '').join(delimiter));

    // Skip rows with empty values if selected
    if (skipEmptyValues) {
        rows = rows.filter(row => row.split(delimiter).some(cell => cell.trim() !== ''));
                }

    // Combine headers and rows into CSV content
    const csvContent = [headers.join(delimiter), ...rows].join('\n');

    // Show preview in the interface (only the first 10 rows)
    const previewLimit = 10;
    const previewCsv = [headers.join(delimiter)].concat(rows.slice(0, previewLimit)).join('\n');
    document.getElementById('csvPreview').innerText = previewCsv;

    // Store CSV content globally for downloading
    window.csvContent = csvContent;

            } catch (error) {
        alert('Invalid JSON input. Please check the format.');
            }
        }

    // Function to download the CSV file
    function downloadCsv() {
            const csvContent = window.csvContent;
    if (!csvContent) {
        alert('Please convert JSON to CSV first.');
    return;
            }

    // Create a Blob with CSV content and download it
    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'converted_data.csv';
    link.click();
        }


    const textarea = document.getElementById("jsonInput");

    function autoResizeTextarea(el) {
        el.style.height = 'auto';
    el.style.height = (el.scrollHeight) + 'px';
        }

        textarea.addEventListener('input', () => autoResizeTextarea(textarea));

        // Optionally trigger resize on page load if it has pre-filled content
        window.addEventListener('DOMContentLoaded', () => autoResizeTextarea(textarea));

    function clearJsonInput() {
            const textarea = document.getElementById("jsonInput");
    textarea.value = "";
    textarea.style.height = "200px"; // Reset to original height
    document.getElementById("csvPreview").innerText = ""; // Clear preview
        }


function convertJsonToText() {
    const input = document.getElementById("jsonInput").value.trim();
    const pretty = document.getElementById("prettyPrint").checked;
    const outputArea = document.getElementById("textOutput");

    try {
        const json = JSON.parse(input);
        const text = pretty ? JSON.stringify(json, null, 4) : JSON.stringify(json);
        outputArea.textContent = text;
    } catch (e) {
        alert("Invalid JSON. Please check your input.");
        outputArea.textContent = '';
    }
}

function downloadTextFile() {
    const text = document.getElementById("textOutput").textContent;
    if (!text) {
        alert("No text available to download.");
        return;
    }

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "output.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function clearJsonInput() {
    const input = document.getElementById("jsonInput");
    const output = document.getElementById("textOutput");
    input.value = '';
    output.textContent = '';
    input.style.height = "200px";
}
