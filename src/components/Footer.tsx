import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowUp, MessageSquare, Mail, Check } from 'lucide-react';
import { LinkedInIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const { name, contact } = portfolioData.personalInfo;
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailClick = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contact.email)}`;
    window.open(gmailUrl, '_blank');
  };

  return (
    <footer className="bg-slate-950 py-12 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
          <span className="text-lg font-bold text-white tracking-tight">
            {name}
          </span>
          <p className="text-xs text-slate-400">
            Creative Video Editor • AI Video Creator • Product Lead • Based in Lahore, Pakistan
          </p>
        </div>

        {/* Center: Social / Contact Direct Icons */}
        <div className="flex items-center gap-3">
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            title={`WhatsApp (${contact.whatsappFormatted})`}
            className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 hover:scale-110 transition-all"
          >
            <MessageSquare size={16} />
          </a>
          <button
            onClick={handleEmailClick}
            title={`Click to copy & open Gmail (${contact.email})`}
            className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/20 hover:scale-110 transition-all relative"
          >
            {copied ? <Check size={16} className="text-emerald-400" /> : <Mail size={16} />}
          </button>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-white/10 hover:text-white hover:scale-110 transition-all"
          >
            <LinkedInIcon size={16} />
          </a>
        </div>

        {/* Right: Copyright & Back to top */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400">
            © {new Date().getFullYear()} {name}. All rights reserved.
          </span>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-white/10 hover:bg-slate-800 transition-colors"
            title="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
};
