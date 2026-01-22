import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Plus,
    Home,
    Building2,
    Armchair,
    Trees,
    Map,
    Store,
    Warehouse,
    Landmark,
    DraftingCompass,
    Hotel,
    Castle,
    UploadCloud,
    Check
} from 'lucide-react';

const AdminNewCategory: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedIcon, setSelectedIcon] = useState<number | null>(0); // Default to first

    useEffect(() => {
        if (isEditMode) {
            // Mock fetching data for edit
            setName('Residential');
            setDescription('Living Spaces');
            setSelectedIcon(0);
        }
    }, [isEditMode]);

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

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto bg-zinc-50 dark:bg-[#0B0E14] transition-colors duration-500">
            {/* Header/Breadcrumb */}
            <div className="px-8 py-5 border-b border-zinc-200 dark:border-[#1F2430] bg-white dark:bg-[#11141D] flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-slate-500">
                    <span className="cursor-pointer hover:text-zinc-800 dark:hover:text-slate-300" onClick={() => navigate('/admin/dashboard')}>Dashboard</span>
                    <span>/</span>
                    <span className="cursor-pointer hover:text-zinc-800 dark:hover:text-slate-300" onClick={() => navigate('/admin/categories')}>Categories</span>
                    <span>/</span>
                    <span className="text-zinc-800 dark:text-slate-200">{isEditMode ? 'Edit Category' : 'New Category'}</span>
                </div>

                <div className="flex items-center gap-3">
                </div>
            </div>

            {/* Main Content - Centered */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-2xl space-y-12">

                    {/* Hero Icon */}
                    <div className="flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Plus size={32} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{isEditMode ? 'Edit Category' : 'Create New Category'}</h1>
                            <p className="text-zinc-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
                                {isEditMode
                                    ? 'Update your category details. Changes will be reflected across your portfolio.'
                                    : 'Define a new section for your architectural portfolio. Organize your projects with a dedicated icon and description.'}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Name Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 dark:text-slate-500 uppercase tracking-wider">Category Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Sustainable Living"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent text-2xl font-medium text-zinc-900 dark:text-white placeholder-zinc-300 dark:placeholder-zinc-700 outline-none border-b border-zinc-200 dark:border-[#1F2430] pb-2 focus:border-blue-500 transition-colors"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 dark:text-slate-500 uppercase tracking-wider">Description</label>
                            <textarea
                                placeholder="Describe the architectural focus and scope of this category..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full h-32 p-4 bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-xl text-sm text-zinc-900 dark:text-slate-200 placeholder-zinc-400 dark:placeholder-zinc-600 resize-none outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        {/* Icon Selection */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 dark:text-slate-500 uppercase tracking-wider">Select Icon</label>
                            <div className="grid grid-cols-6 gap-3">
                                {icons.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setSelectedIcon(item.id)}
                                        className={`aspect-square rounded-xl flex items-center justify-center transition-all ${selectedIcon === item.id
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                                            : 'bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] text-zinc-500 dark:text-slate-400 hover:border-zinc-300 dark:hover:border-zinc-600'
                                            }`}
                                    >
                                        <item.component size={20} strokeWidth={selectedIcon === item.id ? 2 : 1.5} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Cover Image */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 dark:text-slate-500 uppercase tracking-wider">Cover Image</label>
                            <div className="border-2 border-dashed border-zinc-300 dark:border-[#2A303C] rounded-xl bg-zinc-50 dark:bg-[#151922]/50 hover:bg-zinc-100 dark:hover:bg-[#151922] transition-colors cursor-pointer p-12 flex flex-col items-center justify-center text-center h-48 group">
                                <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-[#1F2430] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <UploadCloud size={20} className="text-zinc-500 dark:text-slate-400" />
                                </div>
                                <p className="text-zinc-900 dark:text-white text-sm font-medium mb-1">Click to upload cover image</p>
                                <p className="text-zinc-500 dark:text-slate-500 text-[10px]">SVG, PNG, JPG (max. 5MB)</p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-zinc-200 dark:border-[#1F2430] flex items-center justify-end gap-3">
                            <button
                                onClick={() => navigate('/admin/categories')}
                                className="px-6 py-2.5 text-sm font-medium text-zinc-600 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-600/20">
                                <Check size={16} />
                                <span>{isEditMode ? 'Save Changes' : 'Create Category'}</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminNewCategory;
