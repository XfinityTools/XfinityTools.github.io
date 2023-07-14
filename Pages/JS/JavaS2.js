function createZip() {
  var input = document.getElementById('file-input');
  var files = input.files;

  if (files.length === 0) {
    alert('Please select files to zip.');
    return;
  }

  var zip = new JSZip();

  function addFilesToZip(index) {
    if (index >= files.length) {
      zip.generateAsync({ type: 'blob' })
        .then(function(content) {
          saveAs(content, 'files.zip');
        })
        .catch(function(error) {
          console.error('Error creating zip file:', error);
        });
      return;
    }

    var file = files[index];
    var reader = new FileReader();

    reader.onload = function() {
      zip.file(file.name, reader.result);
      addFilesToZip(index + 1);
    };

    reader.onerror = function() {
      console.error('Error reading file:', file);
      addFilesToZip(index + 1);
    };

    reader.readAsDataURL(file);
  }

  addFilesToZip(0);
}

window.onload = function() {
  var inputFile = document.getElementById('file-input');
  var downloadButton = document.getElementById('downloadButton');
  var fileList = document.getElementById('fileList');

  inputFile.addEventListener('change', function(event) {
    var files = event.target.files;
    fileList.innerHTML = '';

    for (var i = 0; i < files.length; i++) {
      var listItem = document.createElement('li');
      listItem.textContent = files[i].name;
      fileList.appendChild(listItem);
    }
  });

  downloadButton.addEventListener('click', createZip);
};