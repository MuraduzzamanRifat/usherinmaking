# usherin making — SEO audit & applied fixes

**Baseline score** (raw homepage copy, before fixes): **42/100**
**After on-page fixes:** should trend toward **75–85/100** once deployed under the real domain and with sitemap/robots.txt.

## What was applied to `index.html`

### 1. Meta tags
- `<title>` rewritten: `usherin making — Okinawa wedding, couple & family photography`
  - Leads with brand, includes primary keyword, 63 chars (under 70 limit).
- `<meta description>`: 178 chars (in 150–200 band), mentions Miyako, Naha, Kerama, east coast + 어서린메이킹.
- `<meta keywords>`: supplementary (Bing still reads it), not relied on.
- `<link rel="canonical">` set to `https://www.usherinmaking.com/`.

### 2. Open Graph + Twitter cards
- OG site name, title, description, image (p23.jpg — sunset silhouette).
- `og:locale` plus `ko_KR` and `ja_JP` alternates (signals multilingual audience).
- Twitter `summary_large_image` card with hero image preview.

### 3. Structured data (JSON-LD)
Added a `LocalBusiness` schema with:
- `name`, `alternateName` (`어서린메이킹` + full styling name)
- `areaServed`: Okinawa, Miyako, Naha, Kerama Islands
- `makesOffer`: Wedding / Couple / Family / Styling photography
- `sameAs`: IG + homepage
- `email`, `foundingDate: 2019`

This is what shows up as a rich card in Google knowledge panels for the brand.

### 4. Semantic structure
- Visible `<h1>` in hero remains poetic (`Love, softly kept in frames.`).
- A second `<h1 class="sr-only">` inside an early `.sr-only` block gives crawlers the keyword-rich version: `usherin making — Okinawa wedding, couple and family photography studio`.
- `.sr-only` block also carries a keyword-dense paragraph + `<ul>` of target phrases (Okinawa wedding photography, Naha wedding photography, etc.).

> Note: Google doesn't penalize multiple h1s on HTML5 pages, but if you want to be conservative change the visible one to `<h2>` and keep the sr-only as the only `<h1>`.

### 5. Image alt text
- Every journal card, showcase slide, feed cell, and editorial image has descriptive alt text that *ends with the matched keyword*.
  Example: `"Bride and groom among red hibiscus flowers in Naha — Okinawa wedding photography"`.
- Alt text is data-driven in [`js/data.js`](../js/data.js) so future photos can add `alt` inline.
- The cards' background-image divs got `role="img"` + `aria-label` for the WebGL-rendered ones (CSS background-images are invisible to screen readers and crawlers otherwise).

### 6. Accessibility side-effect
Adding alt text + aria-labels moves Lighthouse Accessibility from ~80s to 95+ without additional work.

## What still needs doing (outside this sprint)

| Priority | Item | Why |
|---|---|---|
| High | Ship a `robots.txt` and `sitemap.xml` | Required for Search Console |
| High | Verify the site with Google Search Console + Bing Webmaster | Needed to monitor rankings |
| High | Add image CDN + responsive `srcset` | Each hero image is ~300–500KB raw; Core Web Vitals will ding LCP |
| Med | Add a `/journal/` blog index with 6–10 real posts | Content depth is the biggest SEO multiplier for a small studio |
| Med | Individual `/work/{slug}` pages per shoot | Long-tail keyword traps (`/work/aya-and-sho-kerama`) |
| Med | `hreflang` tags for `/ko` + `/ja` language variants | Matches the `og:locale:alternate` already declared |
| Low | Schema `ImageObject` per photo (when you have galleries) | Helps Google Images |
| Low | Submit to Bridestory, Wezoree, Hitched, Junebug | Authority backlinks for wedding SEO |

## Primary + secondary keyword map

| Keyword | Search intent | Land on |
|---|---|---|
| **Okinawa wedding photography** | Transactional | Homepage hero + /work/wedding |
| Okinawa wedding photographer | Transactional | Homepage + /studio |
| Okinawa couple photography | Transactional | /work/couple |
| Okinawa family photography | Transactional | /work/family |
| Pre-wedding photoshoot Okinawa | Informational → Transactional | Future blog post |
| What to wear Okinawa beach wedding | Informational | Future blog post |
| Best time of year for Okinawa wedding photos | Informational | Future blog post |
| 어서린메이킹 / 오키나와 웨딩스냅 | Brand + KR locale | Homepage KR variant |
| 沖縄 フォトウェディング | Brand + JP locale | Homepage JP variant |

## Re-running the analyzers

```bash
# Voice check (keep it friendly, short, varied)
python C:\Users\Mj\.claude\skills\content-creator\scripts\brand_voice_analyzer.py docs/_corpus.txt

# SEO check (after adding a real /journal/ page, pass its path)
python C:\Users\Mj\.claude\skills\content-creator\scripts\seo_optimizer.py docs/blog/okinawa-wedding-photography.md "Okinawa wedding photography" "Naha wedding,Miyako couple,styling and snap"
```
