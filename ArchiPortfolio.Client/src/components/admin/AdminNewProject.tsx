import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Eye,
    Save,
    UploadCloud,
    Image as ImageIcon,
    X,
    Calendar,
    MapPin,
    Maximize2
} from 'lucide-react';

const AdminNewProject: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [visibility, setVisibility] = useState(false);
    const [featured, setFeatured] = useState(true);
    const [client, setClient] = useState('');
    const [location, setLocation] = useState('');
    const [year, setYear] = useState('');
    const [area, setArea] = useState('');

    useEffect(() => {
        if (isEditMode) {
            // Mock fetching data
            setTitle('Neo-Tokyo Spire');
            setDescription('A futuristic residential tower in the heart of Tokyo.');
            setClient('Future Corp');
            setLocation('Tokyo, JP');
            setYear('2024');
            setArea('12,500');
            setVisibility(true);
        }
    }, [isEditMode]);

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-50 dark:bg-[#0B0E14] transition-colors duration-500">
            {/* Header */}
            <header className="px-8 py-5 border-b border-zinc-200 dark:border-[#1F2430] bg-white dark:bg-[#11141D] flex items-center justify-between">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-slate-500 mb-1">
                        <span className="cursor-pointer hover:text-zinc-800 dark:hover:text-slate-300" onClick={() => navigate('/admin/dashboard')}>Dashboard</span>
                        <span>/</span>
                        <span className="cursor-pointer hover:text-zinc-800 dark:hover:text-slate-300" onClick={() => navigate('/admin/projects')}>Projects</span>
                        <span>/</span>
                        <span className="text-zinc-800 dark:text-slate-200">{isEditMode ? 'Edit' : 'New'}</span>
                    </div>
                    <h1 className="text-xl font-bold text-zinc-900 dark:text-white">{isEditMode ? 'Edit Project' : 'Add New Project'}</h1>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/admin/projects')}
                        className="px-4 py-2 border border-zinc-200 dark:border-[#2A303C] rounded-lg text-sm font-medium text-zinc-600 dark:text-slate-400 hover:bg-zinc-50 dark:hover:bg-[#1F2430] transition-colors"
                    >
                        Cancel
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 dark:bg-[#1F2430] dark:hover:bg-[#2A303C] text-white rounded-lg text-sm font-medium transition-colors border border-transparent dark:border-[#2A303C]">
                        <Eye size={16} />
                        <span>Live Preview</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-zinc-200 hover:bg-zinc-300 dark:bg-[#1F2430] dark:hover:bg-[#2A303C] text-zinc-900 dark:text-white rounded-lg text-sm font-medium transition-colors border border-transparent dark:border-[#2A303C]">
                        <Save size={16} />
                        <span>Save Draft</span>
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-600/20">
                        <UploadCloud size={16} />
                        <span>{isEditMode ? 'Save Changes' : 'Publish'}</span>
                    </button>
                </div>
            </header>

            {/* Main Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column (Content) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Title Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 dark:text-slate-500 uppercase tracking-wider">Project Title</label>
                            <input
                                type="text"
                                placeholder="Untitled Project"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-transparent text-4xl font-bold text-zinc-900 dark:text-white placeholder-zinc-300 dark:placeholder-slate-700 outline-none border-none p-0 focus:ring-0"
                            />
                            <div className="h-px w-full bg-zinc-200 dark:bg-[#1F2430]"></div>
                        </div>

                        {/* Description Editor */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 dark:text-slate-500 uppercase tracking-wider">Description</label>
                            <div className="w-full bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-xl overflow-hidden focus-within:border-zinc-300 dark:focus-within:border-[#2A303C] transition-colors">
                                <div className="flex items-center gap-1 p-2 border-b border-zinc-200 dark:border-[#1F2430] bg-zinc-50 dark:bg-[#1A1D27]">
                                    {['B', 'I', 'U'].map((tool) => (
                                        <button key={tool} className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-[#1F2430] text-zinc-600 dark:text-slate-400 text-xs font-serif font-bold w-8">
                                            {tool}
                                        </button>
                                    ))}
                                    <div className="w-px h-4 bg-zinc-300 dark:bg-[#2A303C] mx-1"></div>
                                    <button className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-[#1F2430] text-zinc-600 dark:text-slate-400">
                                        <ImageIcon size={14} />
                                    </button>
                                </div>
                                <textarea
                                    placeholder="Describe the architectural concept, materials used, and design challenges..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full h-64 p-4 bg-transparent text-zinc-900 dark:text-slate-200 placeholder-zinc-400 dark:placeholder-slate-600 resize-none outline-none text-sm leading-relaxed"
                                />
                            </div>
                        </div>

                        {/* Media Upload */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-zinc-500 dark:text-slate-500 uppercase tracking-wider">Project Media</label>
                                <span className="text-[10px] text-zinc-400 dark:text-slate-600">Supported: JPG, PNG, WEBP (Max 50MB)</span>
                            </div>

                            <div className="border-2 border-dashed border-zinc-300 dark:border-[#1F2430] rounded-xl bg-zinc-50 dark:bg-[#11141D] hover:bg-zinc-100 dark:hover:bg-[#151922] transition-colors cursor-pointer p-12 flex flex-col items-center justify-center text-center group">
                                <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-[#1F2430] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <UploadCloud size={32} className="text-zinc-500 dark:text-slate-400" />
                                </div>
                                <p className="text-zinc-900 dark:text-white font-medium mb-1">Click to upload or drag and drop</p>
                                <p className="text-zinc-500 dark:text-slate-500 text-xs">High-resolution images, floor plans, or renderings</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="aspect-square rounded-lg bg-zinc-200 dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] relative group overflow-hidden">
                                        <img
                                            src={`https://source.unsplash.com/random/400x400?architecture,modern&sig=${i}`}
                                            alt="Preview"
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button className="p-1.5 bg-white/20 hover:bg-white/40 rounded-lg text-white backdrop-blur-sm transition-colors">
                                                <Maximize2 size={16} />
                                            </button>
                                            <button className="p-1.5 bg-red-500/20 hover:bg-red-500/60 rounded-lg text-red-200 hover:text-white backdrop-blur-sm transition-colors">
                                                <X size={16} />
                                            </button>
                                        </div>
                                        {i === 1 && (
                                            <div className="absolute bottom-2 left-2 px-2 py-1 bg-blue-600 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                                                Cover
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="aspect-square rounded-lg bg-zinc-100 dark:bg-[#11141D] border border-zinc-200 dark:border-[#1F2430] flex flex-col items-center justify-center text-zinc-400 dark:text-slate-600 gap-2 cursor-pointer hover:bg-zinc-200 dark:hover:bg-[#151922] transition-colors">
                                    <PlusIcon size={24} />
                                    <span className="text-xs">Add file</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Settings) */}
                    <div className="space-y-6">

                        {/* Publishing Card */}
                        <div className="bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-xl p-6 space-y-6">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div>
                                <h3 className="font-semibold text-zinc-900 dark:text-white">Publishing</h3>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-zinc-900 dark:text-slate-200">Visibility</p>
                                    <p className="text-xs text-zinc-500 dark:text-slate-500">Make project public</p>
                                </div>
                                <button
                                    onClick={() => setVisibility(!visibility)}
                                    className={`w-10 h-5 rounded-full relative transition-colors ${visibility ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-[#2A303C]'}`}
                                >
                                    <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${visibility ? 'left-6' : 'left-0.5'}`}></div>
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-zinc-900 dark:text-slate-200">Featured Project</p>
                                    <p className="text-xs text-zinc-500 dark:text-slate-500">Pin to homepage</p>
                                </div>
                                <button
                                    onClick={() => setFeatured(!featured)}
                                    className={`w-10 h-5 rounded-full relative transition-colors ${featured ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-[#2A303C]'}`}
                                >
                                    <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${featured ? 'left-6' : 'left-0.5'}`}></div>
                                </button>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-zinc-500 dark:text-slate-500 mb-1 block">Publish Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-slate-600" size={14} />
                                    <input
                                        type="date"
                                        className="w-full bg-zinc-50 dark:bg-[#11141D] border border-zinc-200 dark:border-[#1F2430] rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-900 dark:text-slate-200 focus:outline-none focus:border-zinc-300 dark:focus:border-[#2A303C]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Project Details Card */}
                        <div className="bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-xl p-6 space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-1.5 h-4 bg-orange-500 rounded-full"></div>
                                <h3 className="font-semibold text-zinc-900 dark:text-white">Project Details</h3>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs text-zinc-500 dark:text-slate-500">Client</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Acme Corp"
                                    value={client}
                                    onChange={(e) => setClient(e.target.value)}
                                    className="w-full bg-zinc-50 dark:bg-[#11141D] border border-zinc-200 dark:border-[#1F2430] rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-slate-200 focus:outline-none focus:border-zinc-300 dark:focus:border-[#2A303C] placeholder-zinc-400 dark:placeholder-slate-600"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs text-zinc-500 dark:text-slate-500">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-slate-600" size={14} />
                                    <input
                                        type="text"
                                        placeholder="e.g. Kyoto, Japan"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full bg-zinc-50 dark:bg-[#11141D] border border-zinc-200 dark:border-[#1F2430] rounded-lg pl-9 pr-3 py-2 text-sm text-zinc-900 dark:text-slate-200 focus:outline-none focus:border-zinc-300 dark:focus:border-[#2A303C] placeholder-zinc-400 dark:placeholder-slate-600"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs text-zinc-500 dark:text-slate-500">Completion Year</label>
                                <input
                                    type="text"
                                    placeholder="2024"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    className="w-full bg-zinc-50 dark:bg-[#11141D] border border-zinc-200 dark:border-[#1F2430] rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-slate-200 focus:outline-none focus:border-zinc-300 dark:focus:border-[#2A303C] placeholder-zinc-400 dark:placeholder-slate-600"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs text-zinc-500 dark:text-slate-500">Area (sq ft)</label>
                                <input
                                    type="text"
                                    placeholder="5,400"
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                    className="w-full bg-zinc-50 dark:bg-[#11141D] border border-zinc-200 dark:border-[#1F2430] rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-slate-200 focus:outline-none focus:border-zinc-300 dark:focus:border-[#2A303C] placeholder-zinc-400 dark:placeholder-slate-600"
                                />
                            </div>
                        </div>

                        {/* Categories Card */}
                        <div className="bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-xl p-6 space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-1.5 h-4 bg-purple-500 rounded-full"></div>
                                <h3 className="font-semibold text-zinc-900 dark:text-white">Categories</h3>
                            </div>

                            <div className="space-y-2">
                                <select className="w-full bg-zinc-50 dark:bg-[#11141D] border border-zinc-200 dark:border-[#1F2430] rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-slate-200 focus:outline-none focus:border-zinc-300 dark:focus:border-[#2A303C]">
                                    <option>Select primary category</option>
                                    <option>Residential</option>
                                    <option>Commercial</option>
                                    <option>Public Spaces</option>
                                </select>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded text-xs font-medium border border-blue-200 dark:border-blue-900/50">
                                    Residential
                                    <X size={12} className="cursor-pointer hover:text-blue-800 dark:hover:text-blue-200" />
                                </span>
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-100 dark:bg-[#1F2430] text-zinc-600 dark:text-slate-400 rounded text-xs font-medium border border-zinc-200 dark:border-[#2A303C]">
                                    Sustainable
                                    <X size={12} className="cursor-pointer hover:text-zinc-900 dark:hover:text-slate-200" />
                                </span>
                                <button className="inline-flex items-center gap-1 px-2 py-1 bg-transparent border border-dashed border-zinc-300 dark:border-[#2A303C] text-zinc-500 dark:text-slate-500 rounded text-xs hover:border-zinc-400 dark:hover:border-slate-400 transition-colors">
                                    <PlusIcon size={12} />
                                    Add Tag
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Icon
const PlusIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

export default AdminNewProject;
