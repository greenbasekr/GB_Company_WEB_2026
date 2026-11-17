import Hero from '../components/hero.jsx'
import Footer from '../components/footer.jsx'
import './project.css'

// 카드별 image 경로를 실제 프로젝트 이미지로 교체하세요.
const placeholderImage = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85'
const projects = [
  {
    id: 'powerbank', category: '모바일·웹 관제', title: '파워뱅크 통합관리시스템',
    image: placeholderImage,
    description: '배터리 상태 모니터링과 진단, 이력 관리를 통해 파워뱅크 운영을 지원합니다. 상세 프로젝트 자료는 준비 중입니다.',
  },
  {
    id: 'battery-diagnosis', category: '배터리 진단', title: '배터리 성능진단 시스템',
    image: placeholderImage,
    description: '배터리의 충전 및 방전 데이터를 바탕으로 잔존 성능을 평가합니다. 상세 프로젝트 자료는 준비 중입니다.',
  },
  // 시안의 하단 두 카드는 실제 제목과 상세 자료가 준비되면 교체합니다.
  { id: 'result-1', category: '전체 보기 →', title: '결과 확인', image: placeholderImage, description: '프로젝트 결과 자료가 준비 중입니다.' },
  { id: 'result-2', category: '전체 보기 →', title: '결과 확인', image: placeholderImage, description: '프로젝트 결과 자료가 준비 중입니다.' },
]

export default function ProjectPage() {

  return (
    <>
      <Hero
        eyebrow="GREENBASE / PROJECT"
        title={<>POWERING A<br />SUSTAINABLE<br />FUTURE</>}
        description="다양한 프로젝트를 통해 비전에 한 발 더 가까이 가고 있습니다"
      />

      <main id="main-content">
        <section className="project-list-section" id="project-list" aria-labelledby="project-list-title">
          <div className="container">
            <p className="eyebrow">PROJECT</p>
            <h2 id="project-list-title">그린베이스 프로젝트</h2>
            <div className="project-gallery">
              {projects.map(project => (
                <article className="project-gallery-card" key={project.id}>
                  <a href={`/project/${project.id}`}>
                    <div className="project-gallery-image">
                      <img src={project.image} alt="" loading="lazy" />
                    </div>
                    <p className="project-gallery-category">{project.category}</p>
                    <h3>{project.title}</h3>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
