import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SKILLS } from '../services/skills';
import SectionWrapper from './SectionWrapper';

const TechLogo = ({ name }: { name: string }) => {
  const getSlug = (skillName: string) => {
    const sn = skillName.toLowerCase();
    if (sn.includes('typescript')) return 'typescript';
    if (sn.includes('javascript')) return 'javascript';
    if (sn.includes('react')) return 'react';
    if (sn.includes('next.js')) return 'nextdotjs';
    if (sn.includes('html')) return 'html5';
    if (sn.includes('css')) return 'css3';
    if (sn.includes('tailwind')) return 'tailwindcss';
    if (sn.includes('framer motion')) return 'framer';
    if (sn.includes('python')) return 'python';
    if (sn.includes('node.js')) return 'nodedotjs';
    if (sn.includes('mysql')) return 'mysql';
    if (sn.includes('postgresql')) return 'postgresql';
    if (sn.includes('mongodb')) return 'mongodb';
    if (sn.includes('redis')) return 'redis';
    if (sn.includes('aws')) return 'amazonwebservices';
    if (sn.includes('cloudflare')) return 'cloudflare';
    if (sn.includes('vercel')) return 'vercel';
    if (sn.includes('heroku')) return 'heroku';
    if (sn.includes('render')) return 'render';
    if (sn.includes('github')) return 'github';
    if (sn.includes('docker')) return 'docker';
    if (sn.includes('google cloud')) return 'googlecloud';
    if (sn.includes('gemini')) return 'google';
    if (sn.includes('deepseek')) return 'deepseek';
    if (sn.includes('openai')) return 'openai';
    if (sn.includes('claude')) return 'anthropic';
    return null;
  };

  const slug = getSlug(name);
  if (!slug) return <div className="w-6 h-6 bg-indigo-500/10 rounded flex items-center justify-center text-[8px] font-black text-indigo-600 uppercase">TI</div>;

  return (
    <img 
      src={`https://cdn.simpleicons.org/${slug}`} 
      alt={name} 
      className="w-6 h-6 object-contain"
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
    />
  );
};

const Skills: React.FC = () => {
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));
  const getBarColor = (level: number) => {
    if (level >= 95) return '#4f46e5'; 
    if (level >= 90) return '#6366f1'; 
    if (level >= 80) return '#818cf8'; 
    return '#a5b4fc'; 
  };

  return (
    <div className="py-12">
      <SectionWrapper type="fade-right">
        <h3 className="text-3xl font-black mb-12 flex items-center">
          Technical Proficiency
          <div className="ml-6 h-[2px] bg-indigo-100 dark:bg-indigo-900 flex-grow" />
        </h3>
      </SectionWrapper>
      
      <div className="space-y-24">
        {categories.map((category, catIdx) => (
          <div key={category} className="group">
            <SectionWrapper type="fade-left" delay={100}>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400 mb-8 flex items-center">
                {category}
                <span className="ml-4 px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg text-[10px]">
                  {SKILLS.filter(s => s.category === category).length} Nodes
                </span>
              </h4>
            </SectionWrapper>

            <div className="flex flex-col space-y-10">
              <SectionWrapper type="zoom-in" delay={200}>
                <div className="h-[350px] w-full bg-white dark:bg-gray-900/40 p-6 rounded-[2.5rem] border-2 border-gray-100 dark:border-gray-800 shadow-sm">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={SKILLS.filter(s => s.category === category).sort((a,b) => b.level - a.level)} 
                      layout="vertical" 
                      margin={{ left: 20, right: 40, top: 10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#9ca3af" opacity={0.1} />
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 900 }} 
                        width={120}
                      />
                      <Tooltip 
                        cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                        contentStyle={{ backgroundColor: '#ffffff', color: '#111827', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '12px' }}
                        formatter={(value) => [`${value}%`, 'Signal Strength']}
                      />
                      <Bar dataKey="level" radius={[0, 8, 8, 0]} barSize={16}>
                        {SKILLS.filter(s => s.category === category).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBarColor(entry.level)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </SectionWrapper>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {SKILLS.filter(s => s.category === category).map((skill, skillIdx) => (
                  <SectionWrapper key={skill.name} type="fade-up" delay={skillIdx * 50}>
                    <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-100 dark:border-gray-800 group/item hover:border-indigo-500 transition-all hover:shadow-lg h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <TechLogo name={skill.name} />
                        <div className="text-[10px] font-black mb-0 text-gray-900 dark:text-white uppercase tracking-widest truncate">{skill.name}</div>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-grow bg-gray-100 dark:bg-gray-800 h-1 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 rounded-full transition-all duration-1000" style={{ width: `${skill.level}%` }} />
                        </div>
                        <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400">{skill.level}%</span>
                      </div>
                    </div>
                  </SectionWrapper>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
