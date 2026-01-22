import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Ruler, Smile, Download, Play, Compass, Leaf, PenTool } from 'lucide-react';
import Footer from '../components/Footer';

const Studio: React.FC = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-500 font-sans selection:bg-accent-600 selection:text-white">

            {/* 1. HERO SECTION */}
            <section className="min-h-screen flex items-center justify-center px-6 md:px-16 pt-24 pb-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-accent-600 text-xs font-bold tracking-[0.2em] uppercase block mb-6">Our Philosophy</span>
                        <h1 className="text-5xl md:text-7xl font-serif italic mb-8 leading-tight">
                            Architecting <br />
                            <span className="not-italic font-light">the Future</span>
                        </h1>

                        <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                            <p>
                                Founded by Julian Vandermere, our boutique studio operates at the nexus of sculptural form and environmental consciousness. We believe architecture is not merely about space—it is the silent choreography of light, shadow, and human experience.
                            </p>
                            <p className="italic text-zinc-800 dark:text-zinc-200 border-l-2 border-accent-600 pl-4">
                                "Design is the bridge between our current reality and the legacy we leave for the generations that follow."
                            </p>
                        </div>

                        <div className="mt-12 inline-block bg-accent-600 text-white p-6 shadow-xl">
                            <span className="block text-xs font-bold uppercase tracking-widest mb-1">Julian Vandermere</span>
                            <span className="text-[10px] opacity-80 uppercase tracking-widest">Principal Architect</span>
                        </div>
                    </motion.div>

                    {/* Right: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[600px] w-full"
                    >
                        <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-900 overflow-hidden">
                            {/* Placeholder for Founder Image */}
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                                alt="Julian Vandermere"
                                className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. STATS BAR */}
            <section className="bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-white/5 py-24 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center"
                    >
                        <Building2 size={32} className="text-accent-600 mb-6" />
                        <span className="text-5xl md:text-6xl font-light mb-2">50+</span>
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Projects Completed</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center border-t md:border-t-0 md:border-l border-zinc-200 dark:border-white/5 pt-12 md:pt-0 pl-0 md:pl-12"
                    >
                        <Ruler size={32} className="text-accent-600 mb-6" />
                        <span className="text-5xl md:text-6xl font-light mb-2">8+</span>
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Years of Experience</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-center border-t md:border-t-0 md:border-l border-zinc-200 dark:border-white/5 pt-12 md:pt-0 pl-0 md:pl-12"
                    >
                        <Smile size={32} className="text-accent-600 mb-6" />
                        <span className="text-5xl md:text-6xl font-light mb-2">40+</span>
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Happy Clients</span>
                    </motion.div>
                </div>
            </section>

            {/* 3. ETHOS */}
            <section className="py-32 px-6 md:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <span className="text-accent-600 text-xs font-bold tracking-[0.2em] uppercase block mb-4">The Studio Ethos</span>
                        <h2 className="text-4xl md:text-5xl font-serif italic">Driven by Integrity</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <Compass size={32} strokeWidth={1} className="mb-6 text-zinc-400 group-hover:text-accent-600 transition-colors" />
                            <h3 className="text-xl font-bold mb-4">Precision</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                                Meticulous attention to every joint, material selection, and structural detail. We believe perfection is found in the unseen.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group"
                        >
                            <Leaf size={32} strokeWidth={1} className="mb-6 text-zinc-400 group-hover:text-accent-600 transition-colors" />
                            <h3 className="text-xl font-bold mb-4">Sustainability</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                                Designing with the environment in mind, utilizing passive systems and reclaimed resources to minimize ecological footprints.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group"
                        >
                            <PenTool size={32} strokeWidth={1} className="mb-6 text-zinc-400 group-hover:text-accent-600 transition-colors" />
                            <h3 className="text-xl font-bold mb-4">Aesthetic Purity</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                                Stripping away the superfluous to find the essential beauty of form. Minimalism that feels warm and lived-in.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4. CTA FOOTER */}
            <section className="py-24 px-6 md:px-16 bg-zinc-100 dark:bg-zinc-900/50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-serif italic mb-12 leading-snug">
                        Deepen your understanding <br /> of our craft.
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10 hover:border-accent-600 transition-colors shadow-lg">
                            <Download size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">Download Portfolio (PDF)</span>
                        </button>
                        <button className="flex items-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black border border-transparent hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-lg">
                            <Play size={16} fill="currentColor" />
                            <span className="text-xs font-bold uppercase tracking-widest">Watch Our Process (Video)</span>
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Studio;
