import Logo from './logo.jsx'

export default function Footer() {
  return (
    <footer className="site-footer" id="about">
      <div className="container footer-inner">
        <Logo tone="white" />
        <div className="footer-details">
          <p><b>대 표</b> 양신현 <span>·</span> <b>사업자등록번호</b> 728-87-01544</p>
          <p><b>전 화</b> <a href="tel:0317543335">031-754-3335</a> <span>·</span> <b>팩 스</b> 0504-321-3339 <span>·</span> <b>이메일</b> <a href="mailto:info@greenbase.co.kr">info@greenbase.co.kr</a></p>
          <p><b>본 사</b> 제주특별자치도 제주시 중앙로 217, 3층 (이도이동, 제주벤처마루)</p>
          <p><b>연구소</b> 경기도 안양시 만안구 안양로 111, 1303호 (안양동, 경기벤처센터)</p>
          <div className="footer-bottom"><p>ⓒ 그린베이스 All Rights Reserved.</p></div>
        </div>
      </div>
    </footer>
  )
}
