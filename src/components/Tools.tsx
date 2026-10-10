import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Icon } from './Icon';

export const Tools: React.FC = () => {
  const { tools } = portfolioData;

  return (
    <section id="tools" className="py-24 relative overflow-hidden bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
            Tech Stack & Tools
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tools, Platforms & AI Software
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            A visual overview of the AI platforms, video editing applications, social media suites, and productivity tools I utilize.
          </p>
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {tools.map((tool, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col items-center text-center justify-between group hover:border-cyan-500/40"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                <Icon name={tool.icon} size={24} />
              </div>

              <div>
                <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                  {tool.name}
                </h3>
                <span className="text-[11px] font-medium text-slate-400 block mt-1">
                  {tool.category}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 w-full">
                <span className="text-[10px] font-semibold text-cyan-400/90 tracking-wide uppercase">
                  {tool.level}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
