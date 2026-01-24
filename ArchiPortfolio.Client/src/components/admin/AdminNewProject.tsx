import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, X, Save, Image as ImageIcon, Globe } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { categoryService } from '../../services/categoryService';
import type { Category } from '../../types';

const AdminNewProject: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    // FORM VERİLERİ
    const [formData, setFormData] = useState({
        // ORTAK ALANLAR (DİL BAĞIMSIZ)
        projectYear: new Date().getFullYear().toString(),
        area: '',
        status: 'Completed',
        pressKitUrl: '',
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
    const [coverPreview, setCoverPreview] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const cats = await categoryService.getAllCategories();
                setCategories(cats);
                if (cats.length > 0 && !isEditMode) {
                    setFormData(prev => ({ ...prev, categoryId: cats[0].id.toString() }));
                }
            } catch (err) { console.error(err); }
        };
        fetchCategories();
    }, [isEditMode]);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();

            // --- ORTAK ---
            data.append('ProjectYear', formData.projectYear);
            data.append('Area', formData.area);
            data.append('Status', formData.status);
            data.append('PressKitUrl', formData.pressKitUrl);
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
            if (coverImage) data.append('CoverImage', coverImage);
            galleryFiles.forEach(file => data.append('GalleryImages', file));

            if (isEditMode) {
                // Update...
            } else {
                await projectService.createProject(data);
            }
            navigate('/admin/projects');

        } catch (error) {
            console.error("Hata:", error);
            alert("Bir hata oluştu.");
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
                        {isEditMode ? 'Edit Project' : 'Add New Project'}
                    </h2>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8">

                {/* 1. GENEL BİLGİLER (ORTAK) */}
                <div className="bg-white dark:bg-[#151922] p-8 rounded-xl border border-zinc-200 dark:border-[#1F2430] shadow-sm">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-zinc-900 dark:text-white">
                        <Globe size={18} className="text-blue-500" /> General Info (Shared)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">Category</label>
                            <select name="categoryId" value={formData.categoryId} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white outline-none">
                                <option value="" disabled>Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">Client</label>
                            <input name="client" value={formData.client} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">Location</label>
                            <input name="location" value={formData.location} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">Project Team</label>
                            <input name="projectTeam" value={formData.projectTeam} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">Year</label>
                            <input type="number" name="projectYear" value={formData.projectYear} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">Area (sqm)</label>
                            <input name="area" value={formData.area} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">Status</label>
                            <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white outline-none">
                                <option value="Completed">Completed</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Concept">Concept</option>
                            </select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-bold uppercase text-zinc-500">Press Kit URL</label>
                            <input name="pressKitUrl" value={formData.pressKitUrl} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                        </div>
                        <div className="flex items-center gap-3 pt-6">
                            <input type="checkbox" id="isFeatured" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} className="w-5 h-5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500" />
                            <label htmlFor="isFeatured" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">Featured Project</label>
                        </div>
                    </div>
                </div>

                {/* 2. DİL İÇERİKLERİ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* İNGİLİZCE */}
                    <div className="bg-white dark:bg-[#151922] p-6 rounded-xl border border-zinc-200 dark:border-[#1F2430] shadow-sm">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-100 dark:border-[#1F2430]">
                            <img src="https://flagcdn.com/gb.svg" alt="English" className="w-6 h-4 object-cover rounded shadow-sm" />
                            <h3 className="font-bold text-zinc-900 dark:text-white">English</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500">Title</label>
                                <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500">Details</label>
                                <textarea name="details" value={formData.details} onChange={handleInputChange} rows={6} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                            </div>
                        </div>
                    </div>

                    {/* TÜRKÇE */}
                    <div className="bg-white dark:bg-[#151922] p-6 rounded-xl border border-zinc-200 dark:border-[#1F2430] shadow-sm">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-100 dark:border-[#1F2430]">
                            <img src="https://flagcdn.com/tr.svg" alt="Turkish" className="w-6 h-4 object-cover rounded shadow-sm" />
                            <h3 className="font-bold text-zinc-900 dark:text-white">Türkçe</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500">Başlık</label>
                                <input required name="titleTr" value={formData.titleTr} onChange={handleInputChange} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500">Kısa Açıklama</label>
                                <textarea name="descriptionTr" value={formData.descriptionTr} onChange={handleInputChange} rows={3} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500">Detaylı İçerik</label>
                                <textarea name="detailsTr" value={formData.detailsTr} onChange={handleInputChange} rows={6} className="w-full bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] p-3 rounded-lg text-sm text-zinc-900 dark:text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. GÖRSELLER */}
                <div className="bg-white dark:bg-[#151922] p-8 rounded-xl border border-zinc-200 dark:border-[#1F2430] shadow-sm">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-zinc-900 dark:text-white">
                        <ImageIcon size={18} className="text-purple-500" /> Media & Gallery
                    </h3>

                    <div className="mb-8">
                        <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Cover Image</label>
                        <div className="flex items-start gap-6">
                            <div className="w-40 h-28 bg-zinc-100 dark:bg-[#1A1D27] border-2 border-dashed border-zinc-300 dark:border-[#2A303C] rounded-lg flex items-center justify-center overflow-hidden relative">
                                {coverPreview ? (
                                    <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-xs text-zinc-400 text-center p-2">No image</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <input type="file" onChange={handleCoverImageChange} accept="image/*" className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-400" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Gallery Images</label>
                        <input type="file" multiple onChange={handleGalleryChange} accept="image/*" className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 dark:file:bg-purple-900/20 dark:file:text-purple-400" />

                        <div className="mt-4 grid grid-cols-2 md:grid-cols-6 gap-4">
                            {galleryFiles.map((file, idx) => (
                                <div key={idx} className="relative group aspect-square bg-zinc-100 dark:bg-[#1A1D27] rounded-lg overflow-hidden">
                                    <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                                    <button type="button" onClick={() => setGalleryFiles(files => files.filter((_, i) => i !== idx))} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X size={10} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

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