let caixaFormulario = document.querySelector("#pop-forms");
let fecharForms = document.querySelector("#fecharForms");
let nomeForms = document.querySelector("#forms-bolo-nome");
let precoForms = document.querySelector("#forms-bolo-preco");
let btnPersonalizar = document.querySelectorAll(".btnPersonalizar");
let pedidoForms = document.querySelector("#forms"); 
let boloAtual = null;

// Quando clica no botão "Personalizar" de qualquer card
btnPersonalizar.forEach((botao) => {
    botao.addEventListener("click", () => {
        boloAtual = botao;

        // 1. Acha o item do produto e o container da imagem correspondente ao botão clicado
        let produtoItem = boloAtual.closest('.produto-item');
        let caixaPersonalizavel = produtoItem.querySelector('.caixa-personalizavel');

        // 2. Move o formulário único para dentro da caixa do bolo atual
        caixaPersonalizavel.appendChild(caixaFormulario);

        // Puxa os dados dos atributos do botão
        let nome = boloAtual.getAttribute('data-nome');
        let preco = boloAtual.getAttribute('data-preco');

        if (nomeForms) {
            nomeForms.textContent = nome;
        }
        if (precoForms) {
            precoForms.textContent = `A partir de R$ ${preco}`;
        }

        // 3. Adiciona a classe para disparar a animação (deslizando da direita para a esquerda)
        caixaFormulario.classList.add('open');
        
    });
});

// Botão de fechar o formulário
if (fecharForms) {
    fecharForms.addEventListener("click", () => {
        caixaFormulario.classList.remove('open');
        boloAtual = null;
    });
};

// Envio do formulário (adicionando ao carrinho)
if (pedidoForms){
    pedidoForms.addEventListener("submit", (item) => {
        item.preventDefault();

        

        if (!boloAtual){
            return;
        }

        let precoTexto = boloAtual.getAttribute('data-preco');
        let precoNumerico = parseFloat(precoTexto.replace("R$", "").replace(",", ".").trim()) || 0;

        let produtoFormatado = {
            id : boloAtual.getAttribute('data-id'),
            tipo : boloAtual.getAttribute('data-tipo'),
            nome : boloAtual.getAttribute('data-nome'),
            preco : precoNumerico,
            img : boloAtual.getAttribute('data-img'),
            
            // Personalizações escolhidas
            massa : pedidoForms.elements['massa'].value,
            kg : pedidoForms.elements['kilos'].value,
            recheio : pedidoForms.elements['recheios'].value,
            quantidade: 1
        };

        carrinho.push(produtoFormatado);
        
        atualizarCarrinho();
        salvarDados();
        
        // Fecha o formulário e limpa
       
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${boloAtual.dataset.nome} foi adicionado com sucesso!`,
            showConfirmButton: false,
            timer: 1500
        });
        caixaFormulario.classList.remove('ativo');
        pedidoForms.reset();
        boloAtual = null;
    });
}