import React from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer>
      <div className="footer-content container">
        <div className="footer-logo">
          <img src="/imagens/logo.png" alt="logo" />
        </div>
        <div className="footer-info">
          <p>© 2025 Barbearia LJ - {t('allRightsReserved')}</p>
          <div className="social-links">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
