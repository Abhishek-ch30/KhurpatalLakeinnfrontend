import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Loader2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useBookingFlow } from '../hooks/useBookingFlow';
import { HeroDatePicker } from './booking/HeroDatePicker';
import { HeroGuestInput } from './booking/HeroGuestInput';

interface HeroProps {
  onBookNow: (data?: any) => void;
  flow: ReturnType<typeof useBookingFlow>;
}

export function Hero({ onBookNow, flow }: HeroProps) {
  const { scrollY } = useScroll();
  const { state, setState, isLoading, updateDates } = flow;
  
  // Parallax and Scale effects
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const scale = useTransform(scrollY, [0, 1000], [1.1, 1]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-[#FBF6EE]">
      {/* Background with Cinematic Zoom & Parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <ImageWithFallback
          src="/assets/images/Gemini_Generated_Image_aaxewtaaxewtaaxe.png"
          alt="Khurpatal Lake Inn Ethereal View"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#FBF6EE] via-transparent to-transparent"></div>
      </motion.div>

      {/* Main Content Area - Center Aligned */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center justify-center text-center mt-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-amber-500"></div>
            <span className="text-white text-[10px] font-black uppercase tracking-[0.5em]">The Ultimate Mountain Retreat</span>
            <div className="h-[1px] w-12 bg-amber-500"></div>
          </div>
          
          <h1 
            className="text-[2.75rem] sm:text-6xl md:text-8xl lg:text-[10rem] text-white leading-[0.9] tracking-tighter mb-8 px-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Awaken in
            <br />
            <span className="italic text-amber-500">Khurpatal</span>
          </h1>
          
          <p className="text-base md:text-xl text-white/80 max-w-2xl font-medium leading-relaxed mb-16" style={{ fontFamily: 'var(--font-body)' }}>
            Luxury redefined by the whispers of the mountains and the golden reflection of the emerald lake.
          </p>
        </motion.div>

        {/* Polished Booking Bar - Integrated Custom Selectors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="w-full max-w-5xl px-2"
        >
          <div className="bg-white/95 backdrop-blur-md p-1.5 md:p-2 rounded-[2rem] md:rounded-full shadow-2xl border border-white/20 flex flex-col md:flex-row items-center gap-2">
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-2">
              {/* Check In */}
              <HeroDatePicker 
                label="CHECK IN"
                date={state.checkIn}
                onSelect={(date) => updateDates(date, state.checkOut)}
                minDate={new Date()}
              />

              {/* Check Out */}
              <HeroDatePicker 
                label="CHECK OUT"
                date={state.checkOut}
                onSelect={(date) => updateDates(state.checkIn, date)}
                minDate={state.checkIn ? new Date(state.checkIn) : new Date()}
              />

              {/* Guests */}
              <HeroGuestInput 
                value={state.guests}
                onSelect={(val) => setState(prev => ({ ...prev, guests: val }))}
              />
            </div>

            <button
              onClick={() => onBookNow(state)}
              disabled={isLoading}
              className="w-full md:w-auto px-12 py-6 bg-[#434021] text-white rounded-full font-black uppercase tracking-[0.2em] text-[11px] transition-all hover:bg-[#C6A75E] hover:text-[#434021] shadow-xl hover:shadow-[#C6A75E]/30 active:scale-95 flex items-center justify-center gap-3 overflow-hidden group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin text-amber-500" size={20} />
              ) : (
                <>
                  <span>CHECK AVAILABILITY</span>
                  <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
