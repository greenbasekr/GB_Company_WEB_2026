// 시안 확인용 게시글입니다. 실제 소식 또는 API 응답으로 교체하세요.
const topics = ['홈페이지', '배터리 진단', '에너지 관리', '데이터 분석', '모바일 관제', '산업 IoT', '환경 및 안전']
export const newsPosts = topics.map((topic, index) => ({
  id: String(7 - index),
  number: 7 - index,
  category: '기업소식',
  title: '소식 제목',
  date: '2026-11-04',
  displayDate: '26.11.04',
  paragraphs: [
    `${topic} 관련 소식을 소개하는 예시 게시글입니다.`,
    '현재 본문은 게시판 화면과 상세 페이지의 동작을 확인하기 위한 임시 콘텐츠입니다. 실제 소식이 준비되면 제목, 작성일과 본문을 교체해 주세요.',
    '그린베이스의 새로운 소식을 이곳에서 전해드리겠습니다.',
  ],
}))

export function searchNews(query) {
  const term = query.trim().toLocaleLowerCase()
  return newsPosts.filter(post => `${post.title} ${post.paragraphs.join(' ')}`.toLocaleLowerCase().includes(term))
}

export function newsListUrl(query = '', page = 1) {
  const params = new URLSearchParams()
  if (query) params.set('q', query)
  if (page > 1) params.set('page', String(page))
  return `/news${params.size ? `?${params}` : ''}`
}
