import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VIDEO_DIR = path.join(__dirname, '../public/videos/ai');
const METADATA_FILE = path.join(VIDEO_DIR, 'metadata.json');
const OUTPUT_FILE = path.join(__dirname, '../src/data/videoManifest.json');
const PUBLIC_OUTPUT_FILE = path.join(VIDEO_DIR, 'manifest.json');

if (!fs.existsSync(VIDEO_DIR)) {
  fs.mkdirSync(VIDEO_DIR, { recursive: true });
}

function getFileHash(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(buffer).digest('hex');
  } catch (e) {
    return null;
  }
}

function generateManifest() {
  console.log('Scanning & deduplicating AI videos in:', VIDEO_DIR);

  let existingMetadata = {};
  if (fs.existsSync(METADATA_FILE)) {
    try {
      const data = fs.readFileSync(METADATA_FILE, 'utf8');
      existingMetadata = JSON.parse(data);
    } catch (err) {
      console.error('Error reading metadata.json:', err.message);
    }
  }

  const files = fs.existsSync(VIDEO_DIR) ? fs.readdirSync(VIDEO_DIR) : [];
  const videoFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return (ext === '.mp4' || ext === '.webm');
  });

  // If running in a cloud CI/CD environment (like Vercel) where .mp4 files are ignored by git,
  // do not overwrite an existing manifest with 0 videos. Preserve the committed manifest.
  if (videoFiles.length === 0) {
    if (fs.existsSync(OUTPUT_FILE)) {
      try {
        const existingData = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
        if (existingData && Array.isArray(existingData.videos) && existingData.videos.length > 0) {
          console.log(`Cloud build environment detected with 0 local .mp4 files. Retaining existing manifest with ${existingData.videos.length} videos.`);
          const publicDir = path.dirname(PUBLIC_OUTPUT_FILE);
          if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
          }
          fs.writeFileSync(PUBLIC_OUTPUT_FILE, JSON.stringify(existingData, null, 2));
          return;
        }
      } catch (e) {
        console.error('Error reading existing manifest fallback:', e.message);
      }
    }
  }

  const seenHashes = new Set();
  const seenSizes = new Set(); // also check exact size match
  const uniqueVideos = [];
  const duplicatesToRemove = [];

  videoFiles.forEach((file) => {
    const filePath = path.join(VIDEO_DIR, file);
    const stat = fs.statSync(filePath);

    // Skip tiny 51-byte dummy files if any remain
    if (stat.size <= 100) {
      duplicatesToRemove.push(filePath);
      return;
    }

    const hash = getFileHash(filePath);

    if (hash && seenHashes.has(hash)) {
      console.log(`Duplicate detected and filtered out: ${file}`);
      duplicatesToRemove.push(filePath);
      return;
    }

    if (hash) {
      seenHashes.add(hash);
    }

    const id = path.parse(file).name;
    const fileMeta = existingMetadata[file] || existingMetadata[id] || {};

    const cleanTitle = fileMeta.title || `AI Video #${uniqueVideos.length + 1}`;

    uniqueVideos.push({
      id: `ai-video-${uniqueVideos.length + 1}`,
      filename: file,
      src: `/videos/ai/${encodeURIComponent(file)}`,
      title: cleanTitle,
      category: 'AI Video',
      description: fileMeta.description || `AI-driven short-form video edit created by Shoaib Ul Din for Paramount Intelligence & social clients.`,
      tags: fileMeta.tags || ['AI Video', 'Paramount Intelligence', 'Short-Form'],
      poster: fileMeta.poster || null,
      dateAdded: fileMeta.dateAdded || '2026-10-10'
    });
  });

  // Clean up duplicate files from disk
  duplicatesToRemove.forEach(dupPath => {
    try {
      fs.unlinkSync(dupPath);
      console.log(`Removed duplicate file: ${path.basename(dupPath)}`);
    } catch (e) {
      // ignore
    }
  });

  const manifest = {
    generatedAt: new Date().toISOString(),
    totalVideos: uniqueVideos.length,
    videos: uniqueVideos
  };

  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
  fs.writeFileSync(PUBLIC_OUTPUT_FILE, JSON.stringify(manifest, null, 2));

  console.log(`Manifest generated successfully with ${uniqueVideos.length} UNIQUE AI videos (No duplicates).`);
}

generateManifest();
