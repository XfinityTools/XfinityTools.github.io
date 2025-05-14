function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Use 24-hour format
    });
    document.getElementById('currentDateTime').textContent = `${date}, ${time}`;
}

// Update the date and time immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);