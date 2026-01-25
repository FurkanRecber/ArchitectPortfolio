import React, { useEffect, useState } from 'react';
import {
    Search,
    Filter,
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
    ChevronLeft,
    ChevronRight,
    PenLine,
    Trash2,
    Layers // Varsayılan ikon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { categoryService } from '../../services/categoryService';
import { getImageUrl } from '../../utils/imageUrlHelper';
import type { Category } from '../../types';

const AdminCategories: React.FC = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    // Filtreleme ve Sıralama State'leri
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'count'>('name');

    // İkon Eşleştirme Listesi (AdminNewCategory ile aynı)
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

    // Helper: ID'den İkon Bileşenini Bul
    const getIconComponent = (iconId?: number) => {
        const iconItem = icons.find(i => i.id === iconId);
        return iconItem ? iconItem.component : Layers; // Bulamazsa varsayılan Layers ikonu
    };

    // Verileri Çek
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryService.getAllCategories();
                setCategories(data);
            } catch (error) {
                console.error("Kategoriler yüklenemedi:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Silme İşlemi
    const handleDelete = async (id: number) => {
        if (window.confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) {
            try {
                await categoryService.deleteCategory(id);
                // Başarılıysa listeden çıkar
                setCategories(prev => prev.filter(c => c.id !== id));
            } catch (error: any) {
                console.error("Silme hatası:", error);

                // Backend'den gelen özel mesajı yakala ve göster
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message);
                } else {
                    alert("Silme işlemi başarısız. Lütfen tekrar deneyin.");
                }
            }
        }
    };

    // Filtreleme ve Sıralama Mantığı
    const filteredCategories = categories
        .filter(cat =>
            cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (cat.description && cat.description.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .sort((a, b) => {
            if (sortBy === 'count') return (b.projectCount || 0) - (a.projectCount || 0);
            return a.name.localeCompare(b.name);
        });

    // Sayfalama (Pagination)
    const ITEMS_PER_PAGE = 11; // 11 kategori + 1 "Ekle" kartı = 12 item
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = filteredCategories.length + 1; // +1 "New Category" kartı için
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentCategories = filteredCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // "Ekle" kartının bu sayfada görünüp görünmeyeceğini hesapla
    const showAddCard = filteredCategories.length >= startIndex && filteredCategories.length < startIndex + ITEMS_PER_PAGE;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return <div className="p-8 text-center text-zinc-500">Loading categories...</div>;

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-50 dark:bg-[#0B0E14] transition-colors duration-500">
            {/* Header */}
            <div className="px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">Categories</h1>
                        <p className="text-zinc-500 dark:text-slate-400 text-sm">Manage your portfolio structure. Organize projects into logical groups.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-slate-500" size={16} />
                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#2A303C] rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-900 dark:text-slate-200 focus:outline-none focus:border-zinc-400 dark:focus:border-slate-500 w-full md:w-64 transition-colors"
                            />
                        </div>

                        <button
                            onClick={() => setSortBy(prev => prev === 'name' ? 'count' : 'name')}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#2A303C] rounded-lg text-sm font-medium text-zinc-700 dark:text-slate-300 hover:bg-zinc-50 dark:hover:bg-[#1F2430] transition-colors"
                        >
                            <Filter size={16} />
                            <span>Sort: {sortBy === 'name' ? 'Name' : 'Count'}</span>
                        </button>

                        <button
                            onClick={() => navigate('/admin/categories/new')}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
                        >
                            <Plus size={18} />
                            <span>New Category</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid Content */}
            <div className="flex-1 overflow-y-auto px-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentCategories.map((category) => {
                        const Icon = getIconComponent(category.iconId);

                        // Debug logging to help identify data issues
                        console.log(`Category: ${category.name}, Cover: ${category.coverImageUrl}, Count: ${category.projectCount}`);

                        return (
                            <div key={category.id} className="group h-64 bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-xl relative hover:border-zinc-300 dark:hover:border-[#2A303C] transition-colors flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden">

                                {/* Background Image with Overlay */}
                                {category.coverImageUrl && (
                                    <>
                                        <img
                                            src={getImageUrl(category.coverImageUrl)}
                                            alt={category.name}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                                    </>
                                )}

                                <div className="absolute top-4 right-4 bg-white/90 dark:bg-[#1A1D27]/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-zinc-900 dark:text-white border border-white/20 shadow-sm z-10">
                                    {category.projectCount ?? 0} Projects
                                </div>

                                <div className="relative z-10 flex flex-col items-center">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-colors duration-300 ${category.coverImageUrl ? 'bg-white/20 text-white backdrop-blur-md border border-white/30' : 'bg-zinc-100 dark:bg-[#1A1D27] text-zinc-600 dark:text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/10 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                                        <Icon size={28} strokeWidth={1.5} />
                                    </div>

                                    <h3 className={`text-lg font-bold mb-1 transition-colors ${category.coverImageUrl ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>{category.name}</h3>
                                    <p className={`text-sm px-4 line-clamp-2 ${category.coverImageUrl ? 'text-zinc-200' : 'text-zinc-500 dark:text-slate-500'}`}>{category.description}</p>
                                </div>

                                {/* Hover Overlay (Edit/Delete) */}
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-6 z-20">
                                    <div className="flex flex-col items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/admin/categories/edit/${category.id}`);
                                            }}
                                            className="w-12 h-12 rounded-full bg-white text-zinc-900 hover:bg-zinc-200 transition-colors shadow-lg flex items-center justify-center"
                                        >
                                            <PenLine size={20} />
                                        </button>
                                        <span className="text-xs font-bold text-white">Edit</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(category.id);
                                            }}
                                            className="w-12 h-12 rounded-full bg-white text-red-600 hover:bg-red-50 transition-colors shadow-lg flex items-center justify-center"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                        <span className="text-xs font-bold text-white">Delete</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Add New Category Card */}
                    {showAddCard && (
                        <div
                            onClick={() => navigate('/admin/categories/new')}
                            className="h-64 border-2 border-dashed border-zinc-300 dark:border-[#2A303C] rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-zinc-50 dark:hover:bg-[#1A1D27]/50 hover:border-zinc-400 dark:hover:border-slate-600 transition-all group"
                        >
                            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-[#1A1D27] flex items-center justify-center mb-4 text-zinc-400 dark:text-slate-600 group-hover:scale-110 transition-transform">
                                <Plus size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">Add New Category</h3>
                            <p className="text-sm text-zinc-500 dark:text-slate-500 px-8">Create a new portfolio group to organize your work.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center mt-12 gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="w-10 h-10 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-[#2A303C] text-zinc-500 dark:text-slate-500 hover:bg-zinc-100 dark:hover:bg-[#1F2430] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${currentPage === page
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                    : 'border border-zinc-200 dark:border-[#2A303C] text-zinc-500 dark:text-slate-500 hover:bg-zinc-100 dark:hover:bg-[#1F2430]'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="w-10 h-10 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-[#2A303C] text-zinc-500 dark:text-slate-500 hover:bg-zinc-100 dark:hover:bg-[#1F2430] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCategories;