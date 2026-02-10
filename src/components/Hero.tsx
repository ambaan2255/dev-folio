import React, { useState, useEffect, useRef } from 'react';
import { STATS, DEV_INFO } from '../services/constants';

const CountUp: React.FC<{ end: string, duration: number }> = ({ end, duration }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted) {
        setHasStarted(true);
      }
    }, { threshold: 0.1 });

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    
    // Extract numeric value from string (e.g., "10+" -> 10, "4.5" -> 4.5)
    const numericPart = parseFloat(end.replace(/[^0-9.]/g, ''));
    let startTimestamp: number | null = null;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(progress * numericPart);
      if (progress < 1) window.requestAnimationFrame(step);
      else setCount(numericPart);
    };
    window.requestAnimationFrame(step);
  }, [end, duration, hasStarted]);

  return (
    <div ref={countRef}>
      {count % 1 === 0 ? Math.floor(count) : count.toFixed(1)}{end.replace(/[0-9.]/g, '')}
    </div>
  );
};

const Hero: React.FC = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Text animation states
  const [firstTextVisible, setFirstTextVisible] = useState(false);
  const [secondTextVisible, setSecondTextVisible] = useState(false);

  useEffect(() => {
    // Trigger image zoom in animation after page load
    const timer = setTimeout(() => {
      setIsImageLoaded(true);
    }, 300);

    // Trigger text animations with delays
    setTimeout(() => {
      setFirstTextVisible(true);
    }, 500);

    setTimeout(() => {
      setSecondTextVisible(true);
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-12 sm:gap-20">
          {/* Text content */}
          <div className="lg:col-span-7 text-center sm:text-left space-y-8 sm:space-y-10 order-2 lg:order-1">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] dark:text-white">
              <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
                <div className="lg:flex-1">
                  Architecting <br className="hidden sm:block" /> 
                  <span className="text-indigo-600 dark:text-indigo-400">Digital Intelligence</span>
                </div>
              </div>
            </h1>

            {/* Mobile Image with animation */}
            <div className="lg:hidden flex justify-center py-6">
              <div 
                className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-indigo-600 p-1 shadow-2xl transition-all duration-1000 ease-out ${isImageLoaded ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img 
                  src={DEV_INFO.photoUrl} 
                  alt={DEV_INFO.name} 
                  className={`w-full h-full object-cover rounded-full transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
                  onLoad={() => setIsImageLoaded(true)}
                />
              </div>
            </div>

            {/* First text section - swipe left animation */}
            <div 
              className={`text-lg sm:text-2xl text-gray-900 dark:text-white leading-relaxed font-bold max-w-2xl mx-auto sm:mx-0 transition-all duration-700 ease-out ${firstTextVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
            >
              I'm <span className="text-indigo-600 dark:text-indigo-400">{DEV_INFO.name}</span>, a self-learned developer from india. I'm still not a student, currently i am a jobseeker.
              I have a passion for web development and app  development,  I like to learn new things. I like to share my knowledge as well as collaborate with others.
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start pt-4">
              <button onClick={() => window.dispatchEvent(new CustomEvent('navToProjects'))} className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 uppercase tracking-widest">
                See My Work
              </button>
              <button onClick={() => window.dispatchEvent(new CustomEvent('navToContact'))} className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-3 border-2 border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:scale-105 active:scale-95 uppercase tracking-widest">
                Social help
              </button>
            </div>

            {/* Second text section - swipe right animation */}
            <div 
              className={`text-sm sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto sm:mx-0 font-light italic transition-all duration-700 ease-out ${secondTextVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
            >
             digital experiences with tech stack like React, Node.js, and AI. Specialized in distributed systems and high-performance UI components with a focus on enterprise-grade security. My journey in technology has been driven by curiosity and a desire to create meaningful solutions. I specialize in building responsive, accessible, and performant digital experiences that make an impact.
            </div>
          </div>

          {/* Desktop Image with animation */}
          <div className="hidden lg:block lg:col-span-5 order-1 lg:order-2">
            <div className="relative h-full flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div 
                  className={`aspect-square rounded-full border-[12px] border-indigo-600/20 p-4 relative overflow-hidden shadow-[0_0_100px_-20px_rgba(79,70,229,0.3)] transition-all duration-1000 ease-out ${isImageLoaded ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <img 
                    src={DEV_INFO.photoUrl} 
                    alt={DEV_INFO.name} 
                    className={`w-full h-full object-cover rounded-full border-4 border-indigo-600 transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
                    onLoad={() => setIsImageLoaded(true)}
                  />
                </div>
                {/* Optional decorative elements */}
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-400/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t-2 border-gray-300 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {STATS.map(stat => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white">
                  <CountUp end={stat.value} duration={2000} />
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-[0.4em] mt-4 font-black">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full border-b-2 border-gray-300 dark:border-gray-800"></div>
    </section>
  );
};

export default Hero;
