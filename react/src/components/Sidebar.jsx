import React from 'react'
import { useSidebar, useScrollToSection } from '../hooks/useUI'
import { useAuthContext } from '../context/AuthContext'

export default function Sidebar() {
  const { isOpen, toggle, close } = useSidebar()
  const { scrollTo } = useScrollToSection()
  const { logout } = useAuthContext()

  const handleNavClick = (sectionId) => {
    scrollTo(sectionId)
    close()
  }

  const handleLogout = () => {
    logout()
    close()
  }

  return (
    <>
      <button 
        className="btn-menu" 
        onClick={toggle}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? '✖' : '☰'}
      </button>

      <aside className={`sidebar ${isOpen ? 'active' : ''}`} role="navigation">
        <div className="sidebar-header">
          <img src="/imagens/logo.png" alt="Logo Barbearia LJ" className="sidebar-logo" />
          <h2>Menu</h2>
        </div>
        <nav className="sidebar-nav">
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
            Início
          </a>
          <a href="#servicos" onClick={(e) => { e.preventDefault(); handleNavClick('servicos'); }}>
            Serviços
          </a>
          <a href="#sobre" onClick={(e) => { e.preventDefault(); handleNavClick('sobre'); }}>
            Sobre
          </a>
          <a href="#contato" onClick={(e) => { e.preventDefault(); handleNavClick('contato'); }}>
            Contato
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
            Sair
          </a>
        </nav>
      </aside>

      {/* Overlay para fechar ao clicar fora */}
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={close}
          aria-hidden="true"
        />
      )}
    </>
  )
}
