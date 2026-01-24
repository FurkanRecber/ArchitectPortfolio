import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Download, Grid } from 'lucide-react';
import Footer from '../components/Footer';
import { projectService } from '../services/projectService';
import type { Project } from '../types';

const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Veri durumlarını yönetmek için State'ler
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Sayfa açıldığında veya ID değiştiğinde çalışır
    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;

            setLoading(true);
            try {
                // Backend'den veriyi çekiyoruz
                const data = await projectService.getProjectById(id);
                setProject(data);
                setError(null);
            } catch (err) {
                console.error("Proje yüklenirken hata oluştu:", err);
                setError("Proje bulunamadı veya yüklenirken hata oluştu.");
                setProject(null);
            } finally {
                setLoading(false);
            }

            // Sayfa başına kaydır
            window.scrollTo(0, 0);
        };

        fetchProject();
    }, [id]);

    // 1. Yükleniyor Durumu
    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-600 mb-4"></div>
                <p>Loading project details...</p>
            </div>
        );
    }

    // 2. Hata Durumu
    if (error || !project) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-500">
                <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
                <p className="text-zinc-500 mb-8">{error}</p>
                <Link to="/work" className="text-accent-600 hover:text-black dark:hover:text-white transition-colors">Back to Projects</Link>
            </div>
        );
    }

    // Sonraki proje için basit bir mantık (Mevcut ID + 1)
    // Not: Gerçek senaryoda backend'den "NextProjectId" dönmek daha sağlıklıdır.
    const nextProjectId = parseInt(id || "0") + 1;

    return (
        <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white min-h-screen font-sans selection:bg-accent-600 selection:text-white transition-colors duration-500">

            {/* 1. HERO IMAGE */}
            <section className="relative h-[85vh] w-full overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    // Backend'den gelen resim URL'si
                    src={project.coverImageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-16">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="flex items-center gap-2 text-accent-600 text-xs font-bold tracking-widest uppercase mb-4"
                        >
                            <Link to="/work" className="hover:text-white transition-colors">Projects</Link>
                            <span>/</span>
                            <span className="text-white">{project.category}</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 max-w-4xl leading-[1.1]"
                        >
                            {project.title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                            className="text-zinc-300 text-lg md:text-xl font-light max-w-2xl"
                        >
                            {project.description}
                        </motion.p>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 md:px-16 py-24">

                <Link to="/work" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-accent-600 dark:hover:text-white transition-colors mb-16">
                    <ArrowLeft size={16} /> Back to Projects
                </Link>

                {/* 2. CONCEPT & METADATA GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">

                    {/* LEFT: CONCEPT (Details) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7"
                    >
                        <h3 className="text-2xl font-bold mb-8 text-zinc-900 dark:text-white">Concept</h3>
                        <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-6 text-lg font-light transition-colors">
                            {/* Backend'den gelen uzun detay metni */}
                            <p>{project.details || project.description}</p>
                        </div>

                        <button className="mt-12 flex items-center gap-3 px-6 py-4 border border-zinc-200 dark:border-white/20 rounded hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                            <span className="text-xs font-bold uppercase tracking-widest">Download Press Kit</span>
                            <Download size={16} />
                        </button>
                    </motion.div>

                    {/* RIGHT: METADATA */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5 lg:pl-12"
                    >
                        <div className="space-y-8 border-l border-zinc-200 dark:border-white/10 pl-8 transition-colors">
                            <div>
                                <span className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Location</span>
                                <span className="text-lg text-zinc-800 dark:text-zinc-200">{project.location}</span>
                            </div>
                            <div className="flex gap-12">
                                <div>
                                    <span className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Year</span>
                                    <span className="text-lg text-zinc-800 dark:text-zinc-200">{project.year}</span>
                                </div>
                                <div>
                                    <span className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Area</span>
                                    <span className="text-lg text-zinc-800 dark:text-zinc-200">{project.area || "N/A"}</span>
                                </div>
                            </div>
                            <div>
                                <span className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Client</span>
                                <span className="text-lg text-zinc-800 dark:text-zinc-200">{project.client || "Private"}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Team</span>
                                <span className="text-lg text-zinc-800 dark:text-zinc-200">{project.team || "ArchiStudio Team"}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Status</span>
                                <span className="text-lg text-zinc-800 dark:text-zinc-200">{project.status || "Completed"}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* 3. GALLERY GRID */}
                {/* project.gallery artık string[] olduğu için direkt mapleyebiliriz */}
                {project.gallery && project.gallery.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32">
                        {project.gallery.map((imgUrl, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className={`overflow-hidden rounded-lg ${idx === 0 ? 'md:col-span-2 aspect-[2/1]' : 'aspect-square'}`}
                            >
                                <img src={imgUrl} alt={`${project.title} detail ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* 4. ARCHITECTURAL PLANS */}
            {/* project.plans Backend'den IsPlan=true olanlar olarak geliyor */}
            <section className="bg-zinc-50 dark:bg-zinc-900 py-32 px-6 md:px-16 border-t border-zinc-200 dark:border-white/5 transition-colors duration-500">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-16">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Architectural Plans</h3>
                        <Grid size={20} className="text-zinc-400 dark:text-zinc-500" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {project.plans && project.plans.length > 0 ? (
                            project.plans.map((planUrl, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="bg-white dark:bg-zinc-950 p-8 rounded border border-zinc-200 dark:border-white/5 shadow-sm"
                                >
                                    <span className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Plan View {idx + 1}</span>
                                    <img
                                        src={planUrl}
                                        alt="Plan"
                                        className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity dark:invert"
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 rounded">
                                <p className="text-zinc-500">No architectural plans available for this project.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 5. NEXT PROJECT FOOTER */}
            <section className="py-32 px-6 md:px-16 text-center bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-white/5 transition-colors duration-500">
                <span className="text-xs font-bold uppercase tracking-widest text-accent-600 mb-4 block">Continue Exploring</span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer" onClick={() => navigate(`/work/${nextProjectId}`)}>
                    Next Project
                </h2>
                <button onClick={() => navigate(`/work/${nextProjectId}`)} className="p-4 rounded-full border border-zinc-200 dark:border-white/20 text-zinc-900 dark:text-white hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                    <ArrowRight size={24} />
                </button>
            </section>

            <Footer />
        </div>
    );
};

export default ProjectDetail;