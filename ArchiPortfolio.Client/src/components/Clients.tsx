import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';
import { referenceService, type Reference } from '../services/referenceService';
import { getImageUrl } from '../utils/imageUrlHelper';

interface ClientsProps {
    language?: 'EN' | 'TR';
}

const Clients: React.FC<ClientsProps> = ({ language = 'EN' }) => {
    const t = translations[language].home;
    const [references, setReferences] = useState<Reference[]>([]);

    useEffect(() => {
        const fetchReferences = async () => {
            try {
                const data = await referenceService.getAll();
                // Filter active references and sort by order
                const activeRefs = data.filter(r => r.isActive).sort((a, b) => a.order - b.order);
                setReferences(activeRefs);
            } catch (error) {
                console.error('Error fetching references:', error);
            }
        };

        fetchReferences();
    }, []);

    if (references.length === 0) {
        return null;
    }

    return (
        <section className="py-24 px-6 md:px-16 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-500 border-t border-zinc-200 dark:border-white/5">
            <div className="max-w-7xl mx-auto text-center">
                <span className="text-zinc-400 text-xs font-bold tracking-[0.2em] uppercase block mb-12">
                    {t.clientsTitle}
                </span>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
                    {references.map((ref, idx) => (
                        <motion.div
                            key={ref.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="cursor-default"
                        >
                            <img
                                src={getImageUrl(ref.logoUrl)}
                                alt={ref.title}
                                title={ref.title}
                                className="h-12 md:h-20 w-auto object-contain transition-all duration-300 filter grayscale invert dark:invert-0"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Clients;
