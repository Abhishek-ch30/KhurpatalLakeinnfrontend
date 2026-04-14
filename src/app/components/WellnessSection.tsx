import React from 'react';
import { motion } from 'motion/react';
import { Wind, Waves, Sun, Sparkles } from 'lucide-react';

export function WellnessSection() {
  return (
    <section id="wellness" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-600 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block"
          >
            Vitaility & Grace
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-7xl font-bold text-[#434021] tracking-tight leading-none mb-6" 
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The Serenity
            <br />
            Sanctuary
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-500 max-w-2xl mx-auto font-medium"
          >
            Reconnect with your inner self amidst the silence of the peaks. Our wellness philosophy is rooted in the healing power of the Himalayas.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Main Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[600px] rounded-[3rem] overflow-hidden group"
          >
            <img 
              src="https://i.ibb.co/Gfx0pxHG/caption.jpg" 
              alt="The Horizon Pool at Khurpatal Lake Inn" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />
            
            <div className="absolute bottom-12 left-12 right-12 flex items-end justify-between">
               <div className="text-white">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Signature Feature</p>
                  <h3 className="text-3xl font-bold tracking-tight">The Horizon Pool</h3>
               </div>
               <div className="p-4 backdrop-blur-xl bg-white/20 border border-white/20 rounded-2xl text-white">
                  <Waves size={32} />
               </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 bg-[#FBF6EE] rounded-[2.5rem] flex flex-col justify-between"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-600 mb-8 shadow-sm">
                <Sun size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#434021] mb-2 tracking-tight">Solarized Serenity</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">Dawn yoga sessions on the terrace, bathed in the first golden rays of the Himalayan sun.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-10 bg-[#434021] text-white rounded-[2.5rem] flex flex-col justify-between shadow-2xl shadow-[#434021]/10"
            >
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-amber-500 mb-8">
                <Wind size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 tracking-tight">Pure Breath</h4>
                <p className="text-sm text-white/50 font-medium leading-relaxed">Air purification by nature. Breathe the purest oxygen directly from the surrounding oak and pine forests.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 p-10 border-2 border-[#434021]/10 rounded-[2.5rem] flex items-center gap-10"
            >
              <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center text-amber-600 shrink-0">
                <Sparkles size={40} />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-[#434021] mb-2 tracking-tight">The 8-8 Philosophy</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4">Dedicated pool hours from 8:00 AM to 8:00 PM ensuring a rhythmic flow to your day.</p>
                <div className="flex gap-4">
                   <div className="px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">Temperature Controlled</div>
                   <div className="px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">Filtered Spring Water</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
