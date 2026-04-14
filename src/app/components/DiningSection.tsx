import React from 'react';
import { motion } from 'motion/react';
import { ChefHat, Utensils, Wine, Clock } from 'lucide-react';

export function DiningSection() {
  return (
    <section id="dining" className="py-24 bg-[#FBF6EE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Visual Canvas */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative group"
          >
            <div className="relative z-10 aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=1200&q=80" 
                alt="The Emerald Kitchen" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#434021]/60 to-transparent" />
              
              {/* Floating Caption */}
              <div className="absolute bottom-12 left-12 right-12 p-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl">
                 <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Signature Experience</p>
                 <h4 className="text-white text-2xl font-bold tracking-tight">Sunset Over The Lake</h4>
              </div>
            </div>
            
            {/* Decortive Elements */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full z-0" />
          </motion.div>

          {/* Narrative Content */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-amber-600 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block"
              >
                Gastronomy
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl lg:text-7xl font-bold text-[#434021] tracking-tight leading-[0.9]" 
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                The Emerald
                <br />
                Kitchen
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-lg text-slate-600 font-medium leading-relaxed italic border-l-4 border-amber-500 pl-6"
            >
              "Where mountain heritage meets modern elegance, served with a side of golden reflections."
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-slate-500 leading-relaxed font-medium"
            >
              Indulge in an editorial dining experience curated by our master chefs. Using organic ingredients from the surrounding Kumaon hills, we serve mountain gastronomy that speaks of the soul.
            </motion.p>

            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-4">
                  <div className="flex items-center gap-3 text-amber-600">
                     <Utensils size={20} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Cuisine</span>
                  </div>
                  <p className="text-sm font-bold text-[#434021]">Kumaoni Fusion &<br />Continental Classics</p>
               </div>
               <div className="space-y-4">
                  <div className="flex items-center gap-3 text-amber-600">
                     <Wine size={20} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Atmosphere</span>
                  </div>
                  <p className="text-sm font-bold text-[#434021]">Elegant Manor<br />Lakeview Terrace</p>
               </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-6"
            >
               <button className="px-10 py-5 bg-[#434021] text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-black transition-all shadow-xl shadow-[#434021]/10">
                  Plan Your Experience
               </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
