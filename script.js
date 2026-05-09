// ===== 모바일 메뉴 =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

function closeNav() {
  mobileNav.classList.remove('open');
}

document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
    mobileNav.classList.remove('open');
  }
});

// ===== 스크롤 진입 애니메이션 =====
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // 같은 그룹(카드들) 내에서 순서대로 나타나도록 딜레이
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const delay = siblings.indexOf(entry.target) * 80;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ===== 숫자 카운터 (stats 섹션) =====
// ▼ 실제 수치로 변경하세요
const COUNTS = {
  'stat-apps':  0,   // 앱 개수
  'stat-web':   1,   // 웹 개수
};

function animateCount(el, target, suffix) {
  const duration = 1500;
  const start = performance.now();
  const animate = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('ko-KR') + suffix;
    if (p < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}

const statsSection = document.getElementById('stats');
let counted = false;
let visitCount = 0;

// 방문자 수: CountAPI로 카운팅
fetch('https://api.countapi.xyz/hit/posil-hub/visits')
  .then(res => res.json())
  .then(data => { visitCount = data.value; })
  .catch(() => { visitCount = 0; });

function runCounters() {
  Object.entries(COUNTS).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (!el) return;
    animateCount(el, val, '개');
  });
  const userEl = document.getElementById('stat-users');
  if (userEl) animateCount(userEl, visitCount, '+');
}

const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !counted) {
    counted = true;
    runCounters();
  }
}, { threshold: 0.4 });

if (statsSection) statsObserver.observe(statsSection);
