import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Moon, Sun } from 'lucide-react';
import vivereLogo from '../assets/vivere.png';
import vivereBlackLogo from '../assets/vivere_black.png';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  language: 'EN' | 'TR';
  toggleLanguage: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
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

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 py-8 border-b ${bgClass} ${borderColor}`}
    >
      <div className={`flex items-center gap-3 ${textColor}`}>
        <Link to="/" className="flex items-center gap-3">
          <img
            src={isDarkMode ? vivereLogo : vivereBlackLogo}
            alt="Vivere Design Logo"
            className="h-8 w-auto object-contain rounded-sm"
          />
          <span className="font-bold tracking-widest text-sm uppercase">Vivere Design</span>
        </Link>
      </div>

      <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${isDarkMode ? 'text-white/90' : 'text-zinc-900/90'}`}>
        <div className={`flex gap-8 border-r pr-8 mr-2 ${isDarkMode ? 'border-white/20' : 'border-zinc-900/20'}`}>
          <Link to="/work" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>
            {language === 'EN' ? 'Work' : 'Projeler'}
          </Link>
          <Link to="/studio" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>
            {language === 'EN' ? 'Studio' : 'Stüdyo'}
          </Link>
          <Link to="/contact" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>
            {language === 'EN' ? 'Contact' : 'İletişim'}
          </Link>
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
    </motion.nav>
  );
};

export default Navbar;