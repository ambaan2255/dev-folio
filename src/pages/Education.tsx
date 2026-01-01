import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { EDUCATION } from '../services/education';

const Education: React.FC = () => (
  <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-24">
    <SectionWrapper type="fade-down">
      <h2 className="text-5xl lg:text-8xl font-black mb-16 tracking-tighter text-center">Academic Foundation</h2>
    </SectionWrapper>
    <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
      {EDUCATION.map((edu, i) => (
        <SectionWrapper key={i} delay={i * 200} type="zoom-in">
          <div className="group relative rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl transition-all hover:scale-[1.01] min-h-[350px] sm:min-h-[400px]">
            {/* Background Image Container - Optimized: Removed backdrop-blur for mobile performance */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img 
                src={edu.institutionImage} 
                alt={edu.school} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gray-950/85 transition-opacity group-hover:opacity-90"></div>
            </div>
            
            <div className="relative z-10 p-8 sm:p-14 h-full flex flex-col justify-between">
              <div>
                <div className="text-indigo-400 font-black text-[10px] sm:text-xs uppercase mb-4 tracking-[0.3em]">{edu.school}</div>
                <h3 className="text-2xl sm:text-5xl font-black tracking-tight text-white mb-6 group-hover:text-indigo-400 transition-colors leading-tight">{edu.degree}</h3>
                <div className="inline-block px-5 py-2 bg-indigo-500/20 text-indigo-400 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest border border-indigo-500/30">{edu.grade}</div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-8 gap-6">
                <p className="text-gray-300 text-sm sm:text-lg leading-relaxed font-light max-w-xl">{edu.description}</p>
                <div className="text-gray-400 font-black text-xs sm:text-sm uppercase tracking-[0.2em] whitespace-nowrap">{edu.year}</div>
              </div>
            </div>
          </div>
        </SectionWrapper>
      ))}
    </div>
  </div>
);

export default Education;
