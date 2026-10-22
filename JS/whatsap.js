function envioParaZap() {
    let numero = "5511958904493";

    if (carrinho.length === 0) {
        if (typeof popUp !== 'undefined' && popUp) {
            popUp.classList.remove("ativo");
        }
        return;
    }

    let mensagem = ` *NOVO PEDIDO - JAQUEL BOLOS*\n`;
    mensagem += `----------------------------------------\n\n`;
    mensagem += `*Itens do pedido:*\n\n`;

    let valorTotalZap = 0;

    carrinho.forEach((item, index) => {
        let subtotalZap = item.preco * item.quantidade;
        valorTotalZap += subtotalZap;

        mensagem += `*${index + 1}. ${item.nome}*\n`;
        
        if (item.massa) {
            mensagem += `Massa: ${item.massa}\n`;
        }
        if (item.kg) {
            mensagem += `Tamanho: ${item.kg}\n`;
        }
        if (item.recheio) {
            mensagem += `Recheio: ${item.recheio}\n`;
        }

        mensagem += `Qtd: ${item.quantidade}x\n`;
        mensagem += `Subtotal: R$ ${subtotalZap.toFixed(2)}\n\n`;
    });

    mensagem += `----------------------------------------\n`;
    mensagem += ` *Valor Total do Pedido:* R$ ${valorTotalZap.toFixed(2)}\n`;
    mensagem += `----------------------------------------\n`;
    mensagem += `_Pedido realizado através do site oficial._`;

    let mensagemFinal = encodeURIComponent(mensagem);
    let whatsappUrl = `https://wa.me/${numero}?text=${mensagemFinal}`;
    
    window.open(whatsappUrl, "_blank");
}

let btnFinalizar = document.querySelector(".btnFinalizar");
if (btnFinalizar) {
    btnFinalizar.addEventListener("click", envioParaZap);
}