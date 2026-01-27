import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Ruler, Smile, Play, Compass, Leaf, PenTool } from 'lucide-react';
import Footer from '../components/Footer';
import { siteSettingService } from '../services/siteSettingService';
import type { SiteSetting } from '../types';
import { getImageUrl } from '../utils/imageUrlHelper';
import { translations } from '../translations';

interface PageProps {
    language?: 'EN' | 'TR';
}

const Studio: React.FC<PageProps> = ({ language = 'EN' }) => {
    const [settings, setSettings] = useState<SiteSetting | null>(null);
    const [loading, setLoading] = useState(true);
    const t = translations[language].studio;

    useEffect(() => {
        window.scrollTo(0, 0);
        loadData();
    }, [language]);

    const loadData = async () => {
        try {
            const langCode = language.toLowerCase();
            const data = await siteSettingService.getSettings(langCode);
            setSettings(data);
        } catch (error) {
            console.error("Studio data load failed", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-zinc-950 dark:text-white">Loading...</div>;
    if (!settings) return null;

    return (
        <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-500 font-sans selection:bg-accent-600 selection:text-white">

            {/* 1. HERO SECTION (About & Metrics) */}
            <section className="min-h-screen flex items-center justify-center px-6 md:px-16 pt-24 pb-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-accent-600 text-xs font-bold tracking-[0.2em] uppercase block mb-6">{t.aboutTitle}</span>

                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                            {(() => {
                                const title = (language === 'TR' ? settings.aboutTitleTr : settings.aboutTitle) || "Architecting the Future";
                                const parts = title.trim().split(' ');
                                if (parts.length > 1) {
                                    return (
                                        <>
                                            <span className="text-zinc-900 dark:text-white">{parts[0]}</span> <br />
                                            <span className="text-accent-600">{parts.slice(1).join(' ')}.</span>
                                        </>
                                    );
                                }
                                return <span className="text-zinc-900 dark:text-white">{title}</span>;
                            })()}
                        </h1>

                        <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-8">
                            <p>{language === 'TR' ? settings.aboutDescriptionTr : settings.aboutDescription}</p>
                        </div>
                    </motion.div>

                    {/* Right: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[800px] w-full rounded-3xl overflow-hidden"
                    >
                        <img
                            src={getImageUrl(settings.aboutImageUrl)}
                            alt="Studio Founder"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </motion.div>
                </div>
            </section>

            {/* 2. STATS BAR (Separate Section) */}
            <section className="bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-white/5 py-24 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {/* Metric 1 */}
                    <MetricItem
                        icon={<Building2 size={32} />}
                        value={settings.metric1Value}
                        label={language === 'TR' ? settings.metric1TitleTr : settings.metric1Title}
                        delay={0.1}
                    />
                    {/* Metric 2 */}
                    <MetricItem
                        icon={<Ruler size={32} />}
                        value={settings.metric2Value}
                        label={language === 'TR' ? settings.metric2TitleTr : settings.metric2Title}
                        delay={0.2}
                        isBordered
                    />
                    {/* Metric 3 */}
                    <MetricItem
                        icon={<Smile size={32} />}
                        value={settings.metric3Value}
                        label={language === 'TR' ? settings.metric3TitleTr : settings.metric3Title}
                        delay={0.3}
                        isBordered
                    />
                </div>
            </section>

            {/* 3. ETHOS (Dynamic Philosophy Loop) */}
            <section className="py-32 px-6 md:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <span className="text-accent-600 text-xs font-bold tracking-[0.2em] uppercase block mb-4">{t.ethosTitle}</span>
                        <h2 className="text-4xl md:text-5xl font-serif italic">{settings.philosophySectionTitle || "Driven by Integrity"}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {/* 1. Madde */}
                        <PhilosophyItem
                            title={settings.philo1Title}
                            desc={settings.philo1Desc}
                            iconUrl={settings.philo1IconUrl}
                            DefaultIcon={Compass}
                            delay={0}
                            defaultTitle={t.ethosDefaultTitle}
                            defaultDesc={t.ethosDefaultDesc}
                        />
                        {/* 2. Madde */}
                        <PhilosophyItem
                            title={settings.philo2Title}
                            desc={settings.philo2Desc}
                            iconUrl={settings.philo2IconUrl}
                            DefaultIcon={Leaf}
                            delay={0.1}
                            defaultTitle={t.ethosDefaultTitle}
                            defaultDesc={t.ethosDefaultDesc}
                        />
                        {/* 3. Madde */}
                        <PhilosophyItem
                            title={settings.philo3Title}
                            desc={settings.philo3Desc}
                            iconUrl={settings.philo3IconUrl}
                            DefaultIcon={PenTool}
                            delay={0.2}
                            defaultTitle={t.ethosDefaultTitle}
                            defaultDesc={t.ethosDefaultDesc}
                        />
                    </div>
                </div>
            </section>

            {/* 4. CTA FOOTER (Showreel) */}
            <section className="py-24 px-6 md:px-16 bg-zinc-100 dark:bg-zinc-900/50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-serif italic mb-12 leading-snug">
                        {t.showreelTitle}
                    </h2>

                    {settings.showreelUrl && (
                        <div className="flex flex-col items-center justify-center gap-8">
                            <a href={settings.showreelUrl} target="_blank" rel="noopener noreferrer" className="group relative flex h-24 w-24 items-center justify-center rounded-full bg-zinc-900 text-white shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-accent-600/20 dark:bg-white dark:text-black">
                                <Play size={32} fill="currentColor" className="ml-1" />
                                <span className="absolute inset-0 -z-10 rounded-full border border-zinc-900/10 dark:border-white/10 transition-all duration-700 group-hover:scale-150 group-hover:opacity-0"></span>
                            </a>
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                                {t.watchProcess}
                            </span>
                        </div>
                    )}
                </div>
            </section>

            <Footer language={language} />
        </div>
    );
};

// Yardımcı Alt Bileşenler
const MetricItem = ({ icon, value, label, delay, isBordered }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className={`flex flex-col items-center ${isBordered ? 'border-t md:border-t-0 md:border-l border-zinc-200 dark:border-white/5 pt-12 md:pt-0 pl-0 md:pl-12' : ''}`}
    >
        <div className="text-accent-600 mb-6">{icon}</div>
        <span className="text-5xl md:text-6xl font-light mb-2">{value}</span>
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{label}</span>
    </motion.div>
);

const PhilosophyItem = ({ title, desc, iconUrl, DefaultIcon, delay, defaultTitle, defaultDesc }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="group text-center"
    >
        {/* Eğer Admin'den ikon yüklendiyse onu göster, yoksa DefaultIcon kullan */}
        {iconUrl ? (
            <img src={getImageUrl(iconUrl)} alt={title} className="w-12 h-12 mb-6 object-contain filter grayscale group-hover:grayscale-0 transition-all mx-auto" />
        ) : (
            DefaultIcon ? (
                <DefaultIcon size={32} strokeWidth={1} className="mb-6 text-zinc-400 group-hover:text-accent-600 transition-colors mx-auto" />
            ) : (
                <div className="w-12 h-12 mb-6 bg-zinc-100 dark:bg-zinc-800 rounded-full mx-auto"></div>
            )
        )}

        <h3 className="text-xl font-bold mb-4">{title || defaultTitle}</h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
            {desc || defaultDesc}
        </p>
    </motion.div>
);

export default Studio;