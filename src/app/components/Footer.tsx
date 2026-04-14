import { motion } from 'motion/react';
import { MessageSquare, Facebook, Instagram, Twitter, Mail, Phone, MapPin, Shield } from 'lucide-react';
import { useState } from 'react';
import { PolicyModal } from './PolicyModal';

export function Footer({ onContactConcierge }: { onContactConcierge?: () => void }) {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Quick Links': ['Home', 'Rooms', 'Dining', 'Wellness', 'Directions'],
    'Policy & Legal': ['Hotel Policies', 'Privacy Policy', 'Cancellation Policy', 'Sustainable Tourism'],
    'Explore': ['Nainital', 'Bhimtal', 'Sattal', 'Mukteshwar'],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
  ];

  return (
    <footer className="bg-[#434021] text-white py-16 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Khurpatal Lake Inn
              </h3>
              <p className="text-white/70 mb-6 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                A luxury boutique hotel nestled in the scenic hills of Uttarakhand, offering an unforgettable escape into nature.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center ${social.color} transition-colors duration-300`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg mb-4 text-[#C6A75E]" style={{ fontFamily: 'var(--font-heading)' }}>
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => link === 'Hotel Policies' ? setIsPolicyOpen(true) : null}
                      className="text-white/70 hover:text-[#C6A75E] transition-colors duration-300 text-sm"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <MapPin className="text-[#C6A75E]" size={20} />
              <p className="text-sm text-white/70" style={{ fontFamily: 'var(--font-body)' }}>
                Khurpatal, Nainital, Uttarakhand
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-[#C6A75E]" size={20} />
              <p className="text-sm text-white/70" style={{ fontFamily: 'var(--font-body)' }}>
                +91 1234 567 890
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-[#C6A75E]" size={20} />
              <p className="text-sm text-white/70" style={{ fontFamily: 'var(--font-body)' }}>
                info@khurpatallakeinn.com
              </p>
            </div>
            <button 
              onClick={onContactConcierge}
              className="px-6 py-3 bg-white/10 hover:bg-[#C6A75E] hover:text-black rounded-xl transition-all text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <MessageSquare size={16} />
              Speak to Concierge
            </button>
          </div>
        </motion.div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
            © {currentYear} Khurpatal Lake Inn. All rights reserved. Designed with{' '}
            <span className="text-[#C6A75E]">♥</span> for luxury travelers.
          </p>
        </div>
      </div>

      <PolicyModal isOpen={isPolicyOpen} onClose={() => setIsPolicyOpen(false)} />
    </footer>
  );
}
