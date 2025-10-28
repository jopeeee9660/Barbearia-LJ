// Configuração do carrossel de imagens
document.addEventListener('DOMContentLoaded', function() {
    const imagens = [
        "imagens/imagem1.jpg",
        "imagens/imagem2.jpg",
        "imagens/imagem3.jpg",
        "imagens/imagem4.jpg"
    ];

    let indiceAtual = 0;
    let intervaloCarrossel;

    // Função para trocar imagens do carrossel
    window.trocarImagem = function(direcao) {
        clearInterval(intervaloCarrossel);
        indiceAtual = (indiceAtual + direcao + imagens.length) % imagens.length;
        const img = document.querySelector(".janela-imagem img");
        
        if (img) {
            img.style.opacity = "0";
            setTimeout(() => {
                img.src = imagens[indiceAtual];
                img.style.opacity = "1";
            }, 200);
        }
        
        iniciarCarrosselAutomatico();
    };

    // Inicia o carrossel automático
    function iniciarCarrosselAutomatico() {
        if (intervaloCarrossel) {
            clearInterval(intervaloCarrossel);
        }
        intervaloCarrossel = setInterval(() => trocarImagem(1), 5000);
    }

    // Inicializa o carrossel
    iniciarCarrosselAutomatico();

    // Adiciona event listeners para os botões do carrossel
    document.querySelector('.seta-esquerda')?.addEventListener('click', () => trocarImagem(-1));
    document.querySelector('.seta-direita')?.addEventListener('click', () => trocarImagem(1));
});