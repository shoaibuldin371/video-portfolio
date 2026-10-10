import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Briefcase, CheckCircle2, UserCheck, MapPin } from 'lucide-react';

export const Experience: React.FC = () => {
  const { experiences } = portfolioData;

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-slate-950/90 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            Work Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional Experience & Career History
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Hands-on work experience at Paramount Intelligence and self-employed freelance video editing projects in Islamabad, Pakistan.
          </p>
        </div>

        {/* Timeline / Experience Grid */}
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-emerald-500/40"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <Briefcase size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <span className="text-sm font-semibold text-slate-200">
                        {exp.company}
                      </span>
                      {exp.location && (
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin size={12} className="text-slate-500" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 w-fit">
                    {exp.period}
                  </span>
                </div>
              </div>

              {/* CEO / Reference contact info if available */}
              {exp.contactPerson && (
                <div className="my-4 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/5 text-xs text-emerald-400 font-medium flex items-center gap-2 w-fit">
                  <UserCheck size={16} />
                  <span>{exp.contactPerson}</span>
                </div>
              )}

              {/* Description & Key Achievements */}
              <div className="pt-2 space-y-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  {exp.description}
                </p>

                <div className="space-y-2">
                  {exp.achievements.map((achievement, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-slate-300 leading-relaxed">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
