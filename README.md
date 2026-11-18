# GB 홈페이지

React + Vite 기반 JavaScript 프론트엔드 프로젝트입니다.

## 실행

```powershell
npm install
npm run dev
```

터미널에 표시되는 로컬 주소(기본값: http://localhost:5173)로 접속합니다.
`npm start`로도 개발 서버를 실행할 수 있습니다. 종료는 `Ctrl+C`입니다.

## 빌드

```powershell
npm run build
npm run preview
```

배포 파일은 `dist/`에 생성됩니다. preview는 빌드 결과를 로컬에서 확인하는 명령입니다.

## 주요 파일

- `src/App.jsx`: 메인 화면
- `src/index.css`: 공통 스타일
- `src/main.jsx`: React 진입점
- `index.html`: 문서 제목, 메타 정보
- `vite.config.js`: Vite 설정

## Node.js

Node.js 24 사용을 권장하며 `.nvmrc`에 버전을 지정했습니다.
현재 PC의 Node.js 16에서도 설치 후 `npm run dev`와 `npm run build`를 실행할 수 있도록
프로젝트 개발 의존성에 Node.js 24를 포함했습니다. npm 스크립트는 이 로컬 실행 파일을 사용합니다.
의존성을 새로 설치하거나 업데이트할 때는 시스템 Node.js도 24로 올리는 것을 권장합니다.
`.tools/`는 최초 설정에 사용한 로컬 도구 폴더이며 Git에 포함되지 않습니다.

## 페이지와 공통 레이아웃

- `/`: `src/page/main.jsx`
- `/service`: `src/page/service.jsx`
- 공통 헤더·푸터: `src/components/header.jsx`, `src/components/footer.jsx`
- 공통 히어로: `src/components/hero.jsx`
- 공통 스타일: `src/components/layout.css`

양옆 여백은 각각 화면 너비의 10%입니다 (`--page-gutter`).
히어로 높이(`--hero-height`)는 모든 페이지에서 동일합니다.

- 640px 이하: 640px
- 641px ~ 1439px: 650px
- 1440px 이상: 780px

서비스 메뉴는 `/service`로 이동하며, 분야 탭으로 내용을 전환합니다.
배터리 관리 외 분야의 상세 내용은 메인 소개를 바탕으로 작성한 초안입니다.
배경·로고와 서비스 장비 도식은 원본 에셋 제공 후 교체할 수 있습니다.
정적 호스팅 배포 시 `/service` 직접 접속을 위해 모든 페이지 요청을 `index.html`로 연결하는 SPA fallback 설정이 필요합니다.

## 프로젝트 페이지

- `/project`: `src/page/project.jsx` (스타일: `src/page/project.css`)
- 공통 헤더의 프로젝트 메뉴에서 이동합니다.
- 이미지 교체: `project.jsx`의 `projects` 배열 안에서 각 카드의 `image` 경로를 변경합니다.
- 여백과 히어로 높이는 `components/layout.css`의 공통 값을 그대로 사용합니다.
- 하단 두 카드와 상세 안내는 임시 콘텐츠입니다.

## 프로젝트 상세와 자동 슬라이드

- 상세 페이지: `src/page/project-detail.jsx`, `src/page/project-detail.css`
- 경로: `/project/battery-diagnosis`, `/project/powerbank` 등 카드의 ID 사용
- 히어로 없이 밝은 배경의 공통 헤더를 사용하며, 양옆 여백 10%는 유지합니다.
- `프로젝트 목록 →`은 `/project`로 돌아갑니다.
- `SLIDE_DURATION`: 이미지당 재생 시간(ms), 현재 5000.
- `projectDetails`의 `slides`: 각 이미지의 `src`와 `title`. 번호와 총 개수는 배열 길이에 맞춰 자동 계산됩니다.
- 현재는 임시 사진 3종을 반복해 8개 화면을 구성했습니다. 실제 화면 이미지와 제목으로 교체하세요.
- 이미지 하단 진행바는 2px 회색 바탕과 짙은 녹색 채움으로 구성됩니다.
- 진행 완료 시 다음 이미지로 전환하고 0으로 초기화하며, 마지막 이미지 다음에는 첫 이미지로 돌아갑니다.
- 이미지 로딩 중과 숨겨진 브라우저 탭에서는 진행을 대기하며, 일시 정지/재생 버튼을 제공합니다.

## 소식 게시판

- 목록 `/news`: `src/page/news.jsx`
- 상세 `/news/:id`: `src/page/news-detail.jsx`
- 게시글 데이터: `src/data/news.js` (현재 시안용 임시 게시글 7개)
- 스타일: `src/page/news.css`
- 제목·본문 검색, 페이지당 7개 표시, 이전·다음 글, 목록 복귀를 지원합니다.
- 검색어와 페이지는 URL 쿼리에 저장해 상세에서 목록으로 돌아갈 때 유지합니다.
- 메인의 소식 항목과 전체 보기, 공통 헤더의 소식 메뉴도 게시판으로 연결됩니다.
- 실제 저장/API 연동은 포함하지 않았습니다. 게시글 데이터 파일을 교체하거나 API로 연결할 수 있습니다.

## 회사소개

- `/companyInfo`: `src/page/companyInfo.jsx`, `src/page/companyInfo.css`
- 공통 헤더의 회사소개 메뉴와 연결되며 공통 10% 여백 및 히어로 높이를 사용합니다.
- 회사 소개, 보유 기술, 특허·인증 필터와 미리보기, 조직, 오시는 길로 구성됩니다.
- `companyImages`는 임시 사진입니다. 특허·인증서는 `src/image/docs/certify-1.jpg`부터 `certify-9.jpg`까지 실제 파일을 사용합니다.
- 특허 3건과 인증 6건은 제공된 명칭에 맞춰 연결했습니다. 문서 미리보기는 원본 색상과 전체 내용을 유지합니다.
- 오시는 길의 지도 링크는 주소 검색 결과를 새 탭에서 엽니다.


## GitHub Pages 배포 (현재 설정)

Pages 설정은 `Deploy from a branch` → `main` → `/docs`를 사용합니다.

1. `npm run build` 실행: 배포 결과가 자동으로 `docs/`에 생성됩니다. dist를 복사하거나 이름을 바꿀 필요가 없습니다.
2. 변경된 소스와 `docs/`를 함께 커밋하고 `main`으로 푸시합니다.
3. GitHub Actions의 Pages 배포 완료 후 https://greenbasekr.github.io/GB_Company_WEB_2026/ 에서 확인합니다.

빌드 시 저장소 경로 `/GB_Company_WEB_2026/`가 적용됩니다. 개발 서버에서는 기존 `/` 경로를 사용합니다.
`src/utils/site-url.js`가 메뉴 및 게시글 링크의 배포 경로를 처리합니다.
Vite 빌드 플러그인은 각 페이지와 현재 게시글/프로젝트의 `index.html`도 생성하여 직접 접속과 새로고침을 지원합니다.
새 프로젝트 ID나 새 라우트를 추가하면 `vite.config.js`의 routes 목록도 갱신해야 합니다. 소식 ID는 데이터 파일에서 자동 반영됩니다.
배포 전 확인은 `npm run preview` 후 `/GB_Company_WEB_2026/`로 접속합니다.
