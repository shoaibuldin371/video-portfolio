export interface PersonalInfo {
  name: string;
  location: string;
  headline: string;
  introduction: string;
  summary: string;
  about: {
    title: string;
    description: string[];
    education: {
      degree: string;
      field: string;
    };
    strengths: string[];
    highlights: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  contact: {
    email: string;
    whatsapp: string;
    whatsappFormatted: string;
    linkedin: string;
    location: string;
  };
  socials: {
    platform: string;
    url: string;
    icon: string;
    isPrimaryContactIcon?: boolean;
  }[];
  profilePicture: {
    src: string;
    fallbackSrc: string;
    alt: string;
  };
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'AI Video Campaigns' | 'Social Media Content' | 'Short-Form Video Editing' | 'Product Planning' | 'AI Creative Experiments';
  description: string;
  longDescription?: string;
  thumbnail: string;
  tools: string[];
  link?: string;
  videoSrc?: string;
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  contactPerson?: string;
  location?: string;
  period: string;
  category: 'Digital Marketing' | 'Social Media Management' | 'AI Video Production' | 'Product Management';
  description: string;
  achievements: string[];
}

export interface ToolItem {
  name: string;
  category: 'AI Platform' | 'Video Editing' | 'Social Platform' | 'Productivity';
  icon: string;
  level: string;
  isCustomizable?: boolean;
}

export const portfolioData = {
  personalInfo: {
    name: "Shoaib Ul Din",
    location: "Lahore, Pakistan",
    headline: "Creative Video Editor | AI Video Creator | Social Media Manager | Product Lead",
    summary: "Creative Video Editor and Social Media Creator with freelance and agency experience crafting engaging short-form content, social media campaigns, and AI-generated videos. Skilled in visual pacing, captions, sound cleanup, and high-retention editing for digital platforms.",
    introduction: "Hi, I'm Shoaib Ul Din — a creative video editor, AI video creator, social media manager, and product lead currently based in Lahore, Pakistan. I specialize in high-retention short-form content (Reels & Shorts), social media strategy, AI-generated video production, and visual editing using CapCut and cutting-edge AI workflows.",
    
    about: {
      title: "Passionate Video Editor, Social Media Creator & AI Video Creator with agency and product experience.",
      description: [
        "With hands-on experience as a Video Editor, AI Video Creator, and Social Media Manager at Paramount Intelligence and self-employed freelance work since 2023, I create high-converting short-form videos, reels, and AI animations.",
        "Equipped with a Bachelor's degree in Computer Science, I bridge technical product management thinking with creative visual storytelling, social media strategy, precise pacing, and audio cleanup."
      ],
      education: {
        degree: "Bachelor's in Computer Science",
        field: "Computer Science & Digital Technologies"
      },
      strengths: [
        "Strong attention to detail",
        "Creative visual sense & social media strategy",
        "Reliable communication & fast turnaround",
        "Good at following client guidelines"
      ],
      highlights: [
        {
          title: "Video Editing (Reels & Shorts)",
          description: "Crafting short-form marketing videos, reels, and shorts with visual pacing and audio cleanup.",
          icon: "Film"
        },
        {
          title: "AI Video Creation",
          description: "Creating and enhancing AI-driven videos, synthetic scenes, and AI visual workflows.",
          icon: "Bot"
        },
        {
          title: "CapCut & Post-Production",
          description: "Subtitles, captions, smooth transitions, background music, and high-retention exports.",
          icon: "Scissors"
        },
        {
          title: "Social Media & Product Manager (Paramount Intelligence)",
          description: "4 months of experience managing social media strategy, content pipelines, reels growth, and product coordination.",
          icon: "Kanban"
        }
      ]
    },

    contact: {
      email: "Mshoaibawan371@gmail.com",
      whatsapp: "https://wa.me/923473547036",
      whatsappFormatted: "03473547036",
      linkedin: "https://www.linkedin.com/in/shoaib-ul-din/",
      location: "Currently based in Lahore, Pakistan"
    },

    socials: [
      {
        platform: "WhatsApp",
        url: "https://wa.me/923473547036",
        icon: "MessageSquare",
        isPrimaryContactIcon: true
      },
      {
        platform: "Email",
        url: "mailto:Mshoaibawan371@gmail.com",
        icon: "Mail",
        isPrimaryContactIcon: true
      },
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/shoaib-ul-din/",
        icon: "Linkedin",
        isPrimaryContactIcon: true
      }
    ],

    profilePicture: {
      src: "/images/profile.jpg",
      fallbackSrc: "/images/profile-placeholder.svg",
      alt: "Shoaib Ul Din - Creative Video Editor & AI Video Creator"
    }
  },

  skillsCategories: [
    {
      id: "video-editing",
      title: "Video Editing",
      description: "High-retention editing for Reels, TikToks, and YouTube Shorts with captions, audio cleanup, and transitions.",
      icon: "Film",
      skills: [
        "Video Editing",
        "Short-Form Content Editing",
        "Reels, TikTok Videos, and YouTube Shorts",
        "Captions & Subtitles",
        "Transitions & Visual Effects",
        "Audio Synchronization & Cleanup",
        "Visual Pacing & Retention",
        "CapCut Editing Workflow"
      ]
    },
    {
      id: "ai-video",
      title: "AI Video Creation",
      description: "Producing and enhancing AI-driven video content using state-of-the-art AI generation tools.",
      icon: "Wand2",
      skills: [
        "AI-Generated Video Production",
        "AI Video Concept Development",
        "Prompt Engineering for Video",
        "AI Visual Generation",
        "AI B-Roll Creation",
        "AI Character & Scene Creation",
        "Short-Form AI Video Content",
        "AI-Powered Creative Workflows"
      ]
    },
    {
      id: "product-management",
      title: "Product Management (4 Months)",
      description: "Requirement gathering, task prioritization, sprint coordination, and digital project execution.",
      icon: "Layers",
      skills: [
        "Product Research",
        "Product Planning",
        "Feature Ideation",
        "Requirements Gathering",
        "Task Prioritization",
        "Project Coordination",
        "User-Centric Thinking",
        "Workflow Optimization"
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "proj-1",
      title: "AI Short-Form Video Edit",
      category: "AI Video Campaigns",
      description: "AI video edit created for marketing feeds featuring prompt generation, audio cleanup, and captions.",
      thumbnail: "/images/profile.jpg",
      tools: ["CapCut", "AI Video Tools", "Audio Cleanup"],
      featured: true
    },
    {
      id: "proj-2",
      title: "Promotional Reel & Shorts Edit",
      category: "Short-Form Video Editing",
      description: "High-retention video reel edit with animated subtitles, background music, and fast-paced cuts.",
      thumbnail: "/images/profile.jpg",
      tools: ["CapCut", "Subtitles", "Transitions"],
      featured: true
    },
    {
      id: "proj-3",
      title: "Paramount Intelligence Campaign",
      category: "AI Video Campaigns",
      description: "Short-form marketing video and AI-driven reel production during product manager internship.",
      thumbnail: "/images/profile.jpg",
      tools: ["CapCut", "AI Tools", "Product Planning"],
      featured: true
    }
  ] as Project[],

  tools: [
    { name: "CapCut", category: "Video Editing", icon: "Scissors", level: "Primary Editing Software" },
    { name: "AI Video Tools", category: "AI Platform", icon: "Wand2", level: "AI Video Creation" },
    { name: "Google Flow", category: "AI Platform", icon: "Sparkles", level: "AI Workflows" },
    { name: "Gemini", category: "AI Platform", icon: "Bot", level: "Prompting & Content Specs" },
    { name: "Canva", category: "Video Editing", icon: "Palette", level: "Visual & Thumbnails" },
    { name: "LinkedIn", category: "Social Platform", icon: "Linkedin", level: "Professional Network" }
  ] as ToolItem[],

  experiences: [
    {
      id: "exp-1",
      role: "Video Editor, AI Video Creator & Social Media Manager (Product Manager)",
      company: "Paramount Intelligence",
      contactPerson: "CEO: Ali Azzam (+923342870512)",
      period: "4 Months Internship",
      category: "AI Video Production",
      description: "Worked as Video Editor, AI Video Creator, Social Media Manager, and Product Manager at Paramount Intelligence under the leadership of CEO Ali Azzam (+923342870512).",
      achievements: [
        "Edited high-retention short-form marketing videos, reels, and promotional campaign assets.",
        "Managed social media content strategy, short-form reels growth, and audience engagement optimization.",
        "Created and enhanced AI-driven videos using cutting-edge AI content generation tools.",
        "Applied visual pacing, animated subtitles/captions, transitions, and audio cleanup for social channels.",
        "Managed product content pipelines, task prioritization, and cross-functional team workflows."
      ]
    },
    {
      id: "exp-2",
      role: "Freelance Video Editor",
      company: "Self Employed",
      location: "Lahore, Pakistan",
      period: "2023 to Present",
      category: "Digital Marketing",
      description: "Provided short-form video editing and AI content creation for clients.",
      achievements: [
        "Edited reels, shorts, and social media videos for clients.",
        "Added captions, smooth transitions, and background music.",
        "Prepared final video exports for online platforms."
      ]
    }
  ] as ExperienceItem[]
};
