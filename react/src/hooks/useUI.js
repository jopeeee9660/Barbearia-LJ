import { useState, useEffect } from 'react'

/**
 * Hook para controlar sidebar/menu lateral
 * Substitui lógica de js/interface.js
 */
export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  // Fechar sidebar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.sidebar') && !e.target.closest('.btn-menu')) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  // Fechar sidebar ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  const toggle = () => setIsOpen(prev => !prev)
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  return {
    isOpen,
    toggle,
    close,
    open
  }
}

/**
 * Hook para scroll suave para seções
 */
export function useScrollToSection() {
  const scrollTo = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return { scrollTo }
}
