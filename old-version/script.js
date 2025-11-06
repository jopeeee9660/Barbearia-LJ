// Verificar autenticação e inicializar funcionalidades
if (!window.auth) {
    window.auth = {
        checkAuth: function() {
            return localStorage.getItem('logado') === 'true';
        },
        getUser: function() {
            return localStorage.getItem('usuario');
        },
        logout: function() {
            localStorage.removeItem('logado');
            localStorage.removeItem('usuario');
            window.location.href = 'login/login.html';
        },
        updateInterface: function() {
            const userArea = document.getElementById('user-area');
            const loginArea = document.getElementById('login-area');
            const usuarioNome = document.getElementById('usuario-nome');
            const userInitials = document.getElementById('user-initials');
            
            if (this.checkAuth()) {
                const username = this.getUser();
                userArea.style.display = 'flex';
                loginArea.style.display = 'none';
                
                if (usuarioNome) {
                    usuarioNome.textContent = username;
                }
                
                if (userInitials) {
                    // Pega a primeira letra de cada palavra no nome do usuário
                    const initials = username
                        .split(' ')
                        .map(name => name[0])
                        .join('')
                        .slice(0, 2);
                    userInitials.textContent = initials;
                }
            } else {
                userArea.style.display = 'none';
                loginArea.style.display = 'flex';
            }
        }
    };
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

// Função para trocar imagens do carrossel
function trocarImagem(direcao) {
    clearInterval(intervaloCarrossel);
    indiceAtual = (indiceAtual + direcao + imagens.length) % imagens.length;
    const img = document.getElementById("imagem-principal");
    img.style.opacity = "0";
    
    setTimeout(() => {
        img.src = imagens[indiceAtual];
        img.style.opacity = "1";
    }, 200);
    
    iniciarCarrosselAutomatico();
}

// Inicia o carrossel automático
function iniciarCarrosselAutomatico() {
    if (intervaloCarrossel) {
        clearInterval(intervaloCarrossel);
    }
    intervaloCarrossel = setInterval(() => trocarImagem(1), 5000);
}

// Atualizar interface baseado no estado de autenticação
auth.updateInterface();

// Função para trocar imagens do carrossel
function trocarImagem(direcao) {
    if (intervaloCarrossel) {
        clearInterval(intervaloCarrossel);
    }
    
    indiceAtual += direcao;
    if (indiceAtual < 0) {
        indiceAtual = imagens.length - 1;
    } else if (indiceAtual >= imagens.length) {
        indiceAtual = 0;
    }
    
    const imgElement = document.getElementById("imagem-principal");
    if (imgElement) {
        // Fazer a transição suave
        imgElement.style.opacity = '0';
        setTimeout(() => {
            imgElement.src = imagens[indiceAtual];
            imgElement.style.opacity = '1';
        }, 200);
    }
    
    iniciarCarrosselAutomatico();
}

function iniciarCarrosselAutomatico() {
    if (intervaloCarrossel) {
        clearInterval(intervaloCarrossel);
    }
    intervaloCarrossel = setInterval(() => {
        trocarImagem(1);
    }, 5000);
}

// Inicializar funcionalidades quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar o carrossel
    const imgElement = document.getElementById("imagem-principal");
    if (imgElement) {
        imgElement.src = imagens[0];
        iniciarCarrosselAutomatico();
    }

    // Configurar eventos do modal
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.onclick = fecharModal;
    }

    // Configurar formulário de agendamento
    const formAgendamento = document.getElementById('form-agendamento');
    const metodoPagamento = document.getElementById('metodo-pagamento');
});

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
    const metodoPagamento = document.getElementById('metodo-pagamento');
    const pixInfo = document.getElementById('pix-info');
    const cartaoInfo = document.getElementById('cartao-info');
    const form = document.getElementById('form-agendamento');
    
    if (modal && servicoInput && dataHoraInput) {
        // Resetar o formulário
        if (form) form.reset();
        
        // Configurar o serviço selecionado
        servicoInput.value = servico;
        
        // Configurar data mínima
        const agora = new Date();
        const dataMinima = agora.toISOString().slice(0, 16);
        dataHoraInput.min = dataMinima;
        
        // Resetar método de pagamento
        if (metodoPagamento) metodoPagamento.value = '';
        if (pixInfo) pixInfo.style.display = 'none';
        if (cartaoInfo) cartaoInfo.style.display = 'none';
        
        // Mostrar o modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function fecharModal() {
    const modal = document.getElementById('modal-agendamento');
    const form = document.getElementById('form-agendamento');
    const pixInfo = document.getElementById('pix-info');
    const cartaoInfo = document.getElementById('cartao-info');
    
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        if (form) form.reset();
        if (pixInfo) pixInfo.style.display = 'none';
        if (cartaoInfo) cartaoInfo.style.display = 'none';
    }
}

function agendarServico(servico) {
    if (!auth.checkAuth()) {
        window.location.href = 'login/login.html';
        return;
    }
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
    const pixInfo = document.getElementById('pix-info');
    const cartaoInfo = document.getElementById('cartao-info');

    // Fechar modal quando clicar no X
    if (closeModal) {
        closeModal.onclick = fecharModal;
    }

    // Fechar modal quando clicar fora dele
    window.onclick = function(event) {
        if (event.target === modal) {
            fecharModal();
        }
    }

    // Alterar método de pagamento
    if (metodoPagamento) {
        metodoPagamento.onchange = function() {
            if (this.value === 'pix') {
                pixInfo.style.display = 'block';
                cartaoInfo.style.display = 'none';
            } else if (this.value === 'cartao') {
                pixInfo.style.display = 'none';
                cartaoInfo.style.display = 'block';
            } else {
                pixInfo.style.display = 'none';
                cartaoInfo.style.display = 'none';
            }
        }
    }

    // Configurar envio do formulário
    if (formAgendamento) {
        formAgendamento.onsubmit = function(e) {
            e.preventDefault();
            const servico = document.getElementById('servico-selecionado').value;
            const dataHora = document.getElementById('data-hora').value;
            const metodoPag = metodoPagamento.value;

            // Aqui você pode adicionar a lógica para processar o agendamento
            console.log('Agendamento:', { servico, dataHora, metodoPag });
            alert('Agendamento realizado com sucesso!');
            fecharModal();
        }
    }
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
});

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
