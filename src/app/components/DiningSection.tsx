import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChefHat, Utensils, Wine, Clock, Sparkles, MapPin, Coffee } from 'lucide-react';

const KITCHEN_IMAGES = [
  "https://i.ibb.co/mkfrxBY/2025-12-24.jpg",
  "https://i.ibb.co/3mV1tYx8/caption-12.jpg",
  "https://i.ibb.co/LXp5x5cf/caption-11.jpg",
  "https://i.ibb.co/zhzWm6mp/2025-12-24-4.jpg",
  "https://i.ibb.co/rKSt52pd/2025-02-09.jpg"
];

export function DiningSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % KITCHEN_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="dining" className="py-32 bg-white relative overflow-hidden ring-1 ring-amber-500/5">
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
             <span className="text-amber-700 tracking-[0.5em] text-[10px] font-black uppercase">Gastronomy</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2.75rem] sm:text-6xl lg:text-8xl text-[#434021] leading-[1] tracking-tighter mb-8" 
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The <span className="italic">Emerald</span><br />
            <span className="italic text-amber-600 font-medium">Kitchen</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-base md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto border-t border-amber-500/10 pt-8"
          >
            Where mountain heritage meets modern elegance, served with a side of golden reflections. A culinary journey curated to nourish the soul.
          </motion.p>
        </div>

        {/* The Radial Composition - Out of the Box Symmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          
          {/* Left Wing - Culinary Heritage */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-10 bg-[#FBF6EE] rounded-[2.5rem] md:rounded-[3rem] border border-amber-500/10 hover:bg-white hover:shadow-2xl transition-all duration-500 group text-center"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 text-amber-600 border border-amber-100 group-hover:bg-[#434021] group-hover:text-amber-500 transition-all duration-500 mx-auto">
                <ChefHat size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#434021] mb-4 tracking-tight">Kumaoni Fusion</h3>
              <p className="text-slate-500 text-sm font-bold leading-relaxed opacity-80">
                Traditional hill recipes reimagined with continental techniques, using organic ingredients sourced directly from local Kumaon artisans.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 bg-[#FBF6EE] rounded-[3rem] border border-amber-500/10 hover:bg-white hover:shadow-2xl transition-all duration-500 group text-center"
            >
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 text-amber-600 border border-amber-100 group-hover:bg-[#434021] group-hover:text-amber-500 transition-all duration-500 mx-auto">
                <MapPin size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#434021] mb-4 tracking-tight">Garden to Table</h3>
              <p className="text-slate-500 text-sm font-bold leading-relaxed opacity-80">
                Seasonal delicacies harvested from our surrounding mountain slopes, ensuring the freshest flavors of the Uttarakhand valley.
              </p>
            </motion.div>
          </div>

          {/* Center Hub - Cinematic Slideshow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative h-[450px] md:h-[600px] group"
          >
             {/* 4-Corner Signature Accents */}
             <div className="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-amber-500/20 rounded-tr-[3.5rem] z-20" />
             <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-amber-500/20 rounded-bl-[3.5rem] z-20" />
             <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-amber-500/20 rounded-tl-[3.5rem] z-20" />
             <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-amber-500/20 rounded-br-[3.5rem] z-20" />

             <div className="relative h-full rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentImageIndex}
                    src={KITCHEN_IMAGES[currentImageIndex]} 
                    alt="The Emerald Kitchen" 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#434021]/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Signature Highlight */}
                <div className="absolute bottom-12 left-8 right-8 p-4 md:p-6 backdrop-blur-xl bg-white/90 border border-white rounded-[1.5rem] md:rounded-[2.5rem] z-20 flex items-center gap-4 shadow-xl">
                   <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-[#434021]">
                      <Sparkles size={24} />
                   </div>
                   <div className="text-left">
                      <p className="text-[#434021]/60 text-[8px] font-black uppercase tracking-[0.4em] mb-1">Heritage Tasting</p>
                      <h4 className="text-[#434021] text-lg font-bold tracking-tight">Signature Kumaon Thali</h4>
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Right Wing - Atmosphere & Service */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 bg-[#FBF6EE] rounded-[3rem] border border-amber-500/10 hover:bg-white hover:shadow-2xl transition-all duration-500 group text-center"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 text-amber-600 border border-amber-100 group-hover:bg-[#434021] group-hover:text-amber-500 transition-all duration-500 mx-auto">
                <Wine size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#434021] mb-4 tracking-tight">Manor Elegance</h3>
              <p className="text-slate-500 text-sm font-bold leading-relaxed opacity-80">
                Dine in our high-end colonial-inspired hall or on the terrace overlooking the emerald lake under a canopy of stars.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 bg-[#FBF6EE] rounded-[3rem] border border-amber-500/10 hover:bg-white hover:shadow-2xl transition-all duration-500 group text-center"
            >
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 text-amber-600 border border-amber-100 group-hover:bg-[#434021] group-hover:text-amber-500 transition-all duration-500 mx-auto">
                <Clock size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#434021] mb-4 tracking-tight">Bespoke Breakfast</h3>
              <p className="text-slate-500 text-sm font-bold leading-relaxed opacity-80">
                Start your morning with a tailored selection of locally sources fruits, mountain honey, and artisan-baked bread.
              </p>
            </motion.div>
          </div>


        </div>

        {/* Gastronomy Manifesto - Balanced Anchor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-24 max-w-3xl mx-auto"
        >
          <p className="text-2xl lg:text-3xl text-[#434021] font-medium italic leading-relaxed mb-8 opacity-90">
            "In the Kumaon hills, a meal is never just food—it is a conversation with the seasons. At The Emerald Kitchen, we cook with silence, fire, and the soul of the valley."
          </p>
          <div className="flex flex-col items-center gap-6">
             <div className="w-12 h-px bg-amber-500/30" />
             <button className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-600 hover:text-[#434021] transition-colors border-b border-amber-500/20 pb-2">
                Discover the Full Menu
             </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
