let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

document.addEventListener("DOMContentLoaded", () => {
    atualizarCarrinho();
});

let btn = document.querySelectorAll(".btnAdicionar");

btn.forEach((botao) => {
    botao.addEventListener("click", (e) => {
        let id = e.target.dataset.id;
        let tipo = e.target.dataset.tipo;
        let nome = e.target.dataset.nome;
        let preco = parseFloat(e.target.dataset.preco);
        let img = e.target.dataset.img;

        Swal.fire({
            toast: true,
            position: "bottom-end",
            icon: "success",
            title: `${nome} foi adicionado ao carrinho!`,
            showConfirmButton: false,
            timer: 2000,
            customClass: {
                popup: 'meu-toast-personalizado'
            },
            background: "#603B25",
            color: "#F4F4F4",
            iconColor: "#FDFAB5"
        });

        let itemExistente = carrinho.find((item) => item.id === id);

        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            carrinho.push({ id, tipo, nome, preco, img, quantidade: 1 });
        }

        atualizarCarrinho();
        salvarDados();
    });
});

function atualizarCarrinho() {
    let itens = document.querySelector(".itens-carrinho");
    let valorTotal = document.querySelector(".valorTotal");
    let btnFinalizar = document.querySelector(".btnFinalizar");
    
    if (!itens) return; 
    let total = 0;
    itens.innerHTML = "";

    if (carrinho.length === 0) {
        valorTotal.style.display = "none";
        btnFinalizar.innerHTML = "Comece seu Pedido";
    } else {
        valorTotal.style.display = "block";
        btnFinalizar.innerHTML = "Finalize seu pedido <i class='bi bi-whatsapp'></i>";
    }

    // Identifica se estamos na página inicial (index.html ou raiz)
    let estamosNaIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');

    carrinho.forEach((item) => {
        let subtotal = item.preco * item.quantidade;
        total += subtotal;

        let detalhesPersonalizados = "";
        if (item.massa || item.recheio || item.kg) {
            detalhesPersonalizados = `
                <br><span> Personalizações: </span>
                <span><strong>Massa:</strong> ${item.massa || 'Padrão'}</span>
                <span><strong>Recheio:</strong> ${item.recheio || 'Padrão'}</span>
                <span><strong>Kg:</strong> ${item.kg || '1kg'}</span>
            `;
        }

        // Se estiver na index, os botões ficam vazios. Se estiver no cardápio, exibe os botões de edição.
        let botoesHTML = "";
        if (!estamosNaIndex) {
            botoesHTML = `
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
            `;
        }

        // Corrige o caminho da imagem dependendo de onde o carrinho está sendo aberto
        let caminhoCorrigido = item.img;
        if (estamosNaIndex) {
            caminhoCorrigido = caminhoCorrigido.replace(/^(\.\.\/)+/, '');
        } else {
            if (!caminhoCorrigido.startsWith('../') && !caminhoCorrigido.startsWith('http')) {
                caminhoCorrigido = '../' + caminhoCorrigido;
            }
        }

        itens.innerHTML += `
            <div class="item-carrinho"> 
                <div class="container-img">
                    <img src="${caminhoCorrigido}" class="img-produto" alt="${item.nome}"> 
                </div>

                <div class="info-item">
                    <span><strong>Nome:</strong> ${item.nome}</span>
                    <span><strong>Quantidade:</strong> ${item.quantidade}</span>
                    <span><strong>Preço:</strong> R$ ${subtotal.toFixed(2)}</span>
                    ${detalhesPersonalizados}
                </div>

                ${botoesHTML}
            </div>
        `;
    });

    valorTotal.innerHTML = `<div class="valorTotal"><span> Valor Total: R$ ${total.toFixed(2)} </span></div>`;

    let totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    let contador = document.getElementById("contador-carrinho");
    if (contador) contador.innerHTML = totalItens;

    // Só adiciona os eventos de clique nos botões se eles existirem na página atual
    if (!estamosNaIndex) {
        // Botão de Aumentar
        document.querySelectorAll(".aumentarValor").forEach((botao) => {
            botao.addEventListener("click", (e) => {
                e.stopPropagation();
                let botaoReal = e.target.closest("button");
                let id = botaoReal.dataset.id;
                let itemEncontrado = carrinho.find((item) => item.id === id);

                if (itemEncontrado) {
                    itemEncontrado.quantidade++;
                }
                atualizarCarrinho();
                salvarDados();
            });
        });

        // Botão de Diminuir
        document.querySelectorAll(".diminuirValor").forEach((botao) => {
            botao.addEventListener("click", (e) => {
                e.stopPropagation();
                let botaoReal = e.target.closest("button");
                let id = botaoReal.dataset.id;
                let itemRemover = carrinho.find((item) => item.id === id);

                if (itemRemover) {
                    if (itemRemover.quantidade > 1) {
                        itemRemover.quantidade--;
                    } else {
                        carrinho = carrinho.filter((item) => item.id !== id);
                    }
                }
                atualizarCarrinho();
                salvarDados();
            });
        });

        // Botão de Excluir
        document.querySelectorAll(".delete").forEach((botao) => {
            botao.addEventListener("click", (e) => {
                e.stopPropagation();
                let botaoReal = e.target.closest("button");
                let idRemover = botaoReal.dataset.id;

                carrinho = carrinho.filter((item) => item.id !== idRemover);

                atualizarCarrinho();
                salvarDados();
            });
        });
    }
}

// Controle de abrir/fechar o pop-up do carrinho
let btnCarrinho = document.getElementById("btn-carrinho");
let popUp = document.getElementById("pop-up");

if (btnCarrinho && popUp) {
    btnCarrinho.addEventListener("click", (e) => {
        e.stopPropagation();
        popUp.classList.toggle("ativo");
    });

    document.addEventListener("click", (e) => {
        if (!popUp.contains(e.target) && !btnCarrinho.contains(e.target)) {
            popUp.classList.remove("ativo");
        }
    });
}

function salvarDados() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}