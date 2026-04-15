import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Calendar, MapPin, Navigation } from 'lucide-react';

interface FinalCTAProps {
  onBookNow: () => void;
}

export function FinalCTA({ onBookNow }: FinalCTAProps) {
  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-[#434021]">
      {/* Cinematic Parallax Backdrop */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
           <div className="absolute inset-0 bg-black/40 z-10" />
           <img 
             src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80" 
             alt="Himalayan Horizon" 
             className="w-full h-full object-cover grayscale-[20%] contrast-[1.1]"
           />
        </motion.div>
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent z-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#434021]/20 via-transparent to-[#434021] z-20" />
      </div>

      {/* The Inevitable Horizon Content */}
      <div className="max-w-6xl mx-auto px-6 text-center relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* The Path to Clarity - Section Bridge */}
          <div className="flex flex-col items-center gap-4 mb-10 opacity-80">
             <div className="w-12 h-px bg-[#434021]/20" />
             <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[#434021]">The Path to Clarity</p>
          </div>

          {/* Availability Pulse Badge - Enhanced Visibility */}
          <div className="flex justify-center mb-12">
             <motion.div 
               animate={{ scale: [1, 1.05, 1] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="inline-flex items-center gap-3 px-6 py-2 backdrop-blur-xl bg-[#434021]/60 border border-white/20 rounded-full shadow-2xl"
             >
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
                <span className="text-white tracking-[0.4em] text-[10px] font-black uppercase">Availability: Strictly Limited</span>
             </motion.div>
          </div>

          <h2 className="text-[2.75rem] md:text-9xl text-white leading-[0.9] tracking-tighter mb-8 md:mb-12" style={{ fontFamily: 'var(--font-heading)' }}>
            Your Himalayan <br />
            <span className="italic text-amber-500">Legacy</span> Begins.
          </h2>
          
          <p className="text-white/60 text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-[1.4] mb-12 md:mb-16 border-t border-white/10 pt-8 md:pt-12">
            Don't just witness the beauty of Khurpatal—become a part of its story. Secure your place between the peaks.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
            <button
              onClick={onBookNow}
              className="w-full md:w-auto px-10 md:px-16 py-5 md:py-7 bg-amber-500 text-[#434021] rounded-full font-black uppercase tracking-[0.3em] text-[9px] md:text-[10px] hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-4 group relative overflow-hidden active:scale-95"
            >
              <span className="relative z-10">Secure My Stay</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-3 transition-transform duration-500" />
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
            
            <button
              className="w-full md:w-auto px-10 md:px-16 py-5 md:py-7 bg-transparent text-white border border-white/20 rounded-full font-black uppercase tracking-[0.3em] text-[9px] md:text-[10px] hover:bg-white/5 transition-all flex items-center justify-center gap-4 active:scale-95"
            >
              Contact Concierge
              <Navigation size={16} className="opacity-40" />
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-12 mt-24 opacity-20">
             <div className="flex items-center gap-3">
                <MapPin size={14} />
                <span className="text-[10px] uppercase tracking-[0.4em] font-black">Uttarakhand</span>
             </div>
             <div className="w-1.5 h-1.5 bg-white rounded-full opacity-20" />
             <div className="flex items-center gap-3">
                <Calendar size={14} />
                <span className="text-[10px] uppercase tracking-[0.4em] font-black">Open Year Round</span>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Signature Accents */}
      <div className="absolute top-20 left-20 w-32 h-32 border-t border-l border-white/10 rounded-tl-[4rem] pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-32 h-32 border-b border-r border-white/10 rounded-br-[4rem] pointer-events-none" />
    </section>
  );
}
