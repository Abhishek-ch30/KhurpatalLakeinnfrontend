import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, Wifi, Coffee, Star, ArrowRight, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import { RoomCardSkeleton } from './ui/skeleton';

interface RoomsProps {
  onBookRoom: (room: any) => void;
}

export function Rooms({ onBookRoom }: RoomsProps) {
  const [dbRooms, setDbRooms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await api.getRooms();
        setDbRooms(rooms);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (isLoading) {
    return (
      <section id="rooms" className="py-24 bg-[#FBF6EE]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 opacity-40">
            <div className="max-w-2xl space-y-4">
               <div className="h-4 w-32 bg-slate-200 animate-pulse rounded-full" />
               <div className="h-16 w-full max-w-lg bg-slate-200 animate-pulse rounded-2xl" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2, 3, 4].map((i) => (
              <RoomCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rooms" className="py-24 bg-[#FBF6EE]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#C6A75E] text-xs font-black uppercase tracking-[0.4em] mb-4 block"
            >
              Sanctuaries of Serenity
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-[#434021] leading-tight" 
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Exquisite Accommodations
            </motion.h2>
          </div>
          <div className="text-right">
             <p className="text-[#434021]/60 text-lg max-w-sm ml-auto">Each room is a portal to the majestic beauty of the Himalayan landscape.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {dbRooms.map((dbRoom, index) => {
            const isLuxury = dbRoom.type.toLowerCase().includes('luxury');
            const imageUrl = isLuxury 
              ? "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

            return (
              <motion.div
                key={dbRoom.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group cursor-default"
              >
                <div className="relative h-[400px] mb-8 overflow-hidden rounded-[2.5rem] shadow-2xl">
                  <img
                    src={imageUrl}
                    alt={dbRoom.type}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                       {dbRoom.status}
                    </span>
                    {isLuxury && (
                      <span className="bg-amber-500 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                        <Star size={10} fill="currentColor" /> Premium
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-8 left-8 text-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-2">Starting from</p>
                    <p className="text-3xl font-black tracking-tight leading-none">₹{dbRoom.price?.toLocaleString()} <span className="text-sm font-medium opacity-60">/ night</span></p>
                  </div>
                </div>

                <div className="px-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-[#434021] tracking-tight">{dbRoom.type}</h3>
                  </div>
                  
                  <p className="text-[#434021]/70 mb-8 leading-relaxed font-medium">
                    Experience unrivaled comfort in our {dbRoom.type.toLowerCase()}, featuring world-class amenities and breathtaking mountain views.
                  </p>

                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-10">
                    <div className="flex items-center gap-3 text-sm text-[#434021]/80 font-bold uppercase tracking-widest text-[10px]">
                      <Users size={18} className="text-amber-500" />
                      Up to {isLuxury ? '2' : '4'} Guests
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#434021]/80 font-bold uppercase tracking-widest text-[10px]">
                      <Calendar size={18} className="text-amber-500" />
                      Free Cancellation
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#434021]/80 font-bold uppercase tracking-widest text-[10px]">
                      <Wifi size={18} className="text-amber-500" />
                      High-speed Wi-Fi
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#434021]/80 font-bold uppercase tracking-widest text-[10px]">
                      <Coffee size={18} className="text-amber-500" />
                      Breakfast Included
                    </div>
                  </div>

                  <button
                    onClick={() => onBookRoom(dbRoom)}
                    className="w-full bg-[#434021] text-white py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#C6A75E] transition-all group/btn shadow-xl shadow-[#434021]/10"
                  >
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Reserve This Room</span>
                    <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
