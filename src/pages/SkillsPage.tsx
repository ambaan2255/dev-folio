import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import Skills from '../components/Skills';

const SkillsPage: React.FC = () => (
  <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-24">
    <SectionWrapper>
      <div className="mb-12">
        <h2 className="text-4xl sm:text-7xl font-black mb-8 tracking-tighter">Technological Spectrum</h2>
        <p className="text-gray-500 text-xl font-light leading-relaxed max-w-2xl">
          An extensive mapping of my core competencies, from advanced architectural paradigms to enterprise-grade infrastructure.
        </p>
      </div>
    </SectionWrapper>
    <SectionWrapper delay={200}>
      <div className="mt-8">
        <Skills />
      </div>
    </SectionWrapper>
  </div>
);

export default SkillsPage;
