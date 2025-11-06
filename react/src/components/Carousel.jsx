import React, { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const imagens = [
  '/imagens/imagem1.jpg',
  '/imagens/imagem2.jpg',
  '/imagens/imagem3.jpg',
  '/imagens/imagem4.jpg'
]

export default function Carousel() {
  const [index, setIndex] = useState(0)
  const { t } = useLanguage()
  
  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % imagens.length), 5000)
    return () => clearInterval(timer)
  }, [])

  function change(n) {
    setIndex(i => (i + n + imagens.length) % imagens.length)
  }

  return (
    <div className="janela-imagem">
      <button 
        className="seta-esquerda" 
        onClick={() => change(-1)}
        aria-label="Imagem anterior"
      >
        ◀
      </button>
      
      <img 
        id="imagem-principal" 
        src={imagens[index]} 
        alt={`Slide ${index + 1}`}
      />
      
      {/* Overlay com texto */}
      <div className="carousel-overlay">
        <h1 className="carousel-title">Barbearia LJ</h1>
        <p className="carousel-subtitle">{t('welcomeText')}</p>
      </div>
      
      <button 
        className="seta-direita" 
        onClick={() => change(1)}
        aria-label="Próxima imagem"
      >
        ▶
      </button>
      
      {/* Indicadores de slides */}
      <div className="carousel-indicators">
        {imagens.map((_, i) => (
          <button
            key={i}
            className={`indicator ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Ir para slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
