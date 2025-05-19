
    // Wait until Firebase finishes loading the tools
    let allTools = []; // Store all tools here globally

    // Modified fetch with storage
    db.collection("Tools").get().then((querySnapshot) => {
        if (querySnapshot.empty) {
        toolsRow.innerHTML = "<p>No tools found.</p>";
        } else {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            allTools.push(data); // Store for later searching
            renderTool(data);    // Show initially
        });
        }
    }).catch((error) => {
        console.error("Error fetching documents: ", error);
    toolsRow.innerHTML = "<p>Error loading tools. Please try again later.</p>";
    });

    // Reusable function to render a tool
    function renderTool(data) {
        const toolSection = document.createElement("section");
    toolSection.className = "col-md-4 card-dash";
    toolSection.id = data["Tool-ID"] || "";

    toolSection.innerHTML = `
    <div>
        <img src="../../Images/Untitled design.png" alt="XfinityLogo" width="20">
    </div>
    <h2>${data["Tool-Name"]}</h2>
    <p class="Tool-Description">${data["Tool-Description"]}</p>
    <br />
    <p class="Tool-URL">
        <a class="btn btn-default" href="${data.URL}">Use &raquo;</a>
    </p>
    `;

    toolsRow.appendChild(toolSection);
    }

    // Search logic
    document.getElementById("searchButton").addEventListener("click", function () {
        const searchValue = document.getElementById("searchInput").value.trim().toLowerCase();

    toolsRow.innerHTML = ""; // Clear current display

    if (searchValue === "") {
        allTools.forEach(tool => renderTool(tool)); // Show all if search is empty
        } else {
            const filtered = allTools.filter(tool =>
    (tool["Tool-Name"] || "").toLowerCase().includes(searchValue) ||
    (tool["Tool-Description"] || "").toLowerCase().includes(searchValue)
    );

    if (filtered.length === 0) {
        toolsRow.innerHTML = "<p>No matching tools found.</p>";
            } else {
        filtered.forEach(tool => renderTool(tool));
            }
        }
    });

    // Allow pressing Enter in the input to search
    document.getElementById("searchInput").addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
        document.getElementById("searchButton").click();
        }
    });
