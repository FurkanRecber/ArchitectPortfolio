import React, { useState, useEffect, useRef } from 'react';
import {
    Save, Loader2, Globe, Type, MapPin, Mail, Phone,
    Facebook, Instagram, Linkedin, Youtube,
    UploadCloud, BarChart3, Megaphone, Video, Trophy, Plus, Trash2, Edit2, X
} from 'lucide-react';
import { siteSettingService } from '../../services/siteSettingService';
import { referenceService, type Reference } from '../../services/referenceService';
import { getImageUrl } from '../../utils/imageUrlHelper';
import { translations } from '../../translations';

interface AdminSiteSettingsProps {
    language?: 'EN' | 'TR';
}

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

const AdminSiteSettings: React.FC<AdminSiteSettingsProps> = ({ language = 'EN' }) => {
    const t = translations[language].admin.siteSettings;
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

    // Dosya Referansları
    const logoInputRef = useRef<HTMLInputElement>(null);
    const heroInputRef = useRef<HTMLInputElement>(null);
    const aboutInputRef = useRef<HTMLInputElement>(null);
    const philo1Ref = useRef<HTMLInputElement>(null);
    const philo2Ref = useRef<HTMLInputElement>(null);
    const philo3Ref = useRef<HTMLInputElement>(null);

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
        philosophySectionTitle: '', philosophySectionTitleTr: '',

        philo1Title: '', philo1TitleTr: '', philo1Desc: '', philo1DescTr: '', philo1IconUrl: '',
        philo2Title: '', philo2TitleTr: '', philo2Desc: '', philo2DescTr: '', philo2IconUrl: '',
        philo3Title: '', philo3TitleTr: '', philo3Desc: '', philo3DescTr: '', philo3IconUrl: '',

        metric1Title: '', metric1TitleTr: '', metric1Value: '',
        metric2Title: '', metric2TitleTr: '', metric2Value: '',
        metric3Title: '', metric3TitleTr: '', metric3Value: '',

        // Contact (Behance yok)
        email: '', phone: '', address: '', addressTr: '', googleMapEmbedCode: '',
        facebookUrl: '', instagramUrl: '', linkedinUrl: '', youtubeUrl: '',
        // SEO
        googleAnalyticsId: '', googleTagManagerId: '', headScripts: '', metaKeywords: '', metaKeywordsTr: '', robotsTxt: ''
    });

    // Reference State
    const [references, setReferences] = useState<Reference[]>([]);
    const [editingRef, setEditingRef] = useState<Partial<Reference> | null>(null); // For Add/Edit Modal
    const [refFile, setRefFile] = useState<File | null>(null);
    const [isRefModalOpen, setIsRefModalOpen] = useState(false);
    const [refSaving, setRefSaving] = useState(false);

    // Dosya State'leri (Sadece yükleme anında kullanılır)
    const [files, setFiles] = useState<{
        logo?: File;
        hero?: File;
        about?: File;
        philo1Icon?: File;
        philo2Icon?: File;
        philo3Icon?: File;
    }>({});

    // Önizleme State'i (Ekranda görünecekler)
    const [previews, setPreviews] = useState<{
        logo?: string;
        hero?: string;
        about?: string;
        philo1Icon?: string;
        philo2Icon?: string;
        philo3Icon?: string;
    }>({});

    // Verileri Çek
    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const [data, refData] = await Promise.all([
                siteSettingService.getSettings(),
                referenceService.getAll()
            ]);

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
                if (safeData.philo1IconUrl) setPreviews(p => ({ ...p, philo1Icon: getImageUrl(safeData.philo1IconUrl) }));
                if (safeData.philo2IconUrl) setPreviews(p => ({ ...p, philo2Icon: getImageUrl(safeData.philo2IconUrl) }));
                if (safeData.philo3IconUrl) setPreviews(p => ({ ...p, philo3Icon: getImageUrl(safeData.philo3IconUrl) }));
            }
            if (refData) {
                setReferences(refData);
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
    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        // Type kısmına yenileri ekle:
        type: 'logo' | 'hero' | 'about' | 'philo1Icon' | 'philo2Icon' | 'philo3Icon'
    ) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // @ts-ignore (Dinamik key hatası verirse bunu ekle)
            setFiles(prev => ({ ...prev, [type]: file }));

            const url = URL.createObjectURL(file);
            // @ts-ignore
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
            if (files.philo1Icon) formData.append('Philo1Icon', files.philo1Icon);
            if (files.philo2Icon) formData.append('Philo2Icon', files.philo2Icon);
            if (files.philo3Icon) formData.append('Philo3Icon', files.philo3Icon);

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

    // Reference Handlers
    const handleAddReference = () => {
        setEditingRef({ isActive: true });
        setRefFile(null);
        setIsRefModalOpen(true);
    };

    const handleEditReference = (ref: Reference) => {
        setEditingRef(ref);
        setRefFile(null);
        setIsRefModalOpen(true);
    };

    const handleDeleteReference = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this reference?')) return;
        try {
            await referenceService.delete(id);
            setReferences(prev => prev.filter(r => r.id !== id));
        } catch (error) {
            console.error('Error deleting reference:', error);
            alert('Error deleting reference');
        }
    };

    const handleSaveReference = async () => {
        if (!editingRef) return;
        setRefSaving(true);
        try {
            const formData = new FormData();
            if (editingRef.title) formData.append('Title', editingRef.title);
            if (editingRef.order) formData.append('Order', editingRef.order.toString());
            if (editingRef.isActive !== undefined) formData.append('IsActive', editingRef.isActive.toString());
            if (refFile) formData.append('logoFile', refFile);

            if (editingRef.id) {
                formData.append('Id', editingRef.id.toString());
                await referenceService.update(editingRef.id, formData);
            } else {
                await referenceService.add(formData);
            }

            // Reload references to be sure
            const updatedRefs = await referenceService.getAll();
            setReferences(updatedRefs);
            setIsRefModalOpen(false);
        } catch (error) {
            console.error('Error saving reference:', error);
            alert('Error saving reference');
        } finally {
            setRefSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-zinc-500">Loading configuration...</div>;

    const tabs = [
        { id: 'general', label: 'GENERAL & BRAND' },
        { id: 'hero', label: 'HERO & HOME' },
        { id: 'cta', label: 'CTA & ADS' },
        { id: 'studio', label: 'STUDIO & METRICS' },
        { id: 'references', label: 'REFERENCES' },
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
                    {saving ? 'SAVING...' : (language === 'TR' ? 'DEĞİŞİKLİKLERİ YAYINLA' : 'PUBLISH CHANGES')}
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
                                    <SectionHeader title={t.general.brandIdentity} icon={Globe} />
                                    <InputGroup label={t.general.siteTitle} name="siteTitle" value={settings.siteTitle} onChange={handleChange} />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <TextAreaGroup label={t.general.footerDescEn} name="footerDescription" value={settings.footerDescription} onChange={handleChange} rows={3} />
                                        <TextAreaGroup label={t.general.footerDescTr} name="footerDescriptionTr" value={settings.footerDescriptionTr} onChange={handleChange} rows={3} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputGroup label={t.general.copyrightEn} name="copyrightText" value={settings.copyrightText} onChange={handleChange} />
                                        <InputGroup label={t.general.copyrightTr} name="copyrightTextTr" value={settings.copyrightTextTr} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <SectionHeader title={t.general.logo} icon={UploadCloud} />
                                    <div
                                        onClick={() => logoInputRef.current?.click()}
                                        className="border-2 border-dashed border-zinc-300 dark:border-[#2A303C] rounded-xl bg-zinc-50 dark:bg-[#1A1D27] h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-100 dark:hover:bg-[#1F2430] transition-colors relative overflow-hidden group"
                                    >
                                        {previews.logo ? (
                                            <img src={previews.logo} alt="Logo" className="w-full h-full object-contain p-4" />
                                        ) : (
                                            <div className="text-center text-zinc-400">
                                                <UploadCloud size={32} className="mx-auto mb-2" />
                                                <span className="text-xs">{t.general.uploadLogo}</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                                            {t.general.changeLogo}
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
                            <SectionHeader title={t.hero.title} icon={Type} />

                            {/* Hero Image */}
                            <div className="bg-white dark:bg-[#151922] p-6 rounded-xl border border-zinc-200 dark:border-[#1F2430] space-y-4">
                                <label className="text-xs font-bold text-zinc-500 uppercase">{t.hero.imageLabel}</label>
                                <div
                                    onClick={() => heroInputRef.current?.click()}
                                    className="w-full h-64 rounded-lg bg-zinc-100 dark:bg-[#0B0E14] border-2 border-dashed border-zinc-300 dark:border-[#2A303C] flex items-center justify-center cursor-pointer overflow-hidden relative group"
                                >
                                    {previews.hero ? (
                                        <img src={previews.hero} alt="Hero" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-zinc-400 flex flex-col items-center">
                                            <UploadCloud size={40} />
                                            <span className="mt-2 text-sm">{t.hero.uploadPlaceholder}</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold">{t.hero.changeImage}</div>
                                </div>
                                <input type="file" ref={heroInputRef} onChange={(e) => handleFileChange(e, 'hero')} className="hidden" accept="image/*" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label={t.hero.mainTitleEn} name="heroTitle" value={settings.heroTitle} onChange={handleChange} />
                                <InputGroup label={t.hero.mainTitleTr} name="heroTitleTr" value={settings.heroTitleTr} onChange={handleChange} />

                                <InputGroup label={t.hero.subtitleEn} name="heroSubtitle" value={settings.heroSubtitle} onChange={handleChange} />
                                <InputGroup label={t.hero.subtitleTr} name="heroSubtitleTr" value={settings.heroSubtitleTr} onChange={handleChange} />

                                <InputGroup label={t.hero.buttonTextEn} name="heroButtonText" value={settings.heroButtonText} onChange={handleChange} />
                                <InputGroup label={t.hero.buttonTextTr} name="heroButtonTextTr" value={settings.heroButtonTextTr} onChange={handleChange} />
                            </div>
                        </div>
                    )}

                    {/* --- 3. CTA & ADS --- */}
                    {activeTab === 'cta' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <SectionHeader title={t.cta.title} icon={Megaphone} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label={t.cta.titleEn} name="ctaTitle" value={settings.ctaTitle} onChange={handleChange} />
                                <InputGroup label={t.cta.titleTr} name="ctaTitleTr" value={settings.ctaTitleTr} onChange={handleChange} />

                                <TextAreaGroup label={t.cta.descEn} name="ctaDescription" value={settings.ctaDescription} onChange={handleChange} rows={2} />
                                <TextAreaGroup label={t.cta.descTr} name="ctaDescriptionTr" value={settings.ctaDescriptionTr} onChange={handleChange} rows={2} />

                                <InputGroup label={t.cta.buttonEn} name="ctaButtonText" value={settings.ctaButtonText} onChange={handleChange} />
                                <InputGroup label={t.cta.buttonTr} name="ctaButtonTextTr" value={settings.ctaButtonTextTr} onChange={handleChange} />
                            </div>
                        </div>
                    )}

                    {/* --- 4. STUDIO & METRICS (CV YOK) --- */}
                    {activeTab === 'studio' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">

                            {/* A. HAKKIMIZDA (ABOUT US) */}
                            <div className="space-y-6">
                                <SectionHeader title={t.studio.aboutTitle} icon={Type} />

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* Sol: Resim Yükleme */}
                                    <div className="space-y-4">
                                        <label className="text-xs font-bold text-zinc-500 uppercase">{t.studio.aboutImage}</label>
                                        <div
                                            onClick={() => aboutInputRef.current?.click()}
                                            className="border-2 border-dashed border-zinc-300 dark:border-[#2A303C] rounded-xl bg-zinc-50 dark:bg-[#1A1D27] h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-100 dark:hover:bg-[#1F2430] transition-colors relative overflow-hidden group"
                                        >
                                            {previews.about ? (
                                                <img src={previews.about} alt="About" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-center text-zinc-400">
                                                    <UploadCloud size={32} className="mx-auto mb-2" />
                                                    <span className="text-xs">{t.uploadImage}</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">{t.change}</div>
                                        </div>
                                        <input type="file" ref={aboutInputRef} onChange={(e) => handleFileChange(e, 'about')} className="hidden" accept="image/*" />
                                    </div>

                                    {/* Sağ: Metinler */}
                                    <div className="md:col-span-2 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <InputGroup label={t.studio.titleEn} name="aboutTitle" value={settings.aboutTitle} onChange={handleChange} />
                                            <InputGroup label={t.studio.titleTr} name="aboutTitleTr" value={settings.aboutTitleTr} onChange={handleChange} />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <TextAreaGroup label={t.studio.descEn} name="aboutDescription" value={settings.aboutDescription} onChange={handleChange} rows={6} />
                                            <TextAreaGroup label={t.studio.descTr} name="aboutDescriptionTr" value={settings.aboutDescriptionTr} onChange={handleChange} rows={6} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* B. FELSEFE (MADDELİ YAPI) */}
                            <div className="space-y-6 pt-6 border-t border-zinc-200 dark:border-[#1F2430]">
                                <SectionHeader title={t.studio.philosophyTitle} icon={Globe} />

                                {/* Bölüm Başlığı */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-zinc-100 dark:bg-[#1A1D27] p-4 rounded-xl">
                                    <InputGroup label={t.studio.sectionTitleEn} name="philosophySectionTitle" value={settings.philosophySectionTitle} onChange={handleChange} placeholder="e.g. Driven by Integrity" />
                                    <InputGroup label={t.studio.sectionTitleTr} name="philosophySectionTitleTr" value={settings.philosophySectionTitleTr} onChange={handleChange} />
                                </div>

                                {/* Maddeler (Loop) */}
                                <div className="grid gap-6">
                                    {[1, 2, 3].map((num) => {
                                        const iconRef = num === 1 ? philo1Ref : num === 2 ? philo2Ref : philo3Ref;
                                        const previewKey = `philo${num}Icon` as keyof typeof previews;
                                        // Dynamic access to settings
                                        const pTitle = settings[`philo${num}Title`];
                                        const pTitleTr = settings[`philo${num}TitleTr`];
                                        const pDesc = settings[`philo${num}Desc`];
                                        const pDescTr = settings[`philo${num}DescTr`];

                                        return (
                                            <div key={num} className="p-6 bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-xl relative group hover:border-blue-500/30 transition-colors">
                                                <span className="absolute top-4 right-4 text-[10px] font-bold text-zinc-300 dark:text-zinc-600 bg-zinc-100 dark:bg-[#1A1D27] px-2 py-1 rounded">ITEM {num}</span>

                                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                                    {/* İkon */}
                                                    <div className="md:col-span-2 flex flex-col gap-2">
                                                        <label className="text-[10px] font-bold text-zinc-500 uppercase">{t.studio.icon}</label>
                                                        <div
                                                            onClick={() => iconRef.current?.click()}
                                                            className="aspect-square rounded-lg border-2 border-dashed border-zinc-300 dark:border-[#2A303C] flex items-center justify-center cursor-pointer hover:bg-zinc-50 dark:hover:bg-[#1F2430] relative overflow-hidden"
                                                        >
                                                            {previews[previewKey] ? (
                                                                <img src={previews[previewKey]} className="w-10 h-10 object-contain" />
                                                            ) : (
                                                                <UploadCloud size={20} className="text-zinc-400" />
                                                            )}
                                                        </div>
                                                        <input
                                                            type="file"
                                                            ref={iconRef}
                                                            onChange={(e) => {
                                                                // @ts-ignore
                                                                handleFileChange(e, `philo${num}Icon`);
                                                            }}
                                                            className="hidden" accept="image/*"
                                                        />
                                                    </div>

                                                    {/* Metinler */}
                                                    <div className="md:col-span-10 grid gap-4">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <InputGroup label={t.studio.titleEn} name={`philo${num}Title`} value={pTitle} onChange={handleChange} />
                                                            <InputGroup label={t.studio.titleTr} name={`philo${num}TitleTr`} value={pTitleTr} onChange={handleChange} />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <TextAreaGroup label={t.studio.descEn} name={`philo${num}Desc`} value={pDesc} onChange={handleChange} rows={2} />
                                                            <TextAreaGroup label={t.studio.descTr} name={`philo${num}DescTr`} value={pDescTr} onChange={handleChange} rows={2} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* C. ESNEK METRİKLER (3 Slot) */}
                            <div className="space-y-6 pt-6 border-t border-zinc-200 dark:border-[#1F2430]">
                                <SectionHeader title={t.studio.metricsTitle} icon={BarChart3} />
                                <p className="text-xs text-zinc-500 mb-4">{t.studio.metricsDesc}</p>

                                {/* Metric 1 */}
                                <div className="bg-white dark:bg-[#151922] p-4 rounded-xl border border-zinc-200 dark:border-[#1F2430] grid grid-cols-3 gap-4">
                                    <InputGroup label={t.studio.metric1TitleEn} name="metric1Title" value={settings.metric1Title} onChange={handleChange} placeholder="e.g. Years Active" />
                                    <InputGroup label={t.studio.metric1TitleTr} name="metric1TitleTr" value={settings.metric1TitleTr} onChange={handleChange} />
                                    <InputGroup label={t.studio.metricValue} name="metric1Value" value={settings.metric1Value} onChange={handleChange} placeholder="e.g. 12" />
                                </div>

                                {/* Metric 2 */}
                                <div className="bg-white dark:bg-[#151922] p-4 rounded-xl border border-zinc-200 dark:border-[#1F2430] grid grid-cols-3 gap-4">
                                    <InputGroup label={t.studio.metric2TitleEn} name="metric2Title" value={settings.metric2Title} onChange={handleChange} placeholder="e.g. Projects" />
                                    <InputGroup label={t.studio.metric2TitleTr} name="metric2TitleTr" value={settings.metric2TitleTr} onChange={handleChange} />
                                    <InputGroup label={t.studio.metricValue} name="metric2Value" value={settings.metric2Value} onChange={handleChange} placeholder="e.g. 140+" />
                                </div>

                                {/* Metric 3 */}
                                <div className="bg-white dark:bg-[#151922] p-4 rounded-xl border border-zinc-200 dark:border-[#1F2430] grid grid-cols-3 gap-4">
                                    <InputGroup label={t.studio.metric3TitleEn} name="metric3Title" value={settings.metric3Title} onChange={handleChange} placeholder="e.g. Awards" />
                                    <InputGroup label={t.studio.metric3TitleTr} name="metric3TitleTr" value={settings.metric3TitleTr} onChange={handleChange} />
                                    <InputGroup label={t.studio.metricValue} name="metric3Value" value={settings.metric3Value} onChange={handleChange} placeholder="e.g. 25" />
                                </div>
                            </div>

                            {/* D. SHOWREEL */}
                            <div className="pt-6 border-t border-zinc-200 dark:border-[#1F2430]">
                                <div className="bg-white dark:bg-[#151922] p-6 rounded-xl border border-zinc-200 dark:border-[#1F2430]">
                                    <h4 className="font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2"><Video size={18} /> {t.studio.showreel}</h4>
                                    <InputGroup label={t.studio.showreelUrl} name="showreelUrl" value={settings.showreelUrl} onChange={handleChange} placeholder="https://vimeo.com/..." />
                                </div>
                            </div>
                        </div>

                    )}

                    {/* --- 5. REFERENCES (CLIENTS) --- */}
                    {activeTab === 'references' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-[#1F2430]">
                                <SectionHeader title={t.references.title} icon={Trophy} />
                                <button
                                    onClick={handleAddReference}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2"
                                >
                                    <Plus size={16} /> {t.references.addNew}
                                </button>
                            </div>

                            {references.length === 0 ? (
                                <div className="text-center py-12 text-zinc-500 bg-white dark:bg-[#151922] rounded-xl border border-zinc-200 dark:border-[#1F2430]">
                                    {t.references.empty}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {references.map((ref) => (
                                        <div key={ref.id} className="bg-white dark:bg-[#151922] p-4 rounded-xl border border-zinc-200 dark:border-[#1F2430] flex items-center justify-between group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-zinc-100 dark:bg-[#0B0E14] rounded-lg p-2 flex items-center justify-center border border-zinc-200 dark:border-[#1F2430]">
                                                    <img src={getImageUrl(ref.logoUrl)} alt={ref.title} className="max-w-full max-h-full object-contain filter grayscale invert dark:invert-0" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-zinc-900 dark:text-white">{ref.title}</h4>
                                                    <span className="text-xs text-zinc-500">Order: {ref.order}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleEditReference(ref)} className="p-2 text-zinc-500 hover:text-blue-600 bg-zinc-100 dark:bg-[#1A1D27] rounded-lg">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button onClick={() => handleDeleteReference(ref.id)} className="p-2 text-zinc-500 hover:text-red-600 bg-zinc-100 dark:bg-[#1A1D27] rounded-lg">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* --- 6. CONTACT (Behance YOK) --- */}
                    {
                        activeTab === 'contact' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <SectionHeader title={t.contact.title} icon={MapPin} />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputGroup label={t.contact.email} name="email" value={settings.email} onChange={handleChange} icon={Mail} />
                                    <InputGroup label={t.contact.phone} name="phone" value={settings.phone} onChange={handleChange} icon={Phone} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <TextAreaGroup label={t.contact.addressEn} name="address" value={settings.address} onChange={handleChange} rows={3} />
                                    <TextAreaGroup label={t.contact.addressTr} name="addressTr" value={settings.addressTr} onChange={handleChange} rows={3} />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">{t.contact.googleMaps}</label>
                                    <textarea
                                        name="googleMapEmbedCode"
                                        value={settings.googleMapEmbedCode}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-white focus:border-blue-500 outline-none font-mono"
                                    />
                                </div>

                                <div className="pt-6">
                                    <SectionHeader title={t.contact.socialMedia} icon={Globe} />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputGroup label="Instagram" name="instagramUrl" value={settings.instagramUrl} onChange={handleChange} icon={Instagram} />
                                        <InputGroup label="LinkedIn" name="linkedinUrl" value={settings.linkedinUrl} onChange={handleChange} icon={Linkedin} />
                                        <InputGroup label="Facebook" name="facebookUrl" value={settings.facebookUrl} onChange={handleChange} icon={Facebook} />
                                        <InputGroup label="YouTube" name="youtubeUrl" value={settings.youtubeUrl} onChange={handleChange} icon={Youtube} />
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {/* --- 7. SEO & ANALYTICS --- */}
                    {
                        activeTab === 'seo' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <SectionHeader title={t.seo.title} icon={BarChart3} />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputGroup label={t.seo.analyticsId} name="googleAnalyticsId" value={settings.googleAnalyticsId} onChange={handleChange} />
                                    <InputGroup label={t.seo.gtmId} name="googleTagManagerId" value={settings.googleTagManagerId} onChange={handleChange} />
                                </div>

                                <div className="space-y-4">
                                    <InputGroup label={t.seo.keywordsEn} name="metaKeywords" value={settings.metaKeywords} onChange={handleChange} placeholder="architecture, design, modern..." />
                                    <InputGroup label={t.seo.keywordsTr} name="metaKeywordsTr" value={settings.metaKeywordsTr} onChange={handleChange} placeholder="mimarlık, tasarım, modern..." />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">{t.seo.headScripts}</label>
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
                                    <label className="text-xs font-bold text-zinc-500 uppercase">{t.seo.robotsTxt}</label>
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
                        )
                    }

                </div >

                {/* REFERENCE MODAL */}
                {
                    isRefModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                            <div className="bg-white dark:bg-[#11141D] rounded-2xl w-full max-w-md shadow-2xl border border-zinc-200 dark:border-[#1F2430] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <div className="p-6 border-b border-zinc-200 dark:border-[#1F2430] flex justify-between items-center">
                                    <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
                                        {editingRef?.id ? t.references.edit : t.references.addNew}
                                    </h3>
                                    <button onClick={() => setIsRefModalOpen(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="p-6 space-y-6">
                                    <InputGroup
                                        label={t.references.name}
                                        name="title"
                                        value={editingRef?.title}
                                        onChange={(e: any) => setEditingRef(prev => ({ ...prev, title: e.target.value }))}
                                        placeholder="e.g. Acme Corp"
                                    />
                                    <InputGroup
                                        label={t.references.order}
                                        name="order"
                                        value={editingRef?.order}
                                        onChange={(e: any) => setEditingRef(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                                        placeholder="0"
                                    />

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="refActive"
                                            checked={editingRef?.isActive ?? true}
                                            onChange={(e) => setEditingRef(prev => ({ ...prev, isActive: e.target.checked }))}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="refActive" className="text-sm font-medium text-zinc-900 dark:text-white">
                                            {t.references.active}
                                        </label>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">{t.references.logo}</label>
                                        <div className="relative border-2 border-dashed border-zinc-300 dark:border-[#2A303C] rounded-lg p-4 bg-zinc-50 dark:bg-[#1A1D27] text-center cursor-pointer hover:border-blue-500 transition-colors">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={(e) => e.target.files && setRefFile(e.target.files[0])}
                                            />
                                            {refFile ? (
                                                <div className="text-sm font-medium text-blue-600">{refFile.name}</div>
                                            ) : (editingRef?.logoUrl) ? (
                                                <img src={getImageUrl(editingRef.logoUrl)} alt="Preview" className="h-20 mx-auto object-contain" />
                                            ) : (
                                                <div className="text-zinc-400 flex flex-col items-center">
                                                    <UploadCloud size={24} className="mb-2" />
                                                    <span className="text-xs">{t.references.uploadLogo}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-zinc-50 dark:bg-[#151922] border-t border-zinc-200 dark:border-[#1F2430] flex justify-end gap-3">
                                    <button
                                        onClick={() => setIsRefModalOpen(false)}
                                        className="px-4 py-2 text-zinc-600 dark:text-zinc-400 font-bold text-xs rounded-lg hover:bg-zinc-200 dark:hover:bg-[#1A1D27]"
                                    >
                                        {t.cancel}
                                    </button>
                                    <button
                                        onClick={handleSaveReference}
                                        disabled={refSaving}
                                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow-sm disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {refSaving && <Loader2 size={14} className="animate-spin" />}
                                        {t.save}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div >
        </div >

    );
};

export default AdminSiteSettings;