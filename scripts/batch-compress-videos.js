import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VIDEO_DIR = path.join(__dirname, '../public/videos/ai');
const FFMPEG_CMD = `C:\\Users\\HP\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.2-full_build\\bin\\ffmpeg.exe`;

function batchCompress() {
  if (!fs.existsSync(VIDEO_DIR)) {
    console.error('Video directory not found!');
    return;
  }

  const files = fs.readdirSync(VIDEO_DIR);
  const mp4Files = files.filter(f => f.endsWith('.mp4'));

  console.log(`Found ${mp4Files.length} MP4 files in ${VIDEO_DIR}`);
  let compressedCount = 0;

  mp4Files.forEach((file, index) => {
    const fullPath = path.join(VIDEO_DIR, file);
    const stat = fs.statSync(fullPath);
    const sizeInMB = stat.size / (1024 * 1024);

    if (sizeInMB > 3.0) {
      console.log(`[${index + 1}/${mp4Files.length}] Compressing ${file} (${sizeInMB.toFixed(1)} MB)...`);
      const tempPath = path.join(VIDEO_DIR, `temp_${Date.now()}_${index}.mp4`);
      
      try {
        const cmd = `"${FFMPEG_CMD}" -i "${fullPath}" -vf "scale=-2:480" -c:v libx264 -crf 28 -preset faster -c:a aac -b:a 96k -movflags +faststart "${tempPath}" -y`;
        execSync(cmd, { stdio: 'ignore' });

        if (fs.existsSync(tempPath) && fs.statSync(tempPath).size > 1000) {
          const newSizeMB = (fs.statSync(tempPath).size / (1024 * 1024)).toFixed(1);
          fs.unlinkSync(fullPath);
          fs.renameSync(tempPath, fullPath);
          console.log(`✓ Compressed ${file}: ${sizeInMB.toFixed(1)}MB -> ${newSizeMB}MB`);
          compressedCount++;
        }
      } catch (err) {
        console.error(`Failed to compress ${file}:`, err.message);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    } else {
      console.log(`[${index + 1}/${mp4Files.length}] Already small (${sizeInMB.toFixed(1)} MB): ${file}`);
    }
  });

  console.log(`Batch compression finished! ${compressedCount} videos compressed.`);
}

batchCompress();
