import React from 'react';
import { motion } from 'motion/react';
import { Wind, Waves, Sun, Sparkles, Compass, Sparkle } from 'lucide-react';

export function WellnessSection() {
  return (
    <section id="wellness" className="py-32 bg-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-amber-500/5 blur-[120px] rounded-full -z-0 opacity-40 pointer-events-none" />
      
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
             <span className="text-amber-700 tracking-[0.5em] text-[10px] font-black uppercase">Vitality & Grace</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-8xl text-[#434021] leading-[1] tracking-tighter mb-8" 
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The <span className="italic">Serenity</span><br />
            <span className="italic text-amber-600 font-medium text-4xl lg:text-7xl">Sanctuary</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto border-t border-amber-500/10 pt-8"
          >
            Reconnect with your inner self amidst the silence of the peaks. Our wellness philosophy is rooted in the healing power of the Himalayas.
          </motion.p>
        </div>

        {/* The Panorama Showcase - Out of the Box Composition */}
        <div className="relative mb-24">
           {/* Centerpiece Panorama */}
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             viewport={{ once: true }}
             className="relative w-full h-[500px] lg:h-[650px] rounded-[4.5rem] overflow-hidden shadow-2xl border-8 border-white group"
           >
              <img 
                src="/assets/images/2025-12-24 (2).jpg" 
                alt="The Horizon Pool at Khurpatal Lake Inn" 
                className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#434021]/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating Glass Detail - Responsive Alignment */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-auto p-6 md:p-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-[2.5rem] md:rounded-[3rem] text-white md:max-w-xs transition-all group-hover:bg-white/20 text-center">
                 <div className="flex flex-col items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-[#434021]">
                       <Waves size={20} />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight">The Horizon Pool</h3>
                 </div>
                 <p className="text-white/60 text-xs font-bold leading-relaxed">Filtered mountain spring water, temperature-controlled for perfect relaxation overlooking the lake.</p>
              </div>

              {/* Status Badge - Top Left */}
              <div className="absolute top-10 left-10">
                 <div className="bg-white/90 backdrop-blur-xl px-6 py-3 rounded-full shadow-lg border border-white flex items-center gap-3">
                    <Sparkle size={16} className="text-amber-500 animate-spin-slow" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#434021]">Signature Experience</span>
                 </div>
              </div>
           </motion.div>

           {/* 4-Corner Signature Accents */}
           <div className="absolute -top-8 -right-8 w-40 h-40 border-t-2 border-r-2 border-amber-500/20 rounded-tr-[5rem] pointer-events-none" />
           <div className="absolute -bottom-8 -left-8 w-40 h-40 border-b-2 border-l-2 border-amber-500/20 rounded-bl-[5rem] pointer-events-none" />
        </div>

        {/* The Trinity Base - Perfectly Balanced Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Solarized Serenity */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 bg-[#FBF6EE] rounded-[3rem] border border-amber-500/10 hover:bg-white hover:shadow-2xl transition-all duration-500 group text-center"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 text-amber-600 border border-amber-100 group-hover:bg-[#434021] group-hover:text-amber-500 transition-all duration-500 mx-auto">
                <Sun size={24} />
              </div>
              <h4 className="text-2xl font-bold text-[#434021] mb-4 tracking-tight">Solarized Serenity</h4>
              <p className="text-slate-500 text-sm font-bold leading-relaxed opacity-80 mb-6">Dawn yoga sessions on the terrace, bathed in the first golden rays of the Himalayan sun.</p>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600/40">Mindfulness Ritual</div>
            </motion.div>

            {/* Pure Breath */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-10 bg-[#434021] text-white rounded-[3rem] shadow-2xl shadow-[#434021]/10 group text-center border border-white/5"
            >
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-amber-500 mb-8 mx-auto">
                <Wind size={24} />
              </div>
              <h4 className="text-2xl font-bold mb-4 tracking-tight">Pure Breath</h4>
              <p className="text-white/50 text-sm font-bold leading-relaxed mb-6">Air purification by nature. Breathe the purest oxygen directly from surrounding oak forests.</p>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Nature Ritual</div>
            </motion.div>

            {/* The 8-8 Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 bg-[#FBF6EE] rounded-[3rem] border border-amber-500/10 hover:bg-white hover:shadow-2xl transition-all duration-500 group text-center"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 text-amber-600 border border-amber-100 group-hover:bg-[#434021] group-hover:text-amber-500 transition-all duration-500 mx-auto">
                <Sparkles size={24} />
              </div>
              <h4 className="text-2xl font-bold text-[#434021] mb-4 tracking-tight">8-8 Philosophy</h4>
              <p className="text-slate-500 text-sm font-bold leading-relaxed opacity-80 mb-6">Dedicated pool hours from 8AM to 8PM ensuring a rhythmic flow to your day.</p>
              <div className="flex justify-center gap-2">
                 <div className="px-3 py-1 bg-amber-500/10 rounded-full text-[8px] font-bold text-amber-700 uppercase tracking-widest leading-none">Spring Water</div>
              </div>
            </motion.div>

        </div>

        {/* Centered Discovery Anchor */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex justify-center pt-24"
        >
          <button className="flex items-center gap-6 group">
             <div className="w-12 h-px bg-amber-500/20 group-hover:w-24 transition-all duration-700" />
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-600 group-hover:text-[#434021] transition-colors">Experience the Sanctuary</span>
             <div className="w-12 h-px bg-amber-500/20 group-hover:w-24 transition-all duration-700" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
