function capitalizeAllLetters(event) {
    // Check if the Enter key was pressed (key code 13)
    if (event.keyCode === 13) {
      // Prevent the form from submitting
      event.preventDefault();

      // Get the input value
      const input = document.getElementById('inputField').value;

      // Capitalize all letters
      const capitalizedInput = input.toUpperCase();

      // Display the capitalized result
      document.getElementById('result').textContent = capitalizedInput;
    }

}function convertToCamelCase() {
    // Get the input value
    const sentence = document.getElementById('inputField').value;

    // Convert the sentence to camel case
    const words = sentence.toLowerCase().split(" ");
    for (let i = 1; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    const camelCaseSentence = words.join("");

    // Display the camel case result
    document.getElementById('result').textContent = camelCaseSentence;
  }

  function handleKeyPress(event) {
    // Check if the Enter key was pressed (key code 13)
    if (event.key === "Enter") {
      event.preventDefault();
      convertToCamelCase();
    }
  }
