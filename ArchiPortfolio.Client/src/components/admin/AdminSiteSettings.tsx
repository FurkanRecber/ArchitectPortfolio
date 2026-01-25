import React, { useState, useEffect, useRef } from 'react';
import {
    Save, Loader2, Globe, Type, MapPin, Mail, Phone,
    Facebook, Instagram, Linkedin, Youtube,
    UploadCloud, BarChart3, Megaphone, Video
} from 'lucide-react';
import { siteSettingService } from '../../services/siteSettingService';
import { getImageUrl } from '../../utils/imageUrlHelper';

const AdminSiteSettings: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

    // Dosya Referansları
    const logoInputRef = useRef<HTMLInputElement>(null);
    const heroInputRef = useRef<HTMLInputElement>(null);
    const aboutInputRef = useRef<HTMLInputElement>(null);

    // State: Backend'deki güncel yapı (CV ve Behance yok, SEO var)
    const [settings, setSettings] = useState<any>({
        id: 0,
        // General
        siteTitle: '', logoUrl: '', copyrightText: '', copyrightTextTr: '', footerDescription: '', footerDescriptionTr: '',
        // Hero
        heroTitle: '', heroTitleTr: '', heroSubtitle: '', heroSubtitleTr: '', heroButtonText: '', heroButtonTextTr: '', heroImageUrl: '',
        // CTA
        ctaTitle: '', ctaTitleTr: '', ctaDescription: '', ctaDescriptionTr: '', ctaButtonText: '', ctaButtonTextTr: '',
        // Studio -> About & Metrics & Philosophy
        aboutTitle: '', aboutTitleTr: '', aboutDescription: '', aboutDescriptionTr: '', aboutImageUrl: '',
        philosophyTitle: '', philosophyTitleTr: '', philosophyDescription: '', philosophyDescriptionTr: '',

        yearsActive: '', projectsCompleted: '', projectsCompletedTr: '', awardsWon: '', showreelUrl: '',

        metric1Title: '', metric1TitleTr: '', metric1Value: '',
        metric2Title: '', metric2TitleTr: '', metric2Value: '',
        metric3Title: '', metric3TitleTr: '', metric3Value: '',

        // Contact (Behance yok)
        email: '', phone: '', address: '', addressTr: '', googleMapEmbedCode: '',
        facebookUrl: '', instagramUrl: '', linkedinUrl: '', youtubeUrl: '',
        // SEO
        googleAnalyticsId: '', googleTagManagerId: '', headScripts: '', metaKeywords: '', metaKeywordsTr: '', robotsTxt: ''
    });

    // Dosya State'leri (Sadece yükleme anında kullanılır)
    const [files, setFiles] = useState<{
        logo?: File;
        hero?: File;
        about?: File;           // YENİ
    }>({});

    // Önizleme State'i (Ekranda görünecekler)
    const [previews, setPreviews] = useState<{
        logo?: string;
        hero?: string;
        about?: string;           // YENİ
    }>({});

    // Verileri Çek
    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await siteSettingService.getSettings();
            if (data) {
                // Null değerleri boş stringe çevir
                const safeData = Object.keys(data).reduce((acc: any, key) => {
                    acc[key] = (data as any)[key] || '';
                    return acc;
                }, {});
                setSettings(safeData);

                // Mevcut resim önizlemeleri
                if (safeData.logoUrl) setPreviews(p => ({ ...p, logo: getImageUrl(safeData.logoUrl) }));
                if (safeData.heroImageUrl) setPreviews(p => ({ ...p, hero: getImageUrl(safeData.heroImageUrl) }));
                if (safeData.aboutImageUrl) setPreviews(p => ({ ...p, about: getImageUrl(safeData.aboutImageUrl) }));
            }
        } catch (error) {
            console.error("Ayarlar yüklenemedi:", error);
        } finally {
            setLoading(false);
        }
    };

    // Input Değişikliği
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSettings((prev: any) => ({ ...prev, [name]: value }));
    };

    // Dosya Seçimi
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'hero' | 'about') => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFiles(prev => ({ ...prev, [type]: file }));

            // Önizleme oluştur
            const url = URL.createObjectURL(file);
            setPreviews(prev => ({ ...prev, [type]: url }));
        }
    };

    // Kaydetme
    const handleSave = async () => {
        setSaving(true);
        try {
            const formData = new FormData();

            // Text alanlarını ekle
            Object.keys(settings).forEach(key => {
                if (key !== 'logoUrl' && key !== 'heroImageUrl' && key !== 'aboutImageUrl') {
                    // Backend büyük harf bekleyebilir, ilk harfi büyütüyoruz
                    const keyUpper = key.charAt(0).toUpperCase() + key.slice(1);
                    formData.append(keyUpper, settings[key]);
                }
            });

            // Dosyaları ekle
            if (files.logo) formData.append('LogoImage', files.logo);
            if (files.hero) formData.append('HeroImage', files.hero);
            if (files.about) formData.append('AboutImage', files.about);

            // ID
            formData.append('Id', settings.id.toString());

            await siteSettingService.updateSettings(formData);
            alert("Ayarlar başarıyla güncellendi! 🚀");

            // Dosya inputlarını temizle
            setFiles({});
            if (logoInputRef.current) logoInputRef.current.value = '';
            if (heroInputRef.current) heroInputRef.current.value = '';
            if (aboutInputRef.current) aboutInputRef.current.value = '';

        } catch (error) {
            console.error("Kaydetme hatası:", error);
            alert("Bir hata oluştu. Lütfen konsolu kontrol edin.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-zinc-500">Loading configuration...</div>;

    const tabs = [
        { id: 'general', label: 'GENERAL & BRAND' },
        { id: 'hero', label: 'HERO & HOME' },
        { id: 'cta', label: 'CTA & ADS' },
        { id: 'studio', label: 'STUDIO & METRICS' },
        { id: 'contact', label: 'CONTACT INFO' },
        { id: 'seo', label: 'SEO & ANALYTICS' }
    ];

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-50 dark:bg-[#0B0E14] transition-colors duration-500">
            {/* Header */}
            <header className="px-8 py-5 border-b border-zinc-200 dark:border-[#1F2430] bg-white dark:bg-[#11141D] flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center bg-zinc-100 dark:bg-[#151922] rounded-lg p-1 border border-zinc-200 dark:border-[#1F2430] overflow-x-auto no-scrollbar">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`whitespace-nowrap px-4 py-2 rounded-md text-xs font-bold tracking-wider transition-all ${activeTab === tab.id
                                ? 'bg-white dark:bg-[#1F2430] text-zinc-900 dark:text-white shadow-sm'
                                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold tracking-wide transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-70"
                >
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {saving ? 'SAVING...' : 'PUBLISH CHANGES'}
                </button>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="max-w-5xl mx-auto space-y-8 pb-20">

                    {/* --- 1. GENERAL & BRAND --- */}
                    {activeTab === 'general' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-6">
                                    <SectionHeader title="Brand Identity" icon={Globe} />
                                    <InputGroup label="Site Title (Browser Tab)" name="siteTitle" value={settings.siteTitle} onChange={handleChange} />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <TextAreaGroup label="Footer Desc (EN)" name="footerDescription" value={settings.footerDescription} onChange={handleChange} rows={3} />
                                        <TextAreaGroup label="Footer Desc (TR)" name="footerDescriptionTr" value={settings.footerDescriptionTr} onChange={handleChange} rows={3} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputGroup label="Copyright (EN)" name="copyrightText" value={settings.copyrightText} onChange={handleChange} />
                                        <InputGroup label="Copyright (TR)" name="copyrightTextTr" value={settings.copyrightTextTr} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <SectionHeader title="Logo" icon={UploadCloud} />
                                    <div
                                        onClick={() => logoInputRef.current?.click()}
                                        className="border-2 border-dashed border-zinc-300 dark:border-[#2A303C] rounded-xl bg-zinc-50 dark:bg-[#1A1D27] h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-100 dark:hover:bg-[#1F2430] transition-colors relative overflow-hidden group"
                                    >
                                        {previews.logo ? (
                                            <img src={previews.logo} alt="Logo" className="w-full h-full object-contain p-4" />
                                        ) : (
                                            <div className="text-center text-zinc-400">
                                                <UploadCloud size={32} className="mx-auto mb-2" />
                                                <span className="text-xs">Upload Logo</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                                            Change Logo
                                        </div>
                                    </div>
                                    <input type="file" ref={logoInputRef} onChange={(e) => handleFileChange(e, 'logo')} className="hidden" accept="image/*" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- 2. HERO & HOME --- */}
                    {activeTab === 'hero' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <SectionHeader title="Hero Section Configuration" icon={Type} />

                            {/* Hero Image */}
                            <div className="bg-white dark:bg-[#151922] p-6 rounded-xl border border-zinc-200 dark:border-[#1F2430] space-y-4">
                                <label className="text-xs font-bold text-zinc-500 uppercase">Hero Background Image</label>
                                <div
                                    onClick={() => heroInputRef.current?.click()}
                                    className="w-full h-64 rounded-lg bg-zinc-100 dark:bg-[#0B0E14] border-2 border-dashed border-zinc-300 dark:border-[#2A303C] flex items-center justify-center cursor-pointer overflow-hidden relative group"
                                >
                                    {previews.hero ? (
                                        <img src={previews.hero} alt="Hero" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-zinc-400 flex flex-col items-center">
                                            <UploadCloud size={40} />
                                            <span className="mt-2 text-sm">Click to upload large hero image</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold">Change Image</div>
                                </div>
                                <input type="file" ref={heroInputRef} onChange={(e) => handleFileChange(e, 'hero')} className="hidden" accept="image/*" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="Main Title (EN)" name="heroTitle" value={settings.heroTitle} onChange={handleChange} />
                                <InputGroup label="Main Title (TR)" name="heroTitleTr" value={settings.heroTitleTr} onChange={handleChange} />

                                <InputGroup label="Subtitle (EN)" name="heroSubtitle" value={settings.heroSubtitle} onChange={handleChange} />
                                <InputGroup label="Subtitle (TR)" name="heroSubtitleTr" value={settings.heroSubtitleTr} onChange={handleChange} />

                                <InputGroup label="Button Text (EN)" name="heroButtonText" value={settings.heroButtonText} onChange={handleChange} />
                                <InputGroup label="Button Text (TR)" name="heroButtonTextTr" value={settings.heroButtonTextTr} onChange={handleChange} />
                            </div>
                        </div>
                    )}

                    {/* --- 3. CTA & ADS --- */}
                    {activeTab === 'cta' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <SectionHeader title="Call to Action (Footer Area)" icon={Megaphone} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="Title (EN)" name="ctaTitle" value={settings.ctaTitle} onChange={handleChange} />
                                <InputGroup label="Title (TR)" name="ctaTitleTr" value={settings.ctaTitleTr} onChange={handleChange} />

                                <TextAreaGroup label="Description (EN)" name="ctaDescription" value={settings.ctaDescription} onChange={handleChange} rows={2} />
                                <TextAreaGroup label="Description (TR)" name="ctaDescriptionTr" value={settings.ctaDescriptionTr} onChange={handleChange} rows={2} />

                                <InputGroup label="Button Label (EN)" name="ctaButtonText" value={settings.ctaButtonText} onChange={handleChange} />
                                <InputGroup label="Button Label (TR)" name="ctaButtonTextTr" value={settings.ctaButtonTextTr} onChange={handleChange} />
                            </div>
                        </div>
                    )}

                    {/* --- 4. STUDIO & METRICS (CV YOK) --- */}
                    {activeTab === 'studio' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">

                            {/* A. HAKKIMIZDA (ABOUT US) */}
                            <div className="space-y-6">
                                <SectionHeader title="About Us Section" icon={Type} />

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* Sol: Resim Yükleme */}
                                    <div className="space-y-4">
                                        <label className="text-xs font-bold text-zinc-500 uppercase">About Image</label>
                                        <div
                                            onClick={() => aboutInputRef.current?.click()}
                                            className="border-2 border-dashed border-zinc-300 dark:border-[#2A303C] rounded-xl bg-zinc-50 dark:bg-[#1A1D27] h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-100 dark:hover:bg-[#1F2430] transition-colors relative overflow-hidden group"
                                        >
                                            {previews.about ? (
                                                <img src={previews.about} alt="About" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-center text-zinc-400">
                                                    <UploadCloud size={32} className="mx-auto mb-2" />
                                                    <span className="text-xs">Upload Image</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">Change</div>
                                        </div>
                                        {/* Ref tanımlamayı unutma: const aboutInputRef = useRef<HTMLInputElement>(null); */}
                                        <input type="file" ref={aboutInputRef} onChange={(e) => handleFileChange(e, 'about')} className="hidden" accept="image/*" />
                                    </div>

                                    {/* Sağ: Metinler */}
                                    <div className="md:col-span-2 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <InputGroup label="Title (EN)" name="aboutTitle" value={settings.aboutTitle} onChange={handleChange} />
                                            <InputGroup label="Title (TR)" name="aboutTitleTr" value={settings.aboutTitleTr} onChange={handleChange} />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <TextAreaGroup label="Description (EN)" name="aboutDescription" value={settings.aboutDescription} onChange={handleChange} rows={6} />
                                            <TextAreaGroup label="Description (TR)" name="aboutDescriptionTr" value={settings.aboutDescriptionTr} onChange={handleChange} rows={6} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* B. FELSEFE (PHILOSOPHY - "Driven by Integrity") */}
                            <div className="space-y-6 pt-6 border-t border-zinc-200 dark:border-[#1F2430]">
                                <SectionHeader title="Philosophy Section (Driven by Integrity)" icon={Globe} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputGroup label="Section Title (EN)" name="philosophyTitle" value={settings.philosophyTitle} onChange={handleChange} />
                                    <InputGroup label="Section Title (TR)" name="philosophyTitleTr" value={settings.philosophyTitleTr} onChange={handleChange} />

                                    <TextAreaGroup label="Text (EN)" name="philosophyDescription" value={settings.philosophyDescription} onChange={handleChange} rows={3} />
                                    <TextAreaGroup label="Text (TR)" name="philosophyDescriptionTr" value={settings.philosophyDescriptionTr} onChange={handleChange} rows={3} />
                                </div>
                            </div>

                            {/* C. ESNEK METRİKLER (3 Slot) */}
                            <div className="space-y-6 pt-6 border-t border-zinc-200 dark:border-[#1F2430]">
                                <SectionHeader title="Key Metrics (Customizable)" icon={BarChart3} />
                                <p className="text-xs text-zinc-500 mb-4">Define up to 3 metrics to show on the studio page.</p>

                                {/* Metric 1 */}
                                <div className="bg-white dark:bg-[#151922] p-4 rounded-xl border border-zinc-200 dark:border-[#1F2430] grid grid-cols-3 gap-4">
                                    <InputGroup label="Metric 1 Title (EN)" name="metric1Title" value={settings.metric1Title} onChange={handleChange} placeholder="e.g. Years Active" />
                                    <InputGroup label="Metric 1 Title (TR)" name="metric1TitleTr" value={settings.metric1TitleTr} onChange={handleChange} />
                                    <InputGroup label="Metric 1 Value" name="metric1Value" value={settings.metric1Value} onChange={handleChange} placeholder="e.g. 12" />
                                </div>

                                {/* Metric 2 */}
                                <div className="bg-white dark:bg-[#151922] p-4 rounded-xl border border-zinc-200 dark:border-[#1F2430] grid grid-cols-3 gap-4">
                                    <InputGroup label="Metric 2 Title (EN)" name="metric2Title" value={settings.metric2Title} onChange={handleChange} placeholder="e.g. Projects" />
                                    <InputGroup label="Metric 2 Title (TR)" name="metric2TitleTr" value={settings.metric2TitleTr} onChange={handleChange} />
                                    <InputGroup label="Metric 2 Value" name="metric2Value" value={settings.metric2Value} onChange={handleChange} placeholder="e.g. 140+" />
                                </div>

                                {/* Metric 3 */}
                                <div className="bg-white dark:bg-[#151922] p-4 rounded-xl border border-zinc-200 dark:border-[#1F2430] grid grid-cols-3 gap-4">
                                    <InputGroup label="Metric 3 Title (EN)" name="metric3Title" value={settings.metric3Title} onChange={handleChange} placeholder="e.g. Awards" />
                                    <InputGroup label="Metric 3 Title (TR)" name="metric3TitleTr" value={settings.metric3TitleTr} onChange={handleChange} />
                                    <InputGroup label="Metric 3 Value" name="metric3Value" value={settings.metric3Value} onChange={handleChange} placeholder="e.g. 25" />
                                </div>
                            </div>

                            {/* D. SHOWREEL */}
                            <div className="pt-6 border-t border-zinc-200 dark:border-[#1F2430]">
                                <div className="bg-white dark:bg-[#151922] p-6 rounded-xl border border-zinc-200 dark:border-[#1F2430]">
                                    <h4 className="font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2"><Video size={18} /> Showreel Video</h4>
                                    <InputGroup label="Showreel URL (Vimeo/Youtube)" name="showreelUrl" value={settings.showreelUrl} onChange={handleChange} placeholder="https://vimeo.com/..." />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- 5. CONTACT (Behance YOK) --- */}
                    {activeTab === 'contact' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <SectionHeader title="Contact Information" icon={MapPin} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="Email" name="email" value={settings.email} onChange={handleChange} icon={Mail} />
                                <InputGroup label="Phone" name="phone" value={settings.phone} onChange={handleChange} icon={Phone} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <TextAreaGroup label="Address (EN)" name="address" value={settings.address} onChange={handleChange} rows={3} />
                                <TextAreaGroup label="Address (TR)" name="addressTr" value={settings.addressTr} onChange={handleChange} rows={3} />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase">Google Maps Embed Code</label>
                                <textarea
                                    name="googleMapEmbedCode"
                                    value={settings.googleMapEmbedCode}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-white focus:border-blue-500 outline-none font-mono"
                                />
                            </div>

                            <div className="pt-6">
                                <SectionHeader title="Social Media" icon={Globe} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputGroup label="Instagram" name="instagramUrl" value={settings.instagramUrl} onChange={handleChange} icon={Instagram} />
                                    <InputGroup label="LinkedIn" name="linkedinUrl" value={settings.linkedinUrl} onChange={handleChange} icon={Linkedin} />
                                    <InputGroup label="Facebook" name="facebookUrl" value={settings.facebookUrl} onChange={handleChange} icon={Facebook} />
                                    <InputGroup label="YouTube" name="youtubeUrl" value={settings.youtubeUrl} onChange={handleChange} icon={Youtube} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- 6. SEO & ANALYTICS --- */}
                    {activeTab === 'seo' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <SectionHeader title="SEO Configuration" icon={BarChart3} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="Google Analytics ID (G-XXXX)" name="googleAnalyticsId" value={settings.googleAnalyticsId} onChange={handleChange} />
                                <InputGroup label="Google Tag Manager ID (GTM-XXXX)" name="googleTagManagerId" value={settings.googleTagManagerId} onChange={handleChange} />
                            </div>

                            <div className="space-y-4">
                                <InputGroup label="Meta Keywords (EN)" name="metaKeywords" value={settings.metaKeywords} onChange={handleChange} placeholder="architecture, design, modern..." />
                                <InputGroup label="Meta Keywords (TR)" name="metaKeywordsTr" value={settings.metaKeywordsTr} onChange={handleChange} placeholder="mimarlık, tasarım, modern..." />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase">Custom Head Scripts</label>
                                <textarea
                                    name="headScripts"
                                    value={settings.headScripts}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="<script>...</script>"
                                    className="w-full bg-zinc-50 dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-lg p-3 font-mono text-xs text-zinc-600 dark:text-zinc-300 focus:border-blue-500 outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase">Robots.txt Content</label>
                                <textarea
                                    name="robotsTxt"
                                    value={settings.robotsTxt}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="User-agent: *"
                                    className="w-full bg-zinc-50 dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-lg p-3 font-mono text-xs text-zinc-600 dark:text-zinc-300 focus:border-blue-500 outline-none"
                                />
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

// --- Helper Components ---
const SectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
    <div className="flex items-center gap-2 pb-2 border-b border-zinc-200 dark:border-[#1F2430]">
        <Icon size={18} className="text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{title}</h3>
    </div>
);

const InputGroup = ({ label, name, value, onChange, placeholder, icon: Icon }: any) => (
    <div className="space-y-2">
        <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">{label}</label>
        <div className="relative">
            {Icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                    <Icon size={16} />
                </div>
            )}
            <input
                type="text"
                name={name}
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-white focus:border-blue-500 outline-none transition-colors ${Icon ? 'pl-10' : ''}`}
            />
        </div>
    </div>
);

const TextAreaGroup = ({ label, name, value, onChange, rows }: any) => (
    <div className="space-y-2">
        <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">{label}</label>
        <textarea
            name={name}
            value={value || ''}
            onChange={onChange}
            rows={rows}
            className="w-full bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-white focus:border-blue-500 outline-none transition-colors resize-none"
        />
    </div>
);

export default AdminSiteSettings;