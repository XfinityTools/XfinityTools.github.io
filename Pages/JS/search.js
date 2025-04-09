document.getElementById('searchInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const searchValue = this.value.toLowerCase();
        const cards = document.querySelectorAll('.card-dash');

        cards.forEach(function (card) {
            const id = card.id.toLowerCase();
            if (id.includes(searchValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    // Add event listener for Enter key on the search input
    document.getElementById('searchInput').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            searchCards();
        }
    });

    // Add click event listener to the search button
    document.getElementById("searchButton").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default button behavior
        searchCards(); // Trigger the same functionality as the Enter key
    });
});

// Function to search and filter sections (cards)
function searchCards() {
    // Get the search input value
    const searchValue = document.getElementById("searchInput").value.toLowerCase();

    // Find all the card elements
    const cards = document.querySelectorAll('.card-dash');

    // Loop through each card and show or hide based on the search value
    cards.forEach(function (card) {
        const id = card.id.toLowerCase();

        // Check if the card's ID includes the search value
        if (id.includes(searchValue)) {
            card.style.display = 'block'; // Show the card
        } else {
            card.style.display = 'none'; // Hide the card
        }
    });
}


