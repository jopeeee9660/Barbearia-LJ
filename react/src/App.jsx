import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Carousel from './components/Carousel'
import Services from './components/Services'
import Modal from './components/Modal'
import Footer from './components/Footer'

export default function App() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthContext()
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

  return (
    <div className="app-root">
      <Sidebar />
      <Header />
      <main>
        <Carousel />
        <section id="home" className="container">
          <h2>Bem-vindo à Barbearia LJ</h2>
          <p>Aqui você encontra os melhores profissionais para cuidar do seu visual!</p>
        </section>
        <Services onSchedule={openModal} />
        <section id="sobre" className="container">
          <h2>Sobre Nós</h2>
          <p>Com anos de experiência no mercado, a Barbearia LJ se destaca pela qualidade e profissionalismo. Nossa equipe é composta por profissionais altamente qualificados, prontos para oferecer o melhor serviço para você.</p>
        </section>
        <section id="contato" className="container">
          <h2>Contato</h2>
          <div className="contato-info">
            <p><strong>Endereço:</strong> Rua Principal, 123 - Centro</p>
            <p><strong>Telefone:</strong> (11) 99999-9999</p>
            <p><strong>Email:</strong> contato@barbearialj.com</p>
            <p><strong>Horário de Funcionamento:</strong> Seg-Sáb: 9h às 20h</p>
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
