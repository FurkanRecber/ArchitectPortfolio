import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, FolderOpen, Globe, MessageSquare,
    Plus, Eye, Folder, LogOut, PenLine, Trash2
} from 'lucide-react';
import { Moon, Sun } from 'lucide-react';
import vivereLogo from '../assets/vivere.png';
import vivereBlackLogo from '../assets/vivere_black.png';
import { getImageUrl } from '../utils/imageUrlHelper';

// ... (other imports)

// ...


import AdminProjects from '../components/admin/AdminProjects';
import AdminNewProject from '../components/admin/AdminNewProject';
import AdminCategories from '../components/admin/AdminCategories';
import AdminNewCategory from '../components/admin/AdminNewCategory';
import AdminSiteSettings from '../components/admin/AdminSiteSettings';
import AdminMessages from '../components/admin/AdminMessages';
import AdminReply from '../components/admin/AdminReply';

// Servisler
import { authService } from '../services/authService';
import { projectService } from '../services/projectService';
import { contactService } from '../services/contactService';
import { categoryService } from '../services/categoryService';
import type { Project } from '../types';

interface AdminDashboardProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ darkMode, toggleDarkMode }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // UI State'leri
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Veri State'leri (Dashboard Özeti İçin)
    const [dashboardProjects, setDashboardProjects] = useState<Project[]>([]);
    const [messagesCount, setMessagesCount] = useState(0);
    const [categoriesCount, setCategoriesCount] = useState(0);
    const [, setLoading] = useState(true); // Loading used in fetchStats logic but not in UI directly? Should check usage.
    // Actually error says 'loading' is unused. 'setLoading' is used.
    // So let's keep setLoading but ignore loading: const [, setLoading] = useState(true);

    // 1. Güvenlik Kontrolü (Token yoksa Login'e at)
    useEffect(() => {
        if (!authService.isAuthenticated()) {
            navigate('/admin/login');
        }
    }, [navigate]);

    // 2. Tab Yönetimi
    useEffect(() => {
        const path = location.pathname;
        if (path === '/admin/projects') setActiveTab('projects');
        else if (path === '/admin/projects/new') setActiveTab('projects-new');
        else if (path.startsWith('/admin/projects/edit/') || path.startsWith('/admin/projects/view/')) setActiveTab('projects-edit');
        else if (path === '/admin/categories') setActiveTab('categories');
        else if (path === '/admin/categories/new' || path.startsWith('/admin/categories/edit/')) setActiveTab('categories-edit');
        else if (path === '/admin/site-settings') setActiveTab('site-settings');
        else if (path === '/admin/messages') setActiveTab('messages');
        else if (path.startsWith('/admin/messages/reply/')) setActiveTab('messages-reply');
        else setActiveTab('dashboard');
    }, [location.pathname]);

    // 3. Veri Çekme (Dashboard İstatistikleri)
    useEffect(() => {
        if (activeTab === 'dashboard') {
            const fetchStats = async () => {
                try {
                    setLoading(true);
                    const [projectsData, messagesData, categoriesData] = await Promise.all([
                        projectService.getAllProjects(),
                        contactService.getAllMessages(),
                        categoryService.getAllCategories()
                    ]);
                    // Son 5 projeyi al
                    setDashboardProjects(projectsData.slice(0, 5));
                    // Okunmamış mesaj sayısı
                    setMessagesCount(messagesData.filter((m: any) => !m.isRead).length);
                    // Kategori sayısı
                    setCategoriesCount(categoriesData.length);
                } catch (error) {
                    console.error("Dashboard verileri yüklenemedi:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchStats();
        }
    }, [activeTab]);

    const handleLogout = () => {
        authService.logout();
    };

    const handleNavigation = (tab: string) => {
        const routes: Record<string, string> = {
            'dashboard': '/admin/dashboard',
            'projects': '/admin/projects',
            'categories': '/admin/categories',
            'site-settings': '/admin/site-settings',
            'messages': '/admin/messages'
        };
        navigate(routes[tab] || '/admin/dashboard');
        setActiveTab(tab);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await projectService.deleteProject(id);
                // Listeyi güncelle
                setDashboardProjects(prev => prev.filter(p => p.id !== id));
            } catch (error) {
                console.error("Proje silinirken hata:", error);
                alert("Failed to delete project.");
            }
        }
    };

    // İstatistik Kartları Verisi
    const stats = [
        { title: 'Total Projects', value: dashboardProjects.length.toString(), change: 'Live', changeText: 'on website', changeColor: 'text-green-500', icon: FolderOpen, iconColor: 'text-blue-500' },
        { title: 'Total Messages', value: messagesCount.toString(), change: 'Inbox', changeText: 'received', changeColor: 'text-zinc-500', icon: MessageSquare, iconColor: 'text-orange-500' },
        { title: 'Total Categories', value: categoriesCount.toString(), change: 'Active', changeText: 'in system', changeColor: 'text-purple-500', icon: Folder, iconColor: 'text-purple-500' },
    ];

    return (
        <div className="flex h-screen bg-zinc-50 dark:bg-[#0B0E14] text-zinc-900 dark:text-slate-100 font-sans selection:bg-blue-500/30 transition-colors duration-500">

            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-200 dark:border-[#1F2430] bg-white dark:bg-[#11141D] flex flex-col transition-colors duration-500">
                <div onClick={() => handleNavigation('dashboard')} className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-[#1F2430] gap-3 cursor-pointer hover:bg-zinc-50 dark:hover:bg-[#1A1D27] transition-colors">
                    <img src={darkMode ? vivereLogo : vivereBlackLogo} alt="Admin" className="h-8 w-auto object-contain" />
                    <div className="flex flex-col">
                        <span className="font-semibold tracking-wide text-sm text-zinc-900 dark:text-slate-100">Vivere Admin</span>
                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-slate-500">Panel v2.0</span>
                    </div>
                </div>

                <div className="flex-1 py-6 px-4 space-y-1">
                    <p className="px-4 text-xs font-medium text-zinc-500 dark:text-slate-500 uppercase tracking-wider mb-2">Main</p>
                    <NavItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => handleNavigation('dashboard')} />
                    <NavItem icon={FolderOpen} label="Projects" active={activeTab === 'projects'} onClick={() => handleNavigation('projects')} />
                    <NavItem icon={Folder} label="Categories" active={activeTab === 'categories'} onClick={() => handleNavigation('categories')} />
                    <NavItem icon={Globe} label="Site Settings" active={activeTab === 'site-settings'} onClick={() => handleNavigation('site-settings')} />
                    <NavItem icon={MessageSquare} label="Messages" active={activeTab === 'messages'} onClick={() => handleNavigation('messages')} badge={messagesCount > 0 ? messagesCount.toString() : undefined} />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden bg-zinc-50 dark:bg-[#0B0E14]">

                {/* Header */}
                <header className="h-16 border-b border-zinc-200 dark:border-[#1F2430] bg-white dark:bg-[#11141D] flex items-center justify-between px-8 transition-colors duration-500">
                    <h2 className="text-lg font-medium text-zinc-900 dark:text-slate-100 capitalize">{activeTab.replace('-', ' ')}</h2>
                    <div className="flex items-center gap-6">
                        <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-[#1A1D27] transition-colors">
                            {darkMode ? <Sun size={20} className="text-slate-400" /> : <Moon size={20} className="text-zinc-500" />}
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border border-white/10 cursor-pointer"></button>
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#2A303C] rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                    <div className="p-2 space-y-1">
                                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors text-left">
                                            <LogOut size={16} /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Content Render Logic */}
                {activeTab === 'projects' ? <AdminProjects /> :
                    activeTab === 'projects-new' || activeTab === 'projects-edit' ? <AdminNewProject /> :
                        activeTab === 'categories' ? <AdminCategories /> :
                            activeTab === 'categories-edit' ? <AdminNewCategory /> :
                                activeTab === 'site-settings' ? <AdminSiteSettings /> :
                                    activeTab === 'messages' ? <AdminMessages /> :
                                        activeTab === 'messages-reply' ? <AdminReply /> :

                                            /* DEFAULT DASHBOARD VIEW */
                                            <div className="flex-1 overflow-y-auto p-8">
                                                {/* Stats */}
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                                    {stats.map((stat, index) => (
                                                        <div key={index} className="bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-xl p-6 relative">
                                                            <div className="flex justify-between items-start mb-4">
                                                                <div>
                                                                    <p className="text-zinc-500 dark:text-slate-400 text-sm font-medium">{stat.title}</p>
                                                                    <h3 className="text-3xl font-semibold mt-1 text-zinc-900 dark:text-white">{stat.value}</h3>
                                                                </div>
                                                                <div className="p-2 rounded-lg bg-zinc-100 dark:bg-[#1F2430] text-zinc-400"><stat.icon size={20} /></div>
                                                            </div>
                                                            <div className="flex items-center text-xs">
                                                                <span className={`${stat.changeColor} font-medium mr-2 bg-green-500/10 px-1.5 py-0.5 rounded`}>{stat.change}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Recent Projects Table */}
                                                <div className="flex items-center justify-between mb-6">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Recent Projects</h3>
                                                        <span className="bg-zinc-100 dark:bg-[#1F2430] text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-full text-xs font-semibold">{dashboardProjects.length} Total</span>
                                                    </div>
                                                    <button onClick={() => navigate('/admin/projects/new')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                                        <Plus size={16} /> <span>Add New Project</span>
                                                    </button>
                                                </div>

                                                <div className="bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-xl overflow-hidden shadow-sm">
                                                    <table className="w-full text-left border-collapse">
                                                        <thead>
                                                            <tr className="border-b border-zinc-200 dark:border-[#1F2430] bg-zinc-50 dark:bg-[#1A1D27] text-xs uppercase text-zinc-500 font-semibold tracking-wider">
                                                                <th className="px-6 py-4">Project Name</th>
                                                                <th className="px-6 py-4">Category</th>
                                                                <th className="px-6 py-4">Date Added</th>
                                                                <th className="px-6 py-4">Status</th>
                                                                <th className="px-6 py-4 text-right">Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-zinc-200 dark:divide-[#1F2430]">
                                                            {dashboardProjects.map((project) => (
                                                                <tr key={project.id} className="hover:bg-zinc-50 dark:hover:bg-[#1A1D27] transition-colors group">

                                                                    {/* 1. PROJE ADI */}
                                                                    <td className="px-6 py-4">
                                                                        <div className="flex items-center gap-4">
                                                                            <img src={getImageUrl(project.coverImageUrl)} alt="" className="w-12 h-10 rounded-lg object-cover shadow-sm border border-zinc-100 dark:border-white/5" />
                                                                            <div className="flex flex-col">
                                                                                <span className="font-bold text-sm text-zinc-900 dark:text-white">{project.title}</span>
                                                                                <span className="text-[10px] text-zinc-500 font-mono">ID: #PRJ-{String(project.id).padStart(3, '0')}</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                    {/* 2. KATEGORİ (Backend'den gelen CategoryName) */}
                                                                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-slate-400 font-medium">
                                                                        {/* DTO'da 'category' olarak geliyor */}
                                                                        {project.category || '-'}
                                                                    </td>

                                                                    {/* 3. TARİH (Yıl bilgisi) */}
                                                                    <td className="px-6 py-4 text-sm text-zinc-500 dark:text-slate-500">
                                                                        {/* DTO'da 'year' olarak geliyor */}
                                                                        {project.year || '2024'}
                                                                    </td>

                                                                    {/* 4. DURUM (DİNAMİK HALE GETİRİLDİ) */}
                                                                    <td className="px-6 py-4">
                                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${project.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20' :
                                                                            project.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' :
                                                                                project.status === 'Concept' ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20' :
                                                                                    'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700'
                                                                            }`}>
                                                                            <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'Completed' ? 'bg-green-500' :
                                                                                project.status === 'In Progress' ? 'bg-blue-500' :
                                                                                    project.status === 'Concept' ? 'bg-purple-500' :
                                                                                        'bg-zinc-400'
                                                                                }`}></span>
                                                                            {project.status || 'Unknown'}
                                                                        </span>
                                                                    </td>

                                                                    {/* 5. AKSİYONLAR */}
                                                                    <td className="px-6 py-4 text-right">
                                                                        <div className="flex items-center justify-end gap-2 text-zinc-400">
                                                                            <button onClick={() => navigate(`/work/${project.id}`)} className="p-2 hover:bg-zinc-100 dark:hover:bg-[#1F2430] rounded-lg hover:text-indigo-600 transition-colors" title="View">
                                                                                <Eye size={16} />
                                                                            </button>
                                                                            <button onClick={() => navigate(`/admin/projects/edit/${project.id}`)} className="p-2 hover:bg-zinc-100 dark:hover:bg-[#1F2430] rounded-lg hover:text-blue-600 transition-colors" title="Edit">
                                                                                <PenLine size={16} />
                                                                            </button>
                                                                            <button onClick={() => handleDelete(project.id)} className="p-2 hover:bg-zinc-100 dark:hover:bg-[#1F2430] rounded-lg hover:text-red-600 transition-colors" title="Delete">
                                                                                <Trash2 size={16} />
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                }
            </main>
        </div>
    );
};

// NavItem Component (Değişmedi ama kopyalamak için ekledim)
const NavItem: React.FC<{ icon: React.ElementType, label: string, active?: boolean, onClick: () => void, badge?: string }> = ({ icon: Icon, label, active, onClick, badge }) => (
    <button onClick={onClick} className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all duration-200 group ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-slate-400 dark:hover:bg-[#1F2430] dark:hover:text-slate-200'}`}>
        <div className="flex items-center gap-3"><Icon size={18} className={active ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-600'} /><span className="font-medium">{label}</span></div>
        {badge && <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${active ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-600'}`}>{badge}</span>}
    </button>
);

export default AdminDashboard;