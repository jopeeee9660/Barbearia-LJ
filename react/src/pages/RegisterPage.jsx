import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuthContext()
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
          <h2>Criar Conta</h2>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={salvarConta}>
          <div className="form-group">
            <label htmlFor="novoUsuario">Nome de Usuário</label>
            <input 
              id="novoUsuario"
              name="novoUsuario" 
              type="text"
              placeholder="Escolha um nome de usuário" 
              required 
              minLength={3}
              autoFocus
            />
            <small>Mínimo 3 caracteres</small>
          </div>
          <div className="form-group">
            <label htmlFor="novaSenha">Senha</label>
            <input 
              id="novaSenha"
              name="novaSenha" 
              type="password" 
              placeholder="Escolha uma senha forte" 
              required 
              minLength={6}
            />
            <small>Mínimo 6 caracteres</small>
          </div>
          <div className="form-group">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input 
              id="confirmarSenha"
              name="confirmarSenha" 
              type="password" 
              placeholder="Digite a senha novamente" 
              required 
            />
          </div>
          <button className="btn-primary btn-full" type="submit">
            Criar Conta
          </button>
        </form>
        
        <div className="login-footer">
          <p>Já tem uma conta? <Link to="/login">Fazer login</Link></p>
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
