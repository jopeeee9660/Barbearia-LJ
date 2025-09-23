// Gerenciador de autenticação
class Auth {
    constructor() {
        this.isAuthenticated = this.checkAuth();
    }

    checkAuth() {
        return localStorage.getItem("logado") === "true";
    }

    login(usuario, senha) {
        const usuarioSalvo = localStorage.getItem("usuario");
        const senhaSalva = localStorage.getItem("senha");

        if (usuario === usuarioSalvo && senha === senhaSalva) {
            localStorage.setItem("logado", "true");
            localStorage.setItem("sessionTime", Date.now());
            this.isAuthenticated = true;
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem("logado");
        localStorage.removeItem("sessionTime");
        this.isAuthenticated = false;
        window.location.href = "/login/login.html";
    }

    register(usuario, senha) {
        if (!usuario || !senha) {
            throw new Error("Usuário e senha são obrigatórios");
        }

        if (senha.length < 6) {
            throw new Error("A senha deve ter pelo menos 6 caracteres");
        }

        localStorage.setItem("usuario", usuario);
        localStorage.setItem("senha", senha);
        localStorage.setItem("logado", "true");
        localStorage.setItem("sessionTime", Date.now());
        this.isAuthenticated = true;
    }

    checkSession() {
        if (!this.isAuthenticated) return false;
        
        const sessionTime = localStorage.getItem("sessionTime");
        const now = Date.now();
        const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 horas

        if (now - sessionTime > SESSION_DURATION) {
            this.logout();
            return false;
        }

        localStorage.setItem("sessionTime", now);
        return true;
    }
}

const auth = new Auth();

// Verificar sessão a cada minuto
setInterval(() => {
    auth.checkSession();
}, 60000);
