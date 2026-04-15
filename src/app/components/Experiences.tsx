import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { PartyPopper, Users, Cake, Heart, Sparkles, Compass } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ExperienceCardProps {
  experience: {
    icon: any;
    title: string;
    description: string;
    image: string;
    size?: string;
  };
  index: number;
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 100, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`group relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl transition-all duration-700
        ${experience.size === 'large' ? 'lg:col-span-2 h-[450px] md:h-[600px]' : 'lg:col-span-1 h-[450px] md:h-[600px]'}
      `}
    >
      {/* Background Image */}
      <div className="absolute inset-0 scale-105 group-hover:scale-110 transition-transform duration-[2s]">
        <ImageWithFallback
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#434021]/90 via-black/20 to-transparent" />
      </div>

      {/* Floating Glass Detail */}
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end pointer-events-none" style={{ transform: 'translateZ(50px)' }}>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] relative z-10">
             <div className="w-14 h-14 rounded-2xl bg-amber-500 text-[#434021] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                <experience.icon size={28} />
             </div>
             <h3 className="text-3xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                {experience.title}
             </h3>
             <p className="text-white/70 text-sm font-medium leading-relaxed max-w-sm">
                {experience.description}
             </p>
          </div>
      </div>

      {/* 4-Corner Signature Accents (Only on Featured) */}
      {experience.size === 'large' && (
         <div className="absolute top-8 right-8 w-24 h-24 border-t border-r border-white/20 rounded-tr-[3rem] pointer-events-none" />
      )}
      <div className="absolute bottom-8 left-8 w-24 h-24 border-b border-l border-white/20 rounded-bl-[3rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}

export function Experiences() {
  const allExperiences = [
    {
      icon: Heart,
      title: 'Romantic Getaways',
      description: 'Intimate candlelight settings perfect for couples and honeymooners looking for secluded hill magic.',
      image: 'https://images.unsplash.com/photo-1713149733386-9565729633ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxpbmZpbml0eSUyMHBvb2wlMjBtb3VudGFpbiUyMHZpZXclMjByZXNvcnR8ZW58MXx8fHwxNzc2MTU0MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      size: 'large'
    },
    {
      icon: Cake,
      title: 'Celebrations',
      description: 'Birthdays and anniversaries made memorable in our grand manor hall.',
      image: 'https://images.unsplash.com/photo-1775589805702-1bc62e544d9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxpbmZpbml0eSUyMHBvb2wlMjBtb3VudGFpbiUyMHZpZXclMjByZXNvcnR8ZW58MXx8fHwxNzc2MTU0MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Compass,
      title: 'Mountain Discovery',
      description: 'Guided nature walks and trekking through the untouched Kumaoni trails.',
      image: 'https://images.unsplash.com/photo-1619773473286-a3361c810826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHx1dHRhcmFraGFuZCUyMG1vdW50YWlucyUyMG5haW5pdGFsJTIwbGFrZXxlbnwxfHx8fDE3NzYxNTQwOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <section id="experiences" className="py-32 px-6 lg:px-12 bg-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Centered Editorial Header */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 rounded-full mb-6"
          >
             <div className="w-1 h-1 bg-amber-500 rounded-full animate-pulse" />
             <span className="text-amber-700 tracking-[0.5em] text-[10px] font-black uppercase">Experiences</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2.75rem] sm:text-6xl lg:text-8xl text-[#434021] leading-[1] tracking-tighter mb-8" 
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Unforgettable <br />
            <span className="italic">Moments</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-base md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto border-t border-amber-500/10 pt-8"
          >
            Create lasting memories with our curated experiences, designed to immerse you in the quiet grandeur of the Kumaon hills.
          </motion.p>
        </div>

        {/* The Experience Triptych - Out of the Box Symmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-flow-row-dense gap-8">
           {allExperiences.map((exp, index) => (
             <ExperienceCard key={exp.title} experience={exp} index={index} />
           ))}
        </div>

        {/* Bespoke Discovery Anchor */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex justify-center pt-24"
        >
          <button className="flex items-center gap-6 group">
             <div className="w-12 h-px bg-amber-500/20 group-hover:w-24 transition-all duration-700" />
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-600 group-hover:text-[#434021] transition-colors">Curated Curation</span>
             <div className="w-12 h-px bg-amber-500/20 group-hover:w-24 transition-all duration-700" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
