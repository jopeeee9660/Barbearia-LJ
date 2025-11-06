import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../utils/helpers'

/**
 * Contexto de idioma para gerenciar traduções
 * Suporta: Português (pt), English (en), Español (es)
 */
const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Carregar idioma salvo ou usar português como padrão
    return localStorage.getItem('language') || 'pt'
  })

  // Salvar idioma quando mudar
  useEffect(() => {
    localStorage.setItem('language', language)
    // Atualizar atributo lang do HTML
    document.documentElement.lang = language
  }, [language])

  // Função para traduzir uma chave
  const t = (key) => {
    return translations[language]?.[key] || translations.pt[key] || key
  }

  // Função para mudar idioma
  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage)
    }
  }

  // Obter idioma atual
  const getCurrentLanguage = () => language

  // Obter nome do idioma atual
  const getLanguageName = () => {
    const names = {
      pt: 'Português',
      en: 'English',
      es: 'Español'
    }
    return names[language] || 'Português'
  }

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        t, 
        changeLanguage,
        getCurrentLanguage,
        getLanguageName
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage deve ser usado dentro de LanguageProvider')
  }
  return context
}
