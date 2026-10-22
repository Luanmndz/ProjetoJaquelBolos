let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

document.addEventListener("DOMContentLoaded", () => {
    atualizarCarrinho();
    configurarEventosCarrinho();
});

// Configura os botões de adicionar produto (executado uma única vez)
document.querySelectorAll(".btnAdicionar").forEach((botao) => {
    botao.addEventListener("click", (e) => {
        let { id, tipo, nome, preco, img } = e.target.dataset;
        preco = parseFloat(preco);

        Swal.fire({
            toast: true,
            position: "bottom-end",
            icon: "success",
            title: `${nome} foi adicionado ao carrinho!`,
            showConfirmButton: false,
            timer: 2000,
            customClass: { popup: 'meu-toast-personalizado' },
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

    // Identifica se estamos na página inicial de forma segura
    let estamosNaIndex = window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');

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

        let botoesHTML = "";
        if (!estamosNaIndex) {
            botoesHTML = `
                <div class="botoes">
                    <button class="aumentarValor" data-id="${item.id}" aria-label="Aumentar quantidade">
                        <i class="bi bi-plus-circle-fill"></i>
                    </button>
                    <button class="diminuirValor" data-id="${item.id}" aria-label="Diminuir quantidade">
                        <i class="bi bi-dash-circle-fill"></i>
                    </button>
                    <button class="delete" data-id="${item.id}" aria-label="Remover item">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            `;
        }

        let caminhoCorrigido = item.img;
        if (estamosNaIndex) {
            caminhoCorrigido = caminhoCorrigido.replace(/^(\.\.\/)+/, '');
        } else {
            if (!caminhoCorrigido.startsWith('../') && !caminhoCorrigido.startsWith('http')) {
                caminhoCorrigido = '../' + caminhoCorrigido;
            }
        }

        itens.innerHTML += `
            <div class="pai-de-todos">
                <div class="item-carrinho"> 
                    <div class="conteudo-principal">
                        <div class="container-img">
                            <img src="${caminhoCorrigido}" class="img-produto" alt="${item.nome}"> 
                        </div>
                        <div class="info-item">
                            <span><strong>Nome:</strong> ${item.nome}</span>
                            <span><strong>Quantidade:</strong> ${item.quantidade}</span>
                            <span><strong>Preço:</strong> R$ ${subtotal.toFixed(2)}</span>
                            ${detalhesPersonalizados}
                        </div>
                    </div>
                    <div class="botoes-acao">
                        ${botoesHTML}
                    </div>
                </div>
            </div>
        `;
    });

    valorTotal.innerHTML = `<span> Valor Total: R$ ${total.toFixed(2)} </span>`;

    let totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    let contador = document.getElementById("contador-carrinho");
    if (contador) contador.innerHTML = totalItens;
}

// Configuração única de cliques usando Delegação de Eventos (Evita recriar listeners a cada atualização)
function configurarEventosCarrinho() {
    let itensContainer = document.querySelector(".itens-carrinho");
    if (!itensContainer) return;
    

    itensContainer.addEventListener("click", (e) => {
        e.stopPropagation();
        let botao = e.target.closest("button");
        if (!botao) return;

        let id = botao.dataset.id;

        if (botao.classList.contains("aumentarValor")) {
            let item = carrinho.find(i => i.id === id);
            if (item) item.quantidade++;
        } 
        else if (botao.classList.contains("diminuirValor")) {
            let item = carrinho.find(i => i.id === id);
            if (item) {
                if (item.quantidade > 1) {
                    item.quantidade--;
                } else {
                    carrinho = carrinho.filter(i => i.id !== id);
                }
            }
        } 
        else if (botao.classList.contains("delete")) {
            carrinho = carrinho.filter(i => i.id !== id);
        }

        atualizarCarrinho();
        salvarDados();
    });
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