const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

document.querySelector('#getstartbtn').addEventListener('click',()=>{
    console.log('clicked')
    window.location.href='/signup'
})
console.log(getstartbtn)