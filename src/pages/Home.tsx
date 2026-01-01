import React from 'react';
import Hero from '../components/Hero';
import { PHILOSOPHY } from '../services/constants';
import ProjectGrid from '../components/ProjectGrid';
import { TESTIMONIALS } from '../services/testimonials';
import SectionWrapper from '../components/SectionWrapper';


const Home: React.FC = () => {
  return (
    <div className="pb-16 sm:pb-24 overflow-x-hidden">
      <SectionWrapper type="fade-up"><Hero /></SectionWrapper>
      
      <SectionWrapper delay={200} type="fade-right">
        <div className="py-16 sm:py-24 bg-gray-50/50 dark:bg-gray-900/20 backdrop-blur-sm border-y-2 border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <h2 className="text-3xl sm:text-6xl font-black mb-12 tracking-tighter text-center">Engineering Philosophy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {PHILOSOPHY.map((item, idx) => (
                <SectionWrapper key={idx} delay={idx * 150} type="zoom-in">
                  <div className="bg-white dark:bg-gray-950 p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border-2 border-gray-100 dark:border-gray-800 shadow-sm text-center group transition-all hover:shadow-2xl h-full">
                    <div className="text-4xl sm:text-5xl mb-8 group-hover:scale-125 transition-transform">{item.icon}</div>
                    <h3 className="text-xl sm:text-2xl font-black mb-6 uppercase tracking-tight">{item.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed font-light">{item.description}</p>
                  </div>
                </SectionWrapper>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper delay={300} type="fade-left">
        <div className="py-16 sm:py-24 max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 sm:mb-16 gap-6">
            <h2 className="text-4xl sm:text-7xl font-black tracking-tighter">Top Featured</h2>
            <button onClick={() => window.dispatchEvent(new CustomEvent('navToProjects'))} className="text-indigo-600 font-black uppercase tracking-[0.2em] text-sm hover:translate-x-3 transition-transform flex items-center gap-2 group">
              Full Archive 
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
          <ProjectGrid limit={2} onProjectClick={(id) => window.dispatchEvent(new CustomEvent('navToProject', { detail: id }))} />
        </div>
      </SectionWrapper>

      <SectionWrapper delay={400} type="zoom-out">
        <div className="py-16 sm:py-24 bg-indigo-600/5 dark:bg-indigo-600/10 border-y-2 border-indigo-100 dark:border-indigo-900/50 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <div className="flex animate-marquee gap-8 sm:gap-16">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div key={i} className="flex-shrink-0 w-[300px] sm:w-[450px] flex flex-col items-center text-center px-4 sm:px-8 transition-transform hover:scale-105 duration-500">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-indigo-600 blur-2xl opacity-20 rounded-full scale-150"></div>
                    <img src={t.image} alt={t.author} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-2xl object-cover relative z-10" />
                  </div>
                  <div className="font-black text-xl sm:text-2xl mb-1">{t.author}</div>
                  <div className="text-[10px] sm:text-xs text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-8 font-black">{t.position}</div>
                  <p className="italic text-base sm:text-xl text-gray-700 dark:text-gray-300 font-light leading-relaxed">“{t.quote}”</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: fit-content;
            animation: marquee 40s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </SectionWrapper>
    </div>
  );
};

export default Home;
