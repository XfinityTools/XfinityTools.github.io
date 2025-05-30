
    function reverseUnits() {
        const from = document.getElementById("fromUnit");
    const to = document.getElementById("toUnit");
    const temp = from.value;
    from.value = to.value;
    to.value = temp;
    }



    const unitOptions = {
        length: ["meters", "kilometers", "miles", "feet", "inches", "centimeters"],
    mass: ["grams", "kilograms", "pounds", "ounces", "stones"],
    temperature: ["celsius", "fahrenheit", "kelvin"],
    speed: ["m/s", "km/h", "mph"],
    volume: ["liters", "milliliters", "gallons", "cups"],
    area: ["square meters", "square kilometers", "acres", "hectares"],
    time: ["seconds", "minutes", "hours", "days"]
    };

    function capitalizeWords(str) {
        return str
    .split(/[\s/]/g)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace("Km H", "Km/h")
    .replace("M S", "M/s")
    .replace("Mph", "Mph");
    }

    function populateUnits() {
        const type = document.getElementById("unitType").value;
    const from = document.getElementById("fromUnit");
    const to = document.getElementById("toUnit");

    from.innerHTML = "";
    to.innerHTML = "";

        unitOptions[type].forEach(unit => {
            const option1 = document.createElement("option");
    option1.value = unit;
    option1.text = capitalizeWords(unit);

    const option2 = document.createElement("option");
    option2.value = unit;
    option2.text = capitalizeWords(unit);

    from.appendChild(option1);
    to.appendChild(option2);
        });
    }

    function reverseUnits() {
        const from = document.getElementById("fromUnit");
    const to = document.getElementById("toUnit");
    const temp = from.value;
    from.value = to.value;
    to.value = temp;
    }

    function convertUnit() {
        const value = parseFloat(document.getElementById("inputValue").value);
    const from = document.getElementById("fromUnit").value;
    const to = document.getElementById("toUnit").value;
    const type = document.getElementById("unitType").value;
    const resultBox = document.getElementById("conversionResult");

    if (isNaN(value)) {
        resultBox.innerText = "Please enter a valid number.";
    return;
        }

    let result = 0;

    switch (type) {
            case "mass":
    result = convert(value, from, to, {
        grams: 1,
    kilograms: 1000,
    pounds: 453.592,
    ounces: 28.3495,
    stones: 6350.29
                });
    break;
    case "length":
    result = convert(value, from, to, {
        meters: 1,
    kilometers: 1000,
    miles: 1609.34,
    feet: 0.3048,
    inches: 0.0254,
    centimeters: 0.01
                });
    break;
    case "volume":
    result = convert(value, from, to, {
        liters: 1,
    milliliters: 0.001,
    gallons: 3.78541,
    cups: 0.24
                });
    break;
    case "speed":
    result = convert(value, from, to, {
        "m/s": 1,
    "km/h": 0.277778,
    "mph": 0.44704
                });
    break;
    case "area":
    result = convert(value, from, to, {
        "square meters": 1,
    "square kilometers": 1e6,
    acres: 4046.86,
    hectares: 10000
                });
    break;
    case "time":
    result = convert(value, from, to, {
        seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400
                });
    break;
    default:
    resultBox.innerText = "Conversion for this unit type is not yet implemented.";
    return;
        }

    resultBox.innerText = `${value} ${capitalizeWords(from)} = ${result.toFixed(4)} ${capitalizeWords(to)}`;
    }

    function convert(value, from, to, conversions) {
        if (!(from in conversions) || !(to in conversions)) return 0;
        return (value * conversions[from]) / conversions[to];
    }

    // Load units on page load
    window.onload = populateUnits;




document.getElementById('converterForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const inputUnit = document.getElementById('inputUnit').value;
    const outputUnit = document.getElementById('outputUnit').value;
    let result = 0;

    // Convert input to km/L first
    let kmpl = 0;
    switch (inputUnit) {
        case 'mpg':
            kmpl = inputValue * 0.425144; // 1 MPG ≈ 0.425144 km/L
            break;
        case 'kmpl':
            kmpl = inputValue;
            break;
        case 'l100km':
            kmpl = 100 / inputValue;
            break;
    }

    // Convert km/L to desired output
    switch (outputUnit) {
        case 'mpg':
            result = kmpl / 0.425144;
            break;
        case 'kmpl':
            result = kmpl;
            break;
        case 'l100km':
            result = 100 / kmpl;
            break;
    }

    document.getElementById('result').innerText = `Result: ${result.toFixed(2)} ${getUnitLabel(outputUnit)}`;
});

function getUnitLabel(unit) {
    switch (unit) {
        case 'mpg': return 'MPG';
        case 'kmpl': return 'km/L';
        case 'l100km': return 'L/100km';
    }
}



