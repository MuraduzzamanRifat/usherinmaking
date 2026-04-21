import { initHero, initCard, initShowcase } from './webgl.js';
import { heroImage, journalCards, showcaseSlides, feedImages } from './data.js';
import { initI18n } from './i18n.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================================
// Custom cursor
// ============================================================
function initCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor || window.matchMedia('(max-width: 900px)').matches) {
    if (cursor) cursor.style.display = 'none';
    return;
  }
  const label = cursor.querySelector('.cursor__label');

  let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
  let rx = tx, ry = ty;
  let dx = tx, dy = ty;

  window.addEventListener('pointermove', e => {
    tx = e.clientX; ty = e.clientY;
  });

  window.addEventListener('pointerleave', () => cursor.classList.add('is-hidden'));
  window.addEventListener('pointerenter', () => cursor.classList.remove('is-hidden'));

  function tick() {
    // dot follows fast, ring follows slow
    dx += (tx - dx) * 0.35;
    dy += (ty - dy) * 0.35;
    rx += (tx - rx) * 0.15;
    ry += (ty - ry) * 0.15;

    const dot = cursor.querySelector('.cursor__dot');
    const ring = cursor.querySelector('.cursor__ring');
    const lab = cursor.querySelector('.cursor__label');

    dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    lab.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;

    requestAnimationFrame(tick);
  }
  tick();

  // hover states
  document.addEventListener('pointerover', e => {
    const t = e.target.closest('[data-cursor]');
    cursor.classList.remove('is-link', 'is-view');
    label.textContent = '';
    if (!t) return;
    const mode = t.getAttribute('data-cursor');
    if (mode === 'link') cursor.classList.add('is-link');
    if (mode === 'view') { cursor.classList.add('is-view'); label.textContent = 'View'; }
  });
}

// ============================================================
// Smooth scroll (Lenis) + GSAP sync
// ============================================================
function initSmoothScroll() {
  if (typeof Lenis === 'undefined') return null;
  const lenis = new Lenis({
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

// ============================================================
// Preloader — 4 tilted color panels + pill + rotating greeting
// (motion ported from brandivibe.com/neuron "Woof." intro,
//  palette and greetings adapted for usherin making)
// ============================================================
function runPreloader() {
  const el = document.getElementById('preloader');
  const pc = document.getElementById('pc');
  const status = document.getElementById('pc-status');
  const bar = document.getElementById('pre-bar-fill');
  const wordEl = document.getElementById('pre-word');

  const steps = [
    'Opening the archive',
    'Gathering frames',
    'Styling the room',
    'Warming the light',
    'Ready'
  ];
  let stepIdx = 0;

  // Multilingual greetings — rotate through during load
  const greetings = ['Hello.', '안녕.', 'こんにちは.', 'Aloha.'];
  let greetIdx = 0;

  function swapGreeting(next) {
    const current = wordEl.querySelector('.pre-word__slide');
    if (!current) return;
    const incoming = document.createElement('span');
    incoming.className = 'pre-word__slide is-in';
    incoming.textContent = next;
    wordEl.appendChild(incoming);
    current.classList.add('is-out');
    setTimeout(() => current.remove(), 380);
  }

  // Rotate the greeting every 600ms during the ~2.4s load
  const rotate = setInterval(() => {
    greetIdx = (greetIdx + 1) % greetings.length;
    swapGreeting(greetings[greetIdx]);
  }, 600);

  return new Promise(resolve => {
    const obj = { v: 0 };
    gsap.to(obj, {
      v: 100,
      duration: 2.4,
      ease: 'power2.inOut',
      onUpdate: () => {
        const n = Math.round(obj.v);
        pc.textContent = String(n).padStart(2, '0');
        if (bar) bar.style.width = n + '%';

        const targetIdx = Math.min(
          steps.length - 1,
          Math.floor((n / 100) * steps.length)
        );
        if (targetIdx !== stepIdx) {
          stepIdx = targetIdx;
          status.textContent = steps[stepIdx];
        }
      },
      onComplete: () => {
        clearInterval(rotate);
        // Exit choreography: trigger CSS leaving state, then slide out
        el.classList.add('is-leaving');
        const tl = gsap.timeline({
          onComplete: () => {
            el.classList.add('is-done');
            el.style.display = 'none';
            resolve();
          }
        });
        tl.to(el, {
          yPercent: -100,
          duration: 1.0,
          ease: 'expo.inOut',
          delay: 0.55
        });
      }
    });
  });
}

// ============================================================
// Hero reveal — staggered, framer-motion style
// ease: [0.22, 1, 0.36, 1] ≈ CustomEase / "expo-ish"
// delays mirror brandivibe.com/neuron hero choreography
// ============================================================
function revealHero() {
  const lines = document.querySelectorAll('.hero__title .line');
  lines.forEach(line => {
    const inner = document.createElement('span');
    inner.style.display = 'inline-block';
    inner.innerHTML = line.innerHTML;
    line.innerHTML = '';
    line.appendChild(inner);
  });

  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';

  // Title lines slide up from below mask
  gsap.from('.hero__title .line > span', {
    yPercent: 110,
    duration: 1.1,
    ease,
    stagger: 0.12,
    delay: 0.3
  });

  // Eyebrow
  gsap.from('.hero__eyebrow', {
    y: 20, opacity: 0, duration: 0.9, ease, delay: 0.3
  });

  // Footer caps — three columns stagger
  gsap.from('.hero__cap', {
    y: 20, opacity: 0, duration: 0.9, ease, stagger: 0.08, delay: 0.55
  });

  // Marquee
  gsap.from('.hero__marquee', {
    opacity: 0, duration: 1.0, ease, delay: 0.9
  });

  // Nav
  gsap.from('.nav__brand, .nav__links > *, .nav__meta', {
    y: 12, opacity: 0, duration: 0.9, ease, stagger: 0.05, delay: 0.7
  });
}

// ============================================================
// Build Journal grid (with individual WebGL renderers)
// ============================================================
async function buildJournal() {
  const grid = document.getElementById('journal-grid');
  if (!grid) return;

  journalCards.forEach(c => {
    const el = document.createElement('a');
    el.href = '#';
    el.className = 'jcard' + (c.shape ? ` jcard--${c.shape}` : '');
    el.setAttribute('data-cursor', 'view');
    el.setAttribute('aria-label', c.alt || c.cap);
    el.innerHTML = `
      <div class="jcard__img" role="img" aria-label="${(c.alt || c.cap).replace(/"/g, '&quot;')}" style="background-image:url('${c.img}');"></div>
      <canvas></canvas>
      <span class="jcard__tag">${c.tag}</span>
      <div class="jcard__meta">
        <span class="jcard__num">${c.num}</span>
        <span class="jcard__cap">${c.cap}</span>
      </div>
    `;
    grid.appendChild(el);
  });

  // Init WebGL per card, but lazy — only when in viewport
  const cards = grid.querySelectorAll('.jcard');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target._init) {
        entry.target._init = true;
        const canvas = entry.target.querySelector('canvas');
        const data = journalCards[Array.from(cards).indexOf(entry.target)];
        initCard({ canvas, imageUrl: data.img }).catch(err => {
          console.warn('Card init failed', err);
          // fallback — reveal blurred background image
          entry.target.querySelector('.jcard__img').style.opacity = '1';
          entry.target.querySelector('.jcard__img').style.filter = 'none';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '300px' });

  cards.forEach(c => observer.observe(c));

  // Reveal cards on scroll
  gsap.from('.jcard', {
    y: 60,
    opacity: 0,
    duration: 1.1,
    ease: 'power3.out',
    stagger: 0.08,
    scrollTrigger: {
      trigger: '.journal__grid',
      start: 'top 80%'
    }
  });
}

// ============================================================
// Build Showcase (sticky scroll crossfade)
// ============================================================
async function buildShowcase() {
  const canvas = document.getElementById('showcase-canvas');
  const scrollEl = document.getElementById('showcase-scroll');
  if (!canvas || !scrollEl) return;

  const sc = await initShowcase({ canvas, slides: showcaseSlides });
  if (!sc) return;

  const kEl = document.getElementById('sc-k');
  const vEl = document.getElementById('sc-v');

  // Pin the sticky canvas and scrub through slides over N × 100vh of scroll
  const scrollDistance = (showcaseSlides.length - 1) * window.innerHeight;

  ScrollTrigger.create({
    trigger: '.showcase__sticky',
    start: 'top top',
    end: `+=${scrollDistance}`,
    pin: true,
    pinSpacing: true,
    scrub: 0.5,
    anticipatePin: 1,
    onUpdate(self) {
      const p = self.progress;
      const info = sc.setFromProgress(p);
      const displayIdx = info.frac > 0.5 ? info.nextIdx : info.idx;
      const slide = showcaseSlides[displayIdx];
      if (slide) {
        if (kEl.textContent !== slide.k) kEl.textContent = slide.k;
        if (vEl.textContent !== slide.v) vEl.textContent = slide.v;
      }
    }
  });
}

// ============================================================
// Build Feed grid
// ============================================================
function buildFeed() {
  const grid = document.getElementById('feed-grid');
  if (!grid) return;

  feedImages.forEach(it => {
    const el = document.createElement('a');
    el.href = '#';
    el.className = 'fcell' + (it.shape ? ` fcell--${it.shape}` : '');
    el.setAttribute('data-cursor', 'view');
    const altText = (it.alt || `usherin making — frame ${it.n}`).replace(/"/g, '&quot;');
    el.innerHTML = `
      <img src="${it.img}" alt="${altText}" loading="lazy" />
      <span class="fcell__n">N° ${it.n}</span>
    `;
    grid.appendChild(el);
  });

  // staggered reveal
  gsap.from('.fcell', {
    opacity: 0,
    scale: 0.95,
    duration: 0.9,
    ease: 'power3.out',
    stagger: { amount: 0.9, from: 'random' },
    scrollTrigger: {
      trigger: '.feed__grid',
      start: 'top 80%'
    }
  });
}

// ============================================================
// Editorial image reveals
// ============================================================
function editorialReveals() {
  document.querySelectorAll('[data-reveal]').forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => el.classList.add('is-in')
    });
  });

  // Section headline splits
  document.querySelectorAll('.journal__title, .showcase__title, .feed__title, .editorial__text h3, .intro__lead').forEach(el => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  gsap.from('.chip', {
    opacity: 0,
    x: -10,
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.04,
    scrollTrigger: { trigger: '.intro', start: 'top 80%' }
  });
}

// ============================================================
// Booking section — reveal circles + handle form submit
// ============================================================
function initBooking() {
  const flow = document.querySelector('.book__flow');
  if (flow) {
    // Stagger circle reveal
    gsap.set('.book__step .book__circle', { clearProps: 'all' });
    ScrollTrigger.create({
      trigger: '.book__flow',
      start: 'top 82%',
      onEnter: () => {
        flow.classList.add('is-in');
        document.querySelectorAll('.book__step').forEach((step, i) => {
          setTimeout(() => step.classList.add('is-in'), i * 120);
        });
      }
    });
  }

  const form = document.getElementById('book-form');
  const thanks = document.getElementById('book-thanks');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const lang = document.documentElement.getAttribute('lang') || 'en';
    const isKr = lang === 'ko';

    // Build a clean email body
    const L = isKr
      ? { name: '이름', email: '이메일', phone: '전화 / 카카오톡', service: '서비스', date: '희망 날짜', location: '희망 장소', message: '메시지', subject: '[usherin making] 예약 문의 — ', greet: '안녕하세요,', sign: '감사합니다.' }
      : { name: 'Name', email: 'Email', phone: 'Phone / KakaoTalk', service: 'Service', date: 'Preferred date', location: 'Location idea', message: 'Message', subject: '[usherin making] Booking enquiry — ', greet: 'Hello,', sign: 'Thank you.' };

    const body = [
      L.greet,
      '',
      `${L.name}: ${data.name || '-'}`,
      `${L.email}: ${data.email || '-'}`,
      `${L.phone}: ${data.phone || '-'}`,
      `${L.service}: ${data.service || '-'}`,
      `${L.date}: ${data.date || '-'}`,
      `${L.location}: ${data.location || '-'}`,
      '',
      `${L.message}:`,
      data.message || '',
      '',
      L.sign,
      data.name || ''
    ].join('\n');

    const subject = L.subject + (data.name || '');
    const mailto = `mailto:hello@usherinmaking.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open email client
    window.location.href = mailto;

    // Show in-page thanks + disable button
    if (thanks) thanks.hidden = false;
    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.setAttribute('disabled', 'disabled');
  });
}

// ============================================================
// Footer huge word parallax
// ============================================================
function footerParallax() {
  gsap.from('.footer__hugeword', {
    y: 120,
    opacity: 0,
    duration: 1.4,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.footer', start: 'top 80%' }
  });
}

// ============================================================
// Boot
// ============================================================
async function boot() {
  initI18n();
  initCursor();
  const lenis = initSmoothScroll();
  await runPreloader();

  // Kick off hero WebGL in parallel with reveal
  const canvas = document.getElementById('hero-canvas');
  initHero({ canvas, imageUrl: heroImage }).catch(err => {
    console.warn('Hero init failed, using fallback', err);
    canvas.style.backgroundImage = `url('${heroImage}')`;
    canvas.style.backgroundSize = 'cover';
    canvas.style.backgroundPosition = 'center';
  });

  revealHero();

  // Build rest on next frame so hero shows immediately
  requestAnimationFrame(async () => {
    editorialReveals();
    buildFeed();
    await buildJournal();
    await buildShowcase();
    initBooking();
    footerParallax();
    ScrollTrigger.refresh();
  });
}

// Ensure DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
