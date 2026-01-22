import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TheStudio: React.FC = () => {
  return (
    // Arka plan rengi: zinc-800 (#0d1218)
    <section className="py-24 px-6 md:px-16 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-[4/5] w-full rounded-lg overflow-hidden relative z-10">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2144&auto=format&fit=crop" alt="Architect" className="w-full h-full object-cover" />
          </div>
          {/* Dekoratif Çerçeve */}
          <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 border border-zinc-200 dark:border-zinc-700 rounded-lg -z-0"></div>
        </div>

        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-accent-600 font-bold tracking-wider uppercase text-sm mb-2 block">The Studio</span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
            Designing for the <br />
            <span className="text-zinc-400 dark:text-zinc-500">Human Experience.</span>
          </h2>
          <div className="space-y-6 text-zinc-600 dark:text-zinc-400 text-lg font-light leading-relaxed mb-10">
            <p>We believe architecture is not just about buildings, but about the life that happens inside them.</p>
            <p>Founded in 2015, our studio has been dedicated to pushing the boundaries of sustainable design.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 pt-4 border-t border-zinc-200 dark:border-zinc-700 mb-8">
            <div><h4 className="text-3xl font-bold">50+</h4><p className="text-sm text-zinc-500 uppercase">Projects</p></div>
            <div><h4 className="text-3xl font-bold">12</h4><p className="text-sm text-zinc-500 uppercase">Awards</p></div>
          </div>
          <Link to="/studio" className="inline-flex items-center gap-2 text-accent-600 font-bold hover:gap-4 transition-all">
            Read our manifesto <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TheStudio;