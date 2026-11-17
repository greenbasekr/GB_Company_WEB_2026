import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Hero from '../components/hero.jsx'
import Footer from '../components/footer.jsx'
import './service.css'
import bmsBoardImage from '../image/service/bms1-1.jpg'
import bmsEquipmentImage from '../image/service/bms2-1.jpg'

// 실제 서비스 이미지가 준비되면 이 경로를 교체하세요.
const evaluationImage = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=85'

// 첫 분야는 제공된 시안의 내용이며, 나머지 분야 설명은 메인 소개에 기반한 초안입니다.
const services = [
  {
    title: '에너지 및 배터리 관리',
    introduction: '사용 후 배터리의 잔존성능을 평가하고, 재사용 이후의 충전 및 방전과 ESS 운전 상태를 관리합니다.',
    heading: '재사용 배터리 평가',
    description: '전기 자동차에서 분리한 팩과 모듈에 충전 및 방전 시험을 수행합니다. 측정한 용량과 내부저항을 바탕으로 잔존 성능을 평가해 재사용 판단에 필요한 자료를 제공합니다.',
    steps: [['팩·모듈 확인', '평가 대상 등록'], ['충·방전 시험', '시험 조건 설정과 장비 제어'], ['잔존성능 평가', '용량과 내부저항 분석'], ['결과 확인', '재사용 판단에 활용']],
    detailTitle: '재사용 BMS와 데이터 센싱',
    detail: '용량과 출력 특성이 비슷한 모듈을 묶어 재사용할 때, BMS로 배터리 상태를 확인합니다. 이동형 수집 장비는 현장에서 모듈 데이터를 수집하고 기록합니다.',
  },
  {
    title: '빅데이터 및 AI 분석', introduction: '시계열 데이터를 분석해 설비와 배터리의 이상 징후를 확인합니다.',
    heading: '운영 데이터 분석', description: '수집한 데이터를 시간의 흐름에 따라 살펴보고, 정상적인 운영 패턴과 다른 변화를 확인합니다.',
    steps: [['데이터 수집', '운영 데이터 취합'], ['데이터 정리', '분석 항목 확인'], ['패턴 분석', '상태 변화 확인'], ['결과 확인', '이상 징후 검토']],
    detailTitle: '데이터로 확인하는 운영 상태', detail: '축적된 운영 이력을 바탕으로 상태 변화를 확인하고 관리에 필요한 정보를 제공합니다.',
  },
  {
    title: '모바일/웹 통합 솔루션', introduction: '관제부터 운영까지, 모바일과 웹에서 필요한 정보를 확인합니다.',
    heading: '하나로 연결되는 운영 화면', description: 'PC와 모바일 환경에 맞춘 화면으로 주요 상태와 운영 이력을 확인할 수 있도록 구성합니다.',
    steps: [['정보 연결', '운영 데이터 연동'], ['화면 구성', '주요 지표 표시'], ['상태 확인', 'PC·모바일 모니터링'], ['이력 조회', '운영 기록 확인']],
    detailTitle: '어디서나 확인하는 운영 정보', detail: '다양한 화면 크기에 맞춘 인터페이스로 관제와 현장 업무를 지원합니다.',
  },
  {
    title: '스마트 팩토리 및 산업 IoT', introduction: '현장 설비와 센서의 데이터를 수집하고 운영 시스템에 연결합니다.',
    heading: '현장 설비 데이터 연동', description: '설비와 센서에서 발생하는 정보를 모아 현장의 상태를 확인할 수 있도록 구성합니다.',
    steps: [['설비 확인', '연동 대상 파악'], ['센서 연결', '데이터 수집'], ['정보 통합', '운영 시스템 연동'], ['현황 확인', '설비 상태 모니터링']],
    detailTitle: '현장과 시스템의 연결', detail: '분산된 설비 정보를 연결해 운영 현황을 확인하고 관리할 수 있도록 지원합니다.',
  },
  {
    title: '환경 및 안전 관리', introduction: '환경 및 안전 센서의 상태를 모니터링하고 필요한 알림을 제공합니다.',
    heading: '환경과 안전 상태 모니터링', description: '현장의 환경 정보를 수집하고 주요 상태 변화를 확인할 수 있도록 지원합니다.',
    steps: [['센서 확인', '모니터링 대상 등록'], ['정보 수집', '환경 데이터 연동'], ['상태 확인', '변화 모니터링'], ['알림 확인', '현장 상태 검토']],
    detailTitle: '상태 변화와 알림 관리', detail: '환경 데이터와 알림 이력을 함께 확인해 현장 관리에 활용합니다.',
  },
]

function EquipmentPreview({ kind }) {
  const title = kind === 'board' ? '재사용 배터리용 BMS 보드' : '이동형 데이터 수집 장비'
  return <figure className="equipment-figure">
    <div className="equipment-image">
      <img src={kind === 'board' ? bmsBoardImage : bmsEquipmentImage} alt={title} loading="lazy" />
    </div>
    <figcaption>{title}</figcaption>
  </figure>
}

export default function ServicePage() {
  const [selected, setSelected] = useState(0)
  const service = services[selected]
  const tabsRef = useRef(null)
  const panelRef = useRef(null)
  const previousTab = useRef(selected)
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const tabs = tabsRef.current
    const active = tabs.querySelector('[aria-selected="true"]')
    let disposed = false
    const measure = () => {
      if (!disposed) setIndicator({ left: active.offsetLeft, width: active.offsetWidth })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(tabs)
    observer.observe(active)
    document.fonts.ready.then(measure)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (active.offsetLeft < tabs.scrollLeft || active.offsetLeft + active.offsetWidth > tabs.scrollLeft + tabs.clientWidth) {
      tabs.scrollTo({ left: Math.max(0, active.offsetLeft - 12), behavior: reduced ? 'instant' : 'smooth' })
    }
    return () => { disposed = true; observer.disconnect() }
  }, [selected])

  useEffect(() => {
    const oldTab = previousTab.current
    previousTab.current = selected
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (oldTab === selected || preference.matches || !panelRef.current.animate) return
    const animation = panelRef.current.animate(
      [{ opacity: .3, translate: `${selected > oldTab ? 20 : -20}px 0` }, { opacity: 1, translate: '0 0' }],
      { duration: 400, easing: 'cubic-bezier(.22, 1, .36, 1)' },
    )
    const stop = () => { if (preference.matches) animation.cancel() }
    preference.addEventListener('change', stop)
    return () => { animation.cancel(); preference.removeEventListener('change', stop) }
  }, [selected])

  function selectTab(index) {
    setSelected(index)
    document.getElementById(`service-tab-${index}`)?.focus()
  }

  return <>
    <Hero className="service-hero" eyebrow="GREENBASE / SERVICE" title={<>GREENBASE<br />SERVICE</>} description="배터리 평가에서 설비 모니터링과 운영 소프트웨어까지" bottom={
      <div className="service-tabs-bar">
        <div ref={tabsRef} className="container service-tabs" role="tablist" aria-label="서비스 분야">
          <span className="service-tab-indicator" aria-hidden="true" style={{ width: indicator.width, transform: `translateX(${indicator.left}px)` }} />
          {services.map((item, index) => (
            <button key={item.title} id={`service-tab-${index}`} role="tab" aria-selected={selected === index} aria-controls="service-panel" tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => {
              const target = { ArrowRight: (selected + 1) % services.length, ArrowLeft: (selected + services.length - 1) % services.length, Home: 0, End: services.length - 1 }[event.key]
              if (target !== undefined) { event.preventDefault(); selectTab(target) }
            }}>{item.title}</button>
          ))}
        </div>
      </div>
    } />
    <main id="main-content" className="service-page">
      <div ref={panelRef} id="service-panel" role="tabpanel" aria-labelledby={`service-tab-${selected}`} tabIndex={0}>
        <section className="service-overview">
          <div className="container">
            <div className="service-introduction"><p className="service-number">0{selected + 1}/</p><h2>{service.title}</h2><p>{service.introduction}</p></div>
            <div className="service-explanation-layout">
              <div className="service-explanation"><h3>{service.heading}</h3><p>{service.description}</p></div>
              <img className="service-explanation-image" src={evaluationImage} alt="서비스 소개용 임시 설비 이미지" loading="lazy" />
            </div>
            <ol className="service-process">{service.steps.map(([title, description]) => <li key={title}><h4>{title}</h4><p>{description}</p></li>)}</ol>
          </div>
        </section>
        <section className="service-detail">
          <div className={`container service-detail-layout${selected !== 0 ? ' text-only' : ''}`}>
            <div className="service-detail-copy"><h3>{service.detailTitle}</h3><p>{service.detail}</p></div>
            {selected === 0 && <div className="equipment-gallery"><EquipmentPreview kind="board" /><EquipmentPreview kind="cabinet" /></div>}
          </div>
        </section>
      </div>
    </main>
    <Footer />
  </>
}
