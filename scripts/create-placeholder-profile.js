import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const IMAGES_DIR = path.join(__dirname, '../public/images');

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Create a sleek SVG placeholder avatar
const avatarSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500" fill="none">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="50%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="50%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.6"/>
      <feGaussianBlur stdDeviation="15" result="blur" />
    </filter>
  </defs>
  
  <!-- Outer Glow Circle -->
  <circle cx="250" cy="250" r="230" fill="url(#bgGrad)" stroke="url(#accentGrad)" stroke-width="4" />
  <circle cx="250" cy="250" r="220" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2" stroke-dasharray="8 8" />

  <!-- Stylized Monogram / Abstract Person Graphic -->
  <g transform="translate(0, 20)">
    <!-- Head -->
    <circle cx="250" cy="180" r="75" fill="url(#accentGrad)" opacity="0.9" />
    
    <!-- Body / Shoulders -->
    <path d="M120 370 C 120 270, 380 270, 380 370 C 380 400, 120 400, 120 370 Z" fill="url(#accentGrad)" opacity="0.75" />
    
    <!-- Monogram overlay -->
    <text x="250" y="195" font-family="'Inter', sans-serif" font-size="52" font-weight="800" fill="#ffffff" text-anchor="middle">SD</text>
  </g>

  <!-- Sleek Badge -->
  <rect x="150" y="415" width="200" height="36" rx="18" fill="rgba(15, 23, 42, 0.9)" stroke="url(#accentGrad)" stroke-width="1.5" />
  <text x="250" y="439" font-family="'Inter', sans-serif" font-size="14" font-weight="600" fill="#cbd5e1" text-anchor="middle">Shoaib Ul Din</text>
</svg>`;

fs.writeFileSync(path.join(IMAGES_DIR, 'profile-placeholder.svg'), avatarSvg);
console.log('Created profile-placeholder.svg in public/images/');
