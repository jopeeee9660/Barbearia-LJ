let imagens = ["imagem1.jpg", "imagem2.jpg", "imagem3.jpg"];
let indiceAtual = 0;

function trocarImagem(direcao) {
    indiceAtual += direcao;
    
    if (indiceAtual < 0) {
        indiceAtual = imagens.length - 1;
    } else if (indiceAtual >= imagens.length) {
        indiceAtual = 0;
    }

    document.getElementById("imagem-principal").src = imagens[indiceAtual];
}
