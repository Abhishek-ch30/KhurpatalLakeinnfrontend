import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, Wifi, Coffee, Star, ArrowRight, Loader2, Compass } from 'lucide-react';
import { api } from '../services/api';
import { RoomCardSkeleton } from './ui/skeleton';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RoomsProps {
  onBookRoom: (room: any) => void;
}

export function Rooms({ onBookRoom }: RoomsProps) {
  const [dbRooms, setDbRooms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

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

  const featuredRooms = showAll ? dbRooms : dbRooms.slice(0, 3);

  if (isLoading) {
    return (
      <section id="rooms" className="py-32 bg-[#FBF6EE]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-4 w-32 bg-slate-200 animate-pulse rounded-full mb-8 mx-auto" />
          <div className="h-16 w-full max-w-lg bg-slate-200 animate-pulse rounded-2xl mx-auto mb-16" />
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
    <section id="rooms" className="py-32 bg-[#FBF6EE] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[#434021]/5 rounded-full blur-[120px] -z-0 opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Centered Editorial Header */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#434021]/10 rounded-full mb-6"
          >
             <div className="w-1 h-1 bg-[#434021] rounded-full animate-pulse" />
             <span className="text-[#434021]/70 tracking-[0.5em] text-[10px] font-black uppercase">Sanctuaries of Serenity</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2.75rem] sm:text-6xl lg:text-8xl text-[#434021] leading-[1] tracking-tighter mb-8" 
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Exquisite <br />
            <span className="italic">Accommodations</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto border-t border-amber-500/10 pt-8"
          >
            Each sanctuary is a curated portal to the majestic beauty of the Himalayan landscape. Rooted in comfort, inspired by the hills.
          </motion.p>
        </div>

        {/* The Sanctuary Portfolio - Out of the Box Symmetrical Layout */}
        <div className="space-y-12">
          {/* Featured Room - Full Width High Impact */}
          {featuredRooms.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl border border-amber-500/5"
            >
              <div className="flex flex-col">
                <div className="relative h-[500px] md:h-[650px] overflow-hidden">
                  <ImageWithFallback
                    src={featuredRooms[0].type.toLowerCase().includes('luxury') 
                      ? "/assets/images/IMG_2690-1-scaled.jpg"
                      : "/assets/images/IMG_2711-1-scaled.jpg"}
                    alt={featuredRooms[0].type}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Status Badges */}
                  <div className="absolute top-8 left-8 flex gap-3">
                    <div className="bg-white/90 backdrop-blur-xl text-[#434021] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg border border-white">
                       {featuredRooms[0].status}
                    </div>
                    {featuredRooms[0].type.toLowerCase().includes('luxury') && (
                       <div className="bg-[#434021] text-amber-500 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
                          <Star size={12} fill="currentColor" /> Signature Suite
                       </div>
                    )}
                  </div>

                  {/* Editorial Overlay Text */}
                  <div className="absolute bottom-12 left-12 right-12 text-white">
                    <p className="text-amber-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Featured Sanctuary</p>
                    <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                      {featuredRooms[0].type}
                    </h3>
                  </div>
                </div>

                <div className="p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-12 bg-white">
                  <div className="max-w-2xl">
                    <p className="text-slate-500 text-lg font-medium leading-relaxed italic mb-8">
                      "Experience unrivaled comfort where world-class amenities meet the quiet whispers of the emerald lake. A sanctuary designed for pure tranquility."
                    </p>
                    
                    <div className="flex flex-wrap gap-8">
                      <div className="flex items-center gap-4 text-slate-500">
                        <Users size={20} className="text-amber-600" />
                        <span className="text-xs font-black uppercase tracking-widest">Premium Space</span>
                      </div>
                      <div className="flex items-center gap-4 text-slate-500">
                        <Wifi size={20} className="text-amber-600" />
                        <span className="text-xs font-black uppercase tracking-widest">High Speed Connection</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 pl-12 md:border-l border-amber-500/10 min-w-[300px]">
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Starting from</p>
                        <p className="text-4xl font-black text-[#434021] tracking-tighter">₹{featuredRooms[0].price?.toLocaleString()}</p>
                     </div>
                     <button
                        onClick={() => onBookRoom(featuredRooms[0])}
                        className="flex-1 bg-[#434021] text-white px-10 py-5 rounded-full flex items-center justify-center gap-3 hover:bg-[#C6A75E] transition-all shadow-xl group/btn"
                     >
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Book Now</span>
                        <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                     </button>
                  </div>
                </div>
              </div>
              
              {/* Signature Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-amber-500/20 rounded-tr-[4rem] pointer-events-none" />
            </motion.div>
          )}

          {/* Supporting Grid - 2 Column Balanced */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {featuredRooms.slice(1).map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative bg-[#FBF6EE] rounded-[3.5rem] p-10 border border-[#434021]/10 hover:border-[#C6A75E] hover:bg-white hover:shadow-2xl transition-all duration-700 h-full flex flex-col"
              >
                <div className="relative h-[300px] mb-10 overflow-hidden rounded-[2.5rem] shadow-xl">
                  <ImageWithFallback
                    src={room.type.toLowerCase().includes('luxury') 
                      ? "/assets/images/IMG_2690-1-scaled.jpg"
                      : "/assets/images/IMG_2711-1-scaled.jpg"}
                    alt={room.type}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute top-6 right-6">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-[#434021] uppercase tracking-widest border border-white">
                       {room.status}
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                   <h3 className="text-3xl font-bold text-[#434021] mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                      {room.type}
                   </h3>
                   <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 opacity-80">
                      Discover the perfect balance of mountain elegance and modern luxury in our {room.type.toLowerCase()}.
                   </p>
                </div>

                <div className="flex items-center justify-between border-t border-amber-500/10 pt-8">
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Per Night</p>
                      <p className="text-2xl font-black text-[#434021]">₹{room.price?.toLocaleString()}</p>
                   </div>
                   <button
                      onClick={() => onBookRoom(room)}
                      className="w-14 h-14 bg-[#434021] text-white rounded-2xl flex items-center justify-center hover:bg-amber-600 transition-all shadow-lg group/btn"
                   >
                      <ArrowRight size={24} className="group-hover/btn:translate-x-1 transition-transform" />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Discovery Button - Symmetrical Bottom Anchor */}
          {!showAll && dbRooms.length > 3 && (
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="flex justify-center pt-12"
            >
               <button 
                  onClick={() => setShowAll(true)}
                  className="px-10 py-5 bg-[#434021]/5 border border-[#434021]/10 rounded-full text-[10px] font-black uppercase tracking-[0.5em] text-[#434021] hover:bg-[#434021] hover:text-white transition-all duration-500 flex items-center gap-4 group"
               >
                  <Compass size={16} className="group-hover:rotate-45 transition-transform duration-700" />
                  Discover the Full Collection
               </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
