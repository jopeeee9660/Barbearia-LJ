// Controle da barra lateral
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const btnMenu = document.querySelector('.btn-menu');

    if (btnMenu && sidebar) {
        btnMenu.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            this.textContent = sidebar.classList.contains('active') ? "✖" : "☰";
        });
    }

    // Fecha a barra lateral quando clicar fora dela
    document.addEventListener('click', function(e) {
        if (sidebar && sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) && 
            !btnMenu.contains(e.target)) {
            sidebar.classList.remove('active');
            btnMenu.textContent = "☰";
        }
    });

    // Controle do Modal
    const btnsAgendar = document.querySelectorAll('.btn-agendar');
    const modal = document.getElementById('modal-agendamento');
    const btnFechar = modal?.querySelector('.close-modal');

    btnsAgendar.forEach(btn => {
        btn.addEventListener('click', function() {
            const servico = this.closest('.servico-info').querySelector('h3').textContent;
            if (modal) {
                const titulo = modal.querySelector('h2');
                if (titulo) {
                    titulo.textContent = `Agendar ${servico}`;
                }
                modal.classList.add('active');
            }
        });
    });

    if (btnFechar) {
        btnFechar.addEventListener('click', () => {
            modal?.classList.remove('active');
        });
    }

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', function(e) {
        if (modal && e.target === modal) {
            modal.classList.remove('active');
        }
    });
});