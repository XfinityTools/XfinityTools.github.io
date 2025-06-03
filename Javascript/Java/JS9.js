        function rotEncrypt(text, shift) {
            return text.replace(/[a-zA-Z]/g, function (c) {
                const base = c <= 'Z' ? 65 : 97;
                return String.fromCharCode((c.charCodeAt(0) - base + shift) % 26 + base);
            });
        }

        function rot47(text) {
            return text.replace(/[\x21-\x7E]/g, function (c) {
                return String.fromCharCode(33 + (c.charCodeAt(0) + 14) % 94);
            });
        }

        function runRotTool() {
            const input = document.getElementById("rotInput").value;
            const option = document.getElementById("rotValue").value;
            const container = document.getElementById("rotOutputContainer");
            container.innerHTML = "";

            if (!input.trim()) {
                alert("Please enter text to process.");
                return;
            }

            const addOutputBox = (label, value) => {
                const div = document.createElement("div");
                div.className = "rot-box";

                const labelEl = document.createElement("label");
                labelEl.textContent = label;

                const textarea = document.createElement("textarea");
                textarea.readOnly = true;
                textarea.value = value;

                const copyBtn = document.createElement("button");
                copyBtn.textContent = "Copy";
                copyBtn.type = "button";
                copyBtn.style.marginTop = "5px";
                copyBtn.onclick = function () {
                    navigator.clipboard.writeText(textarea.value)
                        .then(() => alert(`${label} copied to clipboard!`))
                        .catch(err => alert("Copy failed: " + err));
                };

                div.appendChild(labelEl);
                div.appendChild(document.createElement("br"));
                div.appendChild(textarea);
                div.appendChild(copyBtn);
                container.appendChild(div);
            };


            if (option === "ROT13") {
                addOutputBox("ROT13", rotEncrypt(input, 13));
            } else if (option === "ROT47") {
                addOutputBox("ROT47", rot47(input));
            } else if (option === "ALL_ENCRYPT") {
                for (let i = 1; i <= 25; i++) {
                    addOutputBox("ROT" + i, rotEncrypt(input, i));
                }
                addOutputBox("ROT47", rot47(input));
            } else if (option === "ALL_DECRYPT") {
                for (let i = 1; i <= 25; i++) {
                    addOutputBox("ROT" + i + " Decrypt", rotEncrypt(input, 26 - i));
                }
                addOutputBox("ROT47 Decrypt", rot47(input));
            }
        }

        function copyAllRot() {
            const texts = document.querySelectorAll(".rot-box textarea");
            let allText = "";
            texts.forEach(textarea => {
                const label = textarea.previousSibling.textContent;
                allText += `${label}\n${textarea.value}\n\n`;
            });

            navigator.clipboard.writeText(allText)
                .then(() => alert("All outputs copied to clipboard!"))
                .catch(err => alert("Copy failed: " + err));
        }

        function pasteRotText() {
            navigator.clipboard.readText()
                .then(text => {
                    document.getElementById("rotInput").value = text;
                })
                .catch(err => {
                    alert("Failed to read clipboard: " + err);
                });
        }

        function clearRotFields() {
            document.getElementById("rotInput").value = "";
            document.getElementById("rotOutputContainer").innerHTML = "";
        }
   