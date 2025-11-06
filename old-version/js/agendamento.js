// Funções de Agendamento
document.addEventListener('DOMContentLoaded', function() {
    // Botões de agendamento
    const botoesAgendar = document.querySelectorAll('.btn-agendar');
    
    botoesAgendar.forEach(botao => {
        botao.addEventListener('click', function(e) {
            e.preventDefault();
            const servico = this.closest('.servico-info').querySelector('h3').textContent;
            abrirModalAgendamento(servico);
        });
    });

    // Função para abrir o modal de agendamento
    function abrirModalAgendamento(servico) {
        const modal = document.getElementById('modal-agendamento');
        if (!modal) return;

        const titulo = modal.querySelector('h2');
        if (titulo) {
            titulo.textContent = `Agendar ${servico}`;
        }

        // Atualiza o horário mínimo para agendamento
        const dataHora = modal.querySelector('#data-hora');
        if (dataHora) {
            const agora = new Date();
            const ano = agora.getFullYear();
            const mes = String(agora.getMonth() + 1).padStart(2, '0');
            const dia = String(agora.getDate()).padStart(2, '0');
            const hora = String(agora.getHours()).padStart(2, '0');
            const minutos = String(agora.getMinutes()).padStart(2, '0');
            
            dataHora.min = `${ano}-${mes}-${dia}T${hora}:${minutos}`;
        }

        modal.classList.add('active');
    }

    // Fechar modal
    const btnFechar = document.querySelector('.close-modal');
    if (btnFechar) {
        btnFechar.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Fechar modal ao clicar fora
    const modal = document.getElementById('modal-agendamento');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    }
});