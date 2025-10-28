import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthContext()
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
          <h2>Bem-vindo à Barbearia LJ</h2>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={fazerLogin}>
          <div className="form-group">
            <label htmlFor="usuario">Usuário</label>
            <input 
              id="usuario"
              name="usuario" 
              type="text"
              placeholder="Digite seu usuário" 
              required 
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input 
              id="senha"
              name="senha" 
              type="password" 
              placeholder="Digite sua senha" 
              required 
            />
          </div>
          <button className="btn-primary btn-full" type="submit">
            Entrar
          </button>
        </form>
        
        <div className="login-footer">
          <p>Não tem uma conta? <Link to="/register">Criar conta</Link></p>
          <button 
            type="button" 
            className="btn-back" 
            onClick={() => navigate('/')}
          >
            ← Voltar para o site
          </button>
        </div>
      </div>
    </div>
  )
}
