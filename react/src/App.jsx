import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
import { useLanguage } from './context/LanguageContext'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Carousel from './components/Carousel'
import Services from './components/Services'
import Modal from './components/Modal'
import Footer from './components/Footer'

export default function App() {
  const navigate = useNavigate()
  const { isAuthenticated, loading } = useAuthContext()
  const { t } = useLanguage()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')

  function openModal(service) {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    setSelectedService(service)
    setModalOpen(true)
  }

  // Mostrar tela de loading enquanto verifica autenticação
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.5rem',
        color: '#D4AF37'
      }}>
        Carregando...
      </div>
    )
  }

  return (
    <div className="app-root">
      <Sidebar />
      <Header />
      <main>
        <Carousel />
        <section id="home" className="container">
          <h2>{t('welcome')}</h2>
          <p>{t('welcomeText')}</p>
        </section>
        <Services onSchedule={openModal} />
        <section id="sobre" className="container">
          <h2>{t('about')}</h2>
          <p>{t('aboutText')}</p>
        </section>
        <section id="contato" className="container">
          <h2>{t('contact')}</h2>
          <div className="contato-info">
            <p><strong>{t('address')}:</strong> {t('addressText')}</p>
            <p><strong>{t('phone')}:</strong> {t('phoneText')}</p>
            <p><strong>{t('email')}:</strong> {t('emailText')}</p>
            <p><strong>{t('hours')}:</strong> {t('hoursText')}</p>
          </div>
        </section>
      </main>
      <Footer />

      <Modal
        open={modalOpen}
        service={selectedService}
        onClose={() => setModalOpen(false)}
      />
    </div>
  )
}
