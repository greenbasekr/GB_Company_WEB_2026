import { siteUrl } from '../utils/site-url.js'
import greenLogo from '../image/greenbase_logo_green.png'
import whiteLogo from '../image/greenbase_logo_white.png'

export default function Logo({ tone = 'green' }) {
  return <a className="logo" href={siteUrl('/')} aria-label="그린베이스 홈"><img src={tone === 'white' ? whiteLogo : greenLogo} alt="greenbase" /></a>
}
