import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import { searchNews, newsListUrl } from '../data/news.js'
import './news.css'

const PAGE_SIZE = 7

export default function NewsPage() {
  const params = new URLSearchParams(window.location.search)
  const query = (params.get('q') || '').trim()
  const posts = searchNews(query)
  const pageCount = Math.max(1, Math.ceil(posts.length / PAGE_SIZE))
  const requestedPage = Number(params.get('page'))
  const page = Math.min(pageCount, Math.max(1, Number.isSafeInteger(requestedPage) ? requestedPage : 1))
  const visiblePosts = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const context = newsListUrl(query, page).replace('/news', '')

  function pageControl(label, text, target, disabled) {
    return disabled
      ? <button type="button" disabled aria-label={label}>{text}</button>
      : <a aria-label={label} href={newsListUrl(query, target)}>{text}</a>
  }

  return <>
    <a className="skip-link" href="#main-content">본문 바로가기</a>
    <Header variant="light" />
    <main id="main-content" className="news-page">
      <div className="container">
        <div className="news-page-heading">
          <p className="news-page-label">소식</p>
          <h1>그린베이스 소식</h1>
          <p>그린베이스의 새로운 소식을 만나보세요</p>
        </div>

        <form className="news-search" action="/news" method="get" role="search">
          <label className="visually-hidden" htmlFor="news-query">소식 제목 및 본문 검색</label>
          <input id="news-query" type="search" name="q" defaultValue={query} placeholder="검색어를 입력하세요" />
          <button type="submit" aria-label="소식 검색">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="2" /><path d="m15 15 6 6" stroke="currentColor" strokeWidth="2" /></svg>
          </button>
        </form>
        {query && <div className="news-search-summary"><p>“{query}” 검색 결과 {posts.length}건</p><a href="/news">전체 소식 보기</a></div>}

        <table className="news-table">
          <caption className="visually-hidden">그린베이스 소식 목록</caption>
          <thead><tr><th scope="col">번호</th><th scope="col">제목</th><th scope="col">작성일</th></tr></thead>
          <tbody>
            {visiblePosts.map(post => <tr key={post.id}>
              <td>{post.number}</td>
              <td><a href={`/news/${post.id}${context}`}>{post.title}</a></td>
              <td><time dateTime={post.date}>{post.displayDate}</time></td>
            </tr>)}
            {!visiblePosts.length && <tr><td colSpan={3} className="news-empty">검색 결과가 없습니다. 다른 검색어를 입력해 주세요.</td></tr>}
          </tbody>
        </table>

        <nav className="news-pagination" aria-label="소식 페이지 선택">
          {pageControl('첫 페이지', '«', 1, page === 1)}
          {pageControl('이전 페이지', '‹', page - 1, page === 1)}
          {Array.from({ length: Math.min(pageCount, 5) }, (_, i) => {
            const number = Math.max(1, Math.min(page - 2, pageCount - 4)) + i
            return <a key={number} href={newsListUrl(query, number)} aria-label={`${number} 페이지`} aria-current={page === number ? 'page' : undefined}>{number}</a>
          })}
          {pageControl('다음 페이지', '›', page + 1, page === pageCount)}
          {pageControl('마지막 페이지', '»', pageCount, page === pageCount)}
        </nav>
      </div>
    </main>
    <Footer />
  </>
}
