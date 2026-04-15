import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Globe, ArrowUp } from 'lucide-react';
import { PolicyModal } from './PolicyModal';

export function Footer({ onContactConcierge }: { onContactConcierge?: () => void }) {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, label: 'Facebook' },
    { icon: Instagram, label: 'Instagram' },
    { icon: Twitter, label: 'Twitter' },
    { icon: Globe, label: 'LinkedIn' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#434021] text-white pt-24 pb-12 relative overflow-hidden">
      {/* Editorial Backdrop Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-amber-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center">
        
        {/* Brand Core (Signature Slim) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center relative z-20"
        >
          <img 
            src="/assets/images/cropped-Untitled_design_7-SdfZIicur-transformed-transformed.png" 
            alt="Khurpatal Lake Inn" 
            className="h-20 md:h-24 w-auto object-contain mb-8 drop-shadow-2xl"
          />
          <h3 className="text-xl md:text-2xl font-bold tracking-tighter mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
             The Khurpatal <span className="italic text-amber-500/80">Manor</span>
          </h3>
          
          {/* Centered Social Anthology (Slim) */}
          <div className="flex gap-8 mt-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ y: -2, opacity: 1 }}
                className="text-white/30 hover:text-amber-500 transition-all group"
              >
                 <social.icon size={18} strokeWidth={1.5} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Essential Navigation (Single Balanced Row) */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-16 py-8 border-t border-white/5 w-full max-w-4xl">
           {['Rooms', 'Dining', 'Wellness', 'Experiences', 'Directions', 'Hotel Policies'].map((link) => (
             <button
               key={link}
               onClick={() => link === 'Hotel Policies' ? setIsPolicyOpen(true) : null}
               className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-amber-500 transition-all relative group"
             >
               {link}
               <span className="absolute -bottom-1 left-0 w-full h-px bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
             </button>
           ))}
        </div>

        {/* The Contact Strip (Slim Editorial Row) */}
        <div className="w-full max-w-5xl py-8 px-10 border border-white/10 rounded-[2rem] mb-16 flex flex-col md:flex-row items-center justify-between gap-8 bg-white/5">
           <div className="flex items-center gap-3 text-white/50">
              <MapPin size={14} className="text-amber-500/50" />
              <span className="text-xs font-bold tracking-tight">Khurpatal, Nainital, UK</span>
           </div>
           <div className="flex items-center gap-3 text-white/50">
              <Phone size={14} className="text-amber-500/50" />
              <span className="text-xs font-bold tracking-tight">+91 1234 567 890</span>
           </div>
           <div className="flex items-center gap-3 text-white/50">
              <Mail size={14} className="text-amber-500/50" />
              <span className="text-xs font-bold tracking-tight">concierge@khurpatallakeinn.com</span>
           </div>
           <button 
             onClick={onContactConcierge}
             className="px-6 py-3 bg-white text-[#434021] rounded-full text-[9px] font-black uppercase tracking-[0.2em] hover:bg-amber-500 transition-all"
           >
              Speak to Curator
           </button>
        </div>

        {/* Global Copyright Anchor (Compact) */}
        <div className="flex flex-col items-center gap-6 w-full pt-8 border-t border-white/5">
           <button 
             onClick={scrollToTop}
             className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group hover:bg-amber-500 hover:border-amber-500 transition-all"
           >
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
           </button>
           <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em]">
              © {currentYear} Khurpatal Lake Inn. An Estate of Silence.
           </p>
        </div>
      </div>

      <PolicyModal isOpen={isPolicyOpen} onClose={() => setIsPolicyOpen(false)} />
    </footer>
  );
}
