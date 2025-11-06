import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuthContext()
  const { t } = useLanguage()
  const [error, setError] = useState('')

  function salvarConta(e) {
    e.preventDefault()
    setError('')
    
    const usuario = e.target.novoUsuario.value
    const senha = e.target.novaSenha.value
    const confirmar = e.target.confirmarSenha.value
    
    const result = register(usuario, senha, confirmar)
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
            <label htmlFor="novoUsuario">{t('username')}</label>
            <input 
              id="novoUsuario"
              name="novoUsuario" 
              type="text"
              placeholder={t('chooseUsername')} 
              required 
              minLength={3}
              autoFocus
            />
            <small>{t('minChars')}</small>
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
            />
          </div>
          <button className="btn-primary btn-full" type="submit">
            {t('createAccount')}
          </button>
        </form>
        
        <div className="login-footer">
          <p>{t('hasAccount')} <Link to="/login">{t('login')}</Link></p>
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
