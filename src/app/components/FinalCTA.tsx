import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onBookNow: () => void;
}

export function FinalCTA({ onBookNow }: FinalCTAProps) {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background with mountain texture or gradient */}
      <div className="absolute inset-0 bg-[#434021] z-0">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#2a2814] to-transparent"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="text-amber-500" size={20} />
            <span className="text-amber-500/80 text-xs font-black uppercase tracking-[0.5em]">Limited Availability</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[0.9]" style={{ fontFamily: 'var(--font-heading)' }}>
            Your Himalayan
            <br />
            Legacy Begins Now
          </h2>
          
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Don't just witness the beauty of Khurpatal—become a part of its story. Secure your sanctuary between the peaks today.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
            <button
              onClick={onBookNow}
              className="px-12 py-5 bg-amber-500 text-black rounded-full font-black uppercase tracking-[0.2em] text-sm hover:bg-white transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/20 flex items-center gap-3 transition-colors group"
            >
              Secure My Stay
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              className="px-12 py-5 bg-transparent text-white border-2 border-white/20 rounded-full font-black uppercase tracking-[0.2em] text-sm hover:bg-white/5 transition-all"
            >
              Contact Concierge
            </button>
          </div>
          
          <p className="text-white/30 text-[10px] uppercase font-black tracking-[0.4em] pt-12">
            Experience Perfection • Uttarakhand • India
          </p>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/20 blur-[120px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full" />
    </section>
  );
}
