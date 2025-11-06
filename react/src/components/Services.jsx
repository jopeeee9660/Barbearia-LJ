import React from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Services({ onSchedule }) {
  const { t } = useLanguage()
  
  const data = [
    { 
      title: t('haircut'),
      desc: t('haircutDesc'),
      price: 'R$ 35,00', 
      img: '/imagens/imagem1.jpg',
      popular: false
    },
    { 
      title: t('beard'),
      desc: t('beardDesc'),
      price: 'R$ 25,00', 
      img: '/imagens/imagem2.jpg',
      popular: false
    },
    { 
      title: t('fullPackage'),
      desc: t('fullPackageDesc'),
      price: 'R$ 55,00', 
      img: '/imagens/imagem3.jpg',
      popular: true
    }
  ]

  return (
    <section id="servicos" className="container">
      <h2>{t('services')}</h2>
      <div className="servicos">
        {data.map((s, idx) => (
          <article key={idx} className="servico">
            {s.popular && <span className="badge-popular">{t('mostPopular')}</span>}
            <img 
              src={s.img} 
              alt={s.title}
              loading="lazy"
            />
            <div className="servico-info">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="preco" aria-label={`${t('price')}: ${s.price}`}>{s.price}</span>
              <button 
                className="btn-agendar" 
                onClick={() => onSchedule(s.title)}
                aria-label={`${t('schedule')} ${s.title}`}
              >
                {t('schedule')}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
