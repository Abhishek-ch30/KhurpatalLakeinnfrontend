import { motion } from 'motion/react';
import { Mountain, Heart, MapPin, Compass, ArrowRight } from 'lucide-react';

export function WhyKhurpatal() {
  const benefits = [
    {
      icon: Heart,
      title: 'Peaceful Location',
      description: "Away from the hustle of city life, immerse yourself in nature's absolute tranquility.",
      color: '#C6A75E',
    },
    {
      icon: Mountain,
      title: 'Less Crowded',
      description: 'Unlike Nainital, enjoy an intimate experience without the overwhelming tourist crowds.',
      color: '#434021',
    },
    {
      icon: MapPin,
      title: 'Scenic Surroundings',
      description: 'Breathtaking lake and mountain views visible from every corner of our lush property.',
      color: '#D1D57E',
    },
  ];

  const nearbyPlaces = [
    { 
        name: 'Nainital', 
        distance: '12 km', 
        image: 'https://i.ibb.co/XZvkdBfB/photo-1601622256416-d7f757f99eb2.avif',
        desc: 'The sparkling City of Lakes'
    },
    { 
        name: 'Bhimtal', 
        distance: '8 km', 
        image: 'https://i.ibb.co/MkphPXbC/photo-1683973200791-47539048cf63.avif',
        desc: 'Serene waters and aquarium island'
    },
    { 
        name: 'Sattal', 
        distance: '15 km', 
        image: 'https://i.ibb.co/VcCs0Dqq/UTDB-media-1736501501-Under-Banner-1.jpg',
        desc: 'Seven interconnected freshwater lakes'
    },
    { 
        name: 'Mukteshwar', 
        distance: '25 km', 
        image: 'https://i.ibb.co/9k8XVTpm/photo-1630579334479-ec171871a550.avif',
        desc: 'Panoramic views of the high peaks'
    },
  ];

  return (
    <section id="why-khurpatal" className="py-32 px-6 lg:px-12 bg-[#FBF6EE] relative overflow-hidden">
      {/* Dynamic Topographical Background */}
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

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#C6A75E] text-xs font-black uppercase tracking-[0.4em] mb-4 block"
            >
              The Khurpatal Essence
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-[#434021] leading-tight" 
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Why Choose
              <br />
              Khurpatal Lake Inn?
            </motion.h2>
          </div>
          <div className="text-right">
             <motion.p 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ delay: 0.2 }}
               viewport={{ once: true }}
               className="text-[#434021]/60 text-lg max-w-sm ml-auto"
             >
                Beyond standard hospitality, we offer a doorway to the untouched soul of the Kumaon hills.
             </motion.p>
          </div>
        </div>

        {/* Precision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white border border-slate-100 rounded-[3rem] p-12 hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-16 h-16 bg-[#FBF6EE] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-500 text-[#434021]">
                <benefit.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#434021] mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                {benefit.title}
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {benefit.description}
              </p>
              
              <div className="absolute top-12 right-12 opacity-0 group-hover:opacity-100 transition-opacity">
                <Compass className="text-amber-500/20" size={40} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual Attractions Gallery */}
        <div className="space-y-12">
            <div className="flex items-center justify-between">
                <h3 className="text-3xl font-bold text-[#434021] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Nearby Attractions</h3>
                <div className="flex gap-2">
                    <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white hover:border-[#434021] transition-all"><ArrowRight size={20} className="rotate-180" /></button>
                    <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white hover:border-[#434021] transition-all"><ArrowRight size={20} /></button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {nearbyPlaces.map((place, index) => (
                    <motion.div
                        key={place.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative h-[400px] rounded-[3rem] overflow-hidden cursor-pointer"
                    >
                        <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        <div className="absolute bottom-8 left-8 right-8">
                            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block mb-2">{place.distance} Away</span>
                            <h4 className="text-2xl font-bold text-white mb-2 leading-tight">{place.name}</h4>
                            <p className="text-xs text-white/60 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">{place.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
