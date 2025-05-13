
    // Search function to filter cards by section ID
    function searchCards() {
        const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll('.card-dash');

    cards.forEach(function (card) {
            const id = card.id.toLowerCase();
    card.style.display = id.includes(searchValue) ? 'block' : 'none';
        });
    }

    // Run when DOM is ready
    document.addEventListener("DOMContentLoaded", function () {
        const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    // Listen for Enter key on input
    searchInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
        searchCards();
            }
        });

    // Listen for search button click
    searchButton.addEventListener('click', function (event) {
        event.preventDefault();
    searchCards();
        });
    });

