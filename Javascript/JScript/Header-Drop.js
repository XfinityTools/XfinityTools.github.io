document.addEventListener("DOMContentLoaded", function () {
    const tools = [
        { name: "Ad Revenue Estimater", value: "/Pages/Ad-Revenue-Estimator" },
        { name: "Base Converter", value: "/Pages/Base-Converter" },
        { name: "BMI Converter", value: "/Pages/BMI-Calculator" },
        { name: "Car Loan Calculator", value: "/Pages/Car-Loan-Calculator" },
        { name: "CSV To Excel", value: "/Pages/CSV-to-Excel" },
        { name: "Excel to PDF", value: "/Pages/Excel-PDF" },
        { name: "Key Generator", value: "/Pages/Key-Generator" },
        { name: "PNG to JPEG", value: "/Pages/Png-Jpeg" },
        { name: "Slug Generator", value: "/Pages/Slug-Generator" },
        { name: "Text To JSON", value: "/Pages/Text-To-JSON" },
        { name: "Unit Converter", value: "/Pages/Unit-Converter" },
        { name: "WEBP To PNG", value: "/Pages/WebP-Png" },
        { name: "WEBP To PDF", value: "/Pages/WebP-to-PDF" },
        { name: "YAML to JSON", value: "/Pages/YAML-to-JSON" }
    ];

    const container = document.getElementById("dropdown-container");

    if (!container) return; // Avoid errors if container is missing

    const div = document.createElement("div");
    div.className = "dropdown";

    const select = document.createElement("select");
    select.className = "dropheader";
    select.name = "tools";
    select.id = "tools";
    select.addEventListener("change", function () {
        const value = this.value;
        if (value) {
            window.location.href = value;
        }
    });

    const defaultOption = document.createElement("option");
    defaultOption.style.color = "black";
    defaultOption.value = "";
    defaultOption.textContent = "More Tools";
    select.appendChild(defaultOption);

    tools.forEach(tool => {
        const option = document.createElement("option");
        option.style.color = "black";
        option.value = tool.value;
        option.textContent = tool.name;
        select.appendChild(option);
    });

    div.appendChild(select);
    container.appendChild(div);
});
