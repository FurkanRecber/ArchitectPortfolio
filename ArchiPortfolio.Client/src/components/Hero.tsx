import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { getImageUrl } from '../utils/imageUrlHelper';

interface HeroProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  buttonText?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, imageUrl, buttonText }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center text-center px-6">
      <div className="absolute inset-0 z-0">
        <img
          src={getImageUrl(imageUrl)}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        {/* Resimdeki gibi koyu filtre ve aşağıya doğru zinc-950'ye geçiş */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-zinc-950" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center mt-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-light text-white mb-6 tracking-tight leading-[1.1]"
        >
          {title || "Visionary Spaces"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg text-white/80 max-w-md font-light mb-12"
        >
          {subtitle || "Crafting sustainable modern living through precision, light, and timeless materials."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col items-center gap-4 animate-bounce cursor-pointer"
          onClick={() => {
            const element = document.getElementById('selected-projects');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">{buttonText || "Explore"}</span>
          <ArrowDown className="text-white w-5 h-5" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;