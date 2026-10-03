let carrinho = [];
let btn = document.querySelectorAll(".btnAdicionar");

btn.forEach((botao) => {
    botao.addEventListener("click", (e) => {

        console.log(carrinho)

        let id = e.target.dataset.id;
        let tipo = e.target.dataset.tipo;
        let nome = e.target.dataset.nome;
        let preco = parseFloat(e.target.dataset.preco);
        let img = e.target.dataset.img;

        let itemExistente = carrinho.find((item) => item.id === id)

        if (itemExistente) {
            itemExistente.quantidade++
        }
        else {
            carrinho.push({ id, tipo, nome, preco, img, quantidade: 1 });
        }

        atualizarCarrinho();

    });
});

function atualizarCarrinho() {
    let itens = document.querySelector(".itens-carrinho");
    let valorTotal = document.querySelector(".valorTotal");
    let btnFinalizar = document.querySelector(".btnFinalizar");
    let total = 0;

    itens.innerHTML = " ";

    if (carrinho.length === 0) 
        {
            valorTotal.style.display = "none";
            btnFinalizar.innerHTML = "Comece seu Pedido";
            
        }
    else 
        {
            valorTotal.style.display = "block"
            btnFinalizar.innerHTML = "Finalize seu pedido <i class='bi bi-whatsapp'></i>"
        }

    carrinho.forEach((item) => {

        let subtotal = item.preco * item.quantidade;
        total = subtotal + total;

        itens.innerHTML +=
            `
                <div class="item-carrinho"> 
                    <div class="container-img">

                        <img src="${item.img}" class="img-produto" alt="${item.nome}"> 

                    </div>

                    <div class="info-item">

                        <span><strong>Nome:</strong> ${item.nome}</span>

                        <span><strong>Quantidade:</strong> ${item.quantidade}</span>

                        <span><strong>Preço:</strong> R$ ${subtotal.toFixed(2)}</span>

                    </div>

                    <div class="botoes">

                        <button class="aumentarValor" data-id="${item.id}">
                            <i class="bi bi-plus-circle-fill"></i>
                        </button>

                        <button class="diminuirValor" data-id="${item.id}">
                            <i class="bi bi-dash-circle-fill"></i>
                        </button>

                        <button class="delete" data-id="${item.id}">
                            <i class="bi bi-trash3"></i>
                        </button>

                    </div>
                </div>
            `
    });
// area de valores dinamicos (valor total e contador do carrinho:))
    valorTotal.innerHTML = `<div class = "valorTotal"><span> Valor Total: R$ ${total.toFixed(2)} </span></div>`


    let totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
        document.getElementById("contador-carrinho").innerHTML = totalItens


    // Botao de Aumentar
    let btnAdd = document.querySelectorAll(".aumentarValor");

    btnAdd.forEach((botao) => {
        botao.addEventListener("click", (e) => {
            let itemExistente = e.target.dataset.id;

            let itemEncontrado = carrinho.find((item) => item.id === itemExistente);

            if (itemEncontrado) {
                itemEncontrado.quantidade++;
            }

            atualizarCarrinho();
        });
    });

    // Botao de Diminuir
    let btnDimui = document.querySelectorAll(".diminuirValor");

    btnDimui.forEach((botao) => {
        botao.addEventListener("click", (e) => {
            let itemExistente = e.target.dataset.id;

            let itemRemover = carrinho.find((item) => item.id === itemExistente);

            if (itemRemover){
                if (itemRemover.quantidade > 1) {
                    itemRemover.quantidade--
                }
                else {
                carrinho = carrinho.filter((item) => item.id !== itemExistente);
                }
            }
                atualizarCarrinho();
        });
    });

    // Botao de Excluir
    let btnDelete = document.querySelectorAll(".delete");

    btnDelete.forEach((botao) => {
        botao.addEventListener("click", (e) => {
            let idRemover = e.target.dataset.id;

            carrinho = carrinho.filter((item) => item.id !== idRemover);

            atualizarCarrinho();
        })
    })
}

// para fechar o pop se clicar no carrinho ou fora do pop
let btnCarrinho = document.getElementById("btn-carrinho");
let popUp = document.getElementById("pop-up");

btnCarrinho.addEventListener("click", (e) => {
    e.stopPropagation();
    popUp.classList.toggle("ativo");
});

document.addEventListener("click", (e) => {

    let botaoAcao = e.target.closest('.aumentarValor, .diminuirValor, .delete');

    if (botaoAcao) {
        return;
    }

    if (!popUp.contains(e.target) && !btnCarrinho.contains(e.target)) {
        popUp.classList.remove("ativo");
    }
})

document.addEventListener("DOMContentLoaded", atualizarCarrinho)