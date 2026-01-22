import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '../constants';

const SelectedProjects: React.FC = () => {
  // Select specific projects to display on Home
  // Example: "The Glass House" (id: 2), "Vertex Tower" (id: 1), "Nordic Museum" (id: 3)
  // Or just pick the first 3 for simplicity, but let's try to match the previous visual if possible.
  // Previous local data had: 
  // 1. "The Glass House" (Residential) -> ID 2 in constants
  // 2. "Skyline Loft" (Commercial) -> Let's map to "Vertex Tower" (ID 1) or "Azure Loft" (ID 9)
  // 3. "Detail & Texture" -> Maybe "Nordic Museum" (ID 3)

  // Let's pick ID 2, 1, and 3 to keep it populated with real data.
  const featuredProject = PROJECTS.find(p => p.id === '2') || PROJECTS[0];
  const sideProjects = [
    PROJECTS.find(p => p.id === '1'),
    PROJECTS.find(p => p.id === '3')
  ].filter(Boolean) as typeof PROJECTS;

  return (
    // Resimdeki ana arka plan: zinc-950 (#101822)
    <section id="selected-projects" className="py-24 px-6 md:px-16 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Selected Works</h2>
            {/* Mavi Çizgi */}
            <div className="h-1 w-20 bg-accent-600 rounded-full"></div>
          </div>
          <Link to="/work" className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest uppercase hover:text-accent-600 transition-colors">
            View All Projects <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[800px]">
          {/* Sol Büyük Kart */}
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

          {/* Sağ Sütun */}
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