import MainPage from './page/main.jsx'
import ServicePage from './page/service.jsx'
import ProjectPage from './page/project.jsx'
import ProjectDetailPage from './page/project-detail.jsx'
import NewsPage from './page/news.jsx'
import NewsDetailPage from './page/news-detail.jsx'
import CompanyInfoPage from './page/companyInfo.jsx'
import './components/layout.css'
import usePageMotion from './hooks/use-page-motion.js'
import useSmoothWheel from './hooks/use-smooth-wheel.js'
import './components/motion.css'
import { appPath } from './utils/site-url.js'

export default function App() {
  usePageMotion()
  useSmoothWheel()
  const path = appPath()
  if (path === '/companyInfo') return <CompanyInfoPage />
  if (path === '/service') return <ServicePage />
  if (path === '/news') return <NewsPage />
  if (path.startsWith('/news/')) return <NewsDetailPage postId={path.slice('/news/'.length)} />
  if (path === '/project') return <ProjectPage />
  if (path.startsWith('/project/')) return <ProjectDetailPage projectId={path.slice('/project/'.length)} />
  return <MainPage />
}
