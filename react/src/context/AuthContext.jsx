import React, { createContext, useContext } from 'react'
import { useAuth } from '../hooks/useAuth'

/**
 * Contexto de autenticação para compartilhar estado global
 * Substitui a necessidade de passar props em toda árvore
 */
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext deve ser usado dentro de AuthProvider')
  }
  return context
}
