import React, { useEffect, useState } from 'react'

const imagens = ['/imagens/imagem1.jpg','/imagens/imagem2.jpg','/imagens/imagem3.jpg','/imagens/imagem4.jpg']

export default function Carousel(){
  const [index, setIndex] = useState(0)
  useEffect(()=>{
    const timer = setInterval(()=> setIndex(i => (i+1)%imagens.length), 5000)
    return ()=> clearInterval(timer)
  },[])

  function change(n){
    setIndex(i => (i + n + imagens.length) % imagens.length)
  }

  return (
    <div className="janela-imagem">
      <button className="seta-esquerda" onClick={()=>change(-1)}>◀</button>
      <img id="imagem-principal" src={imagens[index]} alt="Imagem principal" />
      <button className="seta-direita" onClick={()=>change(1)}>▶</button>
    </div>
  )
}
