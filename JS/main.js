// botao de subir
window.addEventListener('scroll', () => {
    let botao = document.getElementById("btnSubir");
    if (!botao) return;

    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        botao.style.display = "block";
    } else {
        botao.style.display = "none";
    }
});

function subirSuave() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
// parte da responsividade
const hamburger = document.querySelector('.menu-hamburguer');
const menuLinks = document.querySelector('.menu-links');
const links = document.querySelectorAll('.link-navbar');

if (hamburger && menuLinks) {
    hamburger.addEventListener('click', () => {
        menuLinks.classList.toggle('ativo');
        hamburger.classList.toggle('ativo'); 
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menuLinks.classList.remove('ativo');
            hamburger.classList.remove('ativo');
        });
    });

    document.addEventListener('click', (e) => {
        if (!menuLinks.contains(e.target) && !hamburger.contains(e.target)) {
            menuLinks.classList.remove('ativo');
            hamburger.classList.remove('ativo');
        }
    });
}