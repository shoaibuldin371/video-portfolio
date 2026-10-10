import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, MessageSquare, Mail, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Selected Work', href: '#projects' },
    { name: 'AI Video Portfolio', href: '#ai-gallery' },
    { name: 'Experience', href: '#experience' },
    { name: 'Tools', href: '#tools' },
    { name: 'Contact', href: '#contact' },
  ];

  const profileSrc = imgError
    ? portfolioData.personalInfo.profilePicture.fallbackSrc
    : portfolioData.personalInfo.profilePicture.src;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07090e]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-indigo-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Name with Profile Picture Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-[2px] shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/60 transition-shadow">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={profileSrc}
                alt={portfolioData.personalInfo.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-tight text-lg group-hover:text-indigo-300 transition-colors">
              {portfolioData.personalInfo.name}
            </span>
            <span className="text-[11px] text-slate-400 font-medium tracking-wide">
              Video Editor & Product Lead
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                link.href === '#ai-gallery'
                  ? 'text-indigo-400 hover:text-white hover:bg-indigo-600/30 border border-indigo-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Icons (WhatsApp & Email direct link icons) */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={portfolioData.personalInfo.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 hover:scale-105 transition-all shadow-md shadow-emerald-950/20"
          >
            <MessageSquare size={18} />
          </a>
          <a
            href={`mailto:${portfolioData.personalInfo.contact.email}`}
            title="Send Email"
            className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/20 hover:scale-105 transition-all shadow-md shadow-indigo-950/20"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-slate-950/95 border-b border-white/10 backdrop-blur-2xl px-6 py-6 space-y-4 shadow-2xl"
        >
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                {link.href === '#ai-gallery' && (
                  <Sparkles size={16} className="text-indigo-400" />
                )}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-around">
            <a
              href={portfolioData.personalInfo.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-semibold"
            >
              <MessageSquare size={16} />
              <span>WhatsApp</span>
            </a>
            <a
              href={`mailto:${portfolioData.personalInfo.contact.email}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 text-xs font-semibold"
            >
              <Mail size={16} />
              <span>Email</span>
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
};
