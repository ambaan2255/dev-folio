import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { BLOGS } from '../services/blogs';

const Blogs: React.FC<{ onBlogClick: (id: string) => void }> = ({ onBlogClick }) => (
  <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-24">
    <SectionWrapper type="fade-left">
      <h2 className="text-5xl lg:text-8xl font-black mb-16 tracking-tighter">Thought Archive</h2>
    </SectionWrapper>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {BLOGS.map((blog, i) => (
        <SectionWrapper key={blog.id} delay={i * 150} type="fade-up">
          <div 
            className="group bg-white dark:bg-gray-900 rounded-[3rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-indigo-500/30 h-full flex flex-col"
          >
            <div className="aspect-video overflow-hidden">
              <img src={blog.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={blog.title} />
            </div>
            <div className="p-10 flex flex-col flex-grow">
              <div className="text-[10px] font-black uppercase text-indigo-600 mb-4 tracking-[0.2em]">{blog.category} • {blog.date}</div>
              <h3 className="text-3xl font-black mb-6 group-hover:text-indigo-600 transition-colors tracking-tight leading-tight">{blog.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 line-clamp-2 mb-8 font-light flex-grow">{blog.excerpt}</p>
              {/* Navigation Trigger moved here */}
              <div 
                onClick={() => onBlogClick(blog.id)} 
                className="w-fit cursor-pointer text-xs font-black uppercase tracking-[0.3em] text-indigo-600 flex items-center gap-3 group/btn"
              >
                Read Entry 
                <div className="w-8 h-[2px] bg-indigo-100 group-hover/btn:w-16 group-hover/btn:bg-indigo-600 transition-all duration-300" />
              </div>
            </div>
          </div>
        </SectionWrapper>
      ))}
    </div>
  </div>
);

export default Blogs;
