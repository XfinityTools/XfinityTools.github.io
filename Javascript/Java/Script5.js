
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const downloadBtn = document.getElementById('downloadBtn');
    let resultXML = '';

        dropArea.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

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
            if (files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = function (evt) {
                const lines = evt.target.result.split(/\r?\n/);
    resultXML = `<items>\n` + lines.map(line => `  <item>${escapeXML(line)}</item>`).join('\n') + `\n</items>`;
    alert('Conversion successful. Click "Download XML" to save.');
    downloadBtn.disabled = false;
            };

    reader.readAsText(file);
        }

    function escapeXML(str) {
            return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
        }

function downloadXML() {
    const blob = new Blob([resultXML], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
 