# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

포실이(귀여운 감자 캐릭터)를 메인으로 한 다운로드 허브 사이트.  
포실이가 만든 앱/웹사이트를 한 곳에서 소개하고 다운로드할 수 있는 정적 웹사이트.

## 파일 구조

```
index.html   — 메인 페이지 (섹션: Hero → Stats → 앱 → 웹 → 연락처 → Footer)
style.css    — 전체 스타일 (CSS 변수 기반, 모바일 반응형)
script.js    — 모바일 메뉴 · 스크롤 애니메이션 · 숫자 카운터
assets/
  posil.png          — 포실이 기본 (투명 배경, 2048×2048)
  posil-water.gif    — 물 주는 포실이 (Hero 캐릭터, 애니메이션)
  posil-sprout.png   — 싹난 포실이
  posil-icon.png     — 앱 아이콘 형태 (Header 로고 · Footer)
```

## 개발 방법

별도 빌드 없음. 브라우저에서 바로 열거나 로컬 서버로 실행:

```bash
npx serve .
# 또는
python3 -m http.server 8080
```

## 카드 추가 방법

### 앱 카드

`#apps` 섹션의 `.cards-grid` 안에 아래 HTML 복사 후 수정:

```html
<article class="card reveal">
  <div class="card-thumb" style="--grad: linear-gradient(135deg,#색상1,#색상2)">
    <img src="assets/아이콘.png" alt="앱 이름" class="card-thumb-img" />
  </div>
  <div class="card-body">
    <div class="card-top">
      <h3 class="card-name">앱 이름</h3>
      <span class="chip chip-new">NEW</span>
    </div>
    <p class="card-desc">앱 설명</p>
    <p class="card-version">버전 x.x.x</p>
  </div>
  <div class="card-footer">
    <a href="다운로드URL" class="btn-dl">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 16l-5-5h3V4h4v7h3l-5 5zm-7 4h14v-2H5v2z"/>
      </svg>
      다운로드
    </a>
    <a href="상세URL" class="btn-ghost">더 보기</a>
  </div>
</article>
```

### 웹 카드

`btn-dl`에 `btn-visit` 클래스 추가, `chip-web` 사용, `href` 는 외부 URL로.

## 색상 변수 (CSS)

| 변수 | 색상 | 용도 |
|------|------|------|
| `--posil` | `#c8933b` | 버튼·강조 (포실이 본체색) |
| `--posil-dk` | `#8b6914` | 어두운 강조 |
| `--posil-lt` | `#f0c97a` | 밝은 강조 |
| `--cream` | `#fdf8f0` | 기본 배경 |
| `--cream-alt` | `#f7f0e6` | 교대 배경 |

## Stats 수치 수정

`script.js` 상단 `COUNTS` 객체에서 숫자 직접 변경:

```js
const COUNTS = {
  'stat-apps':  3,    // 앱 개수
  'stat-web':   2,    // 웹 개수
  'stat-users': 1500, // 총 다운로드 ('+' 접미사 자동 추가)
};
```
