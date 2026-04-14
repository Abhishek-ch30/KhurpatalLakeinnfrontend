import React from 'react';
import { motion } from 'motion/react';
import { Users, Star, ArrowRight, Zap, Loader2, Calendar } from 'lucide-react';
import { useBookingFlow } from '../../hooks/useBookingFlow';
import { RoomCardSkeleton } from '../ui/skeleton';

export function RoomSelector({ flow }: { flow: ReturnType<typeof useBookingFlow> }) {
  const { availableRooms, suggestions, handleRoomSelect, state, checkAvailability, setStep } = flow;

  const handleApplySuggestion = (s: any) => {
    checkAvailability({
        checkIn: s.checkIn,
        checkOut: s.checkOut,
        guests: parseInt(s.guests),
        roomType: s.roomType
    });
  };

  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Choose Your Sanctuary
        </h2>
        <div className="flex items-center justify-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400">
            <span>{state.checkIn} — {state.checkOut}</span>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <span>{state.guests} Guests</span>
        </div>
      </div>

      <div className="relative min-h-[400px]">
        {flow.isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <RoomCardSkeleton key={i} />
            ))}
          </div>
        ) : availableRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full"
            >
              <div className="relative h-64 rounded-[2rem] overflow-hidden mb-6">
                 <img 
                    src={room.type.toLowerCase().includes('luxury') 
                        ? "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    } 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    alt={room.type}
                 />
                 <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/20">
                    {room.type}
                 </div>
                 {room.type.toLowerCase().includes('luxury') && (
                     <div className="absolute top-4 left-4 bg-amber-500 px-3 py-1.5 rounded-full text-[8px] font-black text-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
                        <Star size={10} fill="currentColor" /> Premium
                     </div>
                 )}
              </div>

              <div className="px-4 pb-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">{room.type} Sanctuary</h3>
                    <div className="flex items-center gap-1 text-slate-400">
                        <Users size={14} />
                        <span className="text-xs font-bold text-slate-600">x{room.capacity}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-8">
                    <Zap className="text-amber-500" size={12} fill="currentColor" />
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Best match for your criteria</span>
                </div>

                <div className="mt-auto flex items-end justify-between">
                    <div>
                        <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">Price per night</p>
                        <p className="text-2xl font-black text-slate-900 leading-none">₹{room.price.toLocaleString()}</p>
                    </div>
                    <button 
                        onClick={() => handleRoomSelect(room)}
                        className="w-14 h-14 bg-slate-100 hover:bg-[#434021] hover:text-white rounded-2xl flex items-center justify-center transition-all group/btn"
                    >
                        <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-12">
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-center mb-16"
            >
                <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-amber-500 shadow-xl shadow-amber-500/10">
                    <Zap size={40} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-2">Sanctuary Currently Occupied</h3>
                <p className="text-slate-400 max-w-sm mx-auto font-medium">Your preferred escape is highly sought after. However, we have curated these alternatives for you.</p>
            </motion.div>

            {suggestions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {suggestions.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white border-2 border-slate-50 p-8 rounded-[3rem] shadow-xl hover:border-amber-200 transition-all flex flex-col items-start gap-6 relative group"
                        >
                            <div className="absolute -top-4 -right-4 bg-amber-500 text-black px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg rotate-12 group-hover:rotate-0 transition-transform">
                                Suggested
                            </div>
                            
                            <div className="flex gap-4 items-center">
                                <div className="w-14 h-14 bg-[#434021] text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    {s.type === 'TYPE_SWAP' ? <Star size={24} /> : <Calendar size={24} />}
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900">{s.title}</h4>
                                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{s.type === 'TYPE_SWAP' ? 'Similar Experience' : `${s.roomType} Available`}</p>
                                </div>
                            </div>

                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                {s.text}
                            </p>

                            <div className="bg-slate-50 w-full p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Range</span>
                                <span className="text-xs font-bold text-slate-900">{s.checkIn} — {s.checkOut}</span>
                            </div>

                            <button 
                                onClick={() => handleApplySuggestion(s)}
                                className="w-full bg-[#434021] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-black transition-all shadow-2xl shadow-[#434021]/10 group"
                            >
                                <span>Switch Stay</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 border-2 border-dashed border-slate-100 rounded-[3rem]"
                >
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                        <Calendar size={32} />
                    </div>
                    <p className="text-xl font-bold text-slate-900 mb-2">No Sanctuaries Available</p>
                    <p className="text-sm text-slate-400 mb-8 max-w-xs mx-auto font-medium">We couldn't find any availability or suitable alternatives for these specific dates.</p>
                    <button 
                        onClick={() => setStep('dates')}
                        className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
                    >
                        Modify Search Dates
                    </button>
                </motion.div>
            )}
        </div>
      )}
      </div>
    </div>
  );
}
