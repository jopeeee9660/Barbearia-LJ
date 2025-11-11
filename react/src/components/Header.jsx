import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

export default function Header() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout, getUserInitials } = useAuthContext()
  const { t, language, changeLanguage } = useLanguage()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const timeoutRef = useRef(null)
  const userAreaRef = useRef(null)

  const handleLogout = () => {
    logout()
    navigate('/')
    setDropdownOpen(false)
    setIsLocked(false)
  }

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value)
  }

  const handleProfileClick = () => {
    setIsLocked(!isLocked)
    setDropdownOpen(!dropdownOpen)
  }

  const handleMouseEnter = () => {
    if (!isLocked) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setDropdownOpen(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isLocked) {
      timeoutRef.current = setTimeout(() => {
        setDropdownOpen(false)
      }, 300)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLocked && userAreaRef.current && !userAreaRef.current.contains(event.target)) {
        setIsLocked(false)
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isLocked])

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
            <div 
              className="user-area" 
              ref={userAreaRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div 
                className="profile-circle" 
                onClick={handleProfileClick}
                aria-label={`Perfil de ${user?.name || user}`}
              >
                <span id="user-initials">{getUserInitials()}</span>
              </div>
              <div className={`user-dropdown ${dropdownOpen ? 'show' : ''}`}>
                <div className="user-info">
                  <span id="usuario-nome">{user?.name || user}</span>
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
