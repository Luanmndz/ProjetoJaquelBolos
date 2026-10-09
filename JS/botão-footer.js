window.onscroll = function() {
    var botao = document.getElementById("btnSubir");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        botao.style.display = "block";
    } else {
        botao.style.display = "none";
    }
};
