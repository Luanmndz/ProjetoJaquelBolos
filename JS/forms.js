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
};


if (pedidoForms) {
    pedidoForms.addEventListener("submit", (item) => {
        item.preventDefault();



        if (!boloAtual) {
            return;
        }

        let precoTexto = boloAtual.getAttribute('data-preco');
        let precoNumerico = parseFloat(precoTexto.replace("R$", "").replace(",", ".").trim()) || 0;

        let produtoFormatado = {
            id: boloAtual.getAttribute('data-id'),
            tipo: boloAtual.getAttribute('data-tipo'),
            nome: boloAtual.getAttribute('data-nome'),
            preco: precoNumerico,
            img: boloAtual.getAttribute('data-img'),

          
            massa: pedidoForms.elements['massa'].value,
            kg: pedidoForms.elements['kilos'].value,
            recheio: pedidoForms.elements['recheios'].value,
            quantidade: 1
        };

        carrinho.push(produtoFormatado);
        

        atualizarCarrinho();
        salvarDados();


        Swal.fire({
            toast: true,
            position: "bottom-end",
            icon: "success",
            title: `${boloAtual.dataset.nome} foi personalizado e adicionado!`,
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