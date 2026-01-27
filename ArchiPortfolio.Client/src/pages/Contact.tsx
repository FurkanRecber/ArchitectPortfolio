import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import Footer from '../components/Footer';
import { contactService } from '../services/contactService';
import { siteSettingService } from '../services/siteSettingService';
import type { SiteSetting } from '../types';
import { translations } from '../translations';

interface PageProps {
    language?: 'EN' | 'TR';
}

const Contact: React.FC<PageProps> = ({ language = 'EN' }) => {
    const [settings, setSettings] = useState<SiteSetting | null>(null);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const t = translations[language].contact;

    useEffect(() => {
        // İletişim bilgilerini çek
        const loadSettings = async () => {
            const data = await siteSettingService.getSettings(language.toLowerCase());
            setSettings(data);
        };
        loadSettings();
    }, [language]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await contactService.sendMessage(formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-white transition-colors duration-500">
            <section className="pt-32 pb-16 px-6 md:px-16 max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
                >
                    {t.title} <br />
                    <span className="text-accent-600">{t.titleHighlight}</span>
                </motion.h1>
            </section>

            <section className="px-6 md:px-16 pb-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Sol Taraf: Dinamik İletişim Bilgileri */}
                <div className="space-y-12">
                    <p className="text-lg md:text-xl font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {t.description}
                    </p>

                    <div className="space-y-6">
                        {settings?.email && (
                            <div className="flex items-start gap-4">
                                <Mail className="text-accent-600 mt-1" />
                                <div>
                                    <h3 className="font-bold text-sm uppercase tracking-widest mb-1">{t.emailLabel}</h3>
                                    <p className="text-zinc-500 dark:text-zinc-400">{settings.email}</p>
                                </div>
                            </div>
                        )}
                        {settings?.address && (
                            <div className="flex items-start gap-4">
                                <MapPin className="text-accent-600 mt-1" />
                                <div>
                                    <h3 className="font-bold text-sm uppercase tracking-widest mb-1">{t.studioLabel}</h3>
                                    <p className="text-zinc-500 dark:text-zinc-400 whitespace-pre-line">{settings.address}</p>
                                </div>
                            </div>
                        )}
                        {settings?.phone && (
                            <div className="flex items-start gap-4">
                                <Phone className="text-accent-600 mt-1" />
                                <div>
                                    <h3 className="font-bold text-sm uppercase tracking-widest mb-1">{t.phoneLabel}</h3>
                                    <p className="text-zinc-500 dark:text-zinc-400">{settings.phone}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Google Maps Embed (Eğer varsa) */}
                    {settings?.googleMapEmbedCode && (
                        <div
                            className="w-full h-64 bg-zinc-100 rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-500"
                            dangerouslySetInnerHTML={{ __html: settings.googleMapEmbedCode }}
                        />
                    )}
                </div>

                {/* Sağ Taraf: Form (Aynen Kalıyor) */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">{t.formName}</label>
                            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded focus:outline-none focus:border-accent-600 transition-colors" placeholder={t.formPlaceholders.name} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">{t.formEmail}</label>
                            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded focus:outline-none focus:border-accent-600 transition-colors" placeholder={t.formPlaceholders.email} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">{t.formSubject}</label>
                        <input type="text" name="subject" required value={formData.subject} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded focus:outline-none focus:border-accent-600 transition-colors" placeholder={t.formPlaceholders.subject} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">{t.formMessage}</label>
                        <textarea name="message" required rows={6} value={formData.message} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded focus:outline-none focus:border-accent-600 transition-colors resize-none" placeholder={t.formPlaceholders.message}></textarea>
                    </div>
                    <button type="submit" disabled={status === 'submitting'} className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black py-4 rounded font-bold uppercase tracking-widest hover:bg-accent-600 dark:hover:bg-accent-600 hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                        {status === 'submitting' ? t.formButtonSubmitting : t.formButtonSubmit}
                        {!status.startsWith('sub') && <Send size={16} />}
                    </button>
                    {status === 'success' && <p className="text-green-600 text-center font-medium mt-4">{t.formSuccess}</p>}
                    {status === 'error' && <p className="text-red-600 text-center font-medium mt-4">{t.formError}</p>}
                </form>
            </section>

            <Footer language={language} />
        </div>
    );
};

export default Contact;