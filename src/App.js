import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { About, Footer, Header, Honors, Skills, Work } from './container';
import { Navbar } from './components';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';
import './App.scss';

const scrollToSection = (sectionId) => {
  if (typeof document === 'undefined' || !sectionId) {
    return false;
  }

  const target = document.getElementById(sectionId);
  if (!target) {
    return false;
  }

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
};

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const stateTarget = location.state?.targetSection;
    const hashTarget = location.hash ? location.hash.replace('#', '') : '';
    const targetSection = stateTarget || hashTarget;

    if (!targetSection) {
      return;
    }

    const didScroll = scrollToSection(targetSection);

    if (didScroll && typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        window.history.replaceState(null, '', `#${targetSection}`);
      });
    }

    if (stateTarget) {
      navigate('.', { replace: true, state: null });
    }
  }, [location, navigate]);

  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Honors />
      <Skills />
      <Footer />
    </div>
  );
};

const ProjectDetailPage = () => (
  <div className="app app__project-detail-page">
    <Navbar />
    <ProjectDetail />
    <Footer />
  </div>
);

const RedirectToHome = ({ section }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const state = section ? { targetSection: section } : undefined;
    navigate('/', { replace: true, state });
  }, [navigate, section]);
  return null;
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/my-profile"
        element={<RedirectToHome section="my-profile" />}
      />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      <Route path="*" element={<RedirectToHome />} />
    </Routes>
  </BrowserRouter>
);

export default App;
