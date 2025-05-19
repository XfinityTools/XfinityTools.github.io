
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const downloadBtn = document.getElementById('downloadBtn');
    let mergedContent = '';

            // Click opens file selector
            dropArea.addEventListener('click', () => fileInput.click());

            // File input handler
            fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
            });

            // Drag-and-drop events
            dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
    dropArea.style.backgroundColor = '#e0e0e0';
            });

            dropArea.addEventListener('dragleave', () => {
        dropArea.style.backgroundColor = '#f8f8f8';
            });

            dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
    dropArea.style.backgroundColor = '#f8f8f8';
    handleFiles(e.dataTransfer.files);
            });

    function handleFiles(files) {
        mergedContent = '';
    let fileCount = files.length;
    if (fileCount === 0) return;

    let readCount = 0;

                Array.from(files).forEach((file) => {
                    if (file.type !== 'text/plain') {
        alert('Only .txt files are supported.');
    return;
                    }

    const reader = new FileReader();
    reader.onload = function (evt) {
        mergedContent += evt.target.result + '\n\n'; // Add spacing between files
    readCount++;
    if (readCount === fileCount) {
        alert('Files merged successfully. Click "Download Merged File" to save.');
    downloadBtn.disabled = false;
                        }
                    };
    reader.readAsText(file);
                });
            }

    function downloadMergedText() {
                if (!mergedContent) return;

    const blob = new Blob([mergedContent], {type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'merged.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
            }
