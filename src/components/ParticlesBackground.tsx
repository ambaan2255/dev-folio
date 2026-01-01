import React, { useEffect } from 'react';

interface ParticlesBackgroundProps {
  theme: 'light' | 'dark';
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ theme }) => {
  useEffect(() => {
    const loadParticles = async () => {
      // @ts-ignore
      if (window.tsParticles) {
        // @ts-ignore
        await window.tsParticles.load("tsparticles", {
          fullScreen: { enable: false },
          fpsLimit: 120,
          particles: {
            number: { 
              value: 100, 
              density: { enable: true, value_area: 1000 } 
            },
            color: { 
              value: theme === 'dark' ? "#818cf8" : "#4f46e5" 
            },
            shape: { type: "circle" },
            opacity: {
              value: theme === 'dark' ? 0.4 : 0.2,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
              }
            },
            size: { 
              value: 3, 
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 0.5,
                sync: false
              }
            },
            links: {
              enable: true,
              distance: 150,
              color: theme === 'dark' ? "#818cf8" : "#4f46e5",
              opacity: theme === 'dark' ? 0.3 : 0.15,
              width: 1
            },
            move: {
              enable: true,
              speed: 1.5,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out"
              },
              bounce: false,
            }
          },
          interactivity: {
            detectsOn: "window",
            events: {
              onHover: { 
                enable: true, 
                mode: "grab" 
              },
              onClick: { 
                enable: true, 
                mode: "push" 
              },
              resize: true
            },
            modes: {
              grab: { 
                distance: 200, 
                links: { opacity: 0.8 } 
              },
              push: { 
                quantity: 4 
              }
            }
          },
          detectRetina: true,
          background: {
            color: "transparent"
          }
        });
      }
    };

    loadParticles();
  }, [theme]);

  return null;
};

export default ParticlesBackground;
