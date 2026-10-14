function envioParaZap() {
    let numero = "5511958904493";

    if (carrinho.length === 0)
        {
        popUp.classList.remove("ativo");

        return;
        }

    let valorTotalZap = 0;
    let mensagem = ""; 

    carrinho.forEach((item) => {
    let subtotalZap = item.preco * item.quantidade;
    valorTotalZap += subtotalZap;
    mensagem += `*Itens do Pedido - Via WebSite*\n`
    mensagem += `Nome: *${item.nome}*\n`;
    mensagem += `Qtd: *${item.quantidade}x*\n`;
    mensagem += `Preço: *R$ ${item.preco.toFixed(2)}*\n`;

    
    if (item.massa || item.kg || item.recheio) {
        mensagem += `*Personalizações:*\n`;
        if (item.massa)   mensagem += `- Massa: ${item.massa}\n`;
        if (item.kg)      mensagem += `- Tamanho: ${item.kg}kg\n`;
        if (item.recheio) mensagem += `- Recheio: ${item.recheio}\n`;
        console.log(item.recheio)
    }

    mensagem += `\n`; 
});

mensagem += `*Valor Total: R$ ${valorTotalZap.toFixed(2)}*`;

    mensagem += `*Valor total do Pedido:* ${valorTotalZap.toFixed(2)}\n\n`;

    let mensagemfinal = encodeURIComponent(mensagem);

    let whatsap = `https://wa.me/${numero}?text=${mensagemfinal}`;
    window.open(whatsap, "_blank");
    console.log(mensagemfinal)
}

document.querySelector(".btnFinalizar").addEventListener("click", envioParaZap);