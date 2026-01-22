import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    FolderOpen,
    Globe, // Use Globe for Site Settings
    Settings,
    MessageSquare,
    Bell,
    Plus,

    Eye,
    Folder,
    User,
    LogOut,
    ChevronRight,
    PenLine,
    Trash2
} from 'lucide-react';

import { Moon, Sun } from 'lucide-react';
import vivereLogo from '../assets/vivere.png';
import vivereBlackLogo from '../assets/vivere_black.png';
import AdminProjects from '../components/admin/AdminProjects';
import AdminNewProject from '../components/admin/AdminNewProject';
import AdminCategories from '../components/admin/AdminCategories';
import AdminNewCategory from '../components/admin/AdminNewCategory';
import AdminSiteSettings from '../components/admin/AdminSiteSettings';
import AdminMessages from '../components/admin/AdminMessages';
import AdminReply from '../components/admin/AdminReply';

interface AdminDashboardProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ darkMode, toggleDarkMode }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Lifted state from AdminMessages
    const [messages] = useState([
        {
            id: 1,
            name: 'Elena Fisher',
            avatar: 'https://source.unsplash.com/random/100x100?woman,portrait',
            type: 'New Inquiry',
            typeColor: 'text-blue-500',
            projectType: 'Residential Project',
            timestamp: '2 hours ago',
            subject: 'Villa Renovation in Hollywood Hills',
            preview: 'I\'m looking for an architect for a comprehensive villa renovation...',
            content: `Hi Team,

I'm looking for an architect for a comprehensive villa renovation in the hills. We've been following your work for a while and absolutely love the minimal style you bring to residential projects. We are looking to start the design phase next month and would love to discuss feasibility and timelines.

Could we schedule a call for sometime next week?`,
            status: 'unread'
        },
        {
            id: 2,
            name: 'Marcus Thorne',
            avatar: 'https://source.unsplash.com/random/100x100?man,portrait',
            type: 'Replied',
            typeColor: 'text-green-500',
            projectType: 'Job Application',
            timestamp: 'Yesterday',
            subject: 'Senior Architect Position',
            preview: 'Attached is my portfolio for the Senior Architect position. I have 5 years of...',
            content: '...',
            status: 'read'
        },
        {
            id: 3,
            name: 'Sarah Jenkins',
            avatar: 'https://source.unsplash.com/random/100x100?woman,glasses',
            type: 'Archived',
            typeColor: 'text-zinc-500',
            projectType: 'Consultation',
            timestamp: 'Oct 24',
            subject: 'Downtown Loft Project',
            preview: 'Thank you for the quick response regarding the downtown loft project. We will...',
            content: '...',
            status: 'archived'
        },
        {
            id: 4,
            name: 'David Chen',
            avatar: 'https://source.unsplash.com/random/100x100?man,suit',
            type: 'New Inquiry',
            typeColor: 'text-blue-500',
            projectType: 'Commercial',
            timestamp: 'Oct 22',
            subject: 'Office Space Design',
            preview: 'Hello, we are planning a new office space in the financial district and would like t...',
            content: '...',
            status: 'read'
        }
    ]);

    const unreadCount = messages.filter(m => m.status === 'unread').length;


    useEffect(() => {
        // ... (existing useEffect code)
        if (location.pathname === '/admin/projects') {
            setActiveTab('projects');
        } else if (location.pathname === '/admin/projects/new') {
            setActiveTab('projects-new');
        } else if (location.pathname.startsWith('/admin/projects/edit/') || location.pathname.startsWith('/admin/projects/view/')) {
            setActiveTab('projects-edit');
        } else if (location.pathname === '/admin/categories') {
            setActiveTab('categories');
        } else if (location.pathname === '/admin/categories/new') {
            setActiveTab('categories-new');
        } else if (location.pathname.startsWith('/admin/categories/edit/')) {
            setActiveTab('categories-edit');
        } else if (location.pathname === '/admin/site-settings') {
            setActiveTab('site-settings');
        } else if (location.pathname === '/admin/messages') {
            setActiveTab('messages');
        } else if (location.pathname.startsWith('/admin/messages/reply/')) {
            setActiveTab('messages-reply');
        } else {
            setActiveTab('dashboard');
        }
    }, [location.pathname]);

    // ... (existing useEffect)

    const handleNavigation = (tab: string) => {
        if (tab === 'projects') {
            navigate('/admin/projects');
        } else if (tab === 'projects-new') {
            navigate('/admin/projects/new');
        } else if (tab === 'dashboard') {
            navigate('/admin/dashboard');
        } else if (tab === 'categories') {
            navigate('/admin/categories');
        } else if (tab === 'site-settings') {
            navigate('/admin/site-settings');
        } else if (tab === 'messages') {
            navigate('/admin/messages');
        } else {
            setActiveTab(tab);
        }
    };

    const stats = [
        { title: 'Total Projects', value: '24', change: '+2', changeText: 'this month', changeColor: 'text-green-500', icon: Folder, iconColor: 'text-blue-500' },
        { title: 'Total Views', value: '12.5k', change: '+12%', changeText: 'this week', changeColor: 'text-green-500', icon: Eye, iconColor: 'text-indigo-500' },
        { title: 'Recent Inquiries', value: unreadCount.toString(), change: '', changeText: `${unreadCount} unread messages`, changeColor: 'text-zinc-500', icon: MessageSquare, iconColor: 'text-orange-500' },
    ];

    // Mock Projects Data
    const [dashboardProjects, setDashboardProjects] = useState([
        { id: '1', displayId: '#PRJ-001', name: 'Modern Brutalist Villa', category: 'Residential', date: 'Oct 24, 2023', status: 'Published', statusColor: 'bg-green-500/10 text-green-500' },
        { id: '2', displayId: '#PRJ-002', name: 'Urban Office Complex', category: 'Commercial', date: 'Oct 20, 2023', status: 'Draft', statusColor: 'bg-zinc-500/10 text-zinc-400' },
        { id: '3', displayId: '#PRJ-003', name: 'Skyline Penthouse', category: 'Interior', date: 'Oct 15, 2023', status: 'Published', statusColor: 'bg-green-500/10 text-green-500' },
        { id: '4', displayId: '#PRJ-004', name: 'Lakeside Retreat', category: 'Residential', date: 'Oct 10, 2023', status: 'Published', statusColor: 'bg-green-500/10 text-green-500' },
        { id: '5', displayId: '#PRJ-005', name: 'City Library Concept', category: 'Public', date: 'Oct 05, 2023', status: 'Draft', statusColor: 'bg-zinc-500/10 text-zinc-400' },
    ]);

    const handleDeleteProject = (id: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            setDashboardProjects(prev => prev.filter(p => p.id !== id));
        }
    };

    return (
        <div className="flex h-screen bg-zinc-50 dark:bg-[#0B0E14] text-zinc-900 dark:text-slate-100 font-sans selection:bg-blue-500/30 transition-colors duration-500">

            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-200 dark:border-[#1F2430] bg-white dark:bg-[#11141D] flex flex-col transition-colors duration-500">
                <div
                    onClick={() => handleNavigation('dashboard')}
                    className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-[#1F2430] gap-3 cursor-pointer hover:bg-zinc-50 dark:hover:bg-[#1A1D27] transition-colors"
                >
                    <img
                        src={darkMode ? vivereLogo : vivereBlackLogo}
                        alt="Vivere Design Admin"
                        className="h-8 w-auto object-contain"
                    />
                    <div className="flex flex-col">
                        <span className="font-semibold tracking-wide text-sm text-zinc-900 dark:text-slate-100">Vivere Design Admin</span>
                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-slate-500">Portfolio Admin</span>
                    </div>
                </div>

                <div className="flex-1 py-6 px-4 space-y-1">
                    <p className="px-4 text-xs font-medium text-zinc-500 dark:text-slate-500 uppercase tracking-wider mb-2">Main</p>
                    <NavItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => handleNavigation('dashboard')} />
                    <NavItem icon={FolderOpen} label="Projects" active={activeTab === 'projects'} onClick={() => handleNavigation('projects')} />
                    <NavItem icon={Folder} label="Categories" active={activeTab === 'categories'} onClick={() => handleNavigation('categories')} />
                    <NavItem icon={Globe} label="Site Settings" active={activeTab === 'site-settings'} onClick={() => handleNavigation('site-settings')} />
                    <NavItem icon={MessageSquare} label="Messages" active={activeTab === 'messages'} onClick={() => handleNavigation('messages')} badge={unreadCount > 0 ? unreadCount.toString() : undefined} />
                </div>

                <div className="p-4 border-t border-zinc-200 dark:border-[#1F2430]">
                    <NavItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => handleNavigation('settings')} />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden bg-zinc-50 dark:bg-[#0B0E14]">

                {/* Header */}
                <header className="h-16 border-b border-zinc-200 dark:border-[#1F2430] bg-white dark:bg-[#11141D] flex items-center justify-between px-8 transition-colors duration-500">
                    <h2 className="text-lg font-medium text-zinc-900 dark:text-slate-100">
                        {activeTab === 'dashboard' && 'Dashboard Overview'}
                        {activeTab === 'projects' && 'Projects'}
                        {activeTab === 'categories' && 'Categories'}
                        {activeTab === 'site-settings' && 'Site Settings'}
                        {activeTab === 'messages' && 'Messages'}
                        {activeTab === 'settings' && 'Settings'}
                    </h2>

                    <div className="flex items-center gap-6">


                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-[#1A1D27] transition-colors"
                        >
                            {darkMode ? (
                                <Sun size={20} className="text-slate-400" />
                            ) : (
                                <Moon size={20} className="text-zinc-500" />
                            )}
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsNotificationsOpen(!isNotificationsOpen);
                                    setIsProfileOpen(false);
                                }}
                                className="relative text-zinc-400 hover:text-zinc-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                            >
                                <Bell size={20} />
                                {unreadCount > 0 && (
                                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full translate-x-1/3 -translate-y-1/3"></span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {isNotificationsOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#2A303C] rounded-xl shadow-xl z-50 overflow-hidden transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200">
                                    <div className="p-4 border-b border-zinc-100 dark:border-[#1F2430]">
                                        <h3 className="font-semibold text-zinc-900 dark:text-white">Notifications</h3>
                                        <p className="text-xs text-zinc-500 dark:text-slate-400 mt-0.5">You have {unreadCount} unread messages</p>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {messages.filter(m => m.status === 'unread').map((msg) => (
                                            <div key={msg.id} className="p-4 border-b border-zinc-50 dark:border-[#1F2430] hover:bg-zinc-50 dark:hover:bg-[#1A1D27] cursor-pointer transition-colors bg-blue-50/50 dark:bg-blue-500/5">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="font-medium text-sm text-zinc-900 dark:text-white">{msg.name}</span>
                                                    <span className="text-[10px] text-zinc-400 dark:text-slate-500">{msg.timestamp}</span>
                                                </div>
                                                <p className="text-xs text-zinc-600 dark:text-slate-400 line-clamp-1">{msg.preview}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-2 bg-zinc-50 dark:bg-[#11141D] border-t border-zinc-100 dark:border-[#1F2430]">
                                        <button
                                            onClick={() => {
                                                handleNavigation('messages');
                                                setIsNotificationsOpen(false);
                                            }}
                                            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                        >
                                            View all messages
                                            <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsProfileOpen(!isProfileOpen);
                                    setIsNotificationsOpen(false);
                                }}
                                className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border border-white/10 cursor-pointer hover:ring-2 ring-blue-500/20 transition-all"
                            ></button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#2A303C] rounded-xl shadow-xl z-50 overflow-hidden transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200">
                                    <div className="p-4 border-b border-zinc-100 dark:border-[#1F2430]">
                                        <p className="font-semibold text-zinc-900 dark:text-white">Admin User</p>
                                        <p className="text-xs text-zinc-500 dark:text-slate-400 mt-0.5">admin@viveredigital.com</p>
                                    </div>
                                    <div className="p-2 space-y-1">
                                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-600 dark:text-slate-400 hover:bg-zinc-50 dark:hover:bg-[#1F2430] hover:text-zinc-900 dark:hover:text-white rounded-lg transition-colors text-left">
                                            <User size={16} />
                                            My Profile
                                        </button>
                                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors text-left">
                                            <LogOut size={16} />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                {activeTab === 'projects' ? (
                    <AdminProjects />
                ) : activeTab === 'projects-new' || activeTab === 'projects-edit' ? (
                    <AdminNewProject />
                ) : activeTab === 'categories' ? (
                    <AdminCategories />
                ) : activeTab === 'categories-new' || activeTab === 'categories-edit' ? (
                    <AdminNewCategory />
                ) : activeTab === 'site-settings' ? (
                    <AdminSiteSettings />
                ) : activeTab === 'messages' ? (
                    <AdminMessages messages={messages} />
                ) : activeTab === 'messages-reply' ? (
                    <AdminReply />
                ) : (
                    /* Default Dashboard View */
                    <div className="flex-1 overflow-y-auto p-8">

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-xl p-6 relative group hover:border-zinc-300 dark:hover:border-[#2A303C] transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-zinc-500 dark:text-slate-400 text-sm font-medium">{stat.title}</p>
                                            <h3 className="text-3xl font-semibold mt-1 text-zinc-900 dark:text-white">{stat.value}</h3>
                                        </div>
                                        <div className={`p-2 rounded-lg bg-zinc-100 dark:bg-[#1F2430] text-zinc-400 dark:text-slate-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors`}>
                                            <stat.icon size={20} />
                                        </div>
                                    </div>
                                    <div className="flex items-center text-xs">
                                        <span className={`${stat.changeColor} font-medium mr-2 bg-green-500/10 px-1.5 py-0.5 rounded`}>{stat.change}</span>
                                        <span className="text-zinc-600 dark:text-slate-500">{stat.changeText}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Projects Section */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Recent Projects</h3>
                                <span className="px-2 py-0.5 bg-zinc-200 dark:bg-[#1F2430] text-zinc-600 dark:text-slate-400 text-xs rounded-full font-medium">{dashboardProjects.length} Total</span>
                            </div>
                            <button
                                onClick={() => navigate('/admin/projects/new')}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                <Plus size={16} />
                                <span>Add New Project</span>
                            </button>
                        </div>

                        {/* Projects Table */}
                        <div className="bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-xl overflow-hidden transition-colors">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-zinc-200 dark:border-[#1F2430] bg-zinc-50 dark:bg-[#1A1D27] text-xs uppercase tracking-wider text-zinc-500 dark:text-slate-500">
                                            <th className="px-6 py-4 font-medium">Project Name</th>
                                            <th className="px-6 py-4 font-medium">Category</th>
                                            <th className="px-6 py-4 font-medium">Date Added</th>
                                            <th className="px-6 py-4 font-medium">Status</th>
                                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-200 dark:divide-[#1F2430]">
                                        {dashboardProjects.map((project) => (
                                            <tr key={project.id} className="group hover:bg-zinc-50 dark:hover:bg-[#1A1D27] transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-[#1F2430] flex-shrink-0 border border-zinc-200 dark:border-[#2A303C]"></div> {/* Placeholder for project image */}
                                                        <div>
                                                            <p className="font-medium text-sm text-zinc-900 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.name}</p>
                                                            <p className="text-xs text-zinc-500 dark:text-slate-500">{project.displayId}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-zinc-600 dark:text-slate-400">{project.category}</td>
                                                <td className="px-6 py-4 text-sm text-zinc-600 dark:text-slate-400">{project.date}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.statusColor}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${project.status === 'Published' ? 'bg-green-500' : 'bg-slate-500'}`}></span>
                                                        {project.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2 text-zinc-400 dark:text-slate-500">
                                                        <button
                                                            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-[#1F2430] rounded-md hover:text-zinc-900 dark:hover:text-white transition-colors"
                                                            title="View"
                                                            onClick={() => navigate(`/admin/projects/view/${project.id}`)}
                                                        >
                                                            <Eye size={16} />
                                                        </button>
                                                        <button
                                                            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-[#1F2430] rounded-md hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                            title="Edit"
                                                            onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
                                                        >
                                                            <PenLine size={16} />
                                                        </button>
                                                        <button
                                                            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-[#1F2430] rounded-md hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                                            title="Delete"
                                                            onClick={() => handleDeleteProject(project.id)}
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination / Footer of table */}
                            <div className="px-6 py-4 border-t border-zinc-200 dark:border-[#1F2430] flex items-center justify-between text-xs text-zinc-500 dark:text-slate-500">
                                <span>Showing <span className="text-zinc-900 dark:text-slate-300 font-medium">1-{dashboardProjects.length}</span> of <span className="text-zinc-900 dark:text-slate-300 font-medium">{dashboardProjects.length}</span> projects</span>
                                <div className="flex gap-2">
                                    <button
                                        disabled
                                        className="px-3 py-1.5 border border-zinc-300 dark:border-[#2A303C] rounded hover:border-zinc-400 dark:hover:border-slate-600 text-zinc-600 dark:text-slate-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => navigate('/admin/projects')}
                                        className="px-3 py-1.5 border border-zinc-300 dark:border-[#2A303C] rounded hover:border-zinc-400 dark:hover:border-slate-600 text-zinc-600 dark:text-slate-400 transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

interface NavItemProps {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    onClick: () => void;
    badge?: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, onClick, badge }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all duration-200 group ${active
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-slate-400 dark:hover:bg-[#1F2430] dark:hover:text-slate-200'
                }`}
        >
            <div className="flex items-center gap-3">
                <Icon size={18} className={active ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-600 dark:text-slate-500 dark:group-hover:text-slate-400'} />
                <span className="font-medium">{label}</span>
            </div>
            {badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${active ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-[#1F2430] dark:text-slate-400'
                    }`}>
                    {badge}
                </span>
            )}
        </button>
    );
}

export default AdminDashboard;
