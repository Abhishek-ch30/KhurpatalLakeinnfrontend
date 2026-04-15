import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Expand, Maximize2, Camera } from 'lucide-react';

export function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const images = [
    {
      url: 'https://i.ibb.co/tM4g1m0H/In-Shot-20240726-2246565361-scaled.jpg',
      title: 'Grand Manor Dusk',
      span: 'lg:col-span-2 lg:row-span-2'
    },
    {
      url: 'https://i.ibb.co/YBszTZ1b/caption-13.jpg',
      title: 'Lake Reflections',
      span: 'lg:col-span-1 lg:row-span-1'
    },
    {
      url: 'https://i.ibb.co/TqN8jQpQ/caption-14.jpg',
      title: 'Mountain Pulse',
      span: 'lg:col-span-1 lg:row-span-1'
    },
    {
      url: 'https://i.ibb.co/yc5ttD7m/2025-12-24-2.jpg',
      title: 'Heritage Welcome',
      span: 'lg:col-span-1 lg:row-span-2'
    },
    {
      url: 'https://i.ibb.co/HDSQfrLn/IMG-2690-1-scaled.jpg',
      title: 'Secluded Sanctuary',
      span: 'lg:col-span-1 lg:row-span-1'
    },
    {
      url: 'https://i.ibb.co/HvHxtnH/IMG-2742-1-scaled.jpg',
      title: 'Bespoke Comfort',
      span: 'lg:col-span-2 lg:row-span-1'
    },
    {
      url: 'https://i.ibb.co/SwXdMQ3m/IMG20240725112848-scaled.jpg',
      title: 'Terrace Views',
      span: 'lg:col-span-1 lg:row-span-1'
    },
  ];

  return (
    <section id="gallery" className="py-40 bg-white relative overflow-hidden">
      {/* Editorial Accents */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Centered Editorial Header */}
        <div className="text-center mb-32 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 rounded-full mb-6"
          >
             <div className="w-1 h-1 bg-amber-500 rounded-full animate-pulse" />
             <span className="text-amber-700 tracking-[0.5em] text-[10px] font-black uppercase">Visual Anthology</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2.75rem] sm:text-6xl lg:text-8xl text-[#434021] leading-[1] tracking-tighter mb-8" 
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The Editorial <br />
            <span className="italic text-amber-600">Canvas</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-base md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto border-t border-amber-500/10 pt-8"
          >
            A curated glimpse into the beauty and silent grandeur that awaits within the Khurpatal Manor.
          </motion.p>
        </div>

        {/* The Editorial Canvas - Clean Staggered Mosaic */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
           {/* Section Framing */}
           <div className="absolute -inset-10 border border-amber-500/5 rounded-[5rem] pointer-events-none -z-10" />
           <div className="absolute -inset-4 border border-amber-500/10 rounded-[4rem] pointer-events-none -z-10" />

           {images.map((image, index) => (
             <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className={`relative group ${image.span} z-[${hoveredIndex === index ? 50 : index}]`}
             >
                <div className="relative overflow-hidden rounded-[3rem] shadow-2xl bg-slate-100 aspect-[4/5] lg:aspect-auto h-full">
                   <motion.div
                      animate={{ scale: hoveredIndex === index ? 1.05 : 1 }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full"
                   >
                      <ImageWithFallback
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-[2s]"
                      />
                   </motion.div>

                   {/* Signature Lens Reveal */}
                   <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-[#434021]/30 backdrop-blur-[2px] flex flex-col justify-end p-10 cursor-none"
                        >
                           <motion.div
                             initial={{ y: 20, opacity: 0 }}
                             animate={{ y: 0, opacity: 1 }}
                             className="backdrop-blur-2xl bg-white/10 border border-white/20 p-6 rounded-[2rem] flex items-center justify-between"
                           >
                              <div>
                                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">Perspective</p>
                                 <h4 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>{image.title}</h4>
                              </div>
                              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white">
                                 <Camera size={18} strokeWidth={1.5} />
                              </div>
                           </motion.div>
                        </motion.div>
                      )}
                   </AnimatePresence>

                   {/* 4-Corner Accent (Organic Reveal) */}
                   <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-white/40 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
             </motion.div>
           ))}
        </div>

        {/* Global Discovery Anchor */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-col items-center gap-12 pt-32"
        >
          <div className="flex flex-col items-center gap-6">
             <div className="w-16 h-px bg-amber-500/20" />
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-600">The Visual Anthology</p>
             <button className="px-12 py-5 bg-[#434021] text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-amber-600 transition-all shadow-2xl">
                Explore Full Archives
                <Expand size={14} className="opacity-40" />
             </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
