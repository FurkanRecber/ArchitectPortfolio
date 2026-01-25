import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Plus, Home, Building2, Armchair, Trees, Map, Store,
    Warehouse, Landmark, DraftingCompass, Hotel, Castle,
    UploadCloud, Check
} from 'lucide-react';
import { categoryService } from '../../services/categoryService';
import { getImageUrl } from '../../utils/imageUrlHelper';

const AdminNewCategory: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    // STATE
    const [name, setName] = useState('');
    const [nameTr, setNameTr] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionTr, setDescriptionTr] = useState('');
    const [selectedIcon, setSelectedIcon] = useState<number>(0);

    // Resim İşlemleri
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);

    // Mock İkon Listesi (Frontend'de sabit, Backend'de sadece ID tutulur)
    const icons = [
        { id: 0, component: Home },
        { id: 1, component: Building2 },
        { id: 2, component: Armchair },
        { id: 3, component: Trees },
        { id: 4, component: Map },
        { id: 5, component: Store },
        { id: 6, component: Warehouse },
        { id: 7, component: Landmark },
        { id: 8, component: DraftingCompass },
        { id: 9, component: Hotel },
        { id: 10, component: Castle },
    ];

    useEffect(() => {
        if (isEditMode && id) {
            const loadData = async () => {
                try {
                    const data: any = await categoryService.getCategoryById(Number(id));
                    setName(data.name || '');
                    setNameTr(data.nameTr || '');
                    setDescription(data.description || '');
                    setDescriptionTr(data.descriptionTr || '');
                    setSelectedIcon(data.iconId || 0);

                    if (data.coverImageUrl) {
                        setPreviewUrl(getImageUrl(data.coverImageUrl));
                    }
                } catch (err) {
                    console.error("Yükleme hatası:", err);
                }
            };
            loadData();
        }
    }, [isEditMode, id]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setCoverImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!name) {
            alert("Please enter a category name.");
            return;
        }
        setLoading(true);

        try {
            const formData = new FormData();
            if (isEditMode && id) formData.append('Id', id);

            // Metinler
            formData.append('Name', name);
            formData.append('NameTr', nameTr);
            formData.append('Description', description);
            formData.append('DescriptionTr', descriptionTr);
            formData.append('IconId', selectedIcon.toString());

            // Resim
            if (coverImage) {
                formData.append('CoverImage', coverImage);
            }

            if (isEditMode) {
                await categoryService.updateCategory(formData);
            } else {
                await categoryService.createCategory(formData);
            }
            navigate('/admin/categories');

        } catch (error) {
            console.error("Hata:", error);
            alert("İşlem başarısız.");
        } finally {
            setLoading(false);
        }
    };

    const SelectedIconComponent = icons.find(i => i.id === selectedIcon)?.component || Plus;

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto bg-zinc-50 dark:bg-[#0B0E14] transition-colors duration-500">
            {/* Header */}
            <div className="px-8 py-5 border-b border-zinc-200 dark:border-[#1F2430] bg-white dark:bg-[#11141D] flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-slate-500">
                    <span className="cursor-pointer hover:text-black" onClick={() => navigate('/admin/categories')}>Categories</span>
                    <span>/</span>
                    <span className="text-zinc-800 dark:text-white">{isEditMode ? 'Edit' : 'New'}</span>
                </div>
            </div>

            <div className="flex-1 p-8 flex justify-center">
                <div className="w-full max-w-4xl space-y-8">

                    {/* Hero Section */}
                    <div className="flex flex-col items-center text-center space-y-4 mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <SelectedIconComponent size={32} color="white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{isEditMode ? 'Edit Category' : 'Create New Category'}</h1>
                            <p className="text-zinc-500 dark:text-slate-400 mt-2">Manage portfolio structure and icons.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* LEFT COLUMN: English & Details */}
                        <div className="space-y-6 bg-white dark:bg-[#151922] p-6 rounded-2xl border border-zinc-200 dark:border-[#1F2430]">
                            <h3 className="font-bold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-[#1F2430] pb-3 mb-4 flex items-center gap-2">
                                <img src="https://flagcdn.com/gb.svg" className="w-5 rounded" alt="EN" />
                                English & General
                            </h3>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase">Name (EN)</label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Residential"
                                    className="w-full p-3 bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] rounded-lg outline-none focus:border-blue-500 dark:text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase">Description (EN)</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    placeholder="Short description for this category..."
                                    className="w-full p-3 bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] rounded-lg outline-none focus:border-blue-500 dark:text-white resize-none"
                                />
                            </div>

                            {/* Icon Selection */}
                            <div className="space-y-2 pt-4">
                                <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Select Icon</label>
                                <div className="grid grid-cols-6 gap-2">
                                    {icons.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setSelectedIcon(item.id)}
                                            className={`aspect-square rounded-xl flex items-center justify-center transition-all ${selectedIcon === item.id
                                                ? 'bg-blue-600 text-white shadow-lg scale-105'
                                                : 'bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] text-zinc-400 hover:border-zinc-400'
                                                }`}
                                        >
                                            <item.component size={20} strokeWidth={selectedIcon === item.id ? 2 : 1.5} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Turkish & Image */}
                        <div className="space-y-6 bg-white dark:bg-[#151922] p-6 rounded-2xl border border-zinc-200 dark:border-[#1F2430]">
                            <h3 className="font-bold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-[#1F2430] pb-3 mb-4 flex items-center gap-2">
                                <img src="https://flagcdn.com/tr.svg" className="w-5 rounded" alt="TR" />
                                Türkçe & Media
                            </h3>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase">Kategori Adı (TR)</label>
                                <input
                                    value={nameTr}
                                    onChange={(e) => setNameTr(e.target.value)}
                                    placeholder="Örn. Konut"
                                    className="w-full p-3 bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] rounded-lg outline-none focus:border-blue-500 dark:text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase">Açıklama (TR)</label>
                                <textarea
                                    value={descriptionTr}
                                    onChange={(e) => setDescriptionTr(e.target.value)}
                                    rows={4}
                                    placeholder="Bu kategori için kısa açıklama..."
                                    className="w-full p-3 bg-zinc-50 dark:bg-[#1A1D27] border border-zinc-200 dark:border-[#2A303C] rounded-lg outline-none focus:border-blue-500 dark:text-white resize-none"
                                />
                            </div>

                            {/* Cover Image */}
                            <div className="space-y-2 pt-4">
                                <label className="text-xs font-bold text-zinc-500 uppercase">Cover Image</label>
                                <div className="border-2 border-dashed border-zinc-300 dark:border-[#2A303C] rounded-xl bg-zinc-50 dark:bg-[#1A1D27]/50 hover:bg-zinc-100 transition-colors relative h-40 flex flex-col items-center justify-center text-center overflow-hidden group">
                                    {previewUrl ? (
                                        <>
                                            <img src={previewUrl} alt="Cover" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <p className="text-white text-xs font-bold">Click to Change</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <UploadCloud size={24} className="text-zinc-400 mb-2" />
                                            <p className="text-zinc-500 text-xs">Upload Image</p>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-end gap-3 pt-6 border-t border-zinc-200 dark:border-[#1F2430]">
                        <button
                            onClick={() => navigate('/admin/categories')}
                            className="px-6 py-3 text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex items-center gap-2 px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl text-sm font-bold shadow-lg hover:opacity-90 disabled:opacity-50 transition-all"
                        >
                            {loading ? 'Saving...' : 'Save Category'}
                            <Check size={18} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminNewCategory;