import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
// Backend servisini import ettik
import { projectService } from '../services/projectService';
import type { Project } from '../types';

const SelectedProjects: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  // Veriyi çekiyoruz
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await projectService.getFeaturedProjects();
        setFeaturedProjects(data);
      } catch (err) {
        console.error("Öne çıkan projeler yüklenemedi", err);
      }
    };
    fetchFeatured();
  }, []);

  // Eğer veri henüz gelmediyse veya boşsa bu bölümü hiç gösterme
  if (featuredProjects.length === 0) return null;

  // İlk projeyi büyük, sonraki ikisini yan tarafa al
  const featuredProject = featuredProjects[0];
  const sideProjects = featuredProjects.slice(1, 3);

  return (
    <section id="selected-projects" className="py-24 px-6 md:px-16 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Selected Works</h2>
            <div className="h-1 w-20 bg-accent-600 rounded-full"></div>
          </div>
          <Link to="/work" className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest uppercase hover:text-accent-600 transition-colors">
            View All Projects <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[800px]">
          {/* Sol Büyük Kart (İlk Proje) */}
          <Link to={`/work/${featuredProject.id}`} className="block relative group overflow-hidden rounded-lg w-full h-[500px] md:h-full cursor-pointer">
            <motion.div
              className="w-full h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img src={featuredProject.imageUrl} alt={featuredProject.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 text-white">
                <span className="bg-accent-600 text-white text-[10px] font-bold px-3 py-1 rounded-full mb-3 inline-block tracking-wider uppercase">
                  {featuredProject.category}
                </span>
                <h3 className="text-3xl font-bold mb-1">{featuredProject.title}</h3>
                <p className="text-zinc-300 text-sm">{featuredProject.location}</p>
              </div>
            </motion.div>
          </Link>

          {/* Sağ Sütun (Diğer 2 Proje) */}
          <div className="flex flex-col gap-6 h-full">
            {sideProjects.map((project, idx) => (
              <Link key={project.id} to={`/work/${project.id}`} className="block flex-1 relative group overflow-hidden rounded-lg cursor-pointer">
                <motion.div
                  className="w-full h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                >
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <span className="bg-accent-600 text-white text-[10px] font-bold px-2 py-1 rounded-full mb-2 inline-block tracking-wider uppercase">{project.category}</span>
                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <p className="text-zinc-300 text-xs">{project.location}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedProjects;