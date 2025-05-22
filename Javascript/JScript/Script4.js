
    function generateUUID() {
        const uuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
    document.getElementById('uuidOutput').value = uuid;
    }

    function copyUUID() {
        const uuidField = document.getElementById('uuidOutput');
    uuidField.select();
    uuidField.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    }
