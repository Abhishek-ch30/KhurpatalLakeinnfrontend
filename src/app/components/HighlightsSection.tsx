import React from 'react';
import { motion } from 'motion/react';
import { Waves, Sparkles, Home } from 'lucide-react';

export function HighlightsSection() {
  const highlights = [
    {
      label: 'Breathtaking Views',
      title: 'Khurpatal Lake View',
      description: 'Wake up to the emerald reflections of one of Uttarakhand’s most pristine lakes.',
      icon: <Waves size={24} />
    },
    {
      label: 'Serenity',
      title: 'Secluded Sanctuary',
      description: 'Escape the Nainital crowds in a peaceful village setting where time slows down.',
      icon: <Sparkles size={24} />
    },
    {
      label: 'Signature Comfort',
      title: 'Premium Interiors',
      description: 'Contemporary luxury merged with rustic Kumaoni charm for a signature experience.',
      icon: <Home size={24} />
    }
  ];

  return (
    <section className="py-24 bg-[#FBF6EE] relative overflow-hidden">
      {/* Subtle Background Textures */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#434021]/5 to-transparent hidden lg:block" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#434021]/5 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {highlights.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-8 relative">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-amber-500 shadow-xl group-hover:bg-[#434021] group-hover:text-amber-500 transition-all duration-500 relative z-10">
                    {item.icon}
                 </div>
                 {/* Decorative Ring */}
                 <div className="absolute inset-0 rounded-full border border-amber-500/20 scale-125 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700" />
              </div>
              
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-4">
                 {item.label}
              </span>
              
              <h3 className="text-2xl font-bold text-[#434021] mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                {item.title}
              </h3>
              
              <p className="text-slate-500 text-sm leading-relaxed font-medium max-w-[280px]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
