import { siteUrl } from '../utils/site-url.js'
import { useEffect, useRef, useState } from 'react'
import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import './project-detail.css'

// 자동 전환 간격. 각 슬라이드의 src와 title을 실제 화면 이미지/제목으로 교체하세요.
const SLIDE_DURATION = 5000
const images = [
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1400&q=85',
]
const diagnosisTitles = ['진단 검사 메인 페이지', '배터리 상태 모니터링', '충·방전 시험 현황', '용량 및 출력 분석', 'DC-IR 검사 결과', '수명시험 이력', '배터리 등급 분류', '진단 결과 보고서']
const makeSlides = titles => titles.map((title, index) => ({ title, src: images[index % images.length] }))
const projectDetails = {
  'battery-diagnosis': {
    category: '배터리 진단', title: '배터리 성능진단 시스템', subtitle: 'Battery Evaluation System / StandAlone',
    summary: '충·방전 시험의 진행 상태부터 배터리별 잔존성능 평가 결과까지 한 시스템에 담았습니다.',
    paragraphs: [
      'EV 사용 후 배터리 팩 입고 시 모듈 단위로 재사용 또는 재제조를 위한 배터리의 잔존수명을 평가함.',
      '사용 후 배터리 모듈의 충전 상태(SOC), 건강 상태(SOH), 용량, 출력, DC-IR, 수명시험 및 신뢰성 평가 등을 실시하여 배터리 등급을 분류함.',
    ],
    slides: makeSlides(diagnosisTitles),
  },
  powerbank: {
    category: '모바일·웹 관제', title: '파워뱅크 통합관리시스템', subtitle: 'Power Bank Management System',
    summary: '배터리 상태 모니터링과 진단, 이력 관리를 통한 파워뱅크 운영을 지원합니다.',
    paragraphs: ['파워뱅크의 주요 상태와 배터리 정보를 한눈에 확인합니다.', '운영 데이터와 진단 정보를 함께 확인하고, 축적된 이력을 운영 관리에 활용합니다.'],
    slides: makeSlides(['통합 모니터링 메인 페이지', '파워뱅크 운영 현황', '배터리 상태 확인', '운영 데이터 이력', '진단 정보 확인', '알림 및 이벤트', '모바일 관제 화면', '운영 관리 화면']),
  },
  'result-1': { category: '프로젝트', title: '결과 확인', subtitle: '', summary: '프로젝트 결과 자료가 준비 중입니다.', paragraphs: ['현재 이미지는 슬라이드 기능 확인을 위한 임시 이미지입니다.'], slides: makeSlides(['프로젝트 결과 예시 1', '프로젝트 결과 예시 2', '프로젝트 결과 예시 3']) },
  'result-2': { category: '프로젝트', title: '결과 확인', subtitle: '', summary: '프로젝트 결과 자료가 준비 중입니다.', paragraphs: ['현재 이미지는 슬라이드 기능 확인을 위한 임시 이미지입니다.'], slides: makeSlides(['프로젝트 결과 예시 1', '프로젝트 결과 예시 2', '프로젝트 결과 예시 3']) },
}

function SlideIcon({ type }) {
  const paths = {
    previous: <path d="m14 5-7 7 7 7" />,
    next: <path d="m10 5 7 7-7 7" />,
    pause: <path d="M8 5v14M16 5v14" />,
    play: <path d="m8 5 11 7-11 7Z" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>
}

function ImageViewer({ slide, index, total, onMove, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return <dialog
    ref={dialogRef}
    className="slide-image-viewer"
    aria-labelledby="image-viewer-title"
    onCancel={event => { event.preventDefault(); onClose() }}
    onClick={event => { if (event.target === event.currentTarget) onClose() }}
    onKeyDown={event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault()
        onMove(event.key === 'ArrowLeft' ? -1 : 1)
      }
    }}
  >
    <div className="image-viewer-content">
      <div className="image-viewer-heading"><h2 id="image-viewer-title">{slide.title}</h2><button type="button" autoFocus aria-label="확대 이미지 닫기" onClick={onClose}><SlideIcon type="close" /></button></div>
      <img key={index} className="image-viewer-photo" src={slide.src} alt={slide.title} />
      <div className="image-viewer-controls">
        <button type="button" aria-label="이전 이미지" onClick={() => onMove(-1)}><SlideIcon type="previous" /></button>
        <span aria-live="polite">( {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} )</span>
        <button type="button" aria-label="다음 이미지" onClick={() => onMove(1)}><SlideIcon type="next" /></button>
      </div>
    </div>
  </dialog>
}

function ProjectSlideshow({ slides }) {
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [paused, setPaused] = useState(false)
  const [viewerOpen, setViewerOpen] = useState(false)
  const elapsed = useRef(0)
  const slide = slides[index]

  function moveSlide(direction) {
    elapsed.current = 0
    setProgress(0)
    setReady(false)
    setFailed(false)
    setIndex(current => (current + direction + slides.length) % slides.length)
  }

  useEffect(() => {
    if (!ready || paused || viewerOpen || slides.length < 2) return
    let frame
    let previous = performance.now()
    function tick(now) {
      // 다른 탭을 보는 동안에는 진행 시간을 누적하지 않습니다.
      if (!document.hidden) elapsed.current += Math.min(now - previous, 100)
      previous = now
      if (elapsed.current >= SLIDE_DURATION) {
        elapsed.current = 0
        setProgress(0)
        setReady(false)
        setFailed(false)
        setIndex(current => (current + 1) % slides.length)
        return
      }
      setProgress(elapsed.current / SLIDE_DURATION * 100)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [index, paused, viewerOpen, ready, slides.length])

  useEffect(() => {
    const next = new Image()
    next.src = slides[(index + 1) % slides.length].src
  }, [index, slides])

  return (
    <>
    <figure className="project-slideshow" aria-label="프로젝트 화면 슬라이드">
      <div className="detail-slide-image">
        <button className="detail-slide-enlarge" type="button" aria-label={`${slide.title} 크게 보기`} aria-haspopup="dialog" onClick={() => setViewerOpen(true)} disabled={failed}>
          <img key={index} src={slide.src} alt={slide.title} onLoad={() => setReady(true)} onError={() => { setFailed(true); setReady(true) }} hidden={failed} />
        </button>
        {failed && <p className="slide-image-error">이미지를 불러올 수 없습니다. 다음 이미지로 넘어갑니다.</p>}
      </div>
      <div className="slide-progress" role="progressbar" aria-label="다음 이미지까지 진행도" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.floor(progress)}>
        <div className="slide-progress-fill" style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
      <figcaption className="detail-slide-caption">
        <span className="detail-slide-title" key={index}>{slide.title}</span>
        <div className="detail-slide-controls">
          <div className="detail-slide-buttons">
            <button type="button" onClick={() => moveSlide(-1)} aria-label="이전 이미지" title="이전 이미지"><SlideIcon type="previous" /></button>
            <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? '슬라이드 자동 재생' : '슬라이드 일시 정지'} title={paused ? '재생' : '일시 정지'}><SlideIcon type={paused ? 'play' : 'pause'} /></button>
            <button type="button" onClick={() => moveSlide(1)} aria-label="다음 이미지" title="다음 이미지"><SlideIcon type="next" /></button>
          </div>
          <span className="detail-slide-count">( {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')} )</span>
        </div>
      </figcaption>
    </figure>
    {viewerOpen && <ImageViewer slide={slide} index={index} total={slides.length} onMove={moveSlide} onClose={() => setViewerOpen(false)} />}
    </>
  )
}

export default function ProjectDetailPage({ projectId }) {
  const project = projectDetails[projectId]
  return <>
    <a className="skip-link" href="#main-content">본문 바로가기</a>
    <Header variant="light" />
    <main id="main-content" className="project-detail-page">
      <div className="container">
        {project ? <>
          <div className="project-detail-heading">
            <p className="detail-category">{project.category}</p>
            <a className="detail-list-link" href={siteUrl('/project')}>프로젝트 목록 →</a>
            <h1>{project.title}</h1>
            {project.subtitle && <p className="detail-subtitle">{project.subtitle}</p>}
            <p className="detail-summary">{project.summary}</p>
          </div>
          <div className="project-detail-content">
            <div className="project-detail-description">{project.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
            <ProjectSlideshow key={projectId} slides={project.slides} />
          </div>
        </> : <div className="project-detail-heading"><h1>프로젝트를 찾을 수 없습니다.</h1><a className="detail-list-link" href={siteUrl('/project')}>프로젝트 목록 →</a></div>}
      </div>
    </main>
    <Footer />
  </>
}
