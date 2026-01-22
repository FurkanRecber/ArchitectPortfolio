import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Plus,
    MapPin,
    PenLine,
    Trash2
} from 'lucide-react';

interface Project {
    id: string;
    title: string;
    category: string;
    location: string;
    imageUrl: string;
    status: 'Live' | 'Draft' | 'Archived' | 'Review';
    updatedAt: string;
    views: string;
    team: string[];
}

const AdminProjects: React.FC = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All Projects');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data based on the design
    const projects: Project[] = [
        {
            id: 'TOK-001',
            title: 'Neo-Tokyo Spire',
            category: 'Residential',
            location: 'Tokyo, JP',
            imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3d2b87e9?q=80&w=800&auto=format&fit=crop', // Skyscraper/Modern
            status: 'Live',
            updatedAt: '2h ago',
            views: '1.2k',
            team: ['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2']
        },
        {
            id: 'OSL-094',
            title: 'Oslo Opera Ext.',
            category: 'Public Spaces',
            location: 'Oslo, NO',
            imageUrl: 'https://images.unsplash.com/photo-1517581177697-a06a18919e29?q=80&w=800&auto=format&fit=crop', // Modern building
            status: 'Draft',
            updatedAt: '1d ago',
            views: '850',
            team: ['https://i.pravatar.cc/150?u=3']
        },
        {
            id: 'DXB-221',
            title: 'Desert Pavilion',
            category: 'Concepts',
            location: 'Dubai, UAE',
            imageUrl: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=800&auto=format&fit=crop', // Desert architecture
            status: 'Live',
            updatedAt: '3d ago',
            views: '2.4k',
            team: ['https://i.pravatar.cc/150?u=4', 'https://i.pravatar.cc/150?u=5', 'https://i.pravatar.cc/150?u=6']
        },
        {
            id: 'NYC-108',
            title: 'Vertical Forest',
            category: 'Residential',
            location: 'New York, USA',
            imageUrl: 'https://images.unsplash.com/photo-1520699049698-38b705305629?q=80&w=800&auto=format&fit=crop', // Green building
            status: 'Live',
            updatedAt: '1w ago',
            views: '3.1k',
            team: ['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=7']
        },
        {
            id: 'BER-012',
            title: 'Berlin Museum',
            category: 'Public Spaces',
            location: 'Berlin, DE',
            imageUrl: '', // No image (Archived)
            status: 'Archived',
            updatedAt: '2m ago',
            views: '0',
            team: ['https://i.pravatar.cc/150?u=8']
        },
        {
            id: 'SHG-882',
            title: 'Sea Bridge',
            category: 'Infrastructure',
            location: 'Shanghai, CN',
            imageUrl: 'https://images.unsplash.com/photo-1510526084059-e91b5c2a13ba?q=80&w=800&auto=format&fit=crop', // Bridge
            status: 'Review',
            updatedAt: '5h ago',
            views: '156',
            team: ['https://i.pravatar.cc/150?u=2', 'https://i.pravatar.cc/150?u=5']
        }
    ];

    const filters = ['All Projects', 'Residential', 'Commercial', 'Public Spaces', 'Concepts'];

    const filteredProjects = projects.filter(project => {
        const matchesFilter = filter === 'All Projects' || project.category === filter;
        const matchesSearch =
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.location.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Live': return 'bg-emerald-500 text-white';
            case 'Draft': return 'bg-amber-500 text-white';
            case 'Archived': return 'bg-zinc-500 text-white';
            case 'Review': return 'bg-blue-500 text-white';
            default: return 'bg-zinc-500 text-white';
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-50 dark:bg-[#0B0E14] transition-colors duration-500">
            {/* Header */}
            <div className="px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">Projects</h1>
                        <p className="text-zinc-500 dark:text-slate-400 text-sm">Manage your architectural portfolio. Update status, modify renders, and organize client presentations.</p>
                    </div>
                    <button
                        onClick={() => navigate('/admin/projects/new')}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
                    >
                        <Plus size={18} />
                        <span>Create Project</span>
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {filters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${filter === f
                                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                                    : 'bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300 dark:bg-[#151922] dark:text-slate-400 dark:border-[#2A303C] dark:hover:border-slate-600'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-slate-500" size={14} />
                        <input
                            type="text"
                            placeholder="Search projects, ID, or location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#2A303C] rounded-lg pl-9 pr-4 py-2 text-xs text-zinc-900 dark:text-slate-200 focus:outline-none focus:border-zinc-400 dark:focus:border-slate-500 w-full md:w-64 transition-colors"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <span className="text-[10px] text-zinc-400 dark:text-slate-600 bg-zinc-100 dark:bg-[#1F2430] px-1.5 py-0.5 rounded border border-zinc-200 dark:border-[#2A303C]">⌘K</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid Content */}
            <div className="flex-1 overflow-y-auto px-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="group relative bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-xl overflow-hidden hover:border-zinc-300 dark:hover:border-[#2A303C] transition-colors flex flex-col h-[320px]">
                            {/* Image / Status */}
                            <div className="relative h-48 bg-zinc-100 dark:bg-[#1A1D27] overflow-hidden">
                                {project.imageUrl ? (
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-300 dark:text-slate-600">
                                        <MapPin size={48} strokeWidth={1} />
                                    </div>
                                )}

                                <div className="absolute top-4 left-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(project.status)}`}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                        {project.status}
                                    </span>
                                </div>

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/admin/projects/edit/${project.id}`);
                                        }}
                                        className="p-2 bg-white/90 dark:bg-black/50 backdrop-blur-sm rounded-full text-zinc-900 dark:text-white hover:bg-white dark:hover:bg-black/70 transition-colors"
                                    >
                                        <PenLine size={16} />
                                    </button>
                                    <button className="p-2 bg-white/90 dark:bg-black/50 backdrop-blur-sm rounded-full text-red-500 hover:bg-white dark:hover:bg-black/70 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-4 flex flex-col justify-between flex-1">
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="text-base font-semibold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                        <span className="text-[10px] font-mono text-zinc-400 dark:text-slate-600 bg-zinc-100 dark:bg-[#1F2430] px-1.5 py-0.5 rounded border border-zinc-200 dark:border-[#2A303C]">{project.id}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-slate-400">
                                        <MapPin size={12} />
                                        <span>{project.location}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-[#1F2430]">
                                    <div className="flex -space-x-2">
                                        {project.team.map((avatar, i) => (
                                            <img
                                                key={i}
                                                src={avatar}
                                                alt="Team member"
                                                className="w-6 h-6 rounded-full border-2 border-white dark:border-[#151922]"
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[10px] text-zinc-400 dark:text-slate-500 font-medium tracking-wide">
                                        UPDATED {project.updatedAt.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
};

export default AdminProjects;
