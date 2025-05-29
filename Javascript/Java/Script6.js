
    const units = {
        length: ["Meter", "Kilometer", "Centimeter", "Millimeter", "Mile", "Yard", "Foot", "Inch"],
    mass: ["Gram", "Kilogram", "Milligram", "Pound", "Ounce"],
    temperature: ["Celsius", "Fahrenheit", "Kelvin"],
    speed: ["Meters/Second", "Kilometers/Hour", "Miles/Hour", "Knots"],
    volume: ["Liter", "Milliliter", "Cubic Meter", "Gallon (US)", "Pint (US)"],
    area: ["Square Meter", "Square Kilometer", "Square Foot", "Square Yard", "Acre", "Hectare"],
    time: ["Second", "Minute", "Hour", "Day"]
        };

    const conversionRates = {
        length: {
        Meter: 1,
    Kilometer: 0.001,
    Centimeter: 100,
    Millimeter: 1000,
    Mile: 0.000621371,
    Yard: 1.09361,
    Foot: 3.28084,
    Inch: 39.3701
            },
    mass: {
        Gram: 1,
    Kilogram: 0.001,
    Milligram: 1000,
    Pound: 0.00220462,
    Ounce: 0.035274
            },
    speed: {
        "Meters/Second": 1,
    "Kilometers/Hour": 3.6,
    "Miles/Hour": 2.23694,
    "Knots": 1.94384
            },
    volume: {
        Liter: 1,
    Milliliter: 1000,
    "Cubic Meter": 0.001,
    "Gallon (US)": 0.264172,
    "Pint (US)": 2.11338
            },
    area: {
        "Square Meter": 1,
    "Square Kilometer": 0.000001,
    "Square Foot": 10.7639,
    "Square Yard": 1.19599,
    Acre: 0.000247105,
    Hectare: 0.0001
            },
    time: {
        Second: 1,
    Minute: 1 / 60,
    Hour: 1 / 3600,
    Day: 1 / 86400
            }
        };

    function populateUnits() {
            const type = document.getElementById("unitType").value;
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");
    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";
            units[type].forEach(unit => {
        fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
    toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
            });
        }

    function convertUnit() {
            const type = document.getElementById("unitType").value;
    const value = parseFloat(document.getElementById("inputValue").value);
    const from = document.getElementById("fromUnit").value;
    const to = document.getElementById("toUnit").value;

    let result;

    if (type === "temperature") {
        result = convertTemperature(value, from, to);
            } else {
                const baseValue = value / conversionRates[type][from];
    result = baseValue * conversionRates[type][to];
            }

    document.getElementById("conversionResult").innerText = `${value} ${from} = ${result.toFixed(4)} ${to}`;
        }

    function convertTemperature(value, from, to) {
            if (from === to) return value;

    if (from === "Fahrenheit") value = (value - 32) * 5 / 9;
    else if (from === "Kelvin") value -= 273.15;

    if (to === "Fahrenheit") return value * 9 / 5 + 32;
    else if (to === "Kelvin") return value + 273.15;

    return value;
        }

    window.onload = populateUnits;