import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { projectService } from '../services/projectService';
import { categoryService } from '../services/categoryService';
import type { Project } from '../types';
import { translations } from '../translations';

interface WorkPageProps {
  language?: 'EN' | 'TR';
}

const WorkPage: React.FC<WorkPageProps> = ({ language = 'EN' }) => {
  // --- STATE TANIMLARI ---
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']); // Başlangıçta sadece 'All' var
  const [loading, setLoading] = useState(true);

  // Dil paketini seç
  const t = translations[language].work;

  // --- VERİ ÇEKME İŞLEMİ (PROJECTS & CATEGORIES) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const langCode = language.toLowerCase();

        // Paralel olarak hem projeleri hem kategorileri çekiyoruz
        const [projectsData, categoriesData] = await Promise.all([
          projectService.getAllProjects(langCode),
          categoryService.getAllCategories(langCode)
        ]);

        // 1. Projeleri State'e at
        setProjects(projectsData);

        // 2. Kategorileri State'e at
        // Not: Backend'den gelen kategoriler zaten localize edilmiş olmalı (Name property'si)
        const categoryNames = ['All', ...categoriesData.map(c => c.name)];
        setCategories(categoryNames);

      } catch (error) {
        console.error("Veriler yüklenirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]); // Language değişince tekrar çek

  // --- FİLTRELEME MANTIĞI ---
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    // Backend'den gelen kategori ismi ile seçilen kategori ismini karşılaştırıyoruz
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, projects]);

  // --- LOADING EKRANI ---
  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-500">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent-600 mb-4"></div>
        <p className="text-sm uppercase tracking-widest text-zinc-500">{language === 'TR' ? 'Yükleniyor...' : 'Loading...'}</p>
      </div>
    );
  }

  // --- ANA GÖRÜNÜM ---
  return (
    <section className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white pt-32 pb-20 px-4 md:px-8 lg:px-12 overflow-hidden transition-colors duration-500">

      {/* Background Watermark Typography */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-[1800px] pointer-events-none select-none z-0 overflow-hidden flex justify-center">
        <span className="text-[15vw] sm:text-[18vw] font-bold text-zinc-200 dark:text-zinc-900/50 leading-none tracking-tighter opacity-100 transition-colors duration-500">
          WORK
        </span>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20">
          <div className="max-w-3xl relative">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="block text-accent-600 text-xs font-bold tracking-[0.2em] uppercase mb-4"
            >
              {t.subtitle}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1]"
            >
              {t.title} <span className="text-accent-600">{t.titleHighlight}</span>
            </motion.h1>
          </div>

          {/* Filters (Dinamik Kategoriler) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-3 mt-8 lg:mt-0 lg:justify-end"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 text-xs font-medium uppercase tracking-wider rounded-full transition-all duration-300 border ${selectedCategory === category
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black'
                  : 'bg-transparent text-zinc-500 border-zinc-300 dark:border-zinc-800 hover:border-accent-600 hover:text-accent-600'
                  }`}
              >
                {category === 'All' ? t.categoryAll : category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State (Filtre sonucunda proje yoksa) */}
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-zinc-500">
            <p className="text-xl font-light">{t.emptyState}</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 text-accent-600 hover:text-accent-500 underline decoration-1 underline-offset-4"
            >
              {t.clearFilters}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkPage;