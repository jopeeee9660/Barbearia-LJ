import React from 'react'

const data = [
  { title: 'Corte de Cabelo', desc: 'Cortes modernos e tradicionais', price: 'R$ 35,00', img: '/imagens/imagem1.jpg' },
  { title: 'Barba', desc: 'Aparar e modelar sua barba', price: 'R$ 25,00', img: '/imagens/imagem2.jpg' },
  { title: 'Pacote Completo', desc: 'Corte + Barba', price: 'R$ 55,00', img: '/imagens/imagem3.jpg' }
]

export default function Services({ onSchedule }) {
  return (
    <section id="servicos">
      <h2>Nossos Serviços</h2>
      <div className="servicos">
        {data.map((s, idx) => (
          <article key={idx} className="servico">
            <img 
              src={s.img} 
              alt={s.title}
              loading="lazy"
            />
            <div className="servico-info">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="preco" aria-label={`Preço: ${s.price}`}>{s.price}</span>
              <button 
                className="btn-agendar" 
                onClick={() => onSchedule(s.title)}
                aria-label={`Agendar ${s.title}`}
              >
                Agendar
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
