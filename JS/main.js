// Controla a visibilidade do botão de subir ao topo com base no scroll
window.onscroll = function() {
    var botao = document.getElementById("btnSubir");
    if (!botao) return;
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        botao.style.display = "block";
    } else {
        botao.style.display = "none";
    }
};

// Função de animação suave para voltar ao topo
let animacaoScroll;
function subirSuave() {
    const posicaoAtual = document.documentElement.scrollTop || document.body.scrollTop;

    if (posicaoAtual < 1) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        cancelAnimationFrame(animacaoScroll);
        return; 
    }

    window.scrollTo({ top: posicaoAtual - posicaoAtual / 14, behavior: 'instant' });
    animacaoScroll = window.requestAnimationFrame(subirSuave);
}

window.addEventListener('wheel', () => cancelAnimationFrame(animacaoScroll));
window.addEventListener('touchmove', () => cancelAnimationFrame(animacaoScroll));