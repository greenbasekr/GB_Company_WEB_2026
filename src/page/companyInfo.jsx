import { siteUrl } from '../utils/site-url.js'
import { useState } from 'react'
import Hero from '../components/hero.jsx'
import Footer from '../components/footer.jsx'
import './companyInfo.css'
import certify1 from '../image/docs/certify-1.jpg'
import certify2 from '../image/docs/certify-2.jpg'
import certify3 from '../image/docs/certify-3.jpg'
import certify4 from '../image/docs/certify-4.jpg'
import certify5 from '../image/docs/certify-5.jpg'
import certify6 from '../image/docs/certify-6.jpg'
import certify7 from '../image/docs/certify-7.jpg'
import certify8 from '../image/docs/certify-8.jpg'
import certify9 from '../image/docs/certify-9.jpg'

// 원본 배터리 사진·기술 사진이 준비되면 각 경로를 교체하세요.
const placeholder = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85'
const companyImages = { hero: placeholder, technology: placeholder }
const technologies = [
  { title: '배터리 분리', description: '전기차에서 분리된 배터리 팩과 모듈을 확인하고, 재사용 평가를 위한 시험 대상을 준비합니다.' },
  { title: '배터리 검사', description: '충·방전 장비를 제어해 시험을 진행하고 용량과 내부저항을 측정합니다. 측정값을 배터리별로 기록합니다.' },
  { title: '배터리 평가', description: '검사 결과를 분석해 팩과 모듈의 잔존성능을 평가하고, 다른 용도로 재사용할 수 있는지 판단할 자료를 제공합니다.' },
]
// 제공된 원본 파일과 명칭을 순서대로 연결합니다.
const credentials = [
  { id: 'patent-1', type: '특허', title: '배터리 관리 시스템 및 이를 이용한 배터리 상태값 예측 방법', image: certify1 },
  { id: 'patent-2', type: '특허', title: '전기자동차 재사용배터리 모듈 평가 장치', image: certify2 },
  { id: 'patent-3', type: '특허', title: '모듈 밸런싱 기능을 가지는 재활용 배터리 모듈 충방전 장치 및 방법', image: certify3 },
  { id: 'certificate-1', type: '인증', title: '기업부설연구소 인정서', image: certify4 },
  { id: 'certificate-2', type: '인증', title: '벤처기업확인서', image: certify5 },
  { id: 'certificate-3', type: '인증', title: '공장등록증명서', image: certify6 },
  { id: 'certificate-4', type: '인증', title: '직접생산확인증명서', image: certify7 },
  { id: 'certificate-5', type: '인증', title: '일·생활균형 캠페인 참여확인서', image: certify8 },
  { id: 'certificate-6', type: '인증', title: '성과공유기업 확인서', image: certify9 },
]
const locations = [
  { label: '본사 · 제주', address: '제주특별자치도 제주시 중앙로 217, 3층', detail: '이도이동, 제주벤처마루', query: '제주특별자치도 제주시 중앙로 217' },
  { label: '기업부설연구소 · 안양', address: '경기도 안양시 만안구 안양로 111, 1303호', detail: '안양동, 경기벤처센터', query: '경기도 안양시 만안구 안양로 111' },
]

function SectionHeading({ eyebrow, title }) {
  return <div className="company-section-heading"><p>{eyebrow}</p><h2>{title}</h2></div>
}

export default function CompanyInfoPage() {
  const [filter, setFilter] = useState('전체')
  const [selectedId, setSelectedId] = useState('certificate-4')
  const filtered = credentials.filter(item => filter === '전체' || item.type === filter)
  const selected = credentials.find(item => item.id === selectedId)

  function changeFilter(value) {
    setFilter(value)
    const matches = credentials.filter(item => value === '전체' || item.type === value)
    if (!matches.some(item => item.id === selectedId)) setSelectedId(matches[0].id)
  }

  return <>
    <Hero eyebrow="GREENBASE / COMPANY" title={<>A BATTERY DATA<br />SPECIALIZED<br />COMPANY</>} description="배터리 진단부터 에너지 관리까지" backgroundImage={companyImages.hero} className="company-hero">
      <a href={siteUrl('/project')} className="hero-button">프로젝트 살펴보기 <span aria-hidden="true">→</span></a>
    </Hero>
    <main id="main-content" className="company-page">
      <section className="company-intro">
        <div className="container company-two-columns">
          <SectionHeading eyebrow="WHO WE ARE" title="그린베이스를 소개합니다" />
          <div className="company-intro-copy">
            <h3>전기차에서 내려온 배터리,<br /><span>어디에 다시 쓸 수 있을까요?</span></h3>
            <p>그린베이스는 사용 후 배터리의 상태를 측정하고 데이터를 분석합니다. 남은 성능을 평가하는 기술부터 재사용 배터리를 적용한 에너지저장장치(ESS)의 운영 소프트웨어까지 개발합니다.</p>
            <dl className="company-facts"><div><dt>주요 분야</dt><dd>재사용 배터리 데이터 분석</dd></div><div><dt>사업 거점</dt><dd>제주 본사 &amp; 안양 연구소</dd></div></dl>
          </div>
        </div>
      </section>

      <section className="company-technology">
        <div className="container">
          <SectionHeading eyebrow="TECHNOLOGY" title="보유 기술" />
          <div className="company-technology-list">
            {technologies.map((item, index) => <article className="company-technology-row" key={item.title}>
              <img src={companyImages.technology} alt={`${item.title} 소개용 임시 설비 사진`} loading="lazy" />
              <div className="company-technology-copy"><p className="company-step">0{index + 1}/</p><h3>{item.title}</h3><p>{item.description}</p></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="company-credentials">
        <div className="container company-two-columns">
          <div>
            <SectionHeading eyebrow="PATENTS & CREDENTIALS" title="특허 및 인증" />
            <figure className="company-credential-preview" aria-live="polite">
              <img key={selected.id} src={selected.image} alt={selected.title} loading="lazy" />
              <figcaption title={selected.title}>{selected.title}</figcaption>
            </figure>
          </div>
          <div className="company-credentials-list">
            <div className="company-credential-filters" aria-label="특허 및 인증 분류">
              {['전체', '특허', '인증'].map(type => <button key={type} type="button" aria-pressed={filter === type} onClick={() => changeFilter(type)}>{type} {credentials.filter(item => type === '전체' || item.type === type).length}</button>)}
            </div>
            <ul>{filtered.map(item => <li key={item.id}><button type="button" aria-pressed={selectedId === item.id} onClick={() => setSelectedId(item.id)}><span>{item.type}</span><span>{item.title}</span></button></li>)}</ul>
          </div>
        </div>
      </section>

      <section className="company-organization">
        <div className="container company-two-columns">
          <SectionHeading eyebrow="ORGANIZATION" title="그린베이스의 조직" />
          <div className="company-organization-content">
            <p className="company-representative"><span>대표</span><strong>양신현</strong></p>
            <dl>
              <div><dt>본사</dt><dd><h3>기획관리팀</h3><p>프로젝트 기획·관리, 회계 및 경영지원</p></dd></div>
              <div><dt>기업부설연구소</dt><dd><section><h3>배터리 SW시스템 개발팀</h3><p>잔존가치 평가 소프트웨어와 데이터 관리 서버 개발</p></section><section><h3>잔존가치 HW시스템 개발팀</h3><p>잔존가치 평가 장비와 배터리·ESS 시스템 설계 및 개발</p></section></dd></div>
              <div><dt>공장</dt><dd><h3>잔존가치 HW 시스템 생산</h3><p>충·방전기와 배터리·ESS 시스템 설계 및 개발</p></dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="company-contact">
        <div className="container company-two-columns">
          <div><SectionHeading eyebrow="CONTACT" title="오시는 길" /></div>
          <div className="company-contact-locations">
            {locations.map(location => <article key={location.label}><div><p className="company-location-label">{location.label}</p><h3>{location.address}</h3><p>{location.detail}</p></div><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.query)}`} target="_blank" rel="noopener noreferrer" aria-label={`${location.label} 지도 보기 (새 탭)`}>지도 보기 ↗</a></article>)}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
}
