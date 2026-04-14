import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Car, Train, Plane, Map as MapIcon, Navigation, Compass } from 'lucide-react';

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
    <section id="location" className="py-24 bg-[#FBF6EE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
           <div>
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-amber-600 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block"
              >
                The Path to Paradise
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl lg:text-7xl font-bold text-[#434021] tracking-tight leading-[0.9] mb-8" 
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Beyond The
                <br />
                Beaten Track
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-slate-500 text-lg font-medium leading-relaxed mb-10 max-w-lg"
              >
                Located in the secluded corner of Khurpatal, our estate offers the perfect balance of mountain isolation and convenient access to Uttarakhand's main arteries.
              </motion.p>
              
              <div className="flex gap-4">
                 <a 
                    href="https://www.google.com/maps/place/Khurpatal+Lake+Inn/@29.3713343,79.4267686,17z/data=!3m1!4b1!4m6!3m5!1s0x39a0a1006fd69167:0xc1ff9b39738241fa!8m2!3d29.3713343!4d79.4293435!16s%2Fg%2F11f_swxl2k" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-8 py-4 bg-[#434021] text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#434021]/10 group"
                 >
                    <Navigation size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Open in Maps
                 </a>
                 <button className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-[#434021]/10 text-[#434021] rounded-full text-[10px] font-black uppercase tracking-widest hover:border-[#434021] transition-all">
                    <Compass size={16} />
                    Plan Journey
                 </button>
              </div>
           </div>

           {/* Interactive Map View */}
           <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative p-3 bg-white rounded-[3rem] shadow-2xl overflow-hidden aspect-square md:aspect-video lg:aspect-square"
           >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3359.254578373006!2d79.42676857538683!3d29.371334275269483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0a1006fd69167%3A0xc1ff9b39738241fa!2sKhurpatal%20Lake%20Inn!5e1!3m2!1sen!2sin!4v1776191528835!5m2!1sen!2sin" 
                className="w-full h-full rounded-[2rem] border-0"
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
           </motion.div>
        </div>

        {/* Transport Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {travelModes.map((item, idx) => (
             <motion.div
               key={item.mode}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-xl transition-all border border-slate-50 group"
             >
                <div className="w-16 h-16 bg-[#FBF6EE] text-[#434021] rounded-3xl flex items-center justify-center mb-8 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                   {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#434021] mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>{item.mode}</h3>
                <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">{item.description}</p>
                <div className="p-4 bg-slate-50 rounded-2xl mb-8">
                   <p className="text-[10px] font-bold text-slate-400 leading-relaxed italic">{item.details}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                   {item.links.map(link => (
                     <span key={link} className="px-3 py-1.5 bg-white border border-slate-100 rounded-full text-[8px] font-black uppercase tracking-widest text-slate-400">
                        {link}
                     </span>
                   ))}
                </div>
             </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
}
