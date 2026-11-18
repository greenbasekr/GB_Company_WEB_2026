import { siteUrl } from '../utils/site-url.js'
import { useState } from 'react'
import Hero from '../components/hero.jsx'
import Footer from '../components/footer.jsx'
import Notice from '../components/notice.jsx'
import { newsPosts } from '../data/news.js'
import './main.css'

// 원본 사진이 준비되면 아래 임시 이미지 경로를 교체합니다.
const assets = {
  battery: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=85',
  factory: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1000&q=85',
}

// 시안의 임시 데이터. 실제 소식/API 연동 시 교체합니다.
const news = newsPosts.slice(0, 4).map(post => ({ ...post, date: post.displayDate }))
const projectViews = [
  { title: '파워뱅크 통합관리시스템', text: ['배터리 상태 모니터링과 진단,', '이력 관리를 통한 파워뱅크 운영을', '지원합니다.'], tags: ['실시간 상태 확인', '배터리 진단', '데이터 이력'] },
  { title: '실시간 배터리 모니터링', text: ['배터리의 충전 상태와 온도,', '전압 등 주요 운영 데이터를', '한눈에 확인합니다.'], tags: ['충전 상태', '온도 모니터링', '전압 확인'] },
  { title: '배터리 운영 데이터 관리', text: ['배터리 운영 정보를 모아', '상태 변화와 데이터 이력을', '확인합니다.'], tags: ['운영 데이터', '상태 변화', '이력 관리'] },
]

function Arrow() {
  return <svg className="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function Dashboard({ slide }) {
  return <div className="device-composition" role="img" aria-label="파워뱅크 통합 모니터링 시스템 화면 예시">
    <div className="laptop"><div className="laptop-screen">
      <div className="dashboard-header"><span className="dashboard-brand">◈ greenbase</span><span>PBMS 파워뱅크 통합 모니터링 시스템</span><span className="dashboard-time">2025. 11. 18 (화) 09:44:54</span></div>
      <div className="dashboard-body"><div className="dashboard-sidebar"><span className="selected">◉ 실시간 모니터링</span><span>▧ 운영 이력 관리</span><span>♧ 알림 · 이벤트</span><span>⚙ 설정 · 관리</span></div><div className="dashboard-content"><h4>{['파워뱅크 현황', '실시간 배터리 상태', '배터리 운영 현황'][slide]}</h4><div className="battery-panels">{[81.3, 82.1, 82.6].map((value, i) => <div className="battery-panel" key={value}><strong>▣ PB-0{i + 1} (제주{i + 1})</strong><small>● 운용중</small><div className="charge-ring" style={{ '--charge': `${value}%` }}><div><b>{value}%</b><span>SOC</span></div></div><p>ϟ &nbsp; 전력 <b>{[412.6, 398.7, 405.2][i]} kW</b></p><p>♧ &nbsp; 온도 <b>{[24.8, 25.1, 24.9][i]} °C</b></p><p>상태 <b>정상</b></p><div className="battery-status" /></div>)}</div></div></div>
    </div><div className="laptop-base" /></div>
    <div className="phone"><div className="phone-camera"/><div className="phone-top">09:44 <span>▰ ▰</span></div><p>〈 &nbsp; PB-02 (제주B)</p><small>● 운용중</small><div className="charge-ring"><div><b>80.5%</b><span>SOC</span></div></div><strong className="phone-status">정상 운용</strong><div className="phone-metrics">{[['전력', '398.7 kW'], ['온도', '25.1 °C'], ['전압', '1,244.8 V'], ['전류', '320.6 A']].map(([label, value]) => <p key={label}><span>♧ {label}</span><b>{value}</b></p>)}</div><p className="phone-state">운전 상태 <span>정상</span></p><div className="battery-status"/><div className="phone-nav">⌂ &nbsp; ▥ &nbsp; ◉ &nbsp; ⚙</div></div>
  </div>
}

export default function MainPage() {
  const [tab, setTab] = useState('전체')
  const [slide, setSlide] = useState(0)
  const [notice, setNotice] = useState(null)
  const project = projectViews[slide]

  return <>
    <Hero eyebrow="GREENBASE" title={<>A BATTERY DATA<br/>SPECIALIZED<br/>COMPANY</>} description="배터리 진단부터 에너지 관리까지">
      <a href={siteUrl('/companyInfo')} className="hero-button">회사소개 살펴보기 <Arrow/></a>
    </Hero>
    <main id="main-content">
      <section className="news-section" id="news" aria-labelledby="news-title"><div className="container news-layout"><div className="news-intro"><p className="eyebrow">NEWS</p><h2 id="news-title">그린베이스 소식</h2><p className="section-description">그린베이스의 새로운 소식을<br/>만나보세요</p><a className="text-link" href={siteUrl('/news')}>전체 보기 <Arrow/></a></div><div className="news-board"><div className="news-tabs" aria-label="소식 분류">{['전체', '기업소식'].map(label => <button key={label} className={tab === label ? 'active' : ''} aria-pressed={tab === label} onClick={() => setTab(label)}>{label}</button>)}</div><ul id="news-list" className="news-list">{news.filter(item => tab === '전체' || item.category === tab).map(item => <li key={item.id}><a href={siteUrl(`/news/${item.id}`)}><span className="news-category">{item.category}</span><strong>{item.title}</strong><time dateTime="2026-11-04">{item.date}</time><Arrow/></a></li>)}</ul></div></div></section>

      <section className="services-section" id="services" aria-labelledby="services-title"><div className="container"><p className="eyebrow">OUR SERVICES</p><h2 id="services-title">배터리와 에너지, 데이터를 연결하는 솔루션</h2><div className="featured-services">{[{ image: assets.battery, title: '에너지 및 배터리 관리', text: '전기차 배터리 진단 및 평가와 운영 관리' }, { image: assets.factory, title: '스마트 팩토리 및 산업 IoT', text: '현장 설비 및 센서 데이터 수집과 연동' }].map(service => <article className="service-photo-card" key={service.title}><img src={service.image} alt="" loading="lazy"/><div><h3>{service.title}</h3><p>{service.text}</p></div></article>)}</div><div className="small-services">{[['빅데이터 및 AI 분석', '시계열 분석 기반 이상 징후 조기 탐지'], ['모바일/웹 통합 솔루션', '관제부터 운영까지 하나의 화면으로'], ['환경 및 안전 관리', '환경 및 안전 센서 모니터링과 알림']].map(([title, description]) => <article className="service-small-card" key={title}><span className="service-icon" aria-hidden="true"/><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

      <section className="projects-section" id="projects" aria-labelledby="projects-title"><div className="container"><p className="eyebrow">PROJECTS</p><h2 id="projects-title">그린베이스 프로젝트</h2><div className="project-layout"><div className="project-copy"><div aria-live="polite" aria-atomic="true"><p className="project-count">0{slide + 1} / 03</p><h3>{project.title}</h3><p className="project-description">{project.text.map(line => <span key={line}>{line}<br/></span>)}</p><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><div className="project-actions"><button className="text-link" onClick={() => setNotice({ title: project.title, body: '파워뱅크의 배터리 상태, 진단 정보와 운영 이력을 확인하는 통합관리시스템 화면 예시입니다. 실제 프로젝트 상세 콘텐츠는 추후 연결할 수 있습니다.' })}>프로젝트 상세 보기 <Arrow/></button><div className="project-dots" aria-label="프로젝트 화면 선택">{projectViews.map((view, index) => <button key={view.title} aria-label={`${index + 1}. ${view.title}`} aria-pressed={slide === index} className={slide === index ? 'active' : ''} onClick={() => setSlide(index)}/>)}</div></div></div><Dashboard slide={slide}/></div></div></section>
    </main>

    <Footer/>
    {notice && <Notice notice={notice} onClose={() => setNotice(null)}/>}
  </>
}

