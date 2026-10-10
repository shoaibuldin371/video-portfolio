import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Search, Sparkles, AlertCircle, RefreshCw, Film } from 'lucide-react';

// Import build-time generated video manifest
import manifestData from '../data/videoManifest.json';

const FALLBACK_VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

export interface VideoItem {
  id: string;
  filename: string;
  src: string;
  title: string;
  category: string;
  description?: string;
  tags?: string[];
  poster?: string | null;
  dateAdded?: string;
}

interface AIVideoGalleryProps {
  onOpenVideoModal: (video: { title: string; category?: string; description?: string; src: string; poster?: string | null; tags?: string[] }) => void;
}

export const AIVideoGallery: React.FC<AIVideoGalleryProps> = ({ onOpenVideoModal }) => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (manifestData && Array.isArray(manifestData.videos)) {
      setVideos(manifestData.videos as VideoItem[]);
    }
    setIsLoading(false);
  }, []);

  const filteredVideos = videos.filter((video) => {
    return (
      searchQuery.trim() === '' ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (video.description && video.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (video.tags && video.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  });

  return (
    <section id="ai-gallery" className="py-24 relative overflow-hidden bg-[#05070b]">
      {/* Background Neon Accent Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Sparkles size={14} className="text-indigo-400" />
            <span>AI Video Portfolio • All {videos.length} Unique Videos</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            AI Video Showcase
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Unified collection of AI-generated marketing videos, short-form reels, and visual edits created for Paramount Intelligence and social campaigns.
          </p>
        </div>

        {/* Search & Header Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 glass-panel p-4 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Film size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">All Videos Gallery</h3>
              <p className="text-xs text-slate-400">Displaying all {filteredVideos.length} videos in one seamless feature</p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search video collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 text-white text-xs border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-3">
            <RefreshCw size={28} className="animate-spin text-indigo-400" />
            <span className="text-xs font-medium">Scanning video directory manifest...</span>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredVideos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center glass-card p-8 rounded-3xl border border-white/10 max-w-lg mx-auto">
            <AlertCircle size={40} className="text-indigo-400 mb-3" />
            <h3 className="text-lg font-bold text-white">No Videos Found</h3>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              No videos matched your search query. Clear the search box to view all videos.
            </p>
          </div>
        )}

        {/* Responsive Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.4) }}
              className="glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-indigo-500/50 shadow-xl"
            >
              {/* Video Preview Frame */}
              <div 
                className="relative aspect-video w-full bg-slate-950 overflow-hidden cursor-pointer flex items-center justify-center"
                onClick={() => onOpenVideoModal(video)}
              >
                {/* HTML5 Video element preview */}
                <video
                  src={video.src}
                  poster={video.poster || undefined}
                  preload="metadata"
                  muted
                  loop
                  onError={(e) => {
                    const v = e.target as HTMLVideoElement;
                    if (!v.dataset.hasFallback) {
                      v.dataset.hasFallback = "true";
                      v.src = FALLBACK_VIDEO_URL;
                    }
                  }}
                  onMouseEnter={(e) => (e.target as HTMLVideoElement).play().catch(() => {})}
                  onMouseLeave={(e) => {
                    const v = e.target as HTMLVideoElement;
                    v.pause();
                    v.currentTime = 0;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay Play Icon */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-xl shadow-indigo-600/50 group-hover:scale-110 transition-transform">
                    <Play size={24} className="ml-1 fill-white" />
                  </div>
                </div>

                {/* Badge Tag */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
                  AI Video #{idx + 1}
                </div>
              </div>

              {/* Video Info Details */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 
                    onClick={() => onOpenVideoModal(video)}
                    className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors cursor-pointer"
                  >
                    {video.title}
                  </h3>

                  {video.description && (
                    <p className="text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  )}
                </div>

                {/* Action Trigger */}
                <button
                  onClick={() => onOpenVideoModal(video)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600/15 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Play size={14} className="fill-current" />
                  <span>Play Video</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
