const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Toggle password visibility
const togglePassword = document.querySelector('#togglePassword');
const passwordField = document.querySelector('#password');
const messageBox = document.querySelector('#message');
const form = document.querySelector('#loginForm');

togglePassword.addEventListener('click', () => {
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
    togglePassword.textContent = type === 'password' ? '👁️' : '🙈'; // Toggle icon
});

