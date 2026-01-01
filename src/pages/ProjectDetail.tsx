import React, { useState, useEffect, useRef } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { PROJECTS } from '../services/projects';

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
}

const TechIcon = ({ name }: { name: string }) => {
  const n = name.toLowerCase();
  if (n.includes('python')) return <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.3c.9.2 1.5.9 1.5 1.8v1.4H12c-1.1 0-2.1.9-2.1 2.1v2.1H6.1c-.9 0-1.8.7-2.1 1.5-.2.9.2 1.8.9 2.1l1.4.3v2.8H2.1c-.9 0-1.5-.7-1.8-1.5-.2-.9.2-1.8.9-2.1l1.4-.3V6.4c.3-.9.9-1.5 1.8-1.5h2.8V2.1c0-.9.7-1.5 1.5-1.8C9.5.1 12.1.1 14.25.3zm-3.3 3.6c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z"/></svg>;
  if (n.includes('react')) return <svg className="w-6 h-6 text-sky-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18a6 6 0 100-12 6 6 0 000 12z"/></svg>;
  if (n.includes('node')) return <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 5v14l8 3 8-3V5l-8-3z"/></svg>;
  if (n.includes('next')) return <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L2 23h20L12 1zm0 4l7.5 16H4.5L12 5z"/></svg>;
  if (n.includes('typescript') || n.includes('ts')) return <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm17.363 9.75c.612 0 1.154.037 1.627.111v2.111c-.473-.093-.975-.139-1.503-.139-1.367 0-2.05.834-2.05 2.505v5.93h-2.724V9.889h2.453v1.194c.572-.9 1.272-1.333 2.197-1.333z"/></svg>;
  if (n.includes('tailwind')) return <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6.036c-2.667 0-4 1.333-4 4 0 2.667 1.333 4 4 4s4-1.333 4-4c0-2.667-1.333-4-4-4z"/></svg>;
  return <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack }) => {
  const project = PROJECTS.find(p => p.id === projectId);
  const [currentImg, setCurrentImg] = useState(0);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (project) document.title = `${project.title} | Maurice Gift`;
  }, [project]);

  useEffect(() => {
    if (project && project.images.length > 1) {
      timerRef.current = window.setInterval(() => {
        setCurrentImg(prev => (prev + 1) % project.images.length);
      }, 3500);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [project]);

  const handleNext = (e: React.MouseEvent) => { e.stopPropagation(); if (project) setCurrentImg(prev => (prev + 1) % project.images.length); };
  const handlePrev = (e: React.MouseEvent) => { e.stopPropagation(); if (project) setCurrentImg(prev => (prev - 1 + project.images.length) % project.images.length); };

  if (!project) return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-24 text-center">
      <h2 className="text-3xl font-black text-gray-900 dark:text-white">Project not found</h2>
      <button onClick={onBack} className="mt-8 text-indigo-600 font-bold uppercase tracking-widest text-sm">Return to Archive</button>
    </div>
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-900/50';
      case 'In Progress': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-900/50';
      case 'Concept': return 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-900/50';
      default: return 'text-gray-600 bg-gray-50 border-gray-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-24">
      <SectionWrapper delay={0}>
        <button onClick={onBack} className="flex items-center text-indigo-600 font-black uppercase tracking-widest text-xs mb-10 hover:underline gap-2 group">
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg> 
          Back to Projects
        </button>
      </SectionWrapper>
      <div className="flex flex-col space-y-12">
        <SectionWrapper delay={100}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <h1 className="text-4xl sm:text-7xl font-black tracking-tighter leading-tight text-gray-900 dark:text-white">{project.title}</h1>
            <div className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest border-2 w-fit shadow-sm ${getStatusColor(project.status)}`}>{project.status}</div>
          </div>
        </SectionWrapper>
        <SectionWrapper delay={200} className="flex justify-center">
          <div className="relative aspect-video w-full max-w-4xl lg:max-h-[500px] rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-800 group">
            <img key={currentImg} src={project.images[currentImg]} alt={project.title} className="w-full h-full object-cover animate-fade-in" />
            {project.images.length > 1 && (
              <>
                <div className="absolute inset-0 flex items-center justify-between px-6 sm:px-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <button onClick={handlePrev} className="p-4 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all pointer-events-auto shadow-lg hover:scale-110 active:scale-95">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button onClick={handleNext} className="p-4 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all pointer-events-auto shadow-lg hover:scale-110 active:scale-95">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                  {project.images.map((_, idx) => <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${currentImg === idx ? 'w-10 bg-white' : 'w-2 bg-white/40'}`} />)}
                </div>
              </>
            )}
          </div>
        </SectionWrapper>
        <SectionWrapper delay={300} className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border-2 border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Engine Stack</h4>
            <div className="flex flex-wrap gap-4">
              {project.techStack.map(tech => (
                <div key={tech} className="flex flex-col items-center gap-2 group/icon">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-transparent group-hover/icon:border-indigo-500 transition-all"><TechIcon name={tech} /></div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">{tech}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border-2 border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Architectural Class</h4>
            <div className="flex flex-col justify-center h-full pb-8">
              <div className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight leading-none mb-2">{project.category}</div>
              <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em]">Deployment Tier</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border-2 border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Transmission Control</h4>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href={project.githubUrl} title="Source Code" target="_blank" rel="noopener noreferrer" className="p-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl hover:scale-110 transition-all shadow-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              {project.liveUrl && <a href={project.liveUrl} title="Live Preview" target="_blank" rel="noopener noreferrer" className="p-4 bg-indigo-600 text-white rounded-2xl hover:scale-110 transition-all shadow-xl shadow-indigo-600/30"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a>}
              <button onClick={handleCopyLink} title="Copy Address" className={`p-4 rounded-2xl transition-all shadow-lg ${copied ? 'bg-green-600 text-white' : 'bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 hover:scale-110'}`}>{copied ? <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>}</button>
            </div>
          </div>
        </SectionWrapper>
        <SectionWrapper delay={400} className="max-w-4xl pt-4 mx-auto lg:mx-0">
          <div className="prose prose-2xl dark:prose-invert text-gray-700 dark:text-gray-300 font-light leading-relaxed space-y-12">
            <p className="text-2xl sm:text-4xl text-gray-900 dark:text-gray-100 font-light leading-[1.3] tracking-tight">{project.description}</p>
          </div>
        </SectionWrapper>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0.5; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
      `}</style>
    </div>
  );
};

export default ProjectDetail;
