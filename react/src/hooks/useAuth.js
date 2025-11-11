import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:3001/api'

/**
 * Hook customizado para gerenciar autenticação com backend
 */
export function useAuth() {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Verificar autenticação ao carregar
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  // Login com API
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setUser(data.user)
        setIsAuthenticated(true)
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Erro ao fazer login' }
      }
    } catch (error) {
      console.error('Erro no login:', error)
      return { 
        success: false, 
        error: 'Erro ao conectar com o servidor. Verifique se o servidor está rodando.' 
      }
    }
  }

  // Cadastro com API
  const register = async (name, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return { success: false, error: 'As senhas não conferem' }
    }
    
    if (name.length < 3) {
      return { success: false, error: 'Nome deve ter pelo menos 3 caracteres' }
    }
    
    if (password.length < 6) {
      return { success: false, error: 'Senha deve ter pelo menos 6 caracteres' }
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setUser(data.user)
        setIsAuthenticated(true)
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Erro ao criar conta' }
      }
    } catch (error) {
      console.error('Erro no cadastro:', error)
      return { 
        success: false, 
        error: 'Erro ao conectar com o servidor. Verifique se o servidor está rodando.' 
      }
    }
  }

  // Logout
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setIsAuthenticated(false)
  }

  // Obter iniciais do usuário para avatar
  const getUserInitials = () => {
    if (!user || !user.name) return ''
    return user.name
      .split(' ')
      .map(name => name[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  return {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    getUserInitials
  }
}
