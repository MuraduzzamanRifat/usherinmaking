// GLSL shaders used across the site

export const heroVertex = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const heroFragment = /* glsl */`
  precision highp float;
  uniform sampler2D uTexture;
  uniform vec2 uMouse;        // 0..1 space
  uniform float uHover;       // 0..1
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uImageSize;
  varying vec2 vUv;

  // cover-fit UV
  vec2 coverUv(vec2 uv, vec2 res, vec2 img) {
    float rRes = res.x / res.y;
    float rImg = img.x / img.y;
    vec2 scale = vec2(1.0);
    vec2 offset = vec2(0.0);
    if (rRes < rImg) {
      scale.x = (res.y * rImg) / res.x;
      offset.x = (1.0 - scale.x) * 0.5;
    } else {
      scale.y = (res.x / rImg) / res.y;
      offset.y = (1.0 - scale.y) * 0.5;
    }
    return uv * scale + offset;
  }

  void main() {
    vec2 uv = coverUv(vUv, uResolution, uImageSize);

    // breath
    float breath = sin(uTime * 0.3) * 0.004;
    uv += vec2(breath, breath * 0.6);

    // mouse ripple
    float d = distance(vUv, uMouse);
    float ripple = sin(d * 26.0 - uTime * 3.2) * 0.010;
    ripple *= smoothstep(0.5, 0.0, d) * uHover;
    vec2 dir = normalize(vUv - uMouse + 0.0001);
    uv += dir * ripple;

    // rgb split only on hover (no baseline cast)
    float split = 0.0025 * uHover;
    vec3 col;
    if (split > 0.0001) {
      col.r = texture2D(uTexture, uv + vec2(split, 0.0)).r;
      col.g = texture2D(uTexture, uv).g;
      col.b = texture2D(uTexture, uv - vec2(split, 0.0)).b;
    } else {
      col = texture2D(uTexture, uv).rgb;
    }

    // very subtle film vignette
    float v = 1.0 - smoothstep(0.55, 1.2, distance(vUv, vec2(0.5)));
    col *= 0.92 + 0.08 * v;

    gl_FragColor = vec4(col, 1.0);
  }
`;

// Used on journal cards (hover distortion, subtle)
export const cardVertex = heroVertex;

export const cardFragment = /* glsl */`
  precision highp float;
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uImageSize;
  varying vec2 vUv;

  vec2 coverUv(vec2 uv, vec2 res, vec2 img) {
    float rRes = res.x / res.y;
    float rImg = img.x / img.y;
    vec2 scale = vec2(1.0);
    vec2 offset = vec2(0.0);
    if (rRes < rImg) {
      scale.x = (res.y * rImg) / res.x;
      offset.x = (1.0 - scale.x) * 0.5;
    } else {
      scale.y = (res.x / rImg) / res.y;
      offset.y = (1.0 - scale.y) * 0.5;
    }
    return uv * scale + offset;
  }

  void main() {
    vec2 uv = coverUv(vUv, uResolution, uImageSize);

    // distortion pulled toward mouse
    vec2 toMouse = uMouse - vUv;
    float d = length(toMouse);
    float strength = smoothstep(0.55, 0.0, d) * uHover;
    uv += toMouse * 0.08 * strength;

    // zoom on hover
    vec2 center = vec2(0.5);
    uv = (uv - center) / (1.0 + 0.04 * uHover) + center;

    // chromatic split
    float split = 0.004 * uHover;
    vec3 col;
    col.r = texture2D(uTexture, uv + vec2(split, 0.0)).r;
    col.g = texture2D(uTexture, uv).g;
    col.b = texture2D(uTexture, uv - vec2(split, 0.0)).b;

    // very gentle desaturation off-hover (editorial feel)
    float gray = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(gray), col, 0.88 + 0.12 * uHover);

    gl_FragColor = vec4(col, 1.0);
  }
`;

// Showcase — crossfade between two textures with distortion
export const showcaseVertex = heroVertex;

export const showcaseFragment = /* glsl */`
  precision highp float;
  uniform sampler2D uTexA;
  uniform sampler2D uTexB;
  uniform vec2 uImageSizeA;
  uniform vec2 uImageSizeB;
  uniform float uMix;          // 0..1 crossfade
  uniform float uDistort;      // transient distortion amount during swap
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uHover;
  varying vec2 vUv;

  // simple hash noise
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  vec2 coverUv(vec2 uv, vec2 res, vec2 img) {
    float rRes = res.x / res.y;
    float rImg = img.x / img.y;
    vec2 scale = vec2(1.0);
    vec2 offset = vec2(0.0);
    if (rRes < rImg) {
      scale.x = (res.y * rImg) / res.x;
      offset.x = (1.0 - scale.x) * 0.5;
    } else {
      scale.y = (res.x / rImg) / res.y;
      offset.y = (1.0 - scale.y) * 0.5;
    }
    return uv * scale + offset;
  }

  void main() {
    vec2 uv = vUv;

    // flow field distortion driven by scroll swap
    float n = noise(uv * 4.0 + uTime * 0.05);
    vec2 flow = vec2(cos(n * 6.28), sin(n * 6.28));
    uv += flow * 0.06 * uDistort;

    // subtle mouse parallax
    uv += (uMouse - 0.5) * 0.01 * uHover;

    vec2 uvA = coverUv(uv, uResolution, uImageSizeA);
    vec2 uvB = coverUv(uv, uResolution, uImageSizeB);

    vec3 a = texture2D(uTexA, uvA).rgb;
    vec3 b = texture2D(uTexB, uvB).rgb;

    // mask driven crossfade
    float m = smoothstep(0.0, 1.0, uMix + (n - 0.5) * 0.25);
    vec3 col = mix(a, b, m);

    // very subtle editorial grade
    col = mix(col, col * vec3(1.02, 1.0, 0.97), 0.25);

    // vignette
    float v = 1.0 - smoothstep(0.45, 1.2, distance(vUv, vec2(0.5)));
    col *= 0.82 + 0.18 * v;

    gl_FragColor = vec4(col, 1.0);
  }
`;
