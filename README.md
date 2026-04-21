# usherin making

Okinawa-based wedding, couple, and family photography studio. Styling & snap, by appointment, year-round.

A premium WebGL-driven editorial website with:
- Tilted-panel preloader (motion inspired by [brandivibe.com/neuron](https://brandivibe.com/neuron)), with a rotating multilingual greeting (`Hello. → 안녕. → こんにちは. → Aloha.`)
- WebGL hero with mouse-driven ripple + chromatic distortion
- Per-card WebGL hover distortion on the recent-work grid
- Scroll-pinned showcase with flow-field crossfades between five images
- Dense Instagram-style feed grid
- EN / KR language toggle (top-right)
- Full Open Graph + Twitter card + `LocalBusiness` JSON-LD
- Smooth scroll (Lenis) + GSAP ScrollTrigger reveals

## Tech

- Vanilla JavaScript (ES modules)
- [Three.js](https://threejs.org) for all WebGL (hero, journal cards, showcase)
- [GSAP](https://gsap.com) + ScrollTrigger for timelines and pinning
- [Lenis](https://github.com/darkroomengineering/lenis) for smooth scroll
- No build step. No framework. Pure HTML/CSS/JS.

## Run locally

```bash
# from the project root
python -m http.server 8733
```

Then open [http://localhost:8733/](http://localhost:8733/).

## Structure

```
.
├── index.html           — full page markup
├── css/style.css        — all styles (editorial serif + script + Korean fonts)
├── js/
│   ├── main.js          — orchestrator (preloader, cursor, reveals, section builders)
│   ├── webgl.js         — hero, journal-card, and showcase WebGL
│   ├── shaders.js       — GLSL vertex + fragment shaders
│   ├── data.js          — photo catalog (alt text, captions, shapes)
│   ├── i18n.js          — EN/KR language toggle + localStorage
│   └── neural.js        — (optional) Three.js neural-field background
├── assets/photos/       — studio photography (p01–p25)
└── docs/
    ├── brand-voice.md       — voice guidelines (tone, word list, templates)
    ├── seo-audit.md         — SEO fixes applied + what's next
    └── content-calendar.md  — 30-day content calendar + caption starters
```

## License

All photographs © usherin making. Code © the author.
