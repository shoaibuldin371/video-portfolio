import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Icon } from './Icon';
import { CheckCircle2 } from 'lucide-react';

export const Skills: React.FC = () => {
  const { skillsCategories } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCategories = activeCategory === 'all'
    ? skillsCategories
    : skillsCategories.filter(c => c.id === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
            Capabilities & Skills
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Specialized Skills & Technical Expertise
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            A comprehensive overview of my core proficiencies in social media, AI content generation, video editing, and product coordination.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-white/10'
            }`}
          >
            All Disciplines
          </button>
          {skillsCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-white/10'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-indigo-500/40 relative overflow-hidden group"
            >
              {/* Card Header */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-cyan-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                    <Icon name={category.icon} size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-400 mt-1">
                      {category.skills.length} Specialized Competencies
                    </p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Skills List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-white/10">
                {category.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-200 hover:border-indigo-500/30 hover:bg-slate-800/80 transition-colors"
                  >
                    <CheckCircle2 size={14} className="text-indigo-400 flex-shrink-0" />
                    <span className="font-medium truncate">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
