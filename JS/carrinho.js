let carrinho = [];

let btn = document.querySelectorAll(".btnAdicionar");

btn.forEach((botao) => {
    botao.addEventListener("click", (e) => {

        console.log(carrinho)

        let id = e.target.dataset.id;
        let tipo = e.target.dataset.tipo;
        let nome = e.target.dataset.nome;
        let preco = e.target.dataset.preco;
        let img = e.target.dataset.img;

        let itemExistente = carrinho.find((item) => item.id)

        if (itemExistente){
            itemExistente++
        }
        else {
            carrinho.push (id, tipo, nome, preco, img);
        }

        atualizarCarrinho();
    });
   
});
// Ver o que ta dando errado 
function atualizarCarrinho() {
    let itens = document.querySelector(".itens-carrinho");

    itens.innerHTML = " ";
    carrinho.forEach((item) => {
        itens.innerHTML +=
        `
            <div class = "itens-carrinho"> 
                <img src = "${item.img}"> 
            </div> 
        `
    });
}