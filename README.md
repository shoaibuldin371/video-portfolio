# Shoaib Ul Din — Premium Personal Portfolio & AI Video Gallery

A high-performance, agency-grade personal portfolio website for **Shoaib Ul Din**, built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lucide Icons.

---

## 🚀 Key Features

- **Personal Brand Hero Section**: Premium hero layout featuring your name, headline, professional introduction, circular profile frame, and direct action triggers.
- **Direct WhatsApp & Email Messaging**: Icon-only direct triggers for WhatsApp (`03473547036` -> `https://wa.me/923473547036`) and Email (`Mshoaibawan371@gmail.com`).
- **Essential Feature — Automated AI Video Gallery**: Dedicated `public/videos/ai/` folder scanner script (`scripts/generate-video-manifest.js`) that automatically builds an imported video manifest on dev/build.
- **Modal Video Player**: Custom HTML5 video player with seek controls, mute/unmute, play/pause, and fullscreen support.
- **Specialized Skills & Expertise**: Categorized skills in Social Media Management, AI Video Creation, Video Editing, and Product Management.
- **Selected Work / Featured Projects**: Interactive cards with tags, descriptions, tools used, and video preview modals.
- **Tools & Tech Stack**: Interactive tools showcase highlighting Google Flow, Gemini, Canva, CapCut, TikTok, Facebook, Instagram, LinkedIn, etc.
- **Career Journey**: Editable professional experience entries.
- **Contact System**: Form validation with direct social media and messaging links.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS + Custom Dark Theme & Glassmorphic Utilities
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Manifest Discovery**: Node.js automated build script (`scripts/generate-video-manifest.js`)

---

## 📁 How to Update Portfolio Content

All personal details, text, links, and content are stored cleanly in structured data files:

### 1. Update Name, Headline, Introduction, Contact & Social Links
Open: `src/data/portfolioData.ts`
- **Name & Introduction**: Edit `personalInfo.name`, `personalInfo.headline`, and `personalInfo.introduction`.
- **Contact Details**: Edit `personalInfo.contact.email` and `personalInfo.contact.whatsapp`.
- **Social Media URLs**: Update `personalInfo.socials` with your actual profile links for LinkedIn, Facebook, Instagram, and TikTok.

### 2. Replace Profile Picture
- Place your photo at: `public/images/profile.jpg`
- If you use a different format (e.g. `profile.png`), update `personalInfo.profilePicture.src` in `src/data/portfolioData.ts`.

### 3. Update Skills, Projects, Experience & Tools
Open: `src/data/portfolioData.ts`
- **Skills**: Edit `skillsCategories` array.
- **Projects**: Edit `projects` array.
- **Tools**: Edit `tools` array.
- **Experience**: Edit `experiences` array.

---

## 🎥 AI Video Portfolio Setup & File Discovery

The **AI Video Portfolio** automatically scans the `public/videos/ai/` folder for `.mp4` and `.webm` files.

### Step 1: Add New AI Videos
Copy your video files (MP4 or WebM format) into:
```
public/videos/ai/
```
*(Example: `public/videos/ai/my_new_commercial.mp4`)*

### Step 2: (Optional) Add Custom Metadata
You can customize the title, category, description, and tags for any video by editing:
`public/videos/ai/metadata.json`

Example `metadata.json`:
```json
{
  "my_new_commercial.mp4": {
    "title": "Futuristic AI Brand Commercial",
    "category": "AI Commercials",
    "description": "Photorealistic AI video produced for next-gen commercial feeds.",
    "tags": ["AI Commercials", "Brand Campaign", "4K"]
  }
}
```

### Step 3: Refresh the Video Gallery
Run the manifest builder command:
```bash
npm run build:videos
```
> **Note**: Running `npm run dev` or `npm run build` will also **automatically trigger** this script before starting the server or building for production!

---

## ⚡ Deployment & Hosting Instructions

### Static Site Hosting (Vercel, Netlify, GitHub Pages, Cloudflare Pages)

1. **Build the production bundle**:
   ```bash
   npm run build
   ```
2. **Deploy the `dist` directory** to your host of choice.

> **Important Deployment Note**:
> Because static web servers do not continuously scan server file systems at runtime, adding a new video to your live website requires re-running `npm run build` and re-deploying your site (or setting up a continuous integration git commit trigger).

---

## 💻 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
```
