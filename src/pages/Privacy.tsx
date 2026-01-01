import React from 'react';
import SectionWrapper from '../components/SectionWrapper';

const Privacy: React.FC = () => (
  <div className="max-w-4xl mx-auto px-6 sm:px-10 pb-24">
    <SectionWrapper type="fade-down">
      <h1 className="text-5xl lg:text-7xl font-black mb-16 tracking-tighter">Privacy Policy</h1>
    </SectionWrapper>
    <SectionWrapper delay={200} type="fade-up">
      <div className="prose prose-xl dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 font-light leading-relaxed space-y-8">
        <p>Your privacy is of critical importance. This policy outlines how your data is handled when you interact with my digital portfolio.</p>
        
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-12">1. Data Collection</h2>
        <p>I do not collect personal identifying information unless you voluntarily provide it through the contact form.</p>
        
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-12">2. Usage of Information</h2>
        <p>Information provided via the contact form is used solely to respond to your inquiries. No data is shared with third-party advertising entities.</p>
        
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-12">3. Cookies</h2>
        <p>This site may use essential cookies for theme persistence (light/dark mode) and basic performance metrics to ensure a smooth user experience.</p>
        
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-12">4. Data Security</h2>
        <p>Industry-standard encryption and security measures are in place via our hosting provider (Vercel) to protect any information transmitted through the site.</p>
      </div>
    </SectionWrapper>
  </div>
);

export default Privacy;
