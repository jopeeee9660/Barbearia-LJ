import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

export default function Header() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout, getUserInitials } = useAuthContext()
  const { t, language, changeLanguage } = useLanguage()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value)
  }

  return (
    <header className="cabecalho">
      <div className="conteudo-cabecalho">
        <div className="caixas-de-texto">
          <input 
            type="text" 
            placeholder={t('searchServices')}
            aria-label={t('searchServices')}
          />
          <input 
            type="text" 
            placeholder={t('where')}
            aria-label={t('where')}
          />
          <select 
            className="caixa-selecao" 
            value={language}
            onChange={handleLanguageChange}
            aria-label="Selecionar idioma"
          >
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
                  aria-label={t('logout')}
                >
                  <span className="logout-icon">↪</span>
                  {t('logout')}
                </button>
              </div>
            </div>
          ) : (
            <div className="login-area">
              <button 
                className="btn-login" 
                onClick={() => navigate('/login')}
                aria-label={t('login')}
              >
                {t('login')}
              </button>
            </div>
          )}
          <img src="/imagens/logo.png" alt="Logo Barbearia LJ" className="logo-direita" />
        </div>
      </div>
    </header>
  )
}
