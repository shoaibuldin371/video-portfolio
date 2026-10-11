import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VIDEO_DIR = path.join(__dirname, '../public/videos/ai');

function fastSeekOptimize() {
  if (!fs.existsSync(VIDEO_DIR)) {
    console.error('Video directory not found!');
    return;
  }

  const files = fs.readdirSync(VIDEO_DIR).filter(f => f.endsWith('.mp4'));
  console.log(`Optimizing ${files.length} MP4 files for instant seeking (-g 24, fastdecode, +faststart)...`);

  let count = 0;
  files.forEach((file, index) => {
    const fullPath = path.join(VIDEO_DIR, file);
    const tempPath = path.join(VIDEO_DIR, `temp_fast_${Date.now()}_${index}.mp4`);

    try {
      // Encode with keyframe interval of 24 frames (~1sec), fastdecode tune, faststart MOOV atom
      const cmd = `ffmpeg -i "${fullPath}" -vf "scale=-2:480" -c:v libx264 -crf 26 -preset faster -g 24 -keyint_min 12 -tune fastdecode -c:a aac -b:a 96k -movflags +faststart "${tempPath}" -y`;
      execSync(cmd, { stdio: 'ignore' });

      if (fs.existsSync(tempPath) && fs.statSync(tempPath).size > 1000) {
        fs.unlinkSync(fullPath);
        fs.renameSync(tempPath, fullPath);
        console.log(`[${index + 1}/${files.length}] ✓ Fast-seek optimized: ${file}`);
        count++;
      } else {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    } catch (err) {
      console.error(`✕ Error optimizing ${file}:`, err.message);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
  });

  console.log(`Fast-seek optimization completed for ${count} videos!`);
}

fastSeekOptimize();
