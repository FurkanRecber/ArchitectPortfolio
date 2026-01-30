import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Moon, Sun, Menu, X } from 'lucide-react';
import vivereLogo from '../assets/vivere.png';
import vivereBlackLogo from '../assets/vivere_black.png';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  language: 'EN' | 'TR';
  toggleLanguage: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Home sayfasında her zaman "Dark Mode" gibi (Beyaz text) davranacağız çünkü Hero arka planı koyu.
  // Diğer sayfalarda tema (Light/Dark) neyse ona uyacağız.
  const isDarkMode = isHome ? true : darkMode;

  // Text rengi
  const textColor = isDarkMode ? 'text-white' : 'text-zinc-900';
  const borderColor = isDarkMode ? 'border-white/5' : 'border-zinc-900/5';

  // Background gradient
  const bgClass = isHome || isDarkMode
    ? 'bg-gradient-to-b from-black/60 to-transparent'
    : 'bg-gradient-to-b from-white/90 to-transparent';

  const navLinks = [
    { path: '/work', label: language === 'EN' ? 'Work' : 'Projeler' },
    { path: '/studio', label: language === 'EN' ? 'Studio' : 'Stüdyo' },
    { path: '/contact', label: language === 'EN' ? 'Contact' : 'İletişim' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 py-8 border-b ${bgClass} ${borderColor}`}
      >
        <div className={`flex items-center gap-3 ${textColor} z-50`}>
          <Link to="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
            <img
              src={isDarkMode ? vivereLogo : vivereBlackLogo}
              alt="Vivere Design Logo"
              className="h-8 w-auto object-contain rounded-sm"
            />
            <span className="font-bold tracking-widest text-sm uppercase">Vivere Design</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${isDarkMode ? 'text-white/90' : 'text-zinc-900/90'}`}>
          <div className={`flex gap-8 border-r pr-8 mr-2 ${isDarkMode ? 'border-white/20' : 'border-zinc-900/20'}`}>
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleLanguage} className={`flex items-center gap-1 transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>
              <Globe size={18} />
              <span className="text-xs font-bold">{language}</span>
            </button>

            <button onClick={toggleDarkMode} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link to="/contact" className="ml-4 bg-accent-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-accent-500 transition-colors shadow-lg shadow-accent-600/20">
              {language === 'EN' ? 'Inquire' : 'Teklif Al'}
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className={`md:hidden z-50 p-2 ${textColor}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "tween", duration: 0.4 }}
            className={`fixed inset-0 z-40 md:hidden flex flex-col justify-center items-center gap-12 ${darkMode ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'
              }`}
          >
            <div className="flex flex-col items-center gap-8 text-2xl font-light">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-accent-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-8 mt-4">
              <button onClick={toggleLanguage} className="flex items-center gap-2 px-4 py-2 border border-current rounded-full">
                <Globe size={20} />
                <span className="text-sm font-bold">{language}</span>
              </button>

              <button onClick={toggleDarkMode} className="p-3 rounded-full border border-current hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            </div>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 bg-accent-600 text-white px-10 py-3 rounded-full font-semibold text-lg hover:bg-accent-500 transition-colors shadow-xl shadow-accent-600/30"
            >
              {language === 'EN' ? 'Inquire Project' : 'Proje Başlat'}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;