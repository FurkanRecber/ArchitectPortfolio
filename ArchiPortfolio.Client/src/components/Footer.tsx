import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import vivereLogo from '../assets/vivere.png';
import vivereBlackLogo from '../assets/vivere_black.png';
import { siteSettingService } from '../services/siteSettingService';
import type { SiteSetting } from '../types';

interface FooterProps {
    language?: string;
}

const Footer: React.FC<FooterProps> = ({ language = 'en' }) => {
    const [settings, setSettings] = useState<SiteSetting | null>(null);
    const [year] = useState(new Date().getFullYear());

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const langCode = language.toLowerCase();
                const data = await siteSettingService.getSettings(langCode);
                setSettings(data);
            } catch (error) {
                console.error("Footer settings loading failed", error);
            }
        };
        loadSettings();
    }, [language]);

    // Simple translation helper
    const t = (en: string, tr: string) => (language.toLowerCase() === 'tr' ? tr : en);

    return (
        <footer className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white pt-20 pb-8 px-6 md:px-16 border-t border-zinc-200 dark:border-white/5 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 mb-16 text-left">

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
                            <span className="font-bold tracking-widest text-sm uppercase">{settings?.siteTitle || 'Vivere Design'}</span>
                        </div>
                        <p className="text-xs text-zinc-500 leading-relaxed max-w-xs whitespace-pre-line">
                            {language.toLowerCase() === 'tr' ? settings?.addressTr || settings?.address : settings?.address || '123 Innovation Blvd, Suite 400\nSan Francisco, CA 94103'}
                        </p>
                    </div>

                    {/* Link Grupları */}
                    <div className="md:col-start-2 justify-self-start md:justify-self-center">
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-6">{t('Social', 'Sosyal Medya')}</h4>
                        <ul className="text-xs text-zinc-500 space-y-3">
                            {settings?.instagramUrl && (
                                <li><a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-600 dark:hover:text-white transition-colors">Instagram</a></li>
                            )}
                            {settings?.linkedinUrl && (
                                <li><a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-600 dark:hover:text-white transition-colors">LinkedIn</a></li>
                            )}
                            {settings?.facebookUrl && (
                                <li><a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-600 dark:hover:text-white transition-colors">Facebook</a></li>
                            )}
                            {settings?.youtubeUrl && (
                                <li><a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-600 dark:hover:text-white transition-colors">Youtube</a></li>
                            )}
                            {/* Fallback Static Links if no dynamic links exist? Or just show empty if fully dynamic. Keeping empty if dynamic to avoid clutter. */}
                            {!settings && (
                                <>
                                    <li><a href="#" className="hover:text-accent-600 dark:hover:text-white transition-colors">Instagram</a></li>
                                    <li><a href="#" className="hover:text-accent-600 dark:hover:text-white transition-colors">LinkedIn</a></li>
                                </>
                            )}
                        </ul>
                    </div>

                    <div className="md:col-start-3 justify-self-start md:justify-self-end">
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-6">{t('Sitemap', 'Site Haritası')}</h4>
                        <ul className="text-xs text-zinc-500 space-y-3">
                            <li><Link to="/work" className="hover:text-accent-600 dark:hover:text-white transition-colors">{t('Work', 'Projeler')}</Link></li>
                            <li><Link to="/studio" className="hover:text-accent-600 dark:hover:text-white transition-colors">{t('Studio', 'Stüdyo')}</Link></li>
                            <li><Link to="/contact" className="hover:text-accent-600 dark:hover:text-white transition-colors">{t('Contact', 'İletişim')}</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright Satırı */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-zinc-200 dark:border-white/5 text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-wider">
                    <span>{language.toLowerCase() === 'tr' ? settings?.copyrightTextTr : settings?.copyrightText || `© ${year} Vivere Design. All rights reserved.`}</span>
                    <span>{t('English (US)', 'Türkçe (TR)')}</span>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
