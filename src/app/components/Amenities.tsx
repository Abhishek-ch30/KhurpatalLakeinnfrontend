import { motion } from 'motion/react';
import { Waves, Dumbbell, Utensils, Wifi, Music, Sparkles, Coffee, Shield, Gamepad2 } from 'lucide-react';

export function Amenities() {
  const amenities = [
    {
      icon: Waves,
      title: 'Horizon Pool',
      description: 'Temperature-controlled infinity pool with panoramic Himalayan views.',
      category: 'Wellness',
    },
    {
      icon: Gamepad2,
      title: 'Entertainment Zone',
      description: 'Dedicated space for indoor games, movies, and immersive leisure.',
      category: 'Leisure',
    },
    {
      icon: Dumbbell,
      title: 'Vault Gym',
      description: 'Modern fitness center equipped with elite strength and cardio machines.',
      category: 'Vitality',
    },
    {
      icon: Utensils,
      title: 'Crest Dining',
      description: 'A multi-cuisine fine dining experience crafted by master chefs.',
      category: 'Dining',
    },
    {
      icon: Sparkles,
      title: 'Group Activities',
      description: 'Bespoke group experiences, from bonfires to guided nature walks.',
      category: 'Social',
    },
    {
      icon: Wifi,
      title: 'High-Speed Wi-Fi',
      description: 'Complimentary high-speed connectivity across the entire estate.',
      category: 'Connectivity',
    },
  ];

  return (
    <section id="amenities" className="py-32 px-6 lg:px-12 bg-white relative overflow-hidden">
      {/* Premium Accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-600 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block"
          >
            The Gold Standard
          </motion.span>
          <h2 className="text-5xl lg:text-8xl font-bold text-[#434021] tracking-tighter leading-none mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
            World-Class
            <br />
            Amenities
          </h2>
          <div className="h-0.5 w-24 bg-amber-500/30" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Obsidian-Style Icon Wrapper */}
              <div className="relative mb-8 w-20 h-20">
                <div className="absolute inset-0 bg-[#434021] rounded-3xl rotate-6 group-hover:rotate-12 group-hover:bg-amber-500 transition-all duration-500" />
                <div className="absolute inset-0 bg-white border border-slate-100 rounded-3xl flex items-center justify-center text-[#434021] group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-500 shadow-xl">
                  <amenity.icon size={32} strokeWidth={1.5} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600/60">{amenity.category}</span>
                    <div className="h-px w-8 bg-amber-600/20" />
                </div>
                <h3 className="text-2xl font-bold text-[#434021] tracking-tight group-hover:text-amber-600 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                  {amenity.title}
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[280px]">
                  {amenity.description}
                </p>
              </div>

              {/* Decorative Accent */}
              <div className="absolute -bottom-4 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-12 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
