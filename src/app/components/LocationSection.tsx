import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Car, Train, Plane, Map as MapIcon, Navigation, Compass, ArrowUpRight } from 'lucide-react';

export function LocationSection() {
  const travelModes = [
    {
      mode: 'By Road',
      description: 'A scenic drive through the pine-scented hills of Kumaon.',
      details: 'Connected to Delhi via NH9 (~7 hours). 10km from Nainital Mall Road.',
      icon: <Car size={24} />,
      links: ['Nainital (10km)', 'Bhimtal (22km)', 'Haldwani (40km)']
    },
    {
      mode: 'By Train',
      description: 'The closest station is Kathgodam, at the foothills.',
      details: 'Daily semi-high-speed trains from Delhi (Shatabdi/Ranikhet Exp).',
      icon: <Train size={24} />,
      links: ['Kathgodam STN (35km)', '1.5 Hours Drive']
    },
    {
      mode: 'By Flight',
      description: 'Pantnagar Airport serves the region with domestic flights.',
      details: 'Daily flights from Delhi and Dehradun. Taxi services available.',
      icon: <Plane size={24} />,
      links: ['Pantnagar APT (70km)', '2.5 Hours Drive']
    }
  ];

  return (
    <section id="location" className="py-32 bg-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-amber-500/5 rounded-full blur-[120px] -z-0 opacity-40 pointer-events-none" />
      
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
             <span className="text-amber-700 tracking-[0.5em] text-[10px] font-black uppercase">The Path to Paradise</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2.75rem] sm:text-6xl lg:text-8xl text-[#434021] leading-[1] tracking-tighter mb-8" 
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Beyond The <br />
            <span className="italic">Beaten Track</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto border-t border-amber-500/10 pt-8"
          >
            Located in the secluded corner of Khurpatal, our estate offers the perfect balance of mountain isolation and curated access to the soul of Kumaon.
          </motion.p>
        </div>

        {/* The Gateway Compass - Out of the Box Composition */}
        <div className="relative mb-32">
           {/* Cinematic Map Frame */}
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             viewport={{ once: true }}
             className="relative w-full h-[400px] md:h-[500px] lg:h-[700px] rounded-[2.5rem] md:rounded-[4.5rem] overflow-hidden shadow-2xl border-4 md:border-8 border-[#FBF6EE] group"
           >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3359.254578373006!2d79.42676857538683!3d29.371334275269483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0a1006fd69167%3A0xc1ff9b39738241fa!2sKhurpatal%20Lake%20Inn!5e1!3m2!1sen!2sin!4v1776191528835!5m2!1sen!2sin" 
                className="w-full h-full opacity-100 transition-all duration-[2000ms]"
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-[#434021]/5 pointer-events-none group-hover:bg-transparent transition-colors duration-1000" />
           </motion.div>

           {/* Floating Transport Petals - Symmetrical Glass Grid Overlay */}
            <div className="relative mt-12 md:absolute md:-bottom-16 md:left-1/2 md:-translate-x-1/2 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-0 md:px-6">
               {travelModes.map((item, idx) => (
                 <motion.div
                   key={item.mode}
                   initial={{ opacity: 0, y: 40 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.2 + (idx * 0.1) }}
                   className="p-8 md:p-10 bg-[#FBF6EE] border border-amber-500/10 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.05)] group hover:bg-white md:hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center"
                 >
                    <div className="relative mb-8 w-14 h-14 mx-auto">
                       <div className="absolute inset-0 bg-amber-500/10 rounded-2xl rotate-6 group-hover:rotate-12 group-hover:bg-amber-500 transition-all duration-700" />
                       <div className="absolute inset-0 bg-white shadow-md rounded-2xl flex items-center justify-center text-[#434021] group-hover:scale-110 group-hover:text-amber-900 transition-transform duration-500">
                          {item.icon}
                       </div>
                    </div>
                    <h3 className="text-2xl font-bold text-[#434021] mb-2 tracking-tight flex items-center justify-center gap-3" style={{ fontFamily: 'var(--font-heading)' }}>
                       {item.mode}
                       <div className="w-1.5 h-1.5 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-slate-500 text-xs font-bold leading-relaxed mb-6 italic opacity-70 group-hover:opacity-100 transition-opacity">{item.description}</p>
                    
                    <div className="flex flex-wrap justify-center gap-2 pt-6 border-t border-amber-500/10 w-full">
                       {item.links.map(link => (
                         <span key={link} className="px-3 py-1.5 bg-white border border-amber-500/10 rounded-full text-[8px] font-black uppercase tracking-widest text-amber-700 shadow-sm">
                            {link}
                         </span>
                       ))}
                    </div>
                 </motion.div>
               ))}
            </div>

        </div>

        {/* Centered Navigation Anchors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-12 pt-16"
        >
           <div className="flex justify-center w-full">
              <a 
                 href="https://www.google.com/maps/place/Khurpatal+Lake+Inn/@29.3713343,79.4267686,17z/data=!3m1!4b1!4m6!3m5!1s0x39a0a1006fd69167:0xc1ff9b39738241fa!8m2!3d29.3713343!4d79.4293435!16s%2Fg%2F11f_swxl2k" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-4 px-12 py-5 bg-[#434021] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl group"
              >
                 <Navigation size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 Open Interactive Map
                 <ArrowUpRight size={14} className="opacity-40" />
              </a>
           </div>

           <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-px bg-amber-500/20" />
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-600">The Khurpatal Manor Collection</p>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
