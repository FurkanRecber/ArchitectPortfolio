import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CallToAction: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-16 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-500 border-t border-zinc-200 dark:border-white/5">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to build?</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-10 text-lg font-light">
            Let's create something extraordinary together.
          </p>

          <div className="flex flex-col items-center gap-6">
            <Link to="/contact">
              <button className="bg-accent-600 hover:bg-accent-500 text-white px-12 py-5 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-accent-600/20">
                Start a Project
              </button>
            </Link>
            {/* DÜZELTME: Mail adresi güncellendi */}
            <a href="mailto:hello@vivere.design" className="text-zinc-500 text-sm hover:text-accent-600 dark:hover:text-white transition-colors">
              or email us at <span className="underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4">hello@vivere.design</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CallToAction;