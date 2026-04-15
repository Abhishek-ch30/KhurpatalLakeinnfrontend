import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Volume2, VolumeX, ChevronRight, ChevronLeft, Sparkles, MapPin, Coffee, Utensils, Waves, Music } from 'lucide-react';
import { useBookingFlow } from '../hooks/useBookingFlow';

interface Scene {
  id: number;
  video: string;
  image: string; // Fallback
  text: string;
  tag: string;
}

const SCENES: Scene[] = [
  {
    id: 0,
    video: 'https://player.vimeo.com/external/494163967.sd.mp4?s=69446d3237190e29479b47bb66f2a33f443b8782&profile_id=164&oauth2_token_id=57447761',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80',
    tag: 'Pristine Nature',
    text: 'Far from the noise... deep into the soul of the mountains.',
  },
  {
    id: 1,
    video: 'https://player.vimeo.com/external/459389137.sd.mp4?s=984e135ed4f664531818d042fb181744f45d3e38&profile_id=164&oauth2_token_id=57447761',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80',
    tag: 'The Reveal',
    text: 'A hidden escape designed for the modern explorer.',
  },
  {
    id: 2,
    video: 'https://player.vimeo.com/external/371434633.sd.mp4?s=d0107e6005298816c27181c4e78f9f21396f4242&profile_id=164&oauth2_token_id=57447761',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80',
    tag: 'Moments',
    text: 'Every gathering is a melody. Every night is a story.',
  },
  {
    id: 3,
    video: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c36394334f59fc964a4c6a655291244f94f92323&profile_id=164&oauth2_token_id=57447761',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4df85b?auto=format&fit=crop&w=1920&q=80',
    tag: 'The Stay',
    text: 'Refined comfort. Unrivaled serenity. Begin your journey.',
  }
];

export function StoryMode() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const { openFlow } = useBookingFlow();

  useEffect(() => {
    // Auto-trigger on first load (ever) 
    const hasSeen = localStorage.getItem('hasSeenStory');
    if (!hasSeen) {
      setTimeout(() => {
        setIsOpen(true);
      }, 3000);
    }
  }, []);

  const next = () => {
    if (currentScene < SCENES.length - 1) {
      setCurrentScene(prev => prev + 1);
    } else {
        // Option call to action or loop or exit
    }
  };

  const prev = () => {
    if (currentScene > 0) {
      setCurrentScene(prev => prev - 1);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenStory', 'true');
  };

  const handleCTA = () => {
    handleClose();
    openFlow();
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[100]">
         <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="bg-[#0F172A] text-white p-3.5 md:p-5 rounded-[1.5rem] md:rounded-3xl shadow-2xl flex items-center gap-3 md:gap-4 overflow-hidden group hover:bg-black transition-all border border-white/10"
         >
            <div className="w-6 h-6 md:w-8 md:h-8 bg-amber-500 rounded-lg md:rounded-xl flex items-center justify-center text-black shadow-lg group-hover:rotate-12 transition-transform">
               <Play className="fill-current ml-0.5" size={10} />
            </div>
            <span className="font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] hidden sm:block">Relive the Story</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
         </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black text-white flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background Assets */}
            {SCENES.map((scene, i) => (
              <div key={scene.id} className={`absolute inset-0 transition-opacity duration-1000 ${i === currentScene ? 'opacity-100' : 'opacity-0'}`}>
                <video
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover opacity-60"
                  src={scene.video}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
              </div>
            ))}

            {/* Instagram Style Tap Regions */}
            <div className="absolute inset-0 z-10 flex">
               <div 
                 onClick={prev}
                 className="w-[30%] h-full cursor-none pointer-events-auto"
                 title="Previous Scene"
               />
               <div 
                 onClick={currentScene === SCENES.length - 1 ? (e) => { e.stopPropagation(); /* Prevent accidental CTA jump */ } : next}
                 className="w-[70%] h-full cursor-none pointer-events-auto"
                 title="Next Scene"
               />
            </div>

            {/* Header Controls */}
            <div className="absolute top-0 inset-x-0 p-8 flex items-center justify-between z-20">
               <div className="flex items-center gap-4">
                  <div className="h-10 w-px bg-white/20" />
                  <div>
                    <h2 className="text-xl font-bold tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>The Cinematic Journey</h2>
                    <p className="text-[10px] uppercase font-black tracking-[0.3em] opacity-40">Khurpatal Lake Inn</p>
                  </div>
               </div>
               <div className="flex items-center gap-6">
                  <button onClick={() => setIsMuted(!isMuted)} className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all">
                     {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <button onClick={handleClose} className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all text-amber-500">
                     <X size={20} />
                  </button>
               </div>
            </div>

            {/* Content Center */}
            <div className="relative z-10 max-w-4xl px-8 text-center mt-20">
               <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScene}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                  >
                     <p className="text-amber-500 font-black uppercase tracking-[0.5em] text-xs">
                        {SCENES[currentScene].tag}
                     </p>
                     <h1 className="text-4xl md:text-7xl font-bold leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                        {SCENES[currentScene].text}
                     </h1>
                  </motion.div>
               </AnimatePresence>
            </div>

            {/* Footer Navigation */}
            <div className="absolute bottom-0 inset-x-0 p-12 flex flex-col items-center gap-12 z-20">
               {/* Progress Indicators */}
               <div className="flex gap-4">
                  {SCENES.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1 transition-all duration-500 rounded-full ${i === currentScene ? 'w-12 bg-amber-500' : 'w-4 bg-white/20'}`} 
                    />
                  ))}
               </div>

               <div className="flex items-center justify-between w-full max-w-4xl">
                  <button 
                    onClick={prev} 
                    disabled={currentScene === 0}
                    className={`flex items-center gap-2 font-black uppercase tracking-widest text-[10px] transition-all ${currentScene === 0 ? 'opacity-0 cursor-default' : 'opacity-100 hover:text-amber-500'}`}
                  >
                     <ChevronLeft size={16} />
                     Previous Chapter
                  </button>

                  <button 
                    onClick={currentScene === SCENES.length - 1 ? handleCTA : next}
                    className="group bg-white text-black pl-10 pr-4 py-4 rounded-full font-black uppercase tracking-[0.4em] text-xs flex items-center gap-3 hover:bg-amber-500 transition-all shadow-2xl"
                  >
                     <span>{currentScene === SCENES.length - 1 ? 'Begin Journey' : 'Next Discovery'}</span>
                     <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ChevronRight size={18} />
                     </div>
                  </button>
               </div>
            </div>

            {/* Scroll/Progress Bar Bottom */}
            <div className="absolute bottom-0 left-0 h-1 bg-amber-500 z-30 transition-all duration-[5000ms] linear" style={{ width: `${((currentScene + 1) / SCENES.length) * 100}%` }} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
