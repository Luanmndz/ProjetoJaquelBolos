function envioParaZap() {

    let numero = "5511958904493";

    if (carrinho.length === 0)
        {
        popUp.classList.remove("ativo");

        return;
        }

    let mensagem = `*Pedido via WebSite*\n`;
    mensagem += `*Itens do pedido:*\n\n`

    let valorTotalZap = 0;

    carrinho.forEach((item) => {
        let subtotalZap = item.preco * item.quantidade;
        valorTotalZap += subtotalZap;

        mensagem += `Nome: *${item.nome}*\n`
        mensagem += `Qtd. *${item.quantidade}x*\n`
        mensagem += `Preço. *R$${item.preco.toFixed(2)}*\n\n`
    });

    mensagem += `*Valor total do Pedido:* ${valorTotalZap.toFixed(2)}\n\n`;

    let mensagemfinal = encodeURIComponent(mensagem);

    let whatsap = `https://wa.me/${numero}?text=${mensagemfinal}`;
    window.open(whatsap, "_blank");
    
}

document.querySelector(".btnFinalizar").addEventListener("click", envioParaZap);