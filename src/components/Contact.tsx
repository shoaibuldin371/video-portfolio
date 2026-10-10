import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { MessageSquare, Mail, Send, CheckCircle2, AlertCircle, Copy, Check, ExternalLink } from 'lucide-react';
import { LinkedInIcon } from './SocialIcons';

export const Contact: React.FC = () => {
  const { contact } = portfolioData.personalInfo;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const openGmailWeb = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contact.email)}`;
    window.open(gmailUrl, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('error');
      setErrorMessage('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    setFormStatus('submitting');

    const subject = encodeURIComponent(formData.subject || `Portfolio Message from ${formData.name}`);
    const body = encodeURIComponent(`Sender Name: ${formData.name}\nSender Email: ${formData.email}\n\nMessage:\n${formData.message}`);

    // Direct Web Gmail compose URL
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contact.email)}&su=${subject}&body=${body}`;
    const mailtoUrl = `mailto:${contact.email}?subject=${subject}&body=${body}`;

    // Copy message to clipboard for backup
    navigator.clipboard.writeText(`To: ${contact.email}\nSubject: ${formData.subject}\n\n${formData.message}`);

    setTimeout(() => {
      // Try opening Gmail Web Compose first
      window.open(gmailComposeUrl, '_blank') || (window.location.href = mailtoUrl);
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 400);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950 border-t border-white/10">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Build Impactful Work Together
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Whether you are a recruiter, agency, client, or team seeking Video Editing, AI Video Creation, or Product Management expertise — let's connect!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact & Icon Cards */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-white">
                Direct Contact & Messaging
              </h3>
              
              {/* Displayed Email Address with Copy & Open Buttons */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</span>
                  <span className="text-[11px] font-medium text-emerald-400">Direct Contact</span>
                </div>
                <div className="flex items-center justify-between gap-2 bg-slate-950 p-2.5 rounded-xl border border-white/10">
                  <span className="text-xs font-mono font-bold text-indigo-300 truncate">
                    {contact.email}
                  </span>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={copyEmailToClipboard}
                      className="p-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1"
                      title="Copy Email"
                    >
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                    
                    <button
                      onClick={openGmailWeb}
                      className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1"
                      title="Open in Gmail"
                    >
                      <ExternalLink size={14} />
                      <span>Gmail</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Direct Icons */}
              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-4">
                {/* WhatsApp Direct Icon */}
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`WhatsApp: ${contact.whatsappFormatted}`}
                  className="p-4 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 hover:scale-110 transition-all shadow-xl shadow-emerald-950/40 flex items-center justify-center"
                >
                  <MessageSquare size={24} />
                </a>

                {/* Email Direct Icon */}
                <button
                  onClick={openGmailWeb}
                  title={`Open GmailCompose (${contact.email})`}
                  className="p-4 rounded-2xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/40 hover:bg-indigo-500/30 hover:scale-110 transition-all shadow-xl shadow-indigo-950/40 flex items-center justify-center"
                >
                  <Mail size={24} />
                </button>

                {/* LinkedIn Icon */}
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn Profile"
                  className="p-4 rounded-2xl bg-slate-900 text-slate-300 border border-white/10 hover:text-white hover:border-indigo-500/40 hover:scale-110 transition-all flex items-center justify-center"
                >
                  <LinkedInIcon size={24} />
                </a>
              </div>
            </div>

            {/* Availability Box with Lahore Location */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Based in Lahore, Pakistan</h4>
                <p className="text-slate-400 text-xs mt-1">Available for Remote & On-Site Projects Worldwide.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 space-y-6"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                Send Direct Message
              </h3>

              {formStatus === 'success' && (
                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
                  <CheckCircle2 size={20} className="flex-shrink-0" />
                  <span>Opening Gmail Web to send message directly to Mshoaibawan371@gmail.com! (Message also copied to clipboard)</span>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
                  <AlertCircle size={20} className="flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 text-white text-sm border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 text-white text-sm border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Video Editing / Product Opportunity"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 text-white text-sm border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 text-white text-sm border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all flex items-center justify-center gap-2"
              >
                <Send size={18} />
                <span>{formStatus === 'submitting' ? 'Opening Gmail Web...' : 'Send Message to Mshoaibawan371@gmail.com'}</span>
              </button>
            </motion.form>
          </div>

        </div>

      </div>
    </section>
  );
};
