import React, { useState, useMemo } from 'react';
import { Project } from '../services/types';
import SectionWrapper from './SectionWrapper';
import { PROJECTS } from '../services/projects';

interface ProjectGridProps {
  limit?: number;
  onProjectClick?: (id: string) => void;
}

const TechIcon = ({ name }: { name: string }) => {
  const n = name.toLowerCase();
  if (n.includes('python')) return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.3c.9.2 1.5.9 1.5 1.8v1.4H12c-1.1 0-2.1.9-2.1 2.1v2.1H6.1c-.9 0-1.8.7-2.1 1.5-.2.9.2 1.8.9 2.1l1.4.3v2.8H2.1c-.9 0-1.5-.7-1.8-1.5-.2-.9.2-1.8.9-2.1l1.4-.3V6.4c.3-.9.9-1.5 1.8-1.5h2.8V2.1c0-.9.7-1.5 1.5-1.8C9.5.1 12.1.1 14.25.3zm-3.3 3.6c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z"/></svg>;
  if (n.includes('react')) return <svg className="w-4 h-4 text-sky-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18a6 6 0 100-12 6 6 0 000 12z"/></svg>;
  if (n.includes('node')) return <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 5v14l8 3 8-3V5l-8-3z"/></svg>;
  if (n.includes('next')) return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L2 23h20L12 1zm0 4l7.5 16H4.5L12 5z"/></svg>;
  if (n.includes('typescript') || n.includes('ts')) return <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm17.363 9.75c.612 0 1.154.037 1.627.111v2.111c-.473-.093-.975-.139-1.503-.139-1.367 0-2.05.834-2.05 2.505v5.93h-2.724V9.889h2.453v1.194c.572-.9 1.272-1.333 2.197-1.333z"/></svg>;
  if (n.includes('tailwind')) return <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6.036c-2.667 0-4 1.333-4 4 0 2.667 1.333 4 4 4s4-1.333 4-4c0-2.667-1.333-4-4-4z"/></svg>;
  if (n.includes('go')) return <svg className="w-4 h-4 text-sky-500" viewBox="0 0 24 24" fill="currentColor"><path d="M1.81 12.15c0-4.87 3.95-8.82 8.82-8.82s8.82 3.95 8.82 8.82-3.95 8.82-8.82 8.82-8.82-3.95-8.82-8.82z"/></svg>;
  if (n.includes('rust')) return <svg className="w-4 h-4 text-orange-700" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l10 5v10l-10 5-10-5V7l10-5zm0 2.8L5.2 7.2v9.6L12 19.2l6.8-2.4V7.2L12 4.8z"/></svg>;
  return <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
};

const ProjectGrid: React.FC<ProjectGridProps> = ({ limit, onProjectClick }) => {
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const categories = ['All', 'Fullstack', 'Frontend', 'Backend', 'AI'];

  const filteredProjects = useMemo(() => {
    let list = PROJECTS.filter(p => {
      const matchesCategory = filter === 'All' || p.category === filter;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (limit) return list.slice(0, limit);
    return list;
  }, [filter, searchQuery, limit]);

  const handleProjectClick = (id: string) => {
    if (onProjectClick) {
      onProjectClick(id);
    } else {
      window.dispatchEvent(new CustomEvent('navToProject', { detail: id }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-900/50';
      case 'In Progress': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-900/50';
      case 'Concept': return 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-900/50';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="w-full">
      {!limit && (
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-10">
          <div className="flex-1">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 tracking-tighter">Archive of Excellence</h2>
            <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl font-light leading-relaxed">
              Every creation here solved a unique problem through architectural depth and user-first engineering.
            </p>
          </div>
          
          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-5">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-72 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl px-12 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 shadow-sm transition-all"
              />
              <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 overflow-x-auto scrollbar-hide shadow-inner">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                    filter === cat ? 'bg-indigo-600 text-white shadow-xl' : 'text-gray-500 hover:text-indigo-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
        {filteredProjects.map((project: Project, idx: number) => (
          <SectionWrapper key={project.id} type="fade-up" delay={idx * 100}>
            <div 
              className="group relative bg-white dark:bg-gray-900 rounded-[3rem] overflow-hidden border-2 border-gray-200 dark:border-gray-800/50 hover:border-indigo-500/50 transition-all duration-700 transform hover:-translate-y-4 shadow-2xl"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                  <span className="px-5 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 border-2 border-indigo-100 dark:border-indigo-900/50 shadow-sm w-fit">
                    {project.category}
                  </span>
                  <span className={`px-5 py-2 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] border-2 shadow-sm w-fit ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                {project.dribbbleUrl && (
                  <div className="absolute top-6 right-6 z-20">
                    <div className="px-4 py-2 bg-pink-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-2.635-.844-5.311-.392.507 1.446.742 2.852.809 4.173 2.258-1.105 3.728-3.237 4.502-3.781z"/></svg>
                      Dribbble
                    </div>
                  </div>
                )}
                <img 
                  src={project.images[0]} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                />
              </div>
              
              <div className="p-10 sm:p-14 border-t-2 border-gray-200 dark:border-gray-800">
                <h3 className="text-3xl sm:text-4xl font-black mb-6 group-hover:text-indigo-600 transition-colors tracking-tight">
                  {project.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-10 line-clamp-2 text-base sm:text-lg leading-relaxed font-light">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2.5 mb-10">
                  {project.techStack.slice(0, 4).map(tech => (
                    <span key={tech} className="px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-800 rounded-xl text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <TechIcon name={tech} />
                      {tech}
                    </span>
                  ))}
                </div>
                {/* Navigation Trigger moved here */}
                <div 
                  onClick={() => handleProjectClick(project.id)}
                  className="w-fit cursor-pointer flex items-center text-[11px] font-black text-indigo-600 uppercase tracking-[0.3em] group/btn"
                >
                  Read More
                  <div className="ml-4 w-12 h-[2px] bg-indigo-100 group-hover/btn:w-20 group-hover/btn:bg-indigo-600 transition-all duration-500" />
                </div>
              </div>
            </div>
          </SectionWrapper>
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;
