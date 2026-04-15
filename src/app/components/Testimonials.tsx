import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, ChevronRight, MessageSquareQuote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Delhi',
      rating: 5,
      text: 'An absolutely stunning property! The views from our room were breathtaking, and the staff made us feel like royalty. The perfect escape from the city noise.',
      avatar: 'PS',
    },
    {
      name: 'Rahul Mehta',
      location: 'Mumbai',
      rating: 5,
      text: 'We celebrated our anniversary here and it couldn\'t have been more perfect. The attention to detail, the food, and the ambiance - everything was top-notch.',
      avatar: 'RM',
    },
    {
      name: 'Anjali Verma',
      location: 'Bangalore',
      rating: 5,
      text: 'The infinity pool with mountain views is a dream! The rooms are spacious and beautifully designed. Can\'t wait to visit again with family.',
      avatar: 'AV',
    },
    {
      name: 'Vikram Singh',
      location: 'Chandigarh',
      rating: 5,
      text: 'A hidden gem in Khurpatal. The tranquility here is unmatched. The mountain hikes and the locally-inspired food were the highlights of our stay.',
      avatar: 'VS',
    },
    {
      name: 'Sanya Iyer',
      location: 'Chennai',
      rating: 5,
      text: 'The hospitality at Khurpatal Lake Inn is truly world-class. Every corner of the manor tells a story of heritage and luxury.',
      avatar: 'SI',
    },
    {
      name: 'Arjun Kapoor',
      location: 'Gurugram',
      rating: 5,
      text: 'Elegant, quiet, and deeply rejuvenating. It is rare to find such a perfect balance of architectural beauty and natural raw scenery.',
      avatar: 'AK',
    },
  ];

  // Double the list for seamless marquee
  const extendedTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-40 bg-[#E3E3C1] relative overflow-hidden">
      {/* Topographic Background Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 Q 50 50 100 100 T 200 100 T 300 100 T 400 100' fill='none' stroke='%23434021' stroke-width='0.5'/%3E%3Cpath d='M0 200 Q 50 150 100 200 T 200 200 T 300 200 T 400 200' fill='none' stroke='%23434021' stroke-width='0.5'/%3E%3Cpath d='M0 300 Q 50 250 100 300 T 200 300 T 300 300 T 400 300' fill='none' stroke='%23434021' stroke-width='0.5'/%3E%3C/svg%3E")` }} />
      
      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Centered Editorial Header */}
        <div className="text-center mb-32 px-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#434021]/10 rounded-full mb-6"
          >
             <div className="w-1 h-1 bg-[#434021] rounded-full animate-pulse" />
             <span className="text-[#434021]/70 tracking-[0.5em] text-[10px] font-black uppercase">Testimonials</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2.75rem] sm:text-6xl lg:text-8xl text-[#434021] leading-[1] tracking-tighter mb-8" 
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The Guest <br />
            <span className="italic">Manifesto</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-base md:text-xl text-[#434021]/60 font-medium leading-relaxed max-w-2xl mx-auto border-t border-[#434021]/10 pt-8"
          >
            Stories of serenity, luxury, and silence from travelers who have made the Khurpatal Manor their mountain home.
          </motion.p>
        </div>

        {/* Guest Manifesto - Infinite Marquee Loop */}
        <div className="relative group overflow-hidden py-10">
           <motion.div 
             animate={{ x: [0, -2500] }}
             transition={{ 
                duration: 60, 
                repeat: Infinity, 
                ease: "linear" 
             }}
             className="flex gap-8 hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing"
           >
              {extendedTestimonials.map((item, index) => (
                <div 
                  key={index}
                  className="w-[85vw] md:w-[450px] shrink-0 p-8 md:p-10 backdrop-blur-3xl bg-white/60 border border-white/50 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(67,64,33,0.1)] transition-all duration-500 hover:bg-white/90 hover:-translate-y-2"
                >
                   {/* Star Rating & Quote */}
                   <div className="flex justify-between items-start mb-8">
                      <div className="flex gap-1.5">
                         {[...Array(item.rating)].map((_, i) => (
                           <Star key={i} className="text-amber-500 fill-amber-500" size={16} />
                         ))}
                      </div>
                      <div className="w-10 h-10 bg-[#434021]/5 rounded-full flex items-center justify-center text-[#434021]/20">
                         <MessageSquareQuote size={20} />
                      </div>
                   </div>

                   {/* Testimonial Text */}
                   <p className="text-2xl text-[#434021] font-bold leading-[1.3] tracking-tight mb-10 overflow-hidden line-clamp-4" style={{ fontFamily: 'var(--font-heading)' }}>
                      "{item.text}"
                   </p>

                   {/* Guest Profile */}
                   <div className="flex items-center gap-4 pt-8 border-t border-[#434021]/10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#434021] to-[#605a2e] flex items-center justify-center text-white text-xs font-black shadow-lg">
                         {item.avatar}
                      </div>
                      <div>
                         <p className="text-sm font-black uppercase tracking-[0.2em] text-[#434021]">{item.name}</p>
                         <p className="text-xs font-bold text-[#434021]/40 uppercase tracking-widest">{item.location}</p>
                      </div>
                   </div>
                </div>
              ))}
           </motion.div>
           
           {/* Fade Edges for Professional Marquee */}
           <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#E3E3C1] to-transparent pointer-events-none z-10" />
           <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#E3E3C1] to-transparent pointer-events-none z-10" />
        </div>

        {/* Signature Archive Anchor */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-col items-center gap-12 pt-16"
        >
           <div className="flex flex-col items-center gap-6">
              <div className="w-12 h-px bg-[#434021]/10" />
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#434021]/40">Verified Guest Reviews</p>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
