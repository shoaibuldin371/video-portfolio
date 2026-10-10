import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VIDEO_DIR = path.join(__dirname, '../public/videos/ai');
const METADATA_FILE = path.join(VIDEO_DIR, 'metadata.json');

// Map Urdu / Special filenames to clean web-safe filenames & nice human titles
const SPECIAL_MAP = {
  "letter خ .mp4": { clean: "letter_kha.mp4", title: "Urdu Letter خ" },
  "baro ka adab].mp4": { clean: "baro_ka_adab.mp4", title: "Baro Ka Adab" },
  "A'oodhu Billah When Angry.mp4": { clean: "aoodhu_billah_when_angry.mp4", title: "A'oodhu Billah When Angry" },
  "ت(1).mp4": { clean: "urdu_ta_1.mp4", title: "Urdu Letter ت (Part 1)" },
  "ت(2).mp4": { clean: "urdu_ta_2.mp4", title: "Urdu Letter ت (Part 2)" },
  "ت.mp4": { clean: "urdu_ta.mp4", title: "Urdu Letter ت" },
  "ض  .mp4": { clean: "urdu_zual.mp4", title: "Urdu Letter ض" },
  "ب.mp4": { clean: "urdu_ba.mp4", title: "Urdu Letter ب" },
  "پ sound.mp4": { clean: "urdu_pa_sound.mp4", title: "Urdu Letter پ Sound" },
  "پ.mp4": { clean: "urdu_pa.mp4", title: "Urdu Letter پ" },
  "ز .mp4": { clean: "urdu_zaa.mp4", title: "Urdu Letter ز" },
  "WhatsApp Video 2026-09-14 at 9.42.17 AM.mp4": { clean: "whatsapp_video_20260914.mp4", title: "AI Short Reel 2026" }
};

function toWebSafeName(originalFile) {
  if (SPECIAL_MAP[originalFile]) {
    return SPECIAL_MAP[originalFile].clean;
  }
  let name = originalFile.toLowerCase();
  // replace spaces and special characters with underscore
  name = name.replace(/\s+/g, '_')
             .replace(/[()'"\[\]]/g, '')
             .replace(/[^a-z0-9._-]/g, '_')
             .replace(/_+/g, '_');
  return name;
}

function toHumanTitle(originalFile, cleanFile) {
  if (SPECIAL_MAP[originalFile]) {
    return SPECIAL_MAP[originalFile].title;
  }
  const base = path.parse(originalFile).name;
  // Make title look clean
  let title = base
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  // Capitalize words
  return title.replace(/\b\w/g, c => c.toUpperCase());
}

function processAndCompress() {
  if (!fs.existsSync(VIDEO_DIR)) {
    console.error('Video directory not found!');
    return;
  }

  const files = fs.readdirSync(VIDEO_DIR);
  const mp4Files = files.filter(f => f.endsWith('.mp4'));

  console.log(`Starting video optimization for ${mp4Files.length} MP4 files...`);

  let metadata = {};
  if (fs.existsSync(METADATA_FILE)) {
    try {
      metadata = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf8'));
    } catch (e) {}
  }

  let totalOriginalSize = 0;
  let totalNewSize = 0;
  let processedCount = 0;

  for (let i = 0; i < mp4Files.length; i++) {
    const file = mp4Files[i];
    const fullPath = path.join(VIDEO_DIR, file);
    const stat = fs.statSync(fullPath);
    const origSizeMB = stat.size / (1024 * 1024);
    totalOriginalSize += stat.size;

    const webSafeName = toWebSafeName(file);
    const title = toHumanTitle(file, webSafeName);

    console.log(`[${i + 1}/${mp4Files.length}] Processing: "${file}" (${origSizeMB.toFixed(1)} MB) -> "${webSafeName}"`);

    const tempPath = path.join(VIDEO_DIR, `temp_opt_${Date.now()}_${i}.mp4`);

    try {
      // Compress with ffmpeg
      const cmd = `ffmpeg -i "${fullPath}" -vf "scale=-2:480" -c:v libx264 -crf 28 -preset faster -c:a aac -b:a 96k -movflags +faststart "${tempPath}" -y`;
      execSync(cmd, { stdio: 'ignore' });

      const targetPath = path.join(VIDEO_DIR, webSafeName);

      if (fs.existsSync(tempPath) && fs.statSync(tempPath).size > 1000) {
        const newStat = fs.statSync(tempPath);
        const newSizeMB = newStat.size / (1024 * 1024);
        totalNewSize += newStat.size;

        // Remove original file if name changed or to overwrite
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
        if (fs.existsSync(targetPath) && targetPath !== tempPath) {
          fs.unlinkSync(targetPath);
        }

        fs.renameSync(tempPath, targetPath);

        console.log(`  ✓ Compressed: ${origSizeMB.toFixed(1)} MB -> ${newSizeMB.toFixed(1)} MB`);
        processedCount++;
      } else {
        console.warn(`  ! Compression failed for ${file}, retaining web-safe renamed original.`);
        if (fullPath !== targetPath) {
          fs.renameSync(fullPath, targetPath);
        }
        totalNewSize += stat.size;
      }

      // Update metadata dictionary
      metadata[webSafeName] = {
        title: title,
        category: 'AI Video',
        description: `AI video edit "${title}" created by Shoaib Ul Din for Paramount Intelligence and social media portfolios.`,
        tags: ['AI Video', 'Short-Form', 'Reel', 'Paramount Intelligence']
      };

    } catch (err) {
      console.error(`  ✕ Error compressing ${file}: ${err.message}`);
      const targetPath = path.join(VIDEO_DIR, webSafeName);
      if (fullPath !== targetPath && fs.existsSync(fullPath)) {
        fs.renameSync(fullPath, targetPath);
      }
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
      totalNewSize += stat.size;
    }
  }

  // Save metadata.json
  fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2));

  console.log('\n==================================================');
  console.log(`Optimization Completed!`);
  console.log(`Total Videos Processed: ${processedCount} / ${mp4Files.length}`);
  console.log(`Original Total Size: ${(totalOriginalSize / (1024 * 1024)).toFixed(2)} MB (${(totalOriginalSize / (1024 * 1024 * 1024)).toFixed(2)} GB)`);
  console.log(`New Total Size:      ${(totalNewSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Space Saved:         ${((totalOriginalSize - totalNewSize) / (1024 * 1024)).toFixed(2)} MB (${(((totalOriginalSize - totalNewSize) / totalOriginalSize) * 100).toFixed(1)}%)`);
  console.log('==================================================\n');
}

processAndCompress();
