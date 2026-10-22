const hamburger = document.querySelector('.menu-hamburguer');
const menuLinks = document.querySelector('.menu-links');
const links = document.querySelectorAll('.link-navbar');

// Abre/fecha o menu ao clicar no botão hambúrguer
hamburger.addEventListener('click', () => {
    menuLinks.classList.toggle('ativo');
});


links.forEach(link => {
    link.addEventListener('click', () => {
        menuLinks.classList.remove('ativo');
    });
});

