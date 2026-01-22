import React from 'react';
import { motion } from 'framer-motion';

const Clients: React.FC = () => {
    const clients = [
        { name: 'Aesop', style: 'font-serif tracking-tight text-3xl md:text-4xl' },
        { name: 'Herman Miller', style: 'font-sans font-bold tracking-tight uppercase text-lg md:text-xl' },
        { name: 'Vitra.', style: 'font-serif font-bold text-2xl md:text-3xl tracking-tighter' },
        { name: 'Bang & Olufsen', style: 'font-sans font-light tracking-[0.2em] uppercase text-xs md:text-sm' },
        { name: 'MONOCLE', style: 'font-serif font-bold text-xl md:text-2xl tracking-wide bg-black text-white px-2 py-1 dark:bg-white dark:text-black' },
    ];

    return (
        <section className="py-24 px-6 md:px-16 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-500 border-t border-zinc-200 dark:border-white/5">
            <div className="max-w-7xl mx-auto text-center">
                <span className="text-zinc-400 text-xs font-bold tracking-[0.2em] uppercase block mb-12">
                    Trusted by Industry Leaders
                </span>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
                    {clients.map((client, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="opacity-50 hover:opacity-100 transition-all duration-300 cursor-default"
                        >
                            <span className={`${client.style} whitespace-nowrap`}>
                                {client.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Clients;
