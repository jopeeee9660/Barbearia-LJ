// Verificar autenticação e inicializar funcionalidades
if (!window.auth) {
    window.auth = {
        checkAuth: function() {
            return localStorage.getItem('logado') === 'true';
        },
        logout: function() {
            localStorage.removeItem('logado');
            window.location.href = 'login/login.html';
        }
    };
}

if (!auth.checkAuth()) {
    window.location.href = "login/login.html";
}

// Configuração do carrossel de imagens
let imagens = [
    "imagens/imagem1.jpg",
    "imagens/imagem2.jpg",
    "imagens/imagem3.jpg",
    "imagens/imagem4.jpg"
];

let indiceAtual = 0;
let intervaloCarrossel;

function trocarImagem(direcao) {
    clearInterval(intervaloCarrossel);
    indiceAtual += direcao;
    if (indiceAtual < 0) {
        indiceAtual = imagens.length - 1;
    } else if (indiceAtual >= imagens.length) {
        indiceAtual = 0;
    }
    const imgElement = document.getElementById("imagem-principal");
    if (imgElement) {
        imgElement.src = imagens[indiceAtual];
    }
    iniciarCarrosselAutomatico();
}

function iniciarCarrosselAutomatico() {
    intervaloCarrossel = setInterval(() => {
        trocarImagem(1);
    }, 5000);
}

// Controle da sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const btn = document.querySelector('.btn-menu');
    if (sidebar && btn) {
        sidebar.classList.toggle('active');
        btn.textContent = sidebar.classList.contains('active') ? "✖" : "☰";
    }
}

// Scroll suave para seções
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        toggleSidebar();
    }
}

// Sistema de tradução
const traducoes = {
    pt: {
        inicio: "Início",
        "inicio-texto": "Aqui você encontra os melhores profissionais para cuidar do seu visual!",
        sobre: "Sobre",
        "sobre-texto": "Com anos de experiência no mercado, a Barbearia LJ se destaca pela qualidade e profissionalismo.",
        contato: "Contato",
        pesquisa: "Pesquise serviços",
        onde: "Onde?",
        "modal-titulo": "Agendar Serviço",
        "label-servico": "Serviço:",
        "label-data": "Data e Hora:",
        "label-pagamento": "Método de Pagamento:",
        "select-pagamento": "Selecione o método de pagamento",
        "opcao-pix": "PIX",
        "opcao-cartao": "Cartão de Crédito/Débito",
        "pix-instrucoes": "Após confirmar, você receberá o QR Code do PIX",
        "btn-confirmar": "Confirmar Agendamento"
    },
    en: {
        inicio: "Home",
        "inicio-texto": "Here you'll find the best professionals to take care of your style!",
        sobre: "About",
        "sobre-texto": "With years of experience in the market, Barbearia LJ stands out for its quality and professionalism.",
        contato: "Contact",
        pesquisa: "Search services",
        onde: "Where?",
        "modal-titulo": "Schedule Service",
        "label-servico": "Service:",
        "label-data": "Date and Time:",
        "label-pagamento": "Payment Method:",
        "select-pagamento": "Select payment method",
        "opcao-pix": "PIX",
        "opcao-cartao": "Credit/Debit Card",
        "pix-instrucoes": "After confirming, you will receive the PIX QR Code",
        "btn-confirmar": "Confirm Scheduling"
    },
    es: {
        inicio: "Inicio",
        "inicio-texto": "¡Aquí encontrarás los mejores profesionales para cuidar tu imagen!",
        sobre: "Sobre Nosotros",
        "sobre-texto": "Con años de experiencia en el mercado, Barbearia LJ se destaca por su calidad y profesionalismo.",
        contato: "Contacto",
        pesquisa: "Buscar servicios",
        onde: "¿Dónde?",
        "modal-titulo": "Programar Servicio",
        "label-servico": "Servicio:",
        "label-data": "Fecha y Hora:",
        "label-pagamento": "Método de Pago:",
        "select-pagamento": "Seleccione el método de pago",
        "opcao-pix": "PIX",
        "opcao-cartao": "Tarjeta de Crédito/Débito",
        "pix-instrucoes": "Después de confirmar, recibirá el código QR de PIX",
        "btn-confirmar": "Confirmar Programación"
    }
};

function trocarIdioma(idioma) {
    const texto = traducoes[idioma];
    if (!texto) return;

    for (let chave in texto) {
        const elemento = document.getElementById(chave);
        if (elemento) {
            if (elemento.tagName === "INPUT") {
                elemento.placeholder = texto[chave];
            } else {
                elemento.textContent = texto[chave];
            }
        }
    }
}

// Funções do Modal
function abrirModal(servico) {
    const modal = document.getElementById('modal-agendamento');
    const servicoInput = document.getElementById('servico-selecionado');
    const dataHoraInput = document.getElementById('data-hora');
    
    if (modal && servicoInput && dataHoraInput) {
        servicoInput.value = servico;
        
        const agora = new Date();
        const dataMinima = agora.toISOString().slice(0, 16);
        dataHoraInput.min = dataMinima;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function fecharModal() {
    const modal = document.getElementById('modal-agendamento');
    const form = document.getElementById('form-agendamento');
    const pixInfo = document.getElementById('pix-info');
    const cartaoInfo = document.getElementById('cartao-info');
    
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        if (form) form.reset();
        if (pixInfo) pixInfo.style.display = 'none';
        if (cartaoInfo) cartaoInfo.style.display = 'none';
    }
}

function agendarServico(servico) {
    abrirModal(servico);
}

// Inicialização quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar carrossel
    iniciarCarrosselAutomatico();

    // Configurar elementos do modal
    const modal = document.getElementById('modal-agendamento');
    const closeModal = document.querySelector('.close-modal');
    const metodoPagamento = document.getElementById('metodo-pagamento');
    const formAgendamento = document.getElementById('form-agendamento');
    const numeroCartao = document.getElementById('numero-cartao');
    const validade = document.getElementById('validade');

    // Fechar modal
    if (closeModal && modal) {
        closeModal.addEventListener('click', fecharModal);
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                fecharModal();
            }
        });

        window.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                fecharModal();
            }
        });
    }

    // Método de pagamento
    if (metodoPagamento) {
        metodoPagamento.addEventListener('change', function() {
            const pixInfo = document.getElementById('pix-info');
            const cartaoInfo = document.getElementById('cartao-info');
            
            if (pixInfo && cartaoInfo) {
                pixInfo.style.display = this.value === 'pix' ? 'block' : 'none';
                cartaoInfo.style.display = this.value === 'cartao' ? 'block' : 'none';
            }
        });
    }

    // Formatação de cartão
    if (numeroCartao) {
        numeroCartao.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})/g, '$1 ').trim();
            e.target.value = value;
        });
    }

    if (validade) {
        validade.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 2) {
                value = value.slice(0,2) + '/' + value.slice(2,4);
            }
            e.target.value = value;
        });
    }

    // Formulário de agendamento
    if (formAgendamento) {
        formAgendamento.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const servico = document.getElementById('servico-selecionado').value;
            const dataHora = document.getElementById('data-hora').value;
            const metodoPagamento = document.getElementById('metodo-pagamento').value;
            
            if (!dataHora) {
                alert('Por favor, selecione uma data e hora para o agendamento.');
                return;
            }

            const dataAgendamento = new Date(dataHora);
            const agora = new Date();

            if (dataAgendamento < agora) {
                alert('Por favor, selecione uma data futura para o agendamento.');
                return;
            }

            let dadosPagamento = {};
            
            if (metodoPagamento === 'cartao') {
                const numeroCartao = document.getElementById('numero-cartao');
                const validade = document.getElementById('validade');
                const cvv = document.getElementById('cvv');
                const nomeCartao = document.getElementById('nome-cartao');

                if (!numeroCartao.value || !validade.value || !cvv.value || !nomeCartao.value) {
                    alert('Por favor, preencha todos os dados do cartão.');
                    return;
                }

                dadosPagamento = {
                    numero: numeroCartao.value,
                    validade: validade.value,
                    cvv: cvv.value,
                    nome: nomeCartao.value
                };
            }

            const agendamento = {
                servico,
                dataHora,
                metodoPagamento,
                dadosPagamento,
                cliente: localStorage.getItem('usuario'),
                status: 'confirmado'
            };

            const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
            agendamentos.push(agendamento);
            localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

            alert('Agendamento realizado com sucesso!');
            fecharModal();
        });
    }
});
