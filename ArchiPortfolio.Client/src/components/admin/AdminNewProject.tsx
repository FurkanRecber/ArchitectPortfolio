import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, X, Save, Image as ImageIcon, Globe, Trash2, CloudUpload, Edit2, LayoutGrid, List, CheckCircle2 } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { categoryService } from '../../services/categoryService';
import { getImageUrl } from '../../utils/imageUrlHelper'; // Resim yolu düzeltici eklendi
import type { Category } from '../../types';

import { translations } from '../../translations';

interface AdminNewProjectProps {
    language?: 'EN' | 'TR';
}

const AdminNewProject: React.FC<AdminNewProjectProps> = ({ language = 'EN' }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;
    const t = translations[language].admin.projects.form;

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    // FORM VERİLERİ
    const [formData, setFormData] = useState({
        // ORTAK ALANLAR (DİL BAĞIMSIZ)
        projectYear: new Date().getFullYear().toString(),
        area: '',
        status: 'Completed',

        isFeatured: false,
        categoryId: '',
        client: '',
        location: '',
        projectTeam: '',

        // İNGİLİZCE METİNLER
        title: '',
        description: '',
        details: '',

        // TÜRKÇE METİNLER
        titleTr: '',
        descriptionTr: '',
        detailsTr: ''
    });

    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [existingGallery, setExistingGallery] = useState<string[]>([]); // Mevcut galeri resimleri
    const [coverPreview, setCoverPreview] = useState<string | null>(null);

    // Başlangıç Verilerini Yükle
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // 1. Kategorileri Çek
                const cats = await categoryService.getAllCategories();
                setCategories(cats);

                // Yeni proje ise varsayılan kategoriyi seç
                if (cats.length > 0 && !isEditMode) {
                    setFormData(prev => ({ ...prev, categoryId: cats[0].id.toString() }));
                }

                // 2. Edit Moduysa Projeyi Çek
                if (isEditMode && id) {
                    const project = await projectService.getProjectById(id);

                    setFormData({
                        projectYear: project.year || '',
                        area: project.area || '',
                        status: project.status || 'Completed',

                        isFeatured: project.isFeatured || (project as any).IsFeatured || false,
                        categoryId: (project.categoryId ? project.categoryId.toString() : null) || cats.find(c => c.name === project.category)?.id.toString() || (cats.length > 0 ? cats[0].id.toString() : ''),
                        client: project.client || '',
                        location: project.location || '',
                        projectTeam: project.team || '',

                        title: project.title || '',
                        description: project.description || '',
                        details: project.details || '',

                        // TR Alanlarını Eşleştir
                        titleTr: project.titleTr || '',
                        descriptionTr: project.descriptionTr || '',
                        detailsTr: project.detailsTr || ''
                    });

                    // Kapak resmi
                    if (project.coverImageUrl) {
                        setCoverPreview(getImageUrl(project.coverImageUrl));
                    }

                    // Galeri resimleri
                    if (project.gallery && project.gallery.length > 0) {
                        setExistingGallery(project.gallery);
                    }
                }

            } catch (err) {
                console.error("Veriler yüklenirken hata:", err);
            }
        };

        loadInitialData();
    }, [id, isEditMode]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setCoverImage(file);
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setGalleryFiles(prev => [...prev, ...Array.from(e.target.files!)]);
        }
    };

    // Mevcut galeri resmini sil (Locally)
    // Not: Gerçek silme işlemi için backend'de ayrı bir endpoint olabilir veya update ile gönderilebilir.
    // Şimdilik sadece listeden çıkarıyoruz, update servisine "kalanlar" gönderilmeli mi kontrol etmek gerek.
    const handleRemoveExistingImage = (idx: number) => {
        setExistingGallery(prev => prev.filter((_, i) => i !== idx));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();

            // --- ORTAK ---
            data.append('ProjectYear', formData.projectYear);
            data.append('Area', formData.area);
            data.append('Status', formData.status);

            data.append('IsFeatured', formData.isFeatured.toString());
            data.append('CategoryId', formData.categoryId);
            data.append('Client', formData.client);
            data.append('Location', formData.location);
            data.append('ProjectTeam', formData.projectTeam);

            // --- İNGİLİZCE ---
            data.append('Title', formData.title);
            data.append('Description', formData.description);
            data.append('Details', formData.details);

            // --- TÜRKÇE ---
            data.append('TitleTr', formData.titleTr);
            data.append('DescriptionTr', formData.descriptionTr);
            data.append('DetailsTr', formData.detailsTr);

            // --- DOSYALAR ---
            if (coverImage) {
                data.append('CoverImage', coverImage);
            } else if (!coverPreview && isEditMode) {
                // Eğer fotoğraf yoksa ve edit modundaysak, mevcut fotoğrafı silmek istiyoruz
                data.append('RemoveCoverImage', 'true');
            }

            galleryFiles.forEach(file => data.append('GalleryImages', file));

            // Mevcut galeri resimlerini nasıl yollayacağız? 
            // Eğer backend mevcutları koruyorsa sorun yok. Eğer siliyorsa, kalanları ID veya Path olarak yollamak gerekebilir.
            // Şimdilik sadece yeni eklenenleri yolluyoruz.

            if (isEditMode && id) {
                // ID'yi ekle
                data.append('Id', id);

                // Silinen resimler varsa onları da gönder (Bunu backendde karşılayacak yapı kurduysan)
                // Şimdilik sadece güncelleme diyelim:
                await projectService.updateProject(data);
                alert("Proje başarıyla güncellendi! 🚀");
                navigate('/admin/projects');
            } else {
                await projectService.createProject(data);
                navigate('/admin/projects');
            }

        } catch (error: any) {
            console.error("Hata:", error);
            const msg = error.message || "Bir hata oluştu.";
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto p-8 h-full bg-zinc-50 dark:bg-[#0B0E14]">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/admin/projects')} className="p-2 hover:bg-zinc-200 dark:hover:bg-[#1F2430] rounded-lg">
                        <ArrowLeft size={20} className="text-zinc-600 dark:text-slate-400" />
                    </button>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                        {isEditMode ? t.editTitle : t.createTitle}
                    </h2>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8">

                {/* 1. GENEL BİLGİLER (ORTAK) */}
                <div className="bg-white dark:bg-[#151922] p-8 rounded-xl border border-zinc-200 dark:border-[#1F2430] shadow-sm">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-zinc-900 dark:text-white">
                        <Globe size={18} className="text-blue-500" /> {t.generalInfo}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">{t.category}</label>
                            <select required name="categoryId" value={formData.categoryId} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white outline-none">
                                <option value="" disabled>{t.selectCategory}</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">{t.client}</label>
                            <input required name="client" value={formData.client} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">{t.location}</label>
                            <input required name="location" value={formData.location} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">{t.team}</label>
                            <input required name="projectTeam" value={formData.projectTeam} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">{t.year}</label>
                            <input required type="number" name="projectYear" value={formData.projectYear} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">{t.area}</label>
                            <input required name="area" value={formData.area} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">{t.status}</label>
                            <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white outline-none">
                                <option value="Completed">{t.statusOptions.completed}</option>
                                <option value="In Progress">{t.statusOptions.inProgress}</option>
                                <option value="Concept">{t.statusOptions.concept}</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-3 pt-6">
                            <input type="checkbox" id="isFeatured" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} className="w-5 h-5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500" />
                            <label htmlFor="isFeatured" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">{t.featured}</label>
                        </div>
                    </div>
                </div>

                {/* 2. DİL İÇERİKLERİ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* İNGİLİZCE */}
                    <div className="bg-white dark:bg-[#151922] p-6 rounded-xl border border-zinc-200 dark:border-[#1F2430] shadow-sm">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-100 dark:border-[#1F2430]">
                            <img src="https://flagcdn.com/gb.svg" alt="English" className="w-6 h-4 object-cover rounded shadow-sm" />
                            <h3 className="font-bold text-zinc-900 dark:text-white">{t.english}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500">{t.title}</label>
                                <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500">{t.description}</label>
                                <textarea required name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500">{t.details}</label>
                                <textarea required name="details" value={formData.details} onChange={handleInputChange} rows={6} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                            </div>
                        </div>
                    </div>

                    {/* TÜRKÇE */}
                    <div className="bg-white dark:bg-[#151922] p-6 rounded-xl border border-zinc-200 dark:border-[#1F2430] shadow-sm">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-100 dark:border-[#1F2430]">
                            <img src="https://flagcdn.com/tr.svg" alt="Turkish" className="w-6 h-4 object-cover rounded shadow-sm" />
                            <h3 className="font-bold text-zinc-900 dark:text-white">{t.turkish}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500">{t.title}</label>
                                <input required name="titleTr" value={formData.titleTr} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500">{t.description}</label>
                                <textarea required name="descriptionTr" value={formData.descriptionTr} onChange={handleInputChange} rows={3} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500">{t.details}</label>
                                <textarea required name="detailsTr" value={formData.detailsTr} onChange={handleInputChange} rows={6} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. MEDIA & GALLERY */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2 text-zinc-900 dark:text-white">
                            <ImageIcon size={20} className="text-purple-500" /> {t.media}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{t.galleryDesc}</p>
                    </div>

                    {/* COVER IMAGE CARD */}
                    <div className="bg-white dark:bg-[#151922] rounded-xl border border-zinc-200 dark:border-[#1F2430] shadow-sm overflow-hidden">
                        {/* Dark Header/Preview Area */}
                        <div className="bg-gradient-to-br from-zinc-800 to-zinc-950 p-8 relative min-h-[320px] flex flex-col">
                            <div className="flex justify-between items-start mb-8 relative z-10 w-full">
                                <div>
                                    <h4 className="text-white font-bold text-lg">{t.coverImage}</h4>
                                    <p className="text-zinc-400 text-sm">{t.coverImageDesc}</p>
                                </div>
                                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/30 shadow-sm backdrop-blur-md">
                                    {t.active}
                                </span>
                            </div>

                            {/* Centered Preview */}
                            <div className="flex-1 flex items-center justify-center relative z-10">
                                <div className="relative w-48 h-48 bg-white/5 rounded-lg border-2 border-white/10 shadow-2xl overflow-hidden backdrop-blur-sm group transition-transform hover:scale-105 duration-300">
                                    {coverPreview ? (
                                        <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500">
                                            <ImageIcon size={32} className="opacity-50 mb-2" />
                                            <span className="text-xs">Preview</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Decorative Background Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        </div>

                        {/* White Footer Action Bar */}
                        <div className="bg-white dark:bg-[#151922] p-4 flex items-center justify-between border-t border-zinc-200 dark:border-[#1F2430]">
                            {coverPreview ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCoverImage(null);
                                        setCoverPreview(null);
                                        const fileInput = document.getElementById('coverImageInput') as HTMLInputElement;
                                        if (fileInput) fileInput.value = '';
                                    }}
                                    className="flex items-center gap-2 text-zinc-500 hover:text-red-600 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                >
                                    <Trash2 size={16} />
                                    {t.remove}
                                </button>
                            ) : (
                                <div></div>
                            )}

                            <div>
                                <label
                                    htmlFor="coverImageInput"
                                    className="cursor-pointer flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 active:scale-95"
                                >
                                    <Edit2 size={16} />
                                    {coverPreview ? t.change : t.chooseFile}
                                </label>
                                <input
                                    id="coverImageInput"
                                    type="file"
                                    onChange={handleCoverImageChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>

                    {/* GALLERY SECTION */}
                    <div className="pt-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                {t.gallery}
                                <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs px-2 py-0.5 rounded-full">
                                    {existingGallery.length + galleryFiles.length}
                                </span>
                            </h3>
                            <div className="flex items-center gap-1">
                                <button type="button" className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                    <LayoutGrid size={18} />
                                </button>
                                <button type="button" className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                    <List size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Large Upload Zone */}
                        <div className="relative group">
                            <label
                                htmlFor="galleryImageInput"
                                className="relative block w-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-12 text-center hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-purple-50/50 dark:hover:bg-purple-900/10"
                            >
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                        <CloudUpload size={32} />
                                    </div>
                                    <div>
                                        <span className="text-purple-600 dark:text-purple-400 font-bold">{t.clickToUpload}</span>
                                        <span className="text-zinc-500 dark:text-zinc-400"> {t.dragDrop}</span>
                                    </div>
                                    <p className="text-xs text-zinc-400 uppercase tracking-wide">{t.fileLimit}</p>
                                </div>
                            </label>
                            <input
                                id="galleryImageInput"
                                type="file"
                                multiple
                                onChange={handleGalleryChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>

                        {/* Gallery Grid */}
                        {(existingGallery.length > 0 || galleryFiles.length > 0) && (
                            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                                {/* Existing Images */}
                                {existingGallery.map((url, idx) => (
                                    <div key={`existing-${idx}`} className="group relative aspect-square bg-white dark:bg-[#1A1D27] rounded-xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
                                        <img src={getImageUrl(url)} alt="gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute top-2 left-2">
                                            <span className="bg-blue-600/90 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full shadow-sm backdrop-blur-sm flex items-center gap-1">
                                                <CheckCircle2 size={10} /> {t.saved}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveExistingImage(idx)}
                                            className="absolute top-2 right-2 bg-white/90 dark:bg-black/90 text-red-500 hover:text-red-600 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                                        >
                                            <X size={14} />
                                        </button>
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="text-white text-xs truncate">Existing Image {idx + 1}</p>
                                        </div>
                                    </div>
                                ))}

                                {/* New Files */}
                                {galleryFiles.map((file, idx) => (
                                    <div key={`new-${idx}`} className="group relative aspect-square bg-white dark:bg-[#1A1D27] rounded-xl overflow-hidden shadow-sm border border-green-500/30">
                                        <img src={URL.createObjectURL(file)} alt="new preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute top-2 left-2">
                                            <span className="bg-green-600/90 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full shadow-sm backdrop-blur-sm flex items-center gap-1">
                                                <CheckCircle2 size={10} /> New
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setGalleryFiles(files => files.filter((_, i) => i !== idx))}
                                            className="absolute top-2 right-2 bg-white/90 dark:bg-black/90 text-red-500 hover:text-red-600 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                                        >
                                            <X size={14} />
                                        </button>
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="text-white text-xs truncate">{file.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" disabled={loading} className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50">
                        {loading ? t.saving : t.save}
                        <Save size={18} />
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AdminNewProject;