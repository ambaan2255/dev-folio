import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import SkillsPage from './pages/SkillsPage';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import ProjectGrid from './components/ProjectGrid';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState(() => {
    const path = window.location.pathname.substring(1);
    return path || 'home';
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  useEffect(() => {
    const toProj = (e: any) => setActivePage('project-detail-' + e.detail);
    const toProjects = () => setActivePage('projects');
    const toContact = () => setActivePage('contact');
    
    window.addEventListener('navToProjects', toProjects);
    window.addEventListener('navToContact', toContact);
    window.addEventListener('navToProject', toProj);
    
    const handlePopState = () => {
      const path = window.location.pathname.substring(1);
      setActivePage(path || 'home');
    };
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('navToProjects', toProjects);
      window.removeEventListener('navToContact', toContact);
      window.removeEventListener('navToProject', toProj);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const renderContent = () => {
    if (activePage.startsWith('blog-detail-')) {
      const blogId = activePage.replace('blog-detail-', '');
      return <BlogDetail blogId={blogId} onBack={() => {
        setActivePage('blogs');
        window.history.pushState({}, '', '/blogs');
      }} />;
    }
    if (activePage.startsWith('project-detail-')) {
      const projectId = activePage.replace('project-detail-', '');
      return <ProjectDetail projectId={projectId} onBack={() => {
        setActivePage('projects');
        window.history.pushState({}, '', '/projects');
      }} />;
    }

    switch(activePage) {
      case 'home': return <Home />;
      case 'projects': return <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-24"><ProjectGrid onProjectClick={id => {
        setActivePage('project-detail-' + id);
        window.history.pushState({}, '', '/project-detail-' + id);
      }} /></div>;
      case 'skills': return <SkillsPage />;
      case 'experience': return <Experience />;
      case 'education': return <Education />;
      case 'blogs': return <Blogs onBlogClick={id => {
        setActivePage(`blog-detail-${id}`);
        window.history.pushState({}, '', '/blog-detail-' + id);
      }} />;
      case 'contact': return <Contact />;
      case 'privacy': return <Privacy />;
      case 'terms': return <Terms />;
      default: return <Home />;
    }
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {renderContent()}
    </Layout>
  );
};

export default App;
