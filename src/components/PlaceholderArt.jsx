/* Temporary artwork drawn inside the placeholder scenes so each slot reads
   as a low-lit interior photograph. Removed automatically once real media is set. */

function Anchored({ viewBox, width, bottom = '8%', children }) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMax meet"
      className="absolute left-1/2 h-auto -translate-x-1/2"
      style={{ width, bottom }}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function HeroRoom() {
  return (
    <svg viewBox="0 0 1440 940" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="hr-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1c1712" /><stop offset="1" stopColor="#13100c" /></linearGradient>
        <linearGradient id="hr-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2b2219" /><stop offset="1" stopColor="#0b0907" /></linearGradient>
        <linearGradient id="hr-win" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f7e2bd" /><stop offset=".7" stopColor="#e3b27a" /><stop offset="1" stopColor="#b9824f" /></linearGradient>
        <linearGradient id="hr-shaft" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffdcae" stopOpacity=".34" /><stop offset="1" stopColor="#ffdcae" stopOpacity="0" /></linearGradient>
        <radialGradient id="hr-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffcf92" stopOpacity=".55" /><stop offset="1" stopColor="#ffcf92" stopOpacity="0" /></radialGradient>
        <radialGradient id="hr-vig" cx=".5" cy=".45" r=".72"><stop offset=".5" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".82" /></radialGradient>
        <filter id="hr-b6"><feGaussianBlur stdDeviation="5" /></filter>
        <filter id="hr-b30"><feGaussianBlur stdDeviation="30" /></filter>
      </defs>
      <rect width="1440" height="940" fill="url(#hr-wall)" />
      <path d="M300 0V610M560 0V610M1260 0V610" stroke="#0f0c09" strokeWidth="2" opacity=".6" />
      <ellipse cx="1000" cy="360" rx="320" ry="300" fill="url(#hr-glow)" filter="url(#hr-b30)" />
      <rect x="860" y="110" width="58" height="500" fill="url(#hr-win)" />
      <rect x="972" y="110" width="58" height="500" fill="url(#hr-win)" />
      <rect x="1084" y="110" width="58" height="500" fill="url(#hr-win)" />
      <path d="M860 300H918M972 300H1030M1084 300H1142" stroke="#3a2a1c" strokeWidth="3" />
      <rect y="610" width="1440" height="330" fill="url(#hr-floor)" />
      <g filter="url(#hr-b6)">
        <path d="M860 610H918L700 940H540Z" fill="url(#hr-shaft)" />
        <path d="M972 610H1030L880 940H730Z" fill="url(#hr-shaft)" />
        <path d="M1084 610H1142L1060 940H920Z" fill="url(#hr-shaft)" />
      </g>
      <rect x="170" y="500" width="600" height="96" rx="44" fill="#120e0b" />
      <rect x="150" y="560" width="640" height="92" rx="28" fill="#17120e" />
      <path d="M214 502Q470 492 726 502" stroke="#e2b07a" strokeOpacity=".55" strokeWidth="2" fill="none" />
      <path d="M170 562Q470 552 772 562" stroke="#e2b07a" strokeOpacity=".32" strokeWidth="1.5" fill="none" />
      <ellipse cx="560" cy="742" rx="170" ry="22" fill="#4a3c2f" />
      <path d="M390 742V786A170 22 0 0 0 730 786V742" fill="#2e251d" />
      <ellipse cx="560" cy="742" rx="170" ry="22" fill="none" stroke="#c8a77d" strokeOpacity=".4" />
      <path d="M120 664Q140 300 470 250" stroke="#2c2219" strokeWidth="3" fill="none" />
      <path d="M440 252A34 34 0 0 1 508 252Z" fill="#2c2219" />
      <ellipse cx="474" cy="268" rx="150" ry="120" fill="url(#hr-glow)" />
      <rect width="1440" height="940" fill="url(#hr-vig)" />
    </svg>
  )
}

export function Sofa() {
  return (
    <Anchored viewBox="0 0 600 190" width="min(74%, 666px)" bottom="12%">
      <rect x="22" y="30" width="556" height="96" rx="44" fill="#120e0b" />
      <rect x="0" y="92" width="600" height="80" rx="26" fill="#17120e" />
      <path d="M64 32Q300 22 536 32" stroke="#e2b07a" strokeOpacity=".5" strokeWidth="2" fill="none" />
      <path d="M200 96V170M400 96V170" stroke="#0d0a08" strokeWidth="2" />
      <rect x="22" y="172" width="8" height="14" fill="#0a0806" />
      <rect x="570" y="172" width="8" height="14" fill="#0a0806" />
    </Anchored>
  )
}

export function Bed() {
  return (
    <Anchored viewBox="0 0 600 240" width="min(78%, 702px)" bottom="10%">
      <rect x="70" y="0" width="460" height="130" rx="8" fill="#1a1510" />
      <path d="M86 4H514" stroke="#e2b07a" strokeOpacity=".35" strokeWidth="2" />
      <rect x="40" y="110" width="520" height="80" rx="6" fill="#8f8577" />
      <rect x="40" y="150" width="520" height="40" fill="#6e665a" />
      <rect x="110" y="84" width="150" height="44" rx="16" fill="#b5aa98" />
      <rect x="340" y="84" width="150" height="44" rx="16" fill="#b5aa98" />
      <rect x="30" y="190" width="540" height="40" fill="#120e0b" />
    </Anchored>
  )
}

export function Dining() {
  return (
    <>
      <svg viewBox="0 0 100 160" className="absolute left-1/2 top-0 h-[38%] w-auto -translate-x-1/2" aria-hidden="true">
        <path d="M50 0V112" stroke="#2c2219" strokeWidth="1.2" />
        <path d="M24 136A26 26 0 0 1 76 136Z" fill="#2c2219" />
        <ellipse cx="50" cy="138" rx="18" ry="4" fill="#ffd9a0" opacity=".8" />
      </svg>
      <Anchored viewBox="0 0 600 200" width="min(80%, 720px)" bottom="10%">
        <path d="M70 60Q60 0 110 6Q140 10 136 60V190" stroke="#120e0b" strokeWidth="14" fill="none" />
        <path d="M530 60Q540 0 490 6Q460 10 464 60V190" stroke="#120e0b" strokeWidth="14" fill="none" />
        <rect x="110" y="86" width="380" height="16" fill="#3b2f24" />
        <path d="M110 87H490" stroke="#c8a77d" strokeOpacity=".5" />
        <rect x="282" y="102" width="36" height="88" fill="#2a2119" />
        <rect x="240" y="186" width="120" height="10" fill="#2a2119" />
      </Anchored>
    </>
  )
}

export function Lounger() {
  return (
    <Anchored viewBox="0 0 600 160" width="min(78%, 702px)" bottom="16%">
      <path d="M20 120L380 120Q470 120 520 40L560 50Q520 140 400 150L20 150Z" fill="#1a1712" />
      <path d="M30 120L380 120Q462 120 512 46" stroke="#e8cf9e" strokeOpacity=".4" strokeWidth="2" fill="none" />
      <rect x="40" y="150" width="8" height="10" fill="#0e0c0a" />
      <rect x="380" y="150" width="8" height="10" fill="#0e0c0a" />
    </Anchored>
  )
}

export function Pendant() {
  return (
    <svg viewBox="0 0 100 200" className="absolute left-1/2 top-0 h-[44%] w-auto -translate-x-1/2" aria-hidden="true">
      <path d="M50 0V138" stroke="#3a2c20" strokeWidth="1" />
      <path d="M22 168A28 28 0 0 1 78 168Z" fill="#2c2219" />
      <ellipse cx="50" cy="170" rx="20" ry="4.5" fill="#ffe2b0" />
    </svg>
  )
}

const CHAIR_SHELL = 'M64 262C52 200 50 128 104 96C150 70 250 70 296 96C350 128 348 200 336 262Z'
const CHAIR_BACK = 'M118 186C116 146 140 122 200 120C260 122 284 146 282 186Z'
const CHAIR_SEAT = 'M104 204C104 186 120 180 140 180L260 180C280 180 296 186 296 204L296 244L104 244Z'
const CHAIR_BASE = 'M80 262L320 262L314 280L86 280Z'

export function Chair({ tint = '#5A3A22' }) {
  return (
    <svg viewBox="0 0 400 320" className="absolute left-1/2 top-[54%] h-auto w-[min(64%,760px)] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
      <ellipse cx="200" cy="292" rx="170" ry="10" fill="#000" opacity=".55" />
      <path d={CHAIR_SHELL} fill={tint} style={{ transition: 'fill .8s' }} />
      <path d={CHAIR_SHELL} fill="#000" opacity=".12" />
      <path d={CHAIR_BACK} fill="#000" opacity=".16" />
      <path d={CHAIR_SEAT} fill={tint} style={{ transition: 'fill .8s' }} />
      <path d="M104 204C104 186 120 180 140 180L260 180C280 180 296 186 296 204" fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth="1.5" />
      <path d="M110 98C160 76 240 76 290 98" fill="none" stroke="#fff" strokeOpacity=".26" strokeWidth="2" />
      <path d={CHAIR_BASE} fill="#1c140e" />
    </svg>
  )
}

export function ChairSketch() {
  return (
    <svg viewBox="0 0 400 330" className="absolute left-1/2 top-[54%] h-auto w-[min(64%,760px)] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
      <g fill="none" stroke="#3b352d" strokeWidth=".9" strokeLinecap="round">
        <path d={CHAIR_SHELL} />
        <path d="M118 186C116 146 140 122 200 120C260 122 284 146 282 186" />
        <path d={CHAIR_SEAT} />
        <path d={CHAIR_BASE} />
      </g>
      <g fill="none" stroke="#3b352d" strokeWidth=".5" strokeDasharray="3 4" opacity=".6">
        <path d="M200 60V300" />
        <path d="M40 180H360" />
      </g>
      <g stroke="#7A5A33" strokeWidth=".6" fill="none">
        <path d="M64 304H336M64 299V309M336 299V309" />
        <path d="M364 78V280M359 78H369M359 280H369" />
      </g>
      <text x="200" y="320" fill="#7A5A33" fontFamily="DM Mono, monospace" fontSize="7" textAnchor="middle">W — to your measure</text>
      <text x="380" y="180" fill="#7A5A33" fontFamily="DM Mono, monospace" fontSize="7" textAnchor="middle" transform="rotate(90 380 180)">H — to your measure</text>
    </svg>
  )
}
