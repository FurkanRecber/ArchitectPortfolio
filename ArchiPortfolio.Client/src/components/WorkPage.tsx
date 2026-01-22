import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, CATEGORIES } from '../constants';
import ProjectCard from './ProjectCard';
// import { ArrowRight } from 'lucide-react';

const WorkPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    // Padding-top ekledik (pt-32) çünkü Navbar fixed.
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
              Selected Works
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1]"
            >
              Shaping the <span className="text-accent-600">future</span>
            </motion.h1>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-3 mt-8 lg:mt-0 lg:justify-end"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 text-xs font-medium uppercase tracking-wider rounded-full transition-all duration-300 border ${selectedCategory === category
                    ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black'
                    : 'bg-transparent text-zinc-500 border-zinc-300 dark:border-zinc-800 hover:border-accent-600 hover:text-accent-600'
                  }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid - Using CSS Grid for Bento Box feel */}
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

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-zinc-500">
            <p className="text-xl font-light">No projects found.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 text-accent-600 hover:text-accent-500 underline decoration-1 underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkPage;