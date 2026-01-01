import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { WORK_EXPERIENCE } from '../services/experience';

const Experience: React.FC = () => (
  <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-24">
    <SectionWrapper type="fade-down">
      <h2 className="text-5xl lg:text-8xl font-black mb-16 tracking-tighter text-center">Professional Odyssey</h2>
    </SectionWrapper>
    <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
      {WORK_EXPERIENCE.map((exp, i) => (
        <SectionWrapper key={i} delay={i * 200} type="zoom-in">
          <div className="group relative rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl transition-all hover:scale-[1.01] min-h-[350px] sm:min-h-[400px]">
            {/* Background Image Container with Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img 
                src={exp.companyImage} 
                alt={exp.company} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gray-950/85 transition-opacity group-hover:opacity-90"></div>
            </div>
            
            <div className="relative z-10 p-8 sm:p-14 h-full flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="text-indigo-400 font-black text-[10px] sm:text-xs uppercase tracking-[0.3em]">{exp.company}</div>
                  <div className="text-gray-400 font-black text-[10px] uppercase tracking-[0.2em]">{exp.location}</div>
                </div>
                <h3 className="text-2xl sm:text-5xl font-black tracking-tight text-white mb-6 group-hover:text-indigo-400 transition-colors leading-tight">{exp.position}</h3>
                <div className="inline-block px-5 py-2 bg-indigo-500/20 text-indigo-400 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest border border-indigo-500/30">{exp.duration}</div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-8 gap-6">
                <p className="text-gray-300 text-sm sm:text-lg leading-relaxed font-light max-w-xl">{exp.description}</p>
                <div className="hidden sm:block">
                  <div className="w-12 h-1 bg-indigo-500 rounded-full group-hover:w-24 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>
      ))}
    </div>
  </div>
);

export default Experience;
