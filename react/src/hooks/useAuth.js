import { useState, useEffect } from 'react'

/**
 * Hook customizado para gerenciar autenticação
 * Substitui js/auth.js com lógica reativa do React
 */
export function useAuth() {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Verificar autenticação ao carregar
  useEffect(() => {
    const logado = localStorage.getItem('logado') === 'true'
    const usuario = localStorage.getItem('usuario')
    
    if (logado && usuario) {
      setUser(usuario)
      setIsAuthenticated(true)
    }
  }, [])

  // Login
  const login = (username, password) => {
    // Validação simples (em produção, chamaria API)
    if (username && password) {
      localStorage.setItem('logado', 'true')
      localStorage.setItem('usuario', username)
      setUser(username)
      setIsAuthenticated(true)
      return { success: true }
    }
    return { success: false, error: 'Credenciais inválidas' }
  }

  // Cadastro
  const register = (username, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return { success: false, error: 'As senhas não conferem' }
    }
    
    if (username.length < 3) {
      return { success: false, error: 'Usuário deve ter pelo menos 3 caracteres' }
    }
    
    if (password.length < 6) {
      return { success: false, error: 'Senha deve ter pelo menos 6 caracteres' }
    }

    // Salvar (em produção, chamaria API)
    localStorage.setItem('logado', 'true')
    localStorage.setItem('usuario', username)
    setUser(username)
    setIsAuthenticated(true)
    return { success: true }
  }

  // Logout
  const logout = () => {
    localStorage.removeItem('logado')
    localStorage.removeItem('usuario')
    setUser(null)
    setIsAuthenticated(false)
  }

  // Obter iniciais do usuário para avatar
  const getUserInitials = () => {
    if (!user) return ''
    return user
      .split(' ')
      .map(name => name[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    getUserInitials
  }
}
