import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Film, Tag, RefreshCw } from 'lucide-react';

export interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: {
    title: string;
    category?: string;
    description?: string;
    src: string;
    poster?: string | null;
    tags?: string[];
  } | null;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, video }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const [isBuffering, setIsBuffering] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsPlaying(true);
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [isOpen, video]);

  if (!isOpen || !video) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newPercent = parseFloat(e.target.value);
    const duration = videoRef.current.duration;
    if (duration && !isNaN(duration)) {
      const seekTime = (newPercent / 100) * duration;
      videoRef.current.currentTime = seekTime;
      setProgress(newPercent);
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const toggleFullScreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col glass-panel rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/60">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Film size={18} />
              </span>
              <div>
                <h3 className="font-semibold text-lg text-white leading-tight">{video.title}</h3>
                {video.category && (
                  <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">
                    {video.category}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Video Player Box */}
          <div className="relative bg-black aspect-video w-full flex items-center justify-center group overflow-hidden">
            {isBuffering && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs pointer-events-none space-y-2">
                <RefreshCw size={36} className="animate-spin text-indigo-400" />
                <span className="text-xs text-indigo-200 font-medium">Loading video...</span>
              </div>
            )}

            <video
              ref={videoRef}
              src={video.src}
              poster={video.poster || undefined}
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              onWaiting={() => setIsBuffering(true)}
              onPlaying={() => { setIsBuffering(false); setIsPlaying(true); }}
              onCanPlay={() => setIsBuffering(false)}
              onSeeked={() => {
                if (isPlaying && videoRef.current) {
                  videoRef.current.play().catch(() => {});
                }
              }}
              playsInline
              className="w-full h-full object-contain"
              onClick={togglePlay}
            />

            {/* Custom overlay controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              {/* Scrub bar */}
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:h-2 transition-all mb-3"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors"
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors"
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                </div>

                <button
                  onClick={toggleFullScreen}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors"
                >
                  <Maximize size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Video Details Footer */}
          {video.description && (
            <div className="p-6 bg-slate-900/80 border-t border-white/5 space-y-3">
              <p className="text-slate-300 text-sm leading-relaxed">{video.description}</p>
              {video.tags && video.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <Tag size={14} className="text-slate-500" />
                  {video.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
