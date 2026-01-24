import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../types';
import { getImageUrl } from '../utils/imageUrlHelper'; // <-- 1. IMPORT ET

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <Link to={`/work/${project.id}`}>
      <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          delay: index * 0.1
        }}
        className={`group relative overflow-hidden rounded-lg bg-zinc-900 ${project.className || 'col-span-1'} min-h-[320px] cursor-pointer block h-full`}
      >
        <div className="absolute inset-0 w-full h-full">
          {/* 2. DÜZELTME: src kısmını helper ile sarmala ve coverImageUrl kullan */}
          <img
            src={getImageUrl(project.coverImageUrl)}
            alt={project.title}
            className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

        <div className="absolute top-6 left-6 z-20">
          <span className="px-3 py-1.5 text-[10px] uppercase tracking-widest bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-full font-medium">
            {project.category}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20 flex justify-between items-end">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none mb-2">
              {project.title}
            </h3>
            <div className="flex items-center text-zinc-300 text-sm font-medium">
              <MapPin size={14} className="mr-1.5 text-accent-600" />
              <span className="tracking-wide">{project.location}</span>
            </div>
          </div>

          <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;