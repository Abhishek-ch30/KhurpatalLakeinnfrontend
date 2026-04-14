import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, MapPin, Calendar, Heart } from 'lucide-react';
import { WeatherWidget } from './WeatherWidget';
import { useBookingFlow } from '../hooks/useBookingFlow';

interface PlanStaySectionProps {
  onStartConversation: () => void;
  flow: ReturnType<typeof useBookingFlow>;
}

export function PlanStaySection({ onStartConversation, flow }: PlanStaySectionProps) {
  return (
    <section id="plan-stay" className="py-32 px-6 lg:px-12 bg-[#FBF6EE] relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Content Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <span className="text-amber-600 tracking-[0.4em] text-[10px] font-black uppercase mb-4 block">Tailored Experiences</span>
              <h2 className="text-5xl lg:text-7xl text-[#434021] leading-tight mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                Your Stay, <br />Intelligently Crafted.
              </h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                Let our virtual concierge help you design the perfect itinerary. From lakeside yoga to bonfire jamming, we curate moments just for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-xl shadow-amber-500/10 border border-slate-50 shrink-0">
                     <Heart size={24} />
                  </div>
                  <div>
                     <h4 className="font-bold text-slate-900 mb-1">Personalized</h4>
                     <p className="text-sm text-slate-400 font-medium">Bespoke itineraries based on your interests.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-xl shadow-amber-500/10 border border-slate-50 shrink-0">
                     <Calendar size={24} />
                  </div>
                  <div>
                     <h4 className="font-bold text-slate-900 mb-1">Seamless</h4>
                     <p className="text-sm text-slate-400 font-medium">Book your entire stay with one single flow.</p>
                  </div>
               </div>
            </div>

            <div className="flex flex-wrap gap-6 pt-6">
                <button 
                  onClick={onStartConversation}
                  className="bg-[#434021] text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs flex items-center gap-3 hover:bg-black transition-all shadow-2xl shadow-[#434021]/20 group"
                >
                   <span>Start Conversation</span>
                   <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                </button>
               <button className="bg-white border border-slate-200 text-[#434021] px-10 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs flex items-center gap-3 hover:border-[#434021] transition-all group">
                  <span>View Sample Stay</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
          </motion.div>

          {/* Interactive Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
             {/* Main Weather Widget */}
             <div className="relative z-20 md:pr-20">
                <WeatherWidget flow={flow} />
             </div>

             {/* Floating Info Card */}
             <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-10 right-0 z-30 bg-white p-6 rounded-3xl shadow-2xl border border-slate-50 max-w-[240px] hidden md:block"
             >
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-8 h-8 bg-green-500/10 text-green-600 rounded-lg flex items-center justify-center">
                      <ShieldCheck size={18} />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security First</span>
                </div>
                <p className="text-xs font-bold text-slate-700 leading-relaxed">
                   Live booking verification enabled for all Himalayan sanctuaries.
                </p>
             </motion.div>

             {/* Decorative Background Frame */}
             <div className="absolute top-10 -right-10 bottom-10 -left-10 bg-gradient-to-br from-amber-500/5 to-transparent rounded-[3rem] border border-amber-500/10 -z-1" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
