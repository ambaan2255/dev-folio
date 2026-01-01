import React, { useEffect, useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { BLOGS } from '../services/blogs';

const BlogDetail: React.FC<{ blogId: string, onBack: () => void }> = ({ blogId, onBack }) => {
  const blog = BLOGS.find(b => b.id === blogId);
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (blog) {
      document.title = `${blog.title} | Blog`;
      // Add copy functionality to all code blocks
      setTimeout(() => {
        document.querySelectorAll('pre code').forEach((block) => {
          const pre = block.parentElement;
          if (pre && !pre.querySelector('.copy-btn')) {
            const button = document.createElement('button');
            button.className = 'copy-btn absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg text-xs font-medium transition-opacity opacity-0 group-hover:opacity-100';
            button.innerHTML = `
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
            `;
            button.onclick = () => {
              navigator.clipboard.writeText(block.textContent || '');
              setCopiedCode(block.textContent || '');
              button.innerHTML = `
                <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              `;
              setTimeout(() => {
                button.innerHTML = `
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                `;
                setCopiedCode(null);
              }, 2000);
            };
            pre.classList.add('group', 'relative');
            pre.appendChild(button);
          }
        });
      }, 100);
    }
  }, [blog]);

  if (!blog) return <div className="p-24 text-center font-black text-gray-900 dark:text-white">Entry not found</div>;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = () => {
    const text = `Check out "${blog.title}" by Maurice Gift: ${window.location.href}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  // Convert content to HTML with proper formatting
  const renderContent = () => {
    return { __html: blog.content };
  };

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-10 pb-24">
      <SectionWrapper>
        <button 
          onClick={onBack} 
          className="flex items-center text-indigo-600 dark:text-indigo-400 font-black text-xs mb-10 gap-2 hover:underline uppercase tracking-widest transition-all hover:gap-3"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg> 
          Back to Blogs
        </button>
        
        <div className="space-y-6 mb-12">
          <div className="flex flex-wrap gap-3">
            {blog.tags.map(t => (
              <span 
                key={t} 
                className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-xl border border-indigo-100 dark:border-indigo-800 hover:scale-105 transition-transform"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="text-4xl sm:text-7xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white">
            {blog.title}
          </h1>
          <div className="flex items-center gap-8 pt-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z"/>
              </svg>
              {blog.date}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {blog.readTime}
            </span>
          </div>
        </div>
        
        <div className="relative aspect-video w-full rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden shadow-2xl mb-12 border-2 border-gray-200 dark:border-gray-800 hover:scale-[1.02] transition-transform duration-300">
          <img 
            src={blog.image} 
            className="w-full h-full object-cover" 
            alt={blog.title} 
            loading="lazy"
          />
        </div>
        
        <div className="flex items-center gap-4 mb-16 pb-12 border-b-2 border-gray-300 dark:border-gray-800">
          <button 
            onClick={shareTwitter} 
            title="Share on X" 
            className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl hover:scale-110 transition-all shadow-sm hover:shadow-md"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
          <button 
            onClick={shareLinkedIn} 
            title="Share on LinkedIn" 
            className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl hover:scale-110 transition-all shadow-sm hover:shadow-md"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </button>
          <button 
            onClick={handleCopyLink} 
            title="Copy Transmission Link" 
            className={`p-4 rounded-2xl transition-all shadow-sm hover:shadow-md ${
              copied 
                ? 'bg-green-600 text-white scale-110' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:scale-110'
            }`}
          >
            {copied ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            )}
          </button>
        </div>

        {/* Blog Content Container */}
        <div 
          className="blog-content prose prose-lg dark:prose-invert max-w-none 
            prose-headings:font-black prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12
            prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:pt-4 prose-h2:border-t prose-h2:border-gray-200 dark:prose-h2:border-gray-800
            prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
            prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6
            prose-p:text-lg prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
            prose-ul:my-6 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:leading-relaxed
            prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-black
            prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
            prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-2xl prose-pre:overflow-hidden prose-pre:p-0
            prose-code:text-gray-200 prose-code:font-mono prose-code:text-sm
            prose-table:w-full prose-table:my-8 prose-table:border-collapse
            prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:text-gray-900 dark:prose-th:text-white prose-th:font-black prose-th:p-4 prose-th:text-left prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-700
            prose-td:p-4 prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700 prose-td:text-gray-700 dark:prose-td:text-gray-300"
          dangerouslySetInnerHTML={renderContent()}
        />

        {/* Share section at the bottom */}
        <div className="mt-16 pt-12 border-t-2 border-gray-300 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Share this post:
              </span>
              <button onClick={shareTwitter} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
              <button onClick={shareLinkedIn} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </button>
            </div>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-105"
            >
              Back to posts
            </button>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default BlogDetail;
