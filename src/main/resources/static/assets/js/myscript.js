function toggleDropdown() {
    const dropdown = document.getElementById('dropdownMenu');
    const isVisible = dropdown.style.visibility === 'visible';
    dropdown.style.visibility = isVisible ? 'hidden' : 'visible';
    dropdown.style.opacity = isVisible ? '0' : '1';
}

// // Close dropdown if clicking outside of it
window.onclick = function(event) {
    const dropdownButton = document.querySelector('.profileCircle');
    const dropdownMenu = document.getElementById('dropdownMenu');

    if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        // Hide dropdown
        dropdownMenu.style.visibility = 'hidden';
        dropdownMenu.style.opacity = '0';
    }
}
