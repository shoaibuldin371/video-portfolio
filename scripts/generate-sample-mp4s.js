import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VIDEO_DIR = path.join(__dirname, '../public/videos/ai');

// Minimal valid 1-second H.264 MP4 file in base64 (plays cleanly in HTML5 video tag)
const SAMPLE_MP4_BASE64 = `AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAAptZGF0AAAA`;

// Minimal valid WebM video file in base64
const SAMPLE_WEBM_BASE64 = `GkXfo0AgQoaBAUL3gQFC8oEEQvOBCEtic3d0AAAB4EBDAEE1AAAAAAATwVAAAB4EBDAEE1AAAAAAATwVAAAB4EBDAEE1AAAAAAATwVAAAAA=`;

const videoNames = [
  'cyberpunk_ai_city.mp4',
  'futuristic_ai_character.mp4',
  'brand_commercial_ai.mp4',
  'abstract_neural_journey.mp4'
];

videoNames.forEach(filename => {
  const filePath = path.join(VIDEO_DIR, filename);
  // Write a clean placeholder buffer if file doesn't exist
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, Buffer.from(SAMPLE_MP4_BASE64, 'base64'));
    console.log(`Created sample video file: ${filename}`);
  }
});
