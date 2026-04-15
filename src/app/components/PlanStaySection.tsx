import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { WeatherWidget } from './WeatherWidget';
import { Sparkles, MapPin, Compass } from 'lucide-react';
import { useBookingFlow } from '../hooks/useBookingFlow';

interface PlanStaySectionProps {
  flow: ReturnType<typeof useBookingFlow>;
  onStartConversation?: () => void;
}

export function PlanStaySection({ flow, onStartConversation }: PlanStaySectionProps) {
  return (
    <section id="plan-stay" className="relative py-32 px-6 lg:px-12 bg-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[700px] bg-amber-500/5 rounded-full blur-[120px] -z-0 opacity-40" />

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
             <span className="text-amber-700 tracking-[0.5em] text-[10px] font-black uppercase">Tailored Experiences</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-8xl text-[#434021] leading-[1] tracking-tighter mb-8" 
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Your Stay,<br />
            <span className="italic text-amber-600">Inspired by Nature</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto border-t border-amber-500/10 pt-8"
          >
            Experience Khurpatal through a curated lens. From emerald lake reflections to crisp mountain mornings, your journey is our legacy.
          </motion.p>
        </div>

        {/* The Focus Ring - Out of the Box Radial/Balanced Composition */}
        <div className="relative flex flex-col items-center">
           
           {/* Surround Elements - Images radiating around the hub */}
           <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Wing - Nature Inspiration */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="lg:col-span-4 space-y-8"
              >
                  <div className="relative rounded-[3rem] overflow-hidden border-4 border-[#FBF6EE] shadow-xl h-[300px] group">
                     <ImageWithFallback 
                        src="https://i.ibb.co/XZvkdBfB/photo-1601622256416-d7f757f99eb2.avif" 
                        alt="Khurpatal Nature" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                     />
                     <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  </div>
                  
                  <div className="p-8 bg-[#FBF6EE] rounded-[2.5rem] border border-amber-500/10">
                     <div className="flex items-center gap-3 mb-4 text-amber-600">
                        <MapPin size={20} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Local Insight</span>
                     </div>
                     <p className="text-sm font-bold text-[#434021] leading-relaxed">
                       "Witness the lake change from teal to emerald as the morning sun hits the valley floor."
                     </p>
                  </div>
              </motion.div>

              {/* Center Hub - The Interactive Widget */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-4 z-20"
              >
                 <div className="relative">
                    {/* Ring Glow Effect */}
                    <div className="absolute inset-0 bg-amber-500/20 blur-[60px] rounded-full -z-1 scale-90" />
                    <WeatherWidget onStartConversation={onStartConversation} />
                 </div>
              </motion.div>

              {/* Right Wing - Experience Curation */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="lg:col-span-4 space-y-8"
              >
                  <div className="p-8 bg-[#FBF6EE] rounded-[2.5rem] border border-amber-500/10">
                     <div className="flex items-center gap-3 mb-4 text-amber-600">
                        <Compass size={20} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Curated Journey</span>
                     </div>
                     <p className="text-sm font-bold text-[#434021] leading-relaxed">
                       "Every stay supports the local Kumaon ecosystem through our heritage preservation protocol."
                     </p>
                  </div>

                  <div className="relative rounded-[3rem] overflow-hidden border-4 border-[#FBF6EE] shadow-xl h-[300px] group text-right">
                     <ImageWithFallback 
                        src="https://i.ibb.co/MkphPXbC/photo-1683973200791-47539048cf63.avif" 
                        alt="Lake Reflection" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                     />
                     <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                     <div className="absolute top-6 left-6 right-6 flex justify-end">
                        <div className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-amber-500">
                           <Sparkles size={20} />
                        </div>
                     </div>
                  </div>
              </motion.div>
           </div>

           {/* Decorative Balanced Frame */}
           <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-1">
              <div className="absolute top-0 right-0 w-40 h-40 border-t-2 border-r-2 border-amber-500/20 rounded-tr-[5rem]" />
              <div className="absolute top-0 left-0 w-40 h-40 border-t-2 border-l-2 border-amber-500/20 rounded-tl-[5rem]" />
              <div className="absolute bottom-0 right-0 w-40 h-40 border-b-2 border-r-2 border-amber-500/20 rounded-br-[5rem]" />
              <div className="absolute bottom-0 left-0 w-40 h-40 border-b-2 border-l-2 border-amber-500/20 rounded-bl-[5rem]" />
           </div>
        </div>
      </div>
    </section>
  );
}
