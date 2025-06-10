let imagens = [
  "imagens/imagem1.jpg",
  "imagens/imagem2.jpg",
  "imagens/imagem3.jpg",
  "imagens/imagem4.jpg",
  "imagens/imagem5.jpg"
];

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

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('active');
}

const traducoes = {
  pt: {
    titulo: "Bem-vindo ao Meu Site",
    inicio: "Início",
    "inicio-texto": "Bem-vindo ao nosso site! Explore nossos serviços e descubra o que podemos fazer por você.",
    sobre: "Sobre",
    "sobre-texto": "Somos uma empresa focada em qualidade e inovação.",
    contato: "Contato",
    "contato-texto": "Fale conosco para saber mais!",
    pesquisa: "Pesquise serviços ou empresas",
    onde: "Onde?",
    quando: "Quando?",
    "botao-entrar": "Entrar"
  },
  en: {
    titulo: "Welcome to My Website",
    inicio: "Home",
    "inicio-texto": "Welcome to our site! Explore our services and discover what we can do for you.",
    sobre: "About",
    "sobre-texto": "We are a company focused on quality and innovation.",
    contato: "Contact",
    "contato-texto": "Contact us to learn more!",
    pesquisa: "Search for services or companies",
    onde: "Where?",
    quando: "When?",
    "botao-entrar": "Login"
  },
  es: {
    titulo: "Bienvenido a Mi Sitio Web",
    inicio: "Inicio",
    "inicio-texto": "¡Bienvenido a nuestro sitio! Explora nuestros servicios y descubre lo que podemos hacer por ti.",
    sobre: "Sobre Nosotros",
    "sobre-texto": "Somos una empresa enfocada en la calidad e innovación.",
    contato: "Contacto",
    "contato-texto": "¡Contáctanos para saber más!",
    pesquisa: "Buscar servicios o empresas",
    onde: "¿Dónde?",
    quando: "¿Cuándo?",
    "botao-entrar": "Entrar"
  }
};

function trocarIdioma(idioma) {
  const texto = traducoes[idioma];
  for (let chave in texto) {
    const elemento = document.getElementById(chave);
    if (elemento) {
      if (elemento.tagName === "INPUT") {
        elemento.placeholder = texto[chave];
      } else if (elemento.tagName === "BUTTON") {
        elemento.textContent = texto[chave];
      } else {
        elemento.textContent = texto[chave];
      }
    }
  }
}
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const btn = document.querySelector('.btn-menu');
  sidebar.classList.toggle('active');
  btn.textContent = sidebar.classList.contains('active') ? "✖" : "☰";
}

document.getElementById("botao-entrar").addEventListener("click", function () {
  window.location.href = "login/login.html";
});