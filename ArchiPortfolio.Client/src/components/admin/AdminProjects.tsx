import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, PenLine, Trash2 } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { getImageUrl } from '../../utils/imageUrlHelper'; // <-- BU EKLENDİ
import type { Project } from '../../types';

import { translations } from '../../translations';

interface AdminProjectsProps {
    language?: 'EN' | 'TR';
}

const AdminProjects: React.FC<AdminProjectsProps> = ({ language = 'EN' }) => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const t = translations[language].admin.projects; // Çevirileri al

    // Verileri Çek
    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            setLoading(true);
            const data = await projectService.getAllProjects();
            setProjects(data);
        } catch (error) {
            console.error("Projeler yüklenemedi:", error);
        } finally {
            setLoading(false);
        }
    };

    // Silme İşlemi
    const handleDelete = async (id: number) => {
        if (window.confirm('Bu projeyi silmek istediğinize emin misiniz?')) {
            try {
                await projectService.deleteProject(id);
                // Listeden de sil
                setProjects(projects.filter(p => p.id !== id));
            } catch (error: any) {
                console.error(error);
                alert(error.message || "Silme işlemi başarısız oldu.");
            }
        }
    };

    if (loading) return <div className="p-8 text-center text-zinc-500">Yükleniyor...</div>;

    return (
        <div className="flex-1 overflow-y-auto p-8 h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">{t.title}</h3>
                    <span className="px-2 py-0.5 bg-zinc-200 dark:bg-[#1F2430] text-zinc-600 dark:text-slate-400 text-xs rounded-full font-medium">{projects.length} {t.total}</span>
                </div>
                <button
                    onClick={() => navigate('/admin/projects/new')}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus size={16} />
                    <span>{t.addNew}</span>
                </button>
            </div>

            <div className="bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-200 dark:border-[#1F2430] bg-zinc-50 dark:bg-[#1A1D27] text-xs uppercase text-zinc-500 dark:text-slate-500">
                            <th className="px-6 py-4 font-medium">{t.table.name}</th>
                            <th className="px-6 py-4 font-medium">{t.table.category}</th>
                            <th className="px-6 py-4 font-medium">{t.table.location}</th>
                            <th className="px-6 py-4 font-medium">{t.table.year}</th>
                            <th className="px-6 py-4 font-medium text-right">{t.table.actions}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-[#1F2430]">
                        {projects.map((project) => (
                            <tr key={project.id} className="hover:bg-zinc-50 dark:hover:bg-[#1A1D27] transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        {/* DÜZELTME BURADA: getImageUrl ve coverImageUrl kullanıldı */}
                                        <img
                                            src={getImageUrl(project.coverImageUrl)}
                                            alt=""
                                            className="w-10 h-10 rounded-lg object-cover border border-zinc-200 dark:border-white/10"
                                        />
                                        <div>
                                            <p className="font-medium text-sm text-zinc-900 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {project.title}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-zinc-600 dark:text-slate-400">
                                    <span className="inline-block px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-xs">
                                        {project.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-zinc-600 dark:text-slate-400">{project.location}</td>
                                <td className="px-6 py-4 text-sm text-zinc-600 dark:text-slate-400">{project.year}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 text-zinc-400 dark:text-slate-500">
                                        <button
                                            onClick={() => window.open(`/work/${project.id}`, '_blank')}
                                            className="p-2 hover:bg-zinc-100 dark:hover:bg-[#1F2430] rounded-lg hover:text-zinc-900 dark:hover:text-white transition-all"
                                            title="View Live"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
                                            className="p-2 hover:bg-zinc-100 dark:hover:bg-[#1F2430] rounded-lg hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                                            title="Edit"
                                        >
                                            <PenLine size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="p-2 hover:bg-zinc-100 dark:hover:bg-[#1F2430] rounded-lg hover:text-red-600 dark:hover:text-red-400 transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-10 text-zinc-500">{t.table.empty}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProjects;