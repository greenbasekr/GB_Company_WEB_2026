import { siteUrl } from '../utils/site-url.js'
import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import { newsPosts, searchNews, newsListUrl } from '../data/news.js'
import './news.css'

export default function NewsDetailPage({ postId }) {
  const post = newsPosts.find(item => item.id === postId)
  const params = new URLSearchParams(window.location.search)
  const query = (params.get('q') || '').trim()
  const requestedPage = Number(params.get('page'))
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1
  const listUrl = newsListUrl(query, page)
  const context = listUrl.replace('/news', '')
  const matches = searchNews(query)
  const index = matches.findIndex(item => item.id === postId)
  const newer = index > 0 ? matches[index - 1] : null
  const older = index >= 0 ? matches[index + 1] : null

  return <>
    <a className="skip-link" href="#main-content">본문 바로가기</a>
    <Header variant="light" />
    <main id="main-content" className="news-page news-article-page">
      <div className="container">
        {post ? <article>
          <header className="news-article-heading">
            <p className="news-page-label">{post.category}</p>
            <h1>{post.title}</h1>
            <div className="news-article-meta"><span>그린베이스</span><time dateTime={post.date}>{post.date.replaceAll('-', '.')}</time></div>
          </header>
          <div className="news-article-body">{post.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          <nav className="news-adjacent" aria-label="다른 게시글">
            {[['이전 글', newer], ['다음 글', older]].map(([label, item]) => <div key={label}><span>{label}</span>{item ? <a href={siteUrl(`/news/${item.id}${context}`)}>{item.title}</a> : <p>{label}이 없습니다.</p>}{item && <time dateTime={item.date}>{item.displayDate}</time>}</div>)}
          </nav>
        </article> : <div className="news-page-heading"><p className="news-page-label">소식</p><h1>게시글을 찾을 수 없습니다.</h1><p>삭제되었거나 존재하지 않는 게시글입니다.</p></div>}
        <div className="news-article-actions"><a href={siteUrl(listUrl)}>소식 목록 →</a></div>
      </div>
    </main>
    <Footer />
  </>
}
