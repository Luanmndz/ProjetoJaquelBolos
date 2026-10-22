let caixaFormulario = document.querySelector("#pop-forms");
let fecharForms = document.querySelector("#fecharForms");
let nomeForms = document.querySelector("#forms-bolo-nome");
let precoForms = document.querySelector("#forms-bolo-preco");
let btnPersonalizar = document.querySelectorAll(".btnPersonalizar");
let pedidoForms = document.querySelector("#forms");
let boloAtual = null;

btnPersonalizar.forEach((botao) => {
    botao.addEventListener("click", () => {
        boloAtual = botao;

        let produtoItem = boloAtual.closest('.produto-item');
        let caixaPersonalizavel = produtoItem.querySelector('.caixa-personalizavel');

        // Move o formulário para dentro da caixa do produto
        caixaPersonalizavel.appendChild(caixaFormulario);

        let nome = boloAtual.getAttribute('data-nome');
        let preco = boloAtual.getAttribute('data-preco');

        if (nomeForms) {
            nomeForms.textContent = nome;
        }
        if (precoForms) {
            precoForms.textContent = `A partir de R$ ${preco}`;
        }

        caixaFormulario.classList.add('open');
    });
});

if (fecharForms) {
    fecharForms.addEventListener("click", () => {
        caixaFormulario.classList.remove('open');
        boloAtual = null;
    });
}

if (pedidoForms) {
    pedidoForms.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!boloAtual) return;

        let precoTexto = boloAtual.getAttribute('data-preco');
        let precoNumerico = parseFloat(String(precoTexto).replace("R$", "").replace(",", ".").trim()) || 0;

        let id = boloAtual.getAttribute('data-id');
        let tipo = boloAtual.getAttribute('data-tipo');
        let nome = boloAtual.getAttribute('data-nome');
        let img = boloAtual.getAttribute('data-img');
        
        let massa = pedidoForms.elements['massa'].value;
        let kg = pedidoForms.elements['kilos'].value;
        let recheio = pedidoForms.elements['recheios'].value;

        // Verifica se já existe um item igual no carrinho
        let itemExistente = carrinho.find((item) => 
            item.id === id && 
            item.massa === massa && 
            item.kg === kg && 
            item.recheio === recheio
        );

        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            let produtoFormatado = {
                id,
                tipo,
                nome,
                preco: precoNumerico,
                img,
                massa,
                kg,
                recheio,
                quantidade: 1
            };
            carrinho.push(produtoFormatado);
        }

        atualizarCarrinho();
        salvarDados();

        Swal.fire({
            toast: true,
            position: "bottom-end",
            icon: "success",
            title: `${nome} foi personalizado e adicionado!`,
            showConfirmButton: false,
            timer: 2000,
            customClass: {
                popup: 'meu-toast-personalizado'
            },
            background: "#603B25",
            color: "#F4F4F4",
            iconColor: "#FDFAB5"
        });

        caixaFormulario.classList.remove('open');
        pedidoForms.reset();
        boloAtual = null;
    });
}