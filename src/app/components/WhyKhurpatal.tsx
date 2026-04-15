import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Mountain, Heart, MapPin, Compass, ArrowRight, Sparkles } from 'lucide-react';

export function WhyKhurpatal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scrollX = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const benefits = [
    {
      icon: Heart,
      title: 'Peaceful Location',
      description: "Away from the hustle of city life, immerse yourself in nature's absolute tranquility.",
      offset: 0
    },
    {
      icon: Mountain,
      title: 'Less Crowded',
      description: 'Unlike Nainital, enjoy an intimate experience without the tourist crowds.',
      offset: 40
    },
    {
      icon: MapPin,
      title: 'Scenic Surroundings',
      description: 'Breathtaking lake and mountain views visible from every corner of our property.',
      offset: -20
    },
  ];

  const nearbyPlaces = [
    { 
        name: 'Nainital', 
        distance: '12 km', 
        image: '/assets/images/nainital.avif',
        desc: 'The sparkling City of Lakes'
    },
    { 
        name: 'Bhimtal', 
        distance: '8 km', 
        image: '/assets/images/bhimtal.avif',
        desc: 'Serene waters and aquarium island'
    },
    { 
        name: 'Sattal', 
        distance: '15 km', 
        image: '/assets/images/sattal.jpg',
        desc: 'Seven interconnected freshwater lakes'
    },
    { 
        name: 'Mukteshwar', 
        distance: '25 km', 
        image: '/assets/images/mukhteshwar.avif',
        desc: 'Panoramic views of the high peaks'
    },
  ];

  return (
    <section id="why-khurpatal" ref={containerRef} className="py-32 px-6 lg:px-12 bg-[#FBF6EE] relative overflow-hidden">
      {/* Topographical Background - PRESERVED */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topo" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M0 100 C 50 120, 150 80, 200 100" stroke="#434021" fill="transparent" strokeWidth="0.5" />
              <path d="M0 150 C 50 170, 150 130, 200 150" stroke="#434021" fill="transparent" strokeWidth="0.5" />
              <path d="M0 50 C 50 70, 150 30, 200 50" stroke="#434021" fill="transparent" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Centered Editorial Header */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-600 text-xs font-black uppercase tracking-[0.5em] mb-6 block"
          >
            The Khurpatal Essence
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2.75rem] sm:text-6xl lg:text-8xl text-[#434021] leading-[1] tracking-tighter mb-8 md:mb-10" 
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Why Choose<br />
            <span className="italic">Khurpatal Lake Inn?</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-base md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto border-t border-amber-500/10 pt-8"
          >
            Beyond standard hospitality, we offer a doorway to the untouched soul of the <br />
            <span className="block text-center w-full mt-2 text-amber-600 italic">Kumaon hills</span>
          </motion.p>
        </div>

        {/* Benefits Mosaic - Re-aligned for Perfection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-24 md:mb-48 items-center">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group relative bg-[#FBF6EE] border border-amber-500/10 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 transition-all duration-700 shadow-sm hover:shadow-2xl hover:bg-white overflow-hidden h-full flex flex-col items-center text-center justify-between"
            >
              {/* Abstract Shape Overlay */}
              <div className="absolute -right-12 -top-12 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all duration-1000" />
              
              <div>
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 border border-amber-100 text-amber-600 shadow-sm group-hover:bg-[#434021] group-hover:text-amber-500 transition-all duration-700 mx-auto">
                  <benefit.icon size={32} strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-bold text-[#434021] mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  {benefit.title}
                </h3>
                <p className="text-slate-500 text-sm font-bold leading-relaxed opacity-80">
                  {benefit.description}
                </p>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-600/40 group-hover:text-amber-600 transition-colors">
                 <div className="h-px w-8 bg-current" />
                 <span>Essence Detail</span>
                 <div className="h-px w-8 bg-current" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nearby Gems - Infinite Moving Gallery */}
        <div className="space-y-16 overflow-hidden">
            <div className="text-center space-y-4">
               <h3 className="text-4xl lg:text-6xl font-bold text-[#434021] tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>Nearby Gems</h3>
               <p className="text-xs text-amber-600 font-black uppercase tracking-[0.4em]">Kumaon's curated wonders</p>
            </div>

            <div className="relative group">
               <motion.div 
                 animate={{ x: ["0%", "-50%"] }}
                 transition={{ 
                   duration: 40, 
                   repeat: Infinity, 
                   ease: "linear",
                 }}
                 className="flex gap-12 w-fit py-12 px-6"
               >
                  {/* Duplicate mapping for infinite loop */}
                  {[...nearbyPlaces, ...nearbyPlaces].map((place, index) => (
                      <motion.div
                          key={`${place.name}-${index}`}
                          className="group/card relative w-[280px] md:w-[400px] h-[400px] md:h-[550px] rounded-[3rem] md:rounded-[4rem] overflow-hidden cursor-pointer border-8 border-white transition-all duration-500 shrink-0"
                      >
                          <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-[2s]" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#434021]/90 via-transparent to-transparent opacity-80 group-hover/card:opacity-100 transition-opacity" />
                          
                          <div className="absolute bottom-12 left-12 right-12">
                              <div className="flex items-center gap-3 mb-4">
                                 <div className="h-1 w-1 bg-amber-500 rounded-full" />
                                 <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block">{place.distance} Journey</span>
                              </div>
                              <h4 className="text-4xl font-bold text-white mb-4 leading-[1] tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>{place.name}</h4>
                              <p className="text-sm text-white/70 font-bold leading-relaxed max-w-[80%] opacity-0 group-hover/card:opacity-100 transition-all duration-700 translate-y-6 group-hover/card:translate-y-0 italic">
                                  {place.desc}
                              </p>
                          </div>
                      </motion.div>
                  ))}
               </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
}
