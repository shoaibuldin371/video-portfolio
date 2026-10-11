import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VIDEO_DIR = path.join(__dirname, '../public/videos/ai');

function fixAllVideos() {
  if (!fs.existsSync(VIDEO_DIR)) {
    console.error('Video directory not found!');
    return;
  }

  const files = fs.readdirSync(VIDEO_DIR).filter(f => f.endsWith('.mp4') && f !== 'test_smooth.mp4');
  console.log(`Processing ${files.length} videos for ZERO freezing & instant seek...`);

  let count = 0;
  files.forEach((file, index) => {
    const fullPath = path.join(VIDEO_DIR, file);
    const tempPath = path.join(VIDEO_DIR, `temp_bullet_${Date.now()}_${index}.mp4`);

    try {
      // Re-encode video with constant 30fps, keyframes every 15 frames (0.5s), yuv420p pixel format, AAC 44.1kHz audio, and faststart headers
      const cmd = `ffmpeg -i "${fullPath}" -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=44100 -map 0:v:0 -map 1:a:0? -c:v libx264 -crf 26 -r 30 -g 15 -keyint_min 15 -sc_threshold 0 -pix_fmt yuv420p -profile:v main -level 4.0 -tune fastdecode -preset fast -c:a aac -b:a 128k -ar 44100 -shortest -movflags +faststart "${tempPath}" -y`;
      execSync(cmd, { stdio: 'ignore' });

      if (fs.existsSync(tempPath) && fs.statSync(tempPath).size > 1000) {
        fs.unlinkSync(fullPath);
        fs.renameSync(tempPath, fullPath);
        console.log(`[${index + 1}/${files.length}] ✓ Zero-freeze encoded: ${file}`);
        count++;
      } else {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    } catch (err) {
      console.error(`✕ Error encoding ${file}:`, err.message);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
  });

  // Clean test file if present
  const testFile = path.join(VIDEO_DIR, 'test_smooth.mp4');
  if (fs.existsSync(testFile)) fs.unlinkSync(testFile);

  console.log(`\n==================================================`);
  console.log(`Successfully zero-freeze encoded ${count} / ${files.length} videos!`);
  console.log(`==================================================\n`);
}

fixAllVideos();
