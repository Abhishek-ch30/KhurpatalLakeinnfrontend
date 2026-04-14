import { motion, useScroll, useTransform } from 'motion/react';
import { Calendar, Users, Sparkles, Loader2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useBookingFlow } from '../hooks/useBookingFlow';

interface HeroProps {
  onBookNow: (data?: any) => void;
  flow: ReturnType<typeof useBookingFlow>;
}

export function Hero({ onBookNow, flow }: HeroProps) {
  const { scrollY } = useScroll();
  const { state, setState, isLoading, updateDates } = flow;
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1761442663511-2558e561f15e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZpbml0eSUyMHBvb2wlMjBtb3VudGFpbiUyMHZpZXclMjByZXNvcnR8ZW58MXx8fHwxNzc2MTU0MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Khurpatal Lake Inn with mountain views"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#FBF6EE]"></div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="text-amber-500" size={16} />
            <span className="text-white/60 text-xs font-black uppercase tracking-[0.4em]">The Ultimate Mountain Retreat</span>
            <Sparkles className="text-amber-500" size={16} />
          </motion.div>
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl text-white mb-6 tracking-tight leading-[0.9]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Awaken in
            <br />
            <span className="text-amber-500">Khurpatal</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-medium"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Luxury redefined by the whispers of the mountains and the golden reflection of the lake.
          </motion.p>
        </motion.div>

        {/* Floating Booking Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 w-full max-w-5xl"
        >
          <div className="bg-white/30 backdrop-blur-2xl p-3 md:p-4 rounded-[2.5rem] md:rounded-full border border-white/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-center gap-3">
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Check In */}
              <div className="bg-white/95 rounded-[1.8rem] md:rounded-full px-8 py-4 flex flex-col items-start gap-1 group shadow-sm border border-black/5 hover:shadow-md transition-all">
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={12} /> Check In
                </span>
                <input 
                  type="date" 
                  className="bg-transparent border-none text-slate-900 font-bold focus:outline-none w-full [color-scheme:light] cursor-pointer" 
                  value={state.checkIn || new Date().toISOString().split('T')[0]}
                  onChange={(e) => updateDates(e.target.value, state.checkOut)}
                />
              </div>

              {/* Check Out */}
              <div className="bg-white/95 rounded-[1.8rem] md:rounded-full px-8 py-4 flex flex-col items-start gap-1 group shadow-sm border border-black/5 hover:shadow-md transition-all">
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={12} /> Check Out
                </span>
                <input 
                  type="date" 
                  className="bg-transparent border-none text-slate-900 font-bold focus:outline-none w-full [color-scheme:light] cursor-pointer" 
                  value={state.checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                  onChange={(e) => updateDates(state.checkIn, e.target.value)}
                />
              </div>

              {/* Guests */}
              <div className="bg-white/95 rounded-[1.8rem] md:rounded-full px-8 py-4 flex flex-col items-start gap-1 group shadow-sm border border-black/5 hover:shadow-md transition-all">
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-2">
                  <Users size={12} /> Guests
                </span>
                <select 
                  className="bg-transparent border-none text-slate-900 font-bold focus:outline-none w-full appearance-none cursor-pointer" 
                  value={state.guests}
                  onChange={(e) => setState(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                >
                  <option value="1" className="text-black">1 Explorer</option>
                  <option value="2" className="text-black">2 Explorers</option>
                  <option value="3" className="text-black">3 Explorers</option>
                  <option value="4" className="text-black">4 Explorers</option>
                </select>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onBookNow(state)}
              disabled={isLoading}
              className="w-full md:w-auto px-12 py-5 bg-amber-500 text-black rounded-[1.8rem] md:rounded-full font-black uppercase tracking-[0.2em] text-xs transition-all hover:bg-white hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_-12px_rgba(245,158,11,0.4)] whitespace-nowrap border-2 border-black/10 flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  <span>Searching...</span>
                </>
              ) : (
                'Check Availability'
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Gradient Finish */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FBF6EE] to-transparent z-[5]" />
    </section>
  );
}
