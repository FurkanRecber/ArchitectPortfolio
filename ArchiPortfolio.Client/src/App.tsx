import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Work from './pages/Work';
import Studio from './pages/Studio';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProjectDetail from './pages/ProjectDetail';

// ScrollToTop component to reset scroll on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  // --- STATE ---
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [language, setLanguage] = useState<'EN' | 'TR'>('EN');

  // --- HANDLERS ---
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleLanguage = () => setLanguage((prev) => (prev === 'EN' ? 'TR' : 'EN'));

  // --- EFFECT: Theme Change ---
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // --- ROUTING ---
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-500 font-sans selection:bg-accent-600 selection:text-white">
      <ScrollToTop />

      {/* Navbar'a yetkileri gönderiyoruz - Admin sayfalarında gizle */}
      {!location.pathname.startsWith('/admin') && (
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          language={language}
          toggleLanguage={toggleLanguage}
        />
      )}

      <main>
        <Routes>
          <Route path="/" element={<Home language={language} />} />
          <Route path="/work" element={<Work language={language} />} />
          <Route path="/studio" element={<Studio language={language} />} />
          <Route path="/contact" element={<Contact language={language} />} />
          <Route path="/admin/login" element={<AdminLogin darkMode={darkMode} />} />
          <Route path="/admin/dashboard" element={<AdminDashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} language={language} toggleLanguage={toggleLanguage} />} />
          <Route path="/admin/projects" element={<AdminDashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} language={language} toggleLanguage={toggleLanguage} />} />
          <Route path="/admin/projects/new" element={<AdminDashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} language={language} toggleLanguage={toggleLanguage} />} />
          <Route path="/admin/projects/edit/:id" element={<AdminDashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} language={language} toggleLanguage={toggleLanguage} />} />
          <Route path="/admin/categories" element={<AdminDashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} language={language} toggleLanguage={toggleLanguage} />} />
          <Route path="/admin/categories/new" element={<AdminDashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} language={language} toggleLanguage={toggleLanguage} />} />
          <Route path="/admin/categories/edit/:id" element={<AdminDashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} language={language} toggleLanguage={toggleLanguage} />} />
          <Route path="/admin/site-settings" element={<AdminDashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} language={language} toggleLanguage={toggleLanguage} />} />
          <Route path="/admin/messages" element={<AdminDashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} language={language} toggleLanguage={toggleLanguage} />} />
          <Route path="/admin/messages/reply/:id" element={<AdminDashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} language={language} toggleLanguage={toggleLanguage} />} />
          <Route path="/work/:id" element={<ProjectDetail language={language} />} />
        </Routes>
      </main>

    </div>
  );
};

export default App;