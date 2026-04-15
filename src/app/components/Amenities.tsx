import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Waves, Dumbbell, Utensils, Wifi, Music, Sparkles, Coffee, Shield, Gamepad2 } from 'lucide-react';

interface MagneticIconProps {
  children: React.ReactNode;
}

function MagneticIcon({ children }: MagneticIconProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function onMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      className="relative mb-8 w-24 h-24 mx-auto cursor-none"
    >
      <div className="absolute inset-0 bg-[#434021] rounded-[2rem] rotate-6 group-hover:rotate-12 group-hover:bg-amber-500 transition-all duration-700" />
      <div className="absolute inset-0 bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] flex items-center justify-center text-[#434021] shadow-2xl group-hover:scale-110 transition-transform duration-500">
        {children}
      </div>
    </motion.div>
  );
}

export function Amenities() {
  const amenities = [
    {
      icon: Waves,
      title: 'Horizon Pool',
      description: 'Temperature-controlled infinity pool with panoramic Himalayan views.',
      category: 'Wellness',
      size: 'large'
    },
    {
      icon: Gamepad2,
      title: 'Leisure Zone',
      description: 'Dedicated space for indoor games, movies, and family relaxation.',
      category: 'Entertainment',
      size: 'small'
    },
    {
      icon: Dumbbell,
      title: 'Vault Gym',
      description: 'Modern fitness center equipped with elite strength and cardio machines.',
      category: 'Vitality',
      size: 'small'
    },
    {
      icon: Utensils,
      title: 'Crest Dining',
      description: 'A multi-cuisine fine dining experience crafted by our master chefs.',
      category: 'Gastronomy',
      size: 'large'
    },
    {
      icon: Sparkles,
      title: 'Heritage Trails',
      description: 'Bespoke group experiences, from bonfires to guided nature walks.',
      category: 'Experiences',
      size: 'small'
    },
    {
      icon: Wifi,
      title: 'Cloud Connect',
      description: 'Seamless high-speed connectivity across the entire mountain estate.',
      category: 'Connectivity',
      size: 'small'
    },
  ];

  return (
    <section id="amenities" className="py-32 bg-[#FBF6EE] relative overflow-hidden">
      {/* Premium Ambience Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Centered Editorial Header */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 rounded-full mb-6"
          >
             <div className="w-1 h-1 bg-amber-500 rounded-full animate-pulse" />
             <span className="text-amber-700 tracking-[0.5em] text-[10px] font-black uppercase">Signature Curation</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2.75rem] sm:text-6xl lg:text-8xl text-[#434021] leading-[1] tracking-tighter mb-8" 
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Essential <br />
            <span className="italic text-amber-600">Amenities</span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            className="h-px w-32 bg-amber-500/20 mx-auto"
          />
        </div>

        {/* The Essential Mosaic - Out of the Box Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {amenities.map((amenity, index) => (
             <motion.div
                key={amenity.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 overflow-hidden border border-amber-500/5 hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-700 flex flex-col items-center text-center justify-between
                  ${amenity.size === 'large' ? 'lg:col-span-2' : 'lg:col-span-1'}
                `}
             >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full group-hover:scale-150 transition-transform duration-1000" />
                
                <div className="relative z-10">
                   <MagneticIcon>
                      <amenity.icon size={36} strokeWidth={1.5} className="group-hover:text-amber-600 transition-colors" />
                   </MagneticIcon>

                   <div className="mb-8">
                      <div className="flex items-center justify-center gap-3 mb-4">
                         <div className="h-px w-8 bg-amber-500/20" />
                         <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600/60">{amenity.category}</span>
                         <div className="h-px w-8 bg-amber-500/20" />
                      </div>
                      <h3 className="text-3xl font-bold text-[#434021] tracking-tight mb-4 group-hover:scale-110 transition-transform duration-500" style={{ fontFamily: 'var(--font-heading)' }}>
                         {amenity.title}
                      </h3>
                      <p className={`text-slate-500 font-medium leading-relaxed opacity-80 ${amenity.size === 'large' ? 'text-lg max-w-md' : 'text-sm'}`}>
                         {amenity.description}
                      </p>
                   </div>
                </div>

                <div className="relative z-10 pt-8 border-t border-amber-500/10 flex flex-col items-center gap-3 group-hover:border-amber-500/30 transition-colors w-full">
                   <div className="w-2 h-2 rounded-full bg-amber-500 group-hover:scale-150 transition-transform" />
                   <div className="text-[8px] font-black uppercase tracking-widest text-slate-300 group-hover:text-[#434021] transition-colors">Luxury Standard</div>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Global Anchor Transition */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex justify-center pt-24"
        >
          <div className="flex flex-col items-center gap-6">
             <div className="w-24 h-px bg-amber-500/20" />
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-600">The Khurpatal Manor Collection</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
