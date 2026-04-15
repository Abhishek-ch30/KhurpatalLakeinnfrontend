import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Sparkles, Heart, Shield } from 'lucide-react';

export function Story() {
  return (
    <section id="our-story" className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-[#FBF6EE] to-[#EAE9D1] overflow-hidden border-t border-amber-500/5">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#434021]/5 rounded-full blur-[120px] -z-0 opacity-60" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Centered Editorial Header */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#434021]/10 rounded-full mb-6"
          >
             <div className="w-1 h-1 bg-[#434021] rounded-full animate-pulse" />
             <span className="text-[#434021]/70 tracking-[0.5em] text-[10px] font-black uppercase">Our Heritage</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-8xl text-[#434021] leading-[1] tracking-tighter mb-8" 
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Escape the <span className="italic">noise</span>.<br />
            Discover <span className="italic text-amber-600">serenity</span>.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto border-t border-amber-500/10 pt-8"
          >
            Nestled in the heart of Uttarakhand's pristine mountains, Khurpatal Lake Inn is more than a destination—it's an experience curated to reconnect you with nature.
          </motion.p>
        </div>

        {/* The Heritage Prism - Out of the Box Symmetrical Composition */}
        <div className="relative mt-12 pb-24">
           {/* Centerpiece Image - Full width contained */}
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             viewport={{ once: true }}
             className="relative w-full h-[600px] rounded-[5rem] overflow-hidden shadow-2xl border-8 border-white"
           >
              <ImageWithFallback
                src="/assets/images/photo-1732510291333-b347b91e20bf.avif"
                alt="Panoramic view of Khurpatal Lake Inn mountains"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#434021]/40 via-transparent to-transparent" />
           </motion.div>

           {/* Floating Overlays - Creating the Prism Depth */}
           <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-12 z-20 pointer-events-none">
              
              {/* Curation Card - Left Floating Overlay */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                viewport={{ once: true }}
                className="pointer-events-auto bg-white/80 backdrop-blur-2xl p-10 rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border border-white max-w-[320px] -translate-x-1/2 lg:-translate-x-0 hidden md:block"
              >
                 <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                    <Heart size={24} />
                 </div>
                 <h4 className="text-xl font-bold text-[#434021] mb-2 tracking-tight">Curation</h4>
                 <p className="text-sm text-slate-400 font-bold leading-relaxed">
                   Intimate stays where luxury meets the quiet whispers of the Himalayan hills.
                 </p>
              </motion.div>

              {/* Sanctuary Card - Right Floating Overlay */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                viewport={{ once: true }}
                className="pointer-events-auto bg-white/80 backdrop-blur-2xl p-10 rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border border-white max-w-[320px] translate-x-1/2 lg:translate-x-0 hidden md:block"
              >
                 <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                    <Shield size={24} />
                 </div>
                 <h4 className="text-xl font-bold text-[#434021] mb-2 tracking-tight">Sanctuary</h4>
                 <p className="text-sm text-slate-400 font-bold leading-relaxed">
                   Far from crowded spots, discover a private retreat rooted in Himalayan soul.
                 </p>
              </motion.div>
           </div>

           {/* Signature Floating Badge - Consistent with Essentials */}
           <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-30 bg-[#434021] text-white p-10 rounded-[3rem] shadow-2xl border border-white/10 max-w-[400px] text-center"
           >
              <div className="flex flex-col items-center gap-4">
                 <div className="w-10 h-10 bg-amber-500 text-[#434021] rounded-2xl flex items-center justify-center">
                    <Sparkles size={20} />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500">Rooted in Legacy</span>
                 <p className="text-sm font-medium leading-relaxed italic">
                   "Capturing the soulful reflection of the emerald lake since its very inception."
                 </p>
              </div>
           </motion.div>

        </div>
      </div>
    </section>
  );
}
