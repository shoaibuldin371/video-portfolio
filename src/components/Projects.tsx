import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Play, ExternalLink, Tag } from 'lucide-react';

interface ProjectsProps {
  onOpenVideoModal: (video: { title: string; category?: string; description?: string; src: string }) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenVideoModal }) => {
  const { projects } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'AI Video Campaigns', 'Social Media Content', 'Short-Form Video Editing', 'Product Planning', 'AI Creative Experiments'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-slate-950/80 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Projects & Selected Work
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            A curated showcase of AI-powered video campaigns, social media growth strategies, short-form editing projects, and product planning blueprints.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-purple-500/40"
            >
              {/* Thumbnail Header */}
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden flex items-center justify-center">
                {/* Fallback Graphic / Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-slate-950 flex flex-col items-center justify-center p-6 text-center group-hover:scale-105 transition-transform duration-500">
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
                    {project.category}
                  </span>
                  <span className="text-lg font-bold text-white max-w-xs">
                    {project.title}
                  </span>
                </div>

                {/* Video Play Overlay Button */}
                {project.videoSrc && (
                  <button
                    onClick={() =>
                      onOpenVideoModal({
                        title: project.title,
                        category: project.category,
                        description: project.description,
                        src: project.videoSrc!
                      })
                    }
                    className="relative z-10 w-14 h-14 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-xl shadow-indigo-600/40 group-hover:scale-110 transition-transform"
                    title="Watch Project Video"
                  >
                    <Play size={24} className="ml-1 fill-white" />
                  </button>
                )}
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  {/* Tools Used */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Tag size={12} className="text-slate-500 mr-1" />
                    {project.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-900 text-slate-300 border border-white/5"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  {project.videoSrc ? (
                    <button
                      onClick={() =>
                        onOpenVideoModal({
                          title: project.title,
                          category: project.category,
                          description: project.description,
                          src: project.videoSrc!
                        })
                      }
                      className="w-full py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <Play size={14} className="fill-current" />
                      <span>Watch Video Demo</span>
                    </button>
                  ) : (
                    <a
                      href="#contact"
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <ExternalLink size={14} />
                      <span>Inquire About Project</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
