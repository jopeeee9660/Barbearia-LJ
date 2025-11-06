import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthContext()
  const { t } = useLanguage()
  const [error, setError] = useState('')

  function fazerLogin(e) {
    e.preventDefault()
    setError('')
    
    const usuario = e.target.usuario.value
    const senha = e.target.senha.value
    
    const result = login(usuario, senha)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.error || 'Erro ao fazer login')
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <img src="/imagens/logo.png" alt="Logo Barbearia LJ" className="login-logo" />
          <h2>{t('loginTitle')}</h2>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={fazerLogin}>
          <div className="form-group">
            <label htmlFor="usuario">{t('username')}</label>
            <input 
              id="usuario"
              name="usuario" 
              type="text"
              placeholder={t('enterUsername')} 
              required 
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">{t('password')}</label>
            <input 
              id="senha"
              name="senha" 
              type="password" 
              placeholder={t('enterPassword')} 
              required 
            />
          </div>
          <button className="btn-primary btn-full" type="submit">
            {t('login')}
          </button>
        </form>
        
        <div className="login-footer">
          <p>{t('noAccount')} <Link to="/register">{t('createAccount')}</Link></p>
          <button 
            type="button" 
            className="btn-back" 
            onClick={() => navigate('/')}
          >
            ← {t('backToSite')}
          </button>
        </div>
      </div>
    </div>
  )
}
