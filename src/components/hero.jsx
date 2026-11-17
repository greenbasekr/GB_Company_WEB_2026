import { useState } from 'react'
import Header from './header.jsx'

// 원본 배경 제공 시 이 경로만 교체하면 모든 페이지에 반영됩니다.
const background = 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2200&q=85'

export default function Hero({ eyebrow, title, description, children, bottom, className = '', backgroundImage = background }) {
  const [imageReady, setImageReady] = useState(false)
  return <>
    <a className="skip-link" href="#main-content">본문 바로가기</a>
    <section className={`hero ${className}`} id="home" style={{ '--hero-image': `url("${backgroundImage}")` }}>
      <div className="hero-backdrop" aria-hidden="true">
        <img src={backgroundImage} alt="" onLoad={() => setImageReady(true)} className={imageReady ? 'is-ready' : ''} fetchPriority="high" />
      </div>
      <Header />
      <div className="container hero-content">
        <p className="hero-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hero-description">{description}</p>
        {children}
      </div>
      {bottom}
    </section>
  </>
}
