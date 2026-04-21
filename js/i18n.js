// Language toggle — EN / KR
// Reads:
//   [data-i18n-en], [data-i18n-kr]            -> textContent
//   [data-i18n-html-en], [data-i18n-html-kr]  -> innerHTML (for markup like <em> and <br/>)
//   [data-i18n-placeholder-en], [...-kr]      -> placeholder attribute
// Persists choice in localStorage under "um.lang"

const KEY = 'um.lang';
const VALID = ['en', 'kr'];

function apply(lang) {
  // Text content swaps
  document.querySelectorAll('[data-i18n-en][data-i18n-kr]').forEach(el => {
    const t = el.getAttribute(`data-i18n-${lang}`);
    if (t !== null) el.textContent = t;
  });
  // Rich (innerHTML) swaps
  document.querySelectorAll('[data-i18n-html-en][data-i18n-html-kr]').forEach(el => {
    const t = el.getAttribute(`data-i18n-html-${lang}`);
    if (t !== null) el.innerHTML = t;
  });
  // Placeholder swaps
  document.querySelectorAll('[data-i18n-placeholder-en][data-i18n-placeholder-kr]').forEach(el => {
    const t = el.getAttribute(`data-i18n-placeholder-${lang}`);
    if (t !== null) el.setAttribute('placeholder', t);
  });

  // html lang for font fallback + SEO hreflang hint
  document.documentElement.setAttribute('lang', lang === 'kr' ? 'ko' : 'en');

  // Update toggle visual state
  const toggle = document.getElementById('lang-toggle');
  if (toggle) toggle.setAttribute('data-lang', lang);

  localStorage.setItem(KEY, lang);
}

export function initI18n() {
  // Resolve initial language
  let initial = localStorage.getItem(KEY);
  if (!VALID.includes(initial)) {
    const nav = (navigator.language || 'en').toLowerCase();
    initial = nav.startsWith('ko') ? 'kr' : 'en';
  }
  apply(initial);

  const toggle = document.getElementById('lang-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const next = toggle.getAttribute('data-lang') === 'kr' ? 'en' : 'kr';
    apply(next);
  });
}
