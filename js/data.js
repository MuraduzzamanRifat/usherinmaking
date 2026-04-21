// usherin making — photo catalog
// All images live in /assets/photos/ (copied from the studio's IG archive)
// alt text is real descriptive text — used for accessibility and SEO

const P = './assets/photos/';

// Hero — single iconic image. p23: couple silhouette at orange sunset
export const heroImage = `${P}p23.jpg`;
export const heroAlt = 'Couple silhouette against an orange sunset sky over the Okinawa coast — Okinawa wedding photography by usherin making';

// Journal grid (9 cards, mixed shapes) — "This season"
export const journalCards = [
  { img: `${P}p22.jpg`, num: 'N° 01', cap: 'Tidepool · Miyako',        tag: 'Couple',  shape: 'tall', alt: 'Couple kissing on Miyako tidepool rocks with reflection in still water — Okinawa couple photography' },
  { img: `${P}p16.jpg`, num: 'N° 02', cap: 'Hibiscus · Naha',          tag: 'Wedding', shape: 'sq',   alt: 'Bride and groom among red hibiscus flowers in Naha — Okinawa wedding photography' },
  { img: `${P}p13.jpg`, num: 'N° 03', cap: 'Family · golden hour',     tag: 'Family',  shape: '',     alt: 'Family with toddler at golden hour on an Okinawa beach — Okinawa family photography' },
  { img: `${P}p20.jpg`, num: 'N° 04', cap: 'Fig path',                 tag: 'Wedding', shape: '',     alt: 'Bride in pink gown with groom along a fig-tree path — Okinawa wedding photography' },
  { img: `${P}p18.jpg`, num: 'N° 05', cap: 'First steps',              tag: 'Couple',  shape: 'sq',   alt: 'Couple holding hands on a sandy path under palms — Okinawa couple photography' },
  { img: `${P}p21.jpg`, num: 'N° 06', cap: 'Bougainvillea house',      tag: 'Wedding', shape: 'tall', alt: 'Wedding couple beneath a large bougainvillea tree over a white house — Okinawa wedding photography' },
  { img: `${P}p07.jpg`, num: 'N° 07', cap: 'Tokyo station · lanterns', tag: 'Wedding', shape: '',     alt: 'Bride and groom under lantern lights outside Tokyo Station at night — destination wedding photography by usherin making' },
  { img: `${P}p08.jpg`, num: 'N° 08', cap: 'Bouquet · Kerama blue',    tag: 'Bride',   shape: 'sq',   alt: 'Bride from behind holding bouquet, Kerama-blue sea in background — Okinawa wedding photography' },
  { img: `${P}p15.jpg`, num: 'N° 09', cap: 'Reef, midday',             tag: 'Couple',  shape: '',     alt: 'Couple pointing at each other on a midday reef under a bright cloud sky — Okinawa couple photography' }
];

// Showcase — 5 slides for sticky scroll sequence
export const showcaseSlides = [
  { img: `${P}p04.jpg`, k: 'N° 01', v: 'Low tide, 17:40', alt: 'Couple silhouette at low tide, 17:40, with reflections in the wet sand — Okinawa wedding photography' },
  { img: `${P}p14.jpg`, k: 'N° 02', v: 'Susuki field, autumn', alt: 'Couple in black walking through an autumn susuki (pampas) field — Okinawa couple photography' },
  { img: `${P}p09.jpg`, k: 'N° 03', v: 'Fukugi tunnel, Bise', alt: 'Couple walking through the Fukugi tree tunnel in Bise village — Okinawa family photography' },
  { img: `${P}p17.jpg`, k: 'N° 04', v: 'Blue hour, east coast', alt: 'Groom lifting bride at blue hour on the Okinawa east coast — Okinawa wedding photography' },
  { img: `${P}p23.jpg`, k: 'N° 05', v: 'Setting sun, 18:52', alt: 'Couple silhouetted against the setting sun at 18:52 over the Okinawa sea — Okinawa wedding photography' }
];

// Feed — dense IG-style grid with mixed spans
export const feedImages = [
  { img: `${P}p23.jpg`, n: '001', shape: 'big', alt: 'Couple silhouette at Okinawa sunset' },
  { img: `${P}p18.jpg`, n: '002', alt: 'Couple holding hands on a sandy Okinawa path' },
  { img: `${P}p13.jpg`, n: '003', alt: 'Family at golden hour on an Okinawa beach' },
  { img: `${P}p19.jpg`, n: '004', shape: 'tall', alt: 'Family under a traditional Okinawan red-tile pavilion' },
  { img: `${P}p05.jpg`, n: '005', alt: 'Couple at a red Okinawan shrine fence' },
  { img: `${P}p06.jpg`, n: '006', alt: 'Couple forehead to forehead among yellow flowers' },
  { img: `${P}p16.jpg`, n: '007', alt: 'Wedding couple with hibiscus flowers in Naha' },
  { img: `${P}p07.jpg`, n: '008', shape: 'wide', alt: 'Night wedding portrait outside Tokyo Station' },
  { img: `${P}p08.jpg`, n: '009', alt: 'Bride holding bouquet with Kerama-blue sea behind' },
  { img: `${P}p09.jpg`, n: '010', alt: 'Couple walking through the Fukugi tree tunnel in Bise' },
  { img: `${P}p01.jpg`, n: '011', alt: 'Wedding couple among white and yellow flowers' },
  { img: `${P}p17.jpg`, n: '012', alt: 'Wedding couple at blue hour, east coast of Okinawa' },
  { img: `${P}p15.jpg`, n: '013', alt: 'Couple on a midday reef in Okinawa' },
  { img: `${P}p21.jpg`, n: '014', shape: 'tall', alt: 'Wedding couple beneath a pink bougainvillea tree' },
  { img: `${P}p24.jpg`, n: '015', alt: 'Extended family walking along an Okinawa beach' },
  { img: `${P}p11.jpg`, n: '016', alt: 'Studio self-portrait with a camera' },
  { img: `${P}p12.jpg`, n: '017', alt: 'Bride on a night street in Taipei with Taipei 101 behind' },
  { img: `${P}p14.jpg`, n: '018', alt: 'Couple in black in an autumn susuki field' },
  { img: `${P}p22.jpg`, n: '019', alt: 'Couple kissing at a Miyako tidepool with reflection' },
  { img: `${P}p04.jpg`, n: '020', alt: 'Couple silhouette reflection at low tide, Okinawa' }
];
