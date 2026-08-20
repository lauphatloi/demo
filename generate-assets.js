import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Generate elegant SVG for Logo
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFDF73"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#AA7700"/>
    </linearGradient>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1a1815"/>
      <stop offset="100%" stop-color="#050505"/>
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="url(#bgGrad)" rx="200"/>
  <circle cx="200" cy="200" r="190" fill="none" stroke="url(#goldGrad)" stroke-width="3" opacity="0.6"/>
  <circle cx="200" cy="200" r="182" fill="none" stroke="url(#goldGrad)" stroke-width="1" stroke-dasharray="6,4" opacity="0.4"/>
  
  <!-- Stylized Eyelash & Eye Curve -->
  <path d="M 120 200 C 150 160, 250 160, 280 200 C 250 230, 150 230, 120 200 Z" fill="none" stroke="url(#goldGrad)" stroke-width="3"/>
  <circle cx="200" cy="195" r="18" fill="none" stroke="url(#goldGrad)" stroke-width="2"/>
  <circle cx="200" cy="195" r="8" fill="url(#goldGrad)"/>
  
  <!-- Eyelashes -->
  <path d="M 160 172 Q 150 145 135 135" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M 180 166 Q 180 135 170 120" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M 200 164 Q 205 130 205 115" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M 220 166 Q 230 135 240 120" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M 240 172 Q 255 145 270 135" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round" fill="none"/>

  <!-- Typography -->
  <text x="200" y="275" font-family="'Cinzel', serif, Georgia" font-size="28" font-weight="700" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="4">L'THANH</text>
  <text x="200" y="300" font-family="'Montserrat', sans-serif" font-size="11" font-weight="500" fill="#ffffff" text-anchor="middle" letter-spacing="6" opacity="0.8">EYELASH &amp; BEAUTY</text>
</svg>`;

// 2. Generate Hero Banner SVG
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <linearGradient id="darkBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020202"/>
      <stop offset="50%" stop-color="#0d0b08"/>
      <stop offset="100%" stop-color="#030303"/>
    </linearGradient>
    <radialGradient id="goldGlow" cx="65%" cy="45%" r="45%">
      <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.18"/>
      <stop offset="60%" stop-color="#AA7700" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFDF73"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#AA7700"/>
    </linearGradient>
  </defs>
  
  <rect width="1920" height="1080" fill="url(#darkBg)"/>
  <rect width="1920" height="1080" fill="url(#goldGlow)"/>
  
  <!-- Subtle Luxury Geometric Motifs -->
  <circle cx="1300" cy="500" r="380" fill="none" stroke="url(#goldStroke)" stroke-width="1.5" opacity="0.2"/>
  <circle cx="1300" cy="500" r="420" fill="none" stroke="url(#goldStroke)" stroke-width="0.8" stroke-dasharray="10,8" opacity="0.15"/>
  <circle cx="1300" cy="500" r="280" fill="none" stroke="url(#goldStroke)" stroke-width="1" opacity="0.25"/>
  
  <!-- Artistic Eye Illustration in Hero -->
  <g transform="translate(1000, 320) scale(1.6)" opacity="0.6">
    <path d="M 50 120 C 100 60, 260 60, 310 120 C 260 170, 100 170, 50 120 Z" fill="none" stroke="url(#goldStroke)" stroke-width="3"/>
    <circle cx="180" cy="115" r="30" fill="none" stroke="url(#goldStroke)" stroke-width="2"/>
    <circle cx="180" cy="115" r="14" fill="url(#goldStroke)" opacity="0.8"/>
    <!-- Lash fans -->
    <path d="M 100 80 Q 90 40 70 20" stroke="url(#goldStroke)" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M 130 70 Q 130 30 115 10" stroke="url(#goldStroke)" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M 160 65 Q 170 20 165 0" stroke="url(#goldStroke)" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <path d="M 190 65 Q 210 20 220 0" stroke="url(#goldStroke)" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <path d="M 220 70 Q 250 30 270 10" stroke="url(#goldStroke)" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M 250 80 Q 285 45 315 25" stroke="url(#goldStroke)" stroke-width="3" stroke-linecap="round" fill="none"/>
  </g>
  
  <!-- Sparkles -->
  <g fill="#FFDF73" opacity="0.6">
    <polygon points="1200,200 1205,215 1220,220 1205,225 1200,240 1195,225 1180,220 1195,215"/>
    <polygon points="1550,320 1553,330 1563,333 1553,336 1550,346 1547,336 1537,333 1547,330"/>
    <polygon points="1400,680 1404,692 1416,696 1404,700 1400,712 1396,700 1384,696 1396,692"/>
    <polygon points="950,450 953,460 963,463 953,466 950,476 947,466 937,463 947,460"/>
  </g>
</svg>`;

// Write fallback files to public
fs.writeFileSync(path.join(publicDir, 'logo.jpg'), logoSvg);
fs.writeFileSync(path.join(publicDir, 'logo.svg'), logoSvg);
fs.writeFileSync(path.join(publicDir, '3b662d0e-e3bc-4ad8-aa35-7117acb4db94.png'), heroSvg);
fs.writeFileSync(path.join(publicDir, 'hero.svg'), heroSvg);

console.log('Successfully created luxury placeholder assets in public/ directory.');
