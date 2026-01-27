import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/imageUrlHelper';
import { translations } from '../translations';

interface TheStudioProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  metric1Value?: string;
  metric1Title?: string;
  metric2Value?: string;
  metric2Title?: string;
  language?: 'EN' | 'TR';
}

const TheStudio: React.FC<TheStudioProps> = ({
  title,
  description,
  imageUrl,
  metric1Value,
  metric1Title,
  metric2Value,
  metric2Title,
  language = 'EN'
}) => {
  const t = translations[language].theStudio;

  const displayTitle = title || "Designing for the Human Experience";
  const fullDesc = description || "We believe architecture is not just about buildings, but about the life that happens inside them.";
  const displayDesc = fullDesc.length > 350 ? fullDesc.slice(0, 350) + "..." : fullDesc;
  const displaySubTitle = t.subtitle;

  // Format title for visual style if needed, or just render it
  const renderTitle = () => {
    const parts = displayTitle.split(' ');
    if (parts.length > 2) {
      // A simple heuristic: First half standard, second half gray/accent
      const mid = Math.ceil(parts.length / 2);
      const firstHalf = parts.slice(0, mid).join(' ');
      const secondHalf = parts.slice(mid).join(' ');
      return (
        <>
          {firstHalf} <br />
          <span className="text-zinc-400 dark:text-zinc-500">{secondHalf}</span>
        </>
      );
    }
    return displayTitle;
  };

  return (
    <section className="py-24 px-6 md:px-16 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-[4/5] w-full rounded-lg overflow-hidden relative z-10">
            <img
              src={getImageUrl(imageUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2144&auto=format&fit=crop")}
              alt="Architect"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative Frame */}
          <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 border border-zinc-200 dark:border-zinc-700 rounded-lg -z-0"></div>
        </div>

        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-accent-600 font-bold tracking-wider uppercase text-sm mb-2 block">{displaySubTitle}</span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
            {renderTitle()}
          </h2>
          <div className="space-y-6 text-zinc-600 dark:text-zinc-400 text-lg font-light leading-relaxed mb-10 whitespace-pre-line">
            {displayDesc}
          </div>

          {(metric1Value || metric2Value) && (
            <div className="grid grid-cols-2 gap-8 pt-4 border-t border-zinc-200 dark:border-zinc-700 mb-8">
              {metric1Value && (
                <div><h4 className="text-3xl font-bold">{metric1Value}</h4><p className="text-sm text-zinc-500 uppercase">{metric1Title || "Metric 1"}</p></div>
              )}
              {metric2Value && (
                <div><h4 className="text-3xl font-bold">{metric2Value}</h4><p className="text-sm text-zinc-500 uppercase">{metric2Title || "Metric 2"}</p></div>
              )}
            </div>
          )}

          <Link to="/studio" className="inline-flex items-center gap-2 text-accent-600 font-bold hover:gap-4 transition-all">
            {t.readManifesto} <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TheStudio;