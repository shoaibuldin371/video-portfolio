import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Film, MessageSquare, Mail, Check } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { LinkedInIcon } from './SocialIcons';

export const Hero: React.FC = () => {
  const { name, headline, introduction, profilePicture, contact } = portfolioData.personalInfo;
  const [imgError, setImgError] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleEmailClick = () => {
    // Copy email to clipboard and launch Gmail Web + mailto
    navigator.clipboard.writeText(contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contact.email)}`;
    window.open(gmailUrl, '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`, backgroundSize: '32px 32px' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col space-y-6 text-left"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold w-fit backdrop-blur-md">
              <Sparkles size={14} className="animate-spin" style={{ animationDuration: '4s' }} />
              <span>Available for Video Editing & Product Roles</span>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {name}
            </h1>

            {/* Headline */}
            <p className="text-lg sm:text-xl font-medium gradient-accent-text leading-snug">
              {headline}
            </p>

            {/* Introduction */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {introduction}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <span>Explore My Work</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/15 font-semibold text-sm backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Contact Me
              </a>

              <a
                href="#ai-gallery"
                className="px-5 py-3.5 rounded-xl bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-2 transition-all"
              >
                <Film size={16} className="text-indigo-400" />
                <span>AI Video Portfolio</span>
              </a>
            </div>

            {/* Social & Direct Contact Icons */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
                Connect Directly:
              </span>
              
              {/* WhatsApp direct icon */}
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                title={`WhatsApp (${contact.whatsappFormatted})`}
                className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 hover:scale-110 transition-all shadow-lg shadow-emerald-950/20"
              >
                <MessageSquare size={18} />
              </a>

              {/* Email direct button with auto-copy & Gmail web launch */}
              <button
                onClick={handleEmailClick}
                title={`Click to copy & open Gmail (${contact.email})`}
                className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/25 hover:scale-110 transition-all shadow-lg shadow-indigo-950/20 flex items-center gap-2 group relative"
              >
                {copiedEmail ? <Check size={18} className="text-emerald-400" /> : <Mail size={18} />}
                {copiedEmail && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold text-[11px] whitespace-nowrap shadow-xl">
                    Copied Mshoaibawan371@gmail.com!
                  </span>
                )}
              </button>

              {/* LinkedIn */}
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                className="p-3 rounded-xl bg-slate-900 text-slate-300 border border-white/10 hover:text-white hover:border-indigo-500/40 hover:scale-110 transition-all"
              >
                <LinkedInIcon size={18} />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Profile Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Glow Aura */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />

              {/* Frame Container */}
              <div className="relative w-72 sm:w-80 lg:w-96 aspect-square rounded-3xl bg-slate-950 p-3 border border-white/15 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
                <img
                  src={imgError ? profilePicture.fallbackSrc : profilePicture.src}
                  alt={profilePicture.alt}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay Tag */}
                <div className="absolute bottom-6 left-6 right-6 p-3 rounded-xl glass-panel border border-white/10 flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-semibold text-white tracking-wide">
                      Shoaib Ul Din
                    </span>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Based in Lahore, Pakistan
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
