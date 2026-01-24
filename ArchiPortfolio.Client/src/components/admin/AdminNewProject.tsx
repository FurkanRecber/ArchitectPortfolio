import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X, Save, Image as ImageIcon, PenLine } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { categoryService } from '../../services/categoryService';
import type { Category } from '../../types';

const AdminNewProject: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Edit modundaysak ID gelir
    const isEditMode = !!id;

    // --- STATE'LER ---
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    // Form Verileri
    const [formData, setFormData] = useState({
        title: '',
        description: '', // Kısa açıklama
        details: '',     // Uzun içerik
        client: '',
        location: '',
        year: new Date().getFullYear().toString(),
        area: '',
        status: 'Completed',
        categoryId: ''
    });

    // Dosya State'leri
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

    // Önizleme (Preview) State'leri
    const [coverPreview, setCoverPreview] = useState<string | null>(null);

    // --- BAŞLANGIÇTA VERİLERİ ÇEK ---
    useEffect(() => {
        // 1. Kategorileri Getir
        const fetchCategories = async () => {
            try {
                const cats = await categoryService.getAllCategories();
                setCategories(cats);
                // Varsayılan olarak ilk kategoriyi seç
                if (cats.length > 0 && !isEditMode) {
                    setFormData(prev => ({ ...prev, categoryId: cats[0].id.toString() }));
                }
            } catch (err) {
                console.error("Kategoriler yüklenemedi", err);
            }
        };

        fetchCategories();

        // 2. Edit Modundaysak Mevcut Projeyi Getir
        if (isEditMode) {
            const fetchProject = async () => {
                try {
                    setLoading(true);
                    const project = await projectService.getProjectById(id!);
                    setFormData({
                        title: project.title,
                        description: project.description,
                        details: project.details || '',
                        client: project.client,
                        location: project.location,
                        year: project.year,
                        area: project.area,
                        status: project.status,
                        // Kategori isminden ID bulmak zor olabilir, backend'de CategoryId dönmesi en sağlıklısıdır.
                        // Şimdilik varsayılan bırakıyoruz veya backend DTO'ya CategoryId eklemelisin.
                        categoryId: ''
                    });
                    setCoverPreview(project.imageUrl);
                } catch (err) {
                    console.error("Proje bilgileri alınamadı", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchProject();
        }
    }, [id, isEditMode]);


    // --- HANDLERS ---
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
            const newFiles = Array.from(e.target.files);
            setGalleryFiles(prev => [...prev, ...newFiles]);
        }
    };

    const removeGalleryFile = (index: number) => {
        setGalleryFiles(prev => prev.filter((_, i) => i !== index));
    };

    // --- KAYDETME İŞLEMİ (SUBMIT) ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // FormData Oluştur (Dosya gönderimi için şart)
            const data = new FormData();

            // Text alanları ekle
            data.append('Title', formData.title);
            data.append('Description', formData.description);
            data.append('Details', formData.details);
            data.append('Client', formData.client);
            data.append('Location', formData.location);
            data.append('ProjectYear', formData.year);
            data.append('Area', formData.area);
            data.append('Status', formData.status);
            data.append('CategoryId', formData.categoryId);

            // Dosyaları ekle
            if (coverImage) {
                data.append('CoverImage', coverImage); // Backend bu ismi beklemeli (IFormFile CoverImage)
            }

            // Galeri Resimleri
            galleryFiles.forEach((file) => {
                data.append('GalleryImages', file); // Backend bu ismi beklemeli (List<IFormFile> GalleryImages)
            });

            // Edit moduysa ID ekle
            if (isEditMode) {
                data.append('Id', id!);
                await projectService.updateProject(data);
            } else {
                await projectService.createProject(data);
            }

            navigate('/admin/projects');

        } catch (error) {
            console.error("Kaydetme hatası:", error);
            alert("Proje kaydedilirken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto p-8 h-full bg-zinc-50 dark:bg-[#0B0E14]">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/admin/projects')} className="p-2 hover:bg-zinc-200 dark:hover:bg-[#1F2430] rounded-lg transition-colors">
                        <ArrowLeft size={20} className="text-zinc-600 dark:text-slate-400" />
                    </button>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                        {isEditMode ? 'Edit Project' : 'Add New Project'}
                    </h2>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">

                {/* 1. Temel Bilgiler */}
                <div className="bg-white dark:bg-[#151922] p-8 rounded-xl border border-zinc-200 dark:border-[#1F2430] shadow-sm">
                    <h3 className="text-lg font-semibold mb-6 text-zinc-900 dark:text-white flex items-center gap-2">
                        <PenLine size={18} className="text-blue-500" /> Basic Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">Project Title</label>
                            <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Modern Villa" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">Category</label>
                            <select name="categoryId" value={formData.categoryId} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white outline-none">
                                <option value="" disabled>Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-full space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">Short Description</label>
                            <textarea required name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white outline-none" placeholder="Brief summary..." />
                        </div>

                        <div className="col-span-full space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">Full Details</label>
                            <textarea name="details" value={formData.details} onChange={handleInputChange} rows={6} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white outline-none" placeholder="Detailed project story..." />
                        </div>
                    </div>
                </div>

                {/* 2. Metadata */}
                <div className="bg-white dark:bg-[#151922] p-8 rounded-xl border border-zinc-200 dark:border-[#1F2430] shadow-sm">
                    <h3 className="text-lg font-semibold mb-6 text-zinc-900 dark:text-white">Project Metadata</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">Client</label>
                            <input name="client" value={formData.client} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">Location</label>
                            <input name="location" value={formData.location} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">Year</label>
                            <input type="number" name="year" value={formData.year} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">Area (sqm)</label>
                            <input name="area" value={formData.area} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm" />
                        </div>
                    </div>
                </div>

                {/* 3. Görseller */}
                <div className="bg-white dark:bg-[#151922] p-8 rounded-xl border border-zinc-200 dark:border-[#1F2430] shadow-sm">
                    <h3 className="text-lg font-semibold mb-6 text-zinc-900 dark:text-white flex items-center gap-2">
                        <ImageIcon size={18} className="text-purple-500" /> Media & Gallery
                    </h3>

                    {/* Kapak Resmi */}
                    <div className="mb-8">
                        <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Cover Image</label>
                        <div className="flex items-start gap-6">
                            <div className="w-40 h-28 bg-zinc-100 dark:bg-[#1A1D27] border-2 border-dashed border-zinc-300 dark:border-[#2A303C] rounded-lg flex items-center justify-center overflow-hidden relative">
                                {coverPreview ? (
                                    <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-xs text-zinc-400 text-center p-2">No image selected</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <input type="file" onChange={handleCoverImageChange} accept="image/*" className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-400" />
                                <p className="mt-2 text-xs text-zinc-400">Recommended: 1920x1080px, Max 5MB</p>
                            </div>
                        </div>
                    </div>

                    {/* Galeri */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Gallery Images</label>
                        <input type="file" multiple onChange={handleGalleryChange} accept="image/*" className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 dark:file:bg-purple-900/20 dark:file:text-purple-400" />

                        {/* Seçilen Dosyaların Listesi */}
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {galleryFiles.map((file, idx) => (
                                <div key={idx} className="relative group aspect-square bg-zinc-100 dark:bg-[#1A1D27] rounded-lg overflow-hidden">
                                    <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    <button type="button" onClick={() => removeGalleryFile(idx)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-4">
                    <button type="submit" disabled={loading} className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50">
                        {loading ? 'Saving...' : 'Save Project'}
                        <Save size={18} />
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AdminNewProject;