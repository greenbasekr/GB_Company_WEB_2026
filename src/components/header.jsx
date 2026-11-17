import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Logo from './logo.jsx'

const links = [['회사소개', '/companyInfo'], ['서비스', '/service'], ['프로젝트', '/project'], ['소식', '/news']]

export default function Header({ variant = 'overlay' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 10)
  const light = variant === 'light' || scrolled || menuOpen

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 10)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return <>
    <div className="site-header-spacer" aria-hidden="true" />
    {createPortal(<header className={`site-header${light ? ' site-header-light' : ''}${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Logo tone={light ? 'green' : 'white'} />
        <button className="menu-toggle" type="button" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '닫기' : '메뉴'}<span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
        <nav id="main-nav" className={`navigation${menuOpen ? ' is-open' : ''}`} aria-label="주 메뉴">
          {links.map(([label, href]) => (
            <a key={href} href={href} aria-current={window.location.pathname.replace(/\/$/, '') === href || (!href.includes('#') && window.location.pathname.startsWith(`${href}/`)) ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
      </div>
    </header>, document.body)}
  </>
}
