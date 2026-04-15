import React from 'react';
import { motion } from 'motion/react';
import { Clock, Coffee, ShieldCheck, Wifi, Leaf, Sparkles, MapPin, Wind, Image as ImageIcon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function EssentialsSection() {
  const essentials = [
    {
      title: 'Arrival & Departure',
      description: 'Check-in from 01:30 PM. Check-out until 11:00 AM. Early arrival upon request.',
      icon: <Clock size={24} />,
    },
    {
      title: 'Soulful Dining',
      description: '07:00 AM to 10:30 PM. Locally sourced mountain gastronomy.',
      icon: <Coffee size={24} />,
    },
    {
      title: 'Seamless Connection',
      description: 'High-speed Fiber WiFi throughout the estate common sanctuaries.',
      icon: <Wifi size={24} />,
    },
    {
      title: 'Peace of Mind',
      description: '24/7 Concierge, secure parking, and premium safety.',
      icon: <ShieldCheck size={24} />,
    },
  ];

  const sustainability = [
    {
      name: 'Plastic Free',
      detail: 'Glass bottles & refillable dispensers.',
      icon: <Wind size={16} />
    },
    {
      name: 'Lake Care',
      detail: 'Pristine protection of ecosystems.',
      icon: <Sparkles size={16} />
    },
    {
      name: 'Local First',
      detail: 'Sourcing 90% from Kumaon artisans.',
      icon: <MapPin size={16} />
    }
  ];

  return (
    <section id="essentials" className="py-32 bg-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-amber-500/5 blur-[120px] rounded-full -z-0 opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Centered Editorial Header */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 rounded-full mb-8"
          >
             <div className="w-1 h-1 bg-amber-500 rounded-full animate-pulse" />
             <span className="text-amber-700 tracking-[0.5em] text-[10px] font-black uppercase">The Estate Essentials</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-8xl text-[#434021] leading-[1] tracking-tighter mb-8" 
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            A <span className="italic">Signature</span> Foundation<br />
            Of <span className="italic text-amber-600">Seamless Comfort</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto border-t border-amber-500/10 pt-8"
          >
            We believe the smallest details form the largest memories. Curated to be silent, swift, and soulful reflection of Himalayan hospitality.
          </motion.p>
        </div>

        {/* Trinity Grid Layout - Perfectly Balanced */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-32">
          
          {/* Left Column - Top 2 Essentials */}
          <div className="space-y-8">
            {essentials.slice(0, 2).map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-10 bg-[#FBF6EE] rounded-[3rem] border border-amber-500/10 hover:shadow-2xl hover:bg-white transition-all duration-500 group text-center"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-amber-500 border border-amber-100 group-hover:bg-[#434021] group-hover:text-amber-500 transition-all duration-500 shadow-sm mx-auto">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#434021] mb-3 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-bold opacity-80">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Center Column - Cinematic Centerpiece (Image 2 - Lake Reflection) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative"
          >
             {/* 4-Corner Signature Accents */}
             <div className="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-amber-500/20 rounded-tr-[3.5rem]" />
             <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-amber-500/20 rounded-bl-[3.5rem]" />
             <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-amber-500/20 rounded-tl-[3.5rem]" />
             <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-amber-500/20 rounded-br-[3.5rem]" />

             <div className="relative rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl h-[600px] group">
                <ImageWithFallback
                  src="https://i.ibb.co/MkphPXbC/photo-1683973200791-47539048cf63.avif"
                  alt="Lake Khurpatal reflection"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Minimal Overlay Badge */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl px-6 py-3 rounded-full shadow-lg border border-white flex items-center gap-3">
                   <ImageIcon size={16} className="text-amber-500" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#434021]">Lake Reflection</span>
                </div>
             </div>
          </motion.div>

          {/* Right Column - Bottom 2 Essentials */}
          <div className="space-y-8">
            {essentials.slice(2, 4).map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-10 bg-[#FBF6EE] rounded-[3rem] border border-amber-500/10 hover:shadow-2xl hover:bg-white transition-all duration-500 group text-center"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-amber-500 border border-amber-100 group-hover:bg-[#434021] group-hover:text-amber-500 transition-all duration-500 shadow-sm mx-auto">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#434021] mb-3 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-bold opacity-80">{item.description}</p>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Sustainability Foundation Banner - Base of the Estate */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[3.5rem] bg-[#434021] overflow-hidden p-12 lg:p-16 text-white text-center shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
          
          <div className="relative z-10">
             <div className="flex flex-col items-center gap-6 mb-12">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 border border-amber-500/20">
                   <Leaf size={24} />
                </div>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>
                   Preserving the <span className="italic text-amber-500">Soul of Kumaon</span>
                </h3>
                <p className="text-white/60 max-w-2xl mx-auto font-medium leading-relaxed">
                   At Khurpatal Lake Inn, luxury is rooted in the preservation of the hills. Our eco-protocols ensure that your stay leaves nothing but footprints.
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {sustainability.map((item) => (
                  <div key={item.name} className="flex flex-col items-center gap-4 p-6 rounded-[2.5rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                     <div className="w-10 h-10 rounded-full bg-amber-500 text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                        {item.icon}
                     </div>
                     <div>
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-500 mb-2">{item.name}</p>
                        <p className="text-xs text-white/40 font-medium">{item.detail}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
