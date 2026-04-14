import React from 'react';
import { motion } from 'motion/react';
import { Mountain, Waves, ShieldCheck, MapPin, Coffee, Sparkles } from 'lucide-react';

export function HighlightsSection() {
  const highlights = [
    {
      label: 'Breathtaking Views',
      title: 'Khurpatal Lake View',
      description: 'Wake up to the emerald reflections of one of Uttarakhand’s most pristine lakes.',
      icon: <Waves size={24} className="text-amber-500" />
    },
    {
      label: 'Serenity',
      title: 'Secluded Sanctuary',
      description: 'Escape the Nainital crowds in a peaceful village setting where time slows down.',
      icon: <Sparkles size={24} className="text-amber-500" />
    },
    {
      label: 'Excellence',
      title: 'Premium Interiors',
      description: 'Contemporary luxury merged with rustic Kumaoni charm for a 5-star stay.',
      icon: <ShieldCheck size={24} className="text-amber-500" />
    }
  ];

  return (
    <section className="py-24 bg-[#FBF6EE] border-y border-[#434021]/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {highlights.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="mb-6 flex items-center gap-4">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-amber-500 group-hover:text-black transition-all">
                    {item.icon}
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600 opacity-60">
                    {item.label}
                 </span>
              </div>
              <h3 className="text-xl font-bold text-[#434021] mb-3 tracking-tight">{item.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
