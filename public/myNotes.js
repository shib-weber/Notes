const menuToggle = document.querySelector('.menu-toggle');
const menuDropdown = document.querySelector('.menu-dropdown');

// Toggle the dropdown menu
menuToggle.addEventListener('click', () => {
    menuDropdown.style.display =
        menuDropdown.style.display === 'block' ? 'none' : 'block';
});

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!menuToggle.contains(event.target) && !menuDropdown.contains(event.target)) {
        menuDropdown.style.display = 'none';
    }
});
