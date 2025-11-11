import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuthContext()
  const { t } = useLanguage()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function salvarConta(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    const nome = e.target.nome.value
    const email = e.target.email.value
    const senha = e.target.novaSenha.value
    const confirmar = e.target.confirmarSenha.value
    
    const result = await register(nome, email, senha, confirmar)
    
    setLoading(false)
    
    if (result.success) {
      navigate('/')
    } else {
      setError(result.error || 'Erro ao criar conta')
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <img src="/imagens/logo.png" alt="Logo Barbearia LJ" className="login-logo" />
          <h2>{t('registerTitle')}</h2>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={salvarConta}>
          <div className="form-group">
            <label htmlFor="nome">Nome completo</label>
            <input 
              id="nome"
              name="nome" 
              type="text"
              placeholder="Digite seu nome completo" 
              required 
              minLength={3}
              autoFocus
              disabled={loading}
            />
            <small>Mínimo 3 caracteres</small>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email"
              name="email" 
              type="email"
              placeholder="Digite seu email" 
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="novaSenha">{t('password')}</label>
            <input 
              id="novaSenha"
              name="novaSenha" 
              type="password" 
              placeholder={t('choosePassword')} 
              required 
              minLength={6}
              disabled={loading}
            />
            <small>{t('minPassword')}</small>
          </div>
          <div className="form-group">
            <label htmlFor="confirmarSenha">{t('confirmPassword')}</label>
            <input 
              id="confirmarSenha"
              name="confirmarSenha" 
              type="password" 
              placeholder={t('retypePassword')} 
              required
              disabled={loading}
            />
          </div>
          <button className="btn-primary btn-full" type="submit" disabled={loading}>
            {loading ? 'Criando conta...' : t('createAccount')}
          </button>
        </form>
        
        <div className="login-footer">
          <p>{t('hasAccount')} <Link to="/login">{t('login')}</Link></p>
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
