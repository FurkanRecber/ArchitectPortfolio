import React from 'react';
import {
    Search,
    Filter,
    Plus,
    Home,
    Building2,
    Armchair,
    Trees,
    Map,
    ChevronLeft,
    ChevronRight,
    PenLine,
    Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminCategories: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [sortBy, setSortBy] = React.useState<'name' | 'count'>('name');

    // Mock Data
    const categories = [
        {
            id: 1,
            title: 'Residential',
            count: 24,
            icon: Home,
            description: 'Living Spaces'
        },
        {
            id: 2,
            title: 'Commercial',
            count: 12,
            icon: Building2,
            description: 'Office & Retail'
        },
        {
            id: 3,
            title: 'Interior Design',
            count: 38,
            icon: Armchair,
            description: 'Decor & Style'
        },
        {
            id: 4,
            title: 'Landscape',
            count: 8,
            icon: Trees,
            description: 'Outdoor & Nature'
        },
        {
            id: 5,
            title: 'Urban Planning',
            count: 5,
            icon: Map,
            description: 'City & Infrastructure'
        }
    ];

    const filteredCategories = categories
        .filter(cat =>
            cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'count') return b.count - a.count;
            return a.title.localeCompare(b.title);
        });


    // Pagination Logic
    const ITEMS_PER_PAGE = 11; // 11 categories + 1 add card = 12 items (3 rows of 4)
    const [currentPage, setCurrentPage] = React.useState(1);

    const totalItems = filteredCategories.length + 1; // +1 for the Add New Category card
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentCategories = filteredCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Check if "Add New" card should be on this page
    // It takes up the slot after the last category.
    // If the slice was full (itemsPerPage), then Add card is on next page.
    // Actually, simpler logic:
    // The index of "Add New" is filteredCategories.length.
    // If this index is within [startIndex, startIndex + ITEMS_PER_PAGE), show it.
    const showAddCard = filteredCategories.length >= startIndex && filteredCategories.length < startIndex + ITEMS_PER_PAGE;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-50 dark:bg-[#0B0E14] transition-colors duration-500">
            {/* Header */}
            <div className="px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">Categories</h1>
                        <p className="text-zinc-500 dark:text-slate-400 text-sm">Manage your portfolio structure. Organize projects into logical groups for better discoverability.</p>
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
                    {currentCategories.map((category) => (
                        <div key={category.id} className="group h-64 bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-xl relative hover:border-zinc-300 dark:hover:border-[#2A303C] transition-colors flex flex-col items-center justify-center text-center cursor-pointer">
                            <div className="absolute top-4 right-4 bg-zinc-100 dark:bg-[#1A1D27] px-2 py-1 rounded-md text-[10px] font-medium text-zinc-500 dark:text-slate-400 border border-zinc-200 dark:border-[#2A303C]">
                                {category.count} Projects
                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-[#1A1D27] flex items-center justify-center mb-4 text-zinc-600 dark:text-slate-400 transition-colors duration-300">
                                <category.icon size={32} strokeWidth={1.5} />
                            </div>

                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1 transition-colors">{category.title}</h3>
                            <p className="text-sm text-zinc-500 dark:text-slate-500">{category.description}</p>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-white/95 dark:bg-[#0B0E14]/90 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-6">
                                <div className="flex flex-col items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/admin/categories/edit/${category.id}`);
                                        }}
                                        className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-[#1F2430] border border-zinc-200 dark:border-[#2A303C] flex items-center justify-center text-zinc-600 dark:text-slate-400 hover:bg-zinc-900 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white hover:border-zinc-900 dark:hover:border-blue-600 transition-colors shadow-lg"
                                    >
                                        <PenLine size={20} />
                                    </button>
                                    <span className="text-xs font-medium text-zinc-600 dark:text-slate-400">Edit</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                                    <button className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-[#1F2430] border border-zinc-200 dark:border-[#2A303C] flex items-center justify-center text-zinc-600 dark:text-slate-400 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white hover:border-red-500 transition-colors shadow-lg">
                                        <Trash2 size={20} />
                                    </button>
                                    <span className="text-xs font-medium text-zinc-600 dark:text-slate-400">Delete</span>
                                </div>
                            </div>
                        </div>
                    ))}

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
