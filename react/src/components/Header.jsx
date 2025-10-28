import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export default function Header() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout, getUserInitials } = useAuthContext()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="cabecalho">
      <div className="conteudo-cabecalho">
        <div className="caixas-de-texto">
          <input 
            type="text" 
            placeholder="Pesquise serviços" 
            aria-label="Pesquisar serviços"
          />
          <input 
            type="text" 
            placeholder="Onde?" 
            aria-label="Localização"
          />
          <select className="caixa-selecao" aria-label="Selecionar idioma">
            <option value="pt">Português</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
        <div className="header-right">
          {isAuthenticated ? (
            <div className="user-area">
              <div className="profile-circle" aria-label={`Perfil de ${user}`}>
                <span id="user-initials">{getUserInitials()}</span>
              </div>
              <div className="user-dropdown">
                <div className="user-info">
                  <span id="usuario-nome">{user}</span>
                </div>
                <div className="dropdown-divider" />
                <button 
                  className="btn-logout" 
                  onClick={handleLogout}
                  aria-label="Sair da conta"
                >
                  <span className="logout-icon">↪</span>
                  Sair
                </button>
              </div>
            </div>
          ) : (
            <div className="login-area">
              <button 
                className="btn-login" 
                onClick={() => navigate('/login')}
                aria-label="Fazer login"
              >
                Entrar
              </button>
            </div>
          )}
          <img src="/imagens/logo.png" alt="Logo Barbearia LJ" className="logo-direita" />
        </div>
      </div>
    </header>
  )
}
