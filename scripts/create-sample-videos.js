import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VIDEO_DIR = path.join(__dirname, '../public/videos/ai');

if (!fs.existsSync(VIDEO_DIR)) {
  fs.mkdirSync(VIDEO_DIR, { recursive: true });
}

// Write metadata.json for custom metadata overrides
const metadata = {
  "cyberpunk_ai_city.mp4": {
    "title": "Cyberpunk AI Cityscape",
    "category": "AI Commercials",
    "description": "High-fidelity AI generated cinematic shot of a futuristic metropolis with glowing neon lights and dynamic motion.",
    "tags": ["AI Commercials", "Cinematic", "Futuristic", "Sci-Fi"]
  },
  "futuristic_ai_character.mp4": {
    "title": "Futuristic AI Character Concept",
    "category": "AI Characters",
    "description": "Photorealistic AI character animation demonstrating consistent keyframing and facial emotion control.",
    "tags": ["AI Characters", "Character Design", "3D Motion", "VFX"]
  },
  "brand_commercial_ai.mp4": {
    "title": "NextGen Brand Promo Campaign",
    "category": "Social Media Ads",
    "description": "AI-generated commercial ad spot designed for high-converting social media video feeds.",
    "tags": ["Social Media Ads", "Brand Campaign", "Product Ad", "Marketing"]
  },
  "abstract_neural_journey.mp4": {
    "title": "Neural Dreamscape Odyssey",
    "category": "AI Storytelling",
    "description": "Experimental AI visual storytelling piece showcasing fluid video morphing and prompt sequencing.",
    "tags": ["AI Storytelling", "Experimental", "Morphing", "Visual Art"]
  }
};

fs.writeFileSync(path.join(VIDEO_DIR, 'metadata.json'), JSON.stringify(metadata, null, 2));

console.log('Created metadata.json in public/videos/ai/');
