import React from 'react';
import vivereLogo from '../assets/vivere.png';
import vivereBlackLogo from '../assets/vivere_black.png';

const Footer: React.FC = () => {
    return (
        <footer className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white pt-20 pb-8 px-6 md:px-16 border-t border-zinc-200 dark:border-white/5 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4 mb-16 text-left">

                    {/* Logo & Adres */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3 text-zinc-900 dark:text-white">
                            {/* Logo - Light/Dark Mode Ayarı */}
                            <img
                                src={vivereBlackLogo}
                                alt="Vivere Design Logo"
                                className="h-8 w-auto object-contain rounded-sm dark:hidden"
                            />
                            <img
                                src={vivereLogo}
                                alt="Vivere Design Logo"
                                className="h-8 w-auto object-contain rounded-sm hidden dark:block"
                            />
                            <span className="font-bold tracking-widest text-sm uppercase">Vivere Design</span>
                        </div>
                        <p className="text-xs text-zinc-500 leading-relaxed max-w-xs">
                            123 Innovation Blvd, Suite 400 <br />
                            San Francisco, CA 94103
                        </p>
                    </div>

                    {/* Link Grupları */}
                    <div className="md:col-start-3">
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-6">Social</h4>
                        <ul className="text-xs text-zinc-500 space-y-3">
                            <li><a href="#" className="hover:text-accent-600 dark:hover:text-white transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-accent-600 dark:hover:text-white transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-accent-600 dark:hover:text-white transition-colors">Behance</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-6">Sitemap</h4>
                        <ul className="text-xs text-zinc-500 space-y-3">
                            <li><a href="#" className="hover:text-accent-600 dark:hover:text-white transition-colors">Work</a></li>
                            <li><a href="#" className="hover:text-accent-600 dark:hover:text-white transition-colors">Studio</a></li>
                            <li><a href="#" className="hover:text-accent-600 dark:hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-6">Legal</h4>
                        <ul className="text-xs text-zinc-500 space-y-3">
                            <li><a href="#" className="hover:text-accent-600 dark:hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-accent-600 dark:hover:text-white transition-colors">Terms of Use</a></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright Satırı */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-zinc-200 dark:border-white/5 text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-wider">
                    <span>© 2025 Vivere Design. All rights reserved.</span>
                    <span>English (US)</span>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
