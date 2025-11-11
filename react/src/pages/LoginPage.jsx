import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthContext()
  const { t } = useLanguage()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function fazerLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    const email = e.target.email.value
    const senha = e.target.senha.value
    
    const result = await login(email, senha)
    
    setLoading(false)
    
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
            <label htmlFor="email">Email</label>
            <input 
              id="email"
              name="email" 
              type="email"
              placeholder="Digite seu email" 
              required 
              autoFocus
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          <button className="btn-primary btn-full" type="submit" disabled={loading}>
            {loading ? 'Entrando...' : t('login')}
          </button>
        </form>
        
        <div className="login-footer">
          <p>{t('noAccount')} <Link to="/register">{t('createAccount')}</Link></p>
          <button 
            type="button" 
            className="btn-back" 
            onClick={() => navigate('/')}
            disabled={loading}
          >
            ← {t('backToSite')}
          </button>
        </div>
      </div>
    </div>
  )
}
