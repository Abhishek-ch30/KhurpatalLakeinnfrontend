import React from 'react';
import { motion } from 'motion/react';
import { Clock, Coffee, ShieldCheck, Wifi, Leaf, Star, Sparkles, MapPin } from 'lucide-react';

export function EssentialsSection() {
  const essentials = [
    {
      title: 'Arrival & Departure',
      description: 'Check-in from 01:30 PM. Check-out until 11:00 AM. Inquire for early arrival preferences.',
      icon: <Clock className="text-amber-500" size={24} />,
    },
    {
      title: 'Soulful Dining',
      description: 'From 07:00 AM to 10:30 PM. Locally sourced mountain gastronomy overlooking the lake.',
      icon: <Coffee className="text-amber-500" size={24} />,
    },
    {
      title: 'Seamless Connection',
      description: 'High-speed Fiber-Optic WiFi available throughout the estate and common sanctuaries.',
      icon: <Wifi className="text-amber-500" size={24} />,
    },
    {
      title: 'Peace of Mind',
      description: '24/7 Concierge, in-room safes, and secure on-site parking for all explorers.',
      icon: <ShieldCheck className="text-amber-500" size={24} />,
    },
  ];

  const sustainability = [
    {
      name: 'Single-Use Plastic Free',
      detail: 'Glass bottles & refillable dispensers in all sanctuaries.',
      icon: <Leaf size={16} />
    },
    {
      name: 'Lake Conservation',
      detail: 'Pristine protection of Khurpatal Lake ecosystems.',
      icon: <Sparkles size={16} />
    },
    {
      name: 'Eco-Forward Bonfires',
      detail: 'Strategic winter fires to minimize wood consumption.',
      icon: <MapPin size={16} />
    }
  ];

  return (
    <section id="essentials" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Main Essentials Grid */}
          <div className="space-y-16">
            <div>
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-amber-600 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block"
              >
                The Estate Essentials
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-[#434021] leading-tight" 
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                A 5-Star Foundation
                <br />
                Of Seamless Comfort
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {essentials.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-3"
                >
                  <div className="w-12 h-12 bg-[#FBF6EE] rounded-2xl flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#434021] tracking-tight">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* High-Concept Sustainability Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 bg-[#434021] rounded-[3rem] text-white shadow-2xl overflow-hidden"
          >
            {/* Background Texture */}
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/20 to-transparent z-0" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-8 text-amber-500">
                <Leaf size={24} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Our Legacy</span>
              </div>
              
              <h3 className="text-3xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Responsible Luxury.
                <br />
                Preserving Paradise.
              </h3>
              
              <p className="text-white/60 mb-10 leading-relaxed font-medium">
                At Khurpatal Lake Inn, we believe luxury should be in harmony with nature. Our sustainability protocols are designed to protect the very beauty you come to experience.
              </p>

              <div className="space-y-6">
                 {sustainability.map((item) => (
                   <div key={item.name} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-black flex items-center justify-center shrink-0">
                         {item.icon}
                      </div>
                      <div>
                         <p className="text-xs font-bold uppercase tracking-widest text-white mb-1">{item.name}</p>
                         <p className="text-[10px] text-white/50 font-medium">{item.detail}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[4rem]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
