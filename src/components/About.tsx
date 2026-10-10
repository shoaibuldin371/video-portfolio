import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Icon } from './Icon';
import { GraduationCap, CheckCircle } from 'lucide-react';

export const About: React.FC = () => {
  const { title, description, highlights, education, strengths } = portfolioData.personalInfo.about;

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-950/60 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight max-w-3xl">
            {title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" />
        </div>

        {/* Narrative Description */}
        <div className="max-w-4xl mx-auto space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed text-center mb-12 glass-card p-8 rounded-2xl border border-white/10">
          {description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Education & Strengths Section */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Education Card */}
          <div className="glass-card p-6 rounded-2xl border border-indigo-500/30 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
              <GraduationCap size={24} />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Education</span>
              <h3 className="text-lg font-bold text-white mt-1">{education.degree}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{education.field}</p>
            </div>
          </div>

          {/* Strengths Card */}
          <div className="glass-card p-6 rounded-2xl border border-emerald-500/30 flex flex-col justify-center space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Additional Strengths</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {strengths.map((str, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />
                  <span>{str}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Highlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-indigo-500/40"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/30 transition-all">
                  <Icon name={item.icon} size={24} />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
