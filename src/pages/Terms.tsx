import React from 'react';
import SectionWrapper from '../components/SectionWrapper';

const Terms: React.FC = () => (
  <div className="max-w-4xl mx-auto px-6 sm:px-10 pb-24">
    <SectionWrapper type="fade-down">
      <h1 className="text-5xl lg:text-7xl font-black mb-16 tracking-tighter">Terms of Service</h1>
    </SectionWrapper>
    <SectionWrapper delay={200} type="fade-up">
      <div className="prose prose-xl dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 font-light leading-relaxed space-y-8">
        <p>Welcome to my portfolio. By accessing this website, you agree to these terms.</p>
        
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-12">1. Intellectual Property</h2>
        <p>All content, including code snippets, designs, and text, are the intellectual property of Maurice Gift unless otherwise noted. You may not reproduce this content for commercial purposes without explicit written consent.</p>
        
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-12">2. Accuracy of Content</h2>
        <p>While I strive for absolute accuracy in the descriptions of my projects and technologies, the content is provided for informational and portfolio showcase purposes.</p>
        
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-12">3. Disclaimer</h2>
        <p>The information on this site is provided "as is" without warranty of any kind. I am not liable for any damages arising from the use of this site or reliance on its contents.</p>
      </div>
    </SectionWrapper>
  </div>
);

export default Terms;
