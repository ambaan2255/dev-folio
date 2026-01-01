import React, { useEffect, useRef, useState } from 'react';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  type?: AnimationType;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className = "", delay = 0, type = 'fade-up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    }, { threshold: 0.1 });
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const getAnimationClass = () => {
    switch (type) {
      case 'fade-up': return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
      case 'fade-down': return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8';
      case 'fade-left': return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8';
      case 'fade-right': return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8';
      case 'zoom-in': return isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95';
      case 'zoom-out': return isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105';
      default: return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
    }
  };

  return (
    <div
      ref={domRef}
      style={{ 
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform' 
      }}
      className={`${className} transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${getAnimationClass()}`}
    >
      {children}
    </div>
  );
};

export default SectionWrapper;
