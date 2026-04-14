import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Package, Download, ChevronRight, Loader2, Sparkles, User, MapPin, Star, CreditCard } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'stays' | 'profile'>('stays');

  useEffect(() => {
    if (isOpen) {
      fetchBookings();
    }
  }, [isOpen]);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const all = await api.getReservations();
      const mine = all.filter((b: any) => b.guestEmail === user?.email);
      setBookings(mine);
    } catch (error) {
      toast.error('Failed to load your stays');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-end md:items-center justify-end p-0 md:p-6 backdrop-blur-md bg-black/60">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
          className="w-full max-w-3xl h-[100dvh] md:h-[90vh] bg-[#FBF6EE] rounded-t-[3rem] md:rounded-[3.5rem] shadow-2xl flex flex-col overflow-hidden border-l border-white/20"
        >
          {/* Dashboard Header */}
          <div className="p-8 md:p-12 pb-6 flex flex-col bg-white">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#434021] text-amber-500 flex items-center justify-center font-black text-xl shadow-xl shadow-[#434021]/10">
                        {user?.name?.[0]}
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 leading-none">{user?.name}</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Khurpatal Elite Member</p>
                    </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl transition-all"
                >
                  <X size={24} />
                </button>
            </div>

            <div className="flex gap-4">
                <button 
                    onClick={() => setActiveTab('stays')}
                    className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'stays' ? 'bg-[#434021] text-white' : 'text-slate-400 hover:text-slate-900'}`}
                >
                    My Stays
                </button>
                <button 
                    onClick={() => setActiveTab('profile')}
                    className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'profile' ? 'bg-[#434021] text-white' : 'text-slate-400 hover:text-slate-900'}`}
                >
                    Elite Profile
                </button>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar bg-[#FBF6EE]">
            {activeTab === 'stays' ? (
                <>
                    {/* Stats Widget */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                            <Star className="text-amber-500 mb-2" size={20} />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rewards Points</p>
                            <h4 className="text-2xl font-black text-slate-900">2,450</h4>
                        </div>
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                            <Calendar className="text-blue-500 mb-2" size={20} />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Stays</p>
                            <h4 className="text-2xl font-black text-slate-900">{bookings.length}</h4>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Upcoming Escapes</h4>
                            <span className="w-12 h-0.5 bg-amber-500/20" />
                        </div>

                        {isLoading ? (
                            <div className="py-20 flex flex-col items-center justify-center space-y-4">
                                <Loader2 className="animate-spin text-amber-500" size={32} />
                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Syncing Pass...</p>
                            </div>
                        ) : bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <motion.div 
                                    key={booking.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all group"
                                >
                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="h-48 md:w-48 rounded-[2rem] overflow-hidden bg-slate-100 relative">
                                            <img 
                                                src={booking.room.type.toLowerCase().includes('luxury') ? "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"} 
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                                alt="Room"
                                            />
                                            <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/20">
                                                Confirmed
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h5 className="text-2xl font-black text-slate-900 tracking-tight mb-2">{booking.room.type}</h5>
                                            <div className="flex items-center gap-2 text-slate-400 mb-6">
                                                <MapPin size={12} />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Khurpatal Lake Inn — Cabin House</span>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-6">
                                                <div>
                                                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">Check In</p>
                                                    <p className="text-xs font-bold text-slate-900">{new Date(booking.checkIn).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">Status</p>
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest leading-none">Ready</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full mt-8 py-4 bg-slate-50 hover:bg-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-all flex items-center justify-center gap-2">
                                        <Download size={14} />
                                        Download Boarding Pass
                                    </button>
                                </motion.div>
                            ))
                        ) : (
                            <div className="py-20 text-center">
                                <p className="text-slate-400 font-medium">No mountains conquered yet.</p>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100">
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-8">Personal Information</h4>
                        <div className="space-y-6">
                            {[
                                { label: 'Full Name', value: user?.name, icon: User },
                                { label: 'Email Address', value: user?.email, icon: Package },
                                { label: 'Contact Number', value: user?.phone || '+91 ••••• •••••', icon: CreditCard },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-6 p-4 rounded-2xl bg-slate-50">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm">
                                        <item.icon size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{item.label}</p>
                                        <p className="text-sm font-bold text-slate-900">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="bg-[#434021] p-10 rounded-[3rem] text-white overflow-hidden relative group">
                        <Sparkles className="absolute top-8 right-8 text-amber-500 opacity-20 group-hover:scale-150 transition-transform duration-1000" size={80} />
                        <h4 className="text-2xl font-black mb-2 leading-none">Upgrade to Gold</h4>
                        <p className="text-white/60 text-xs font-medium max-w-[200px] mb-8">Unlock lakeside spa access and private dining benefits.</p>
                        <button className="px-8 py-3 bg-amber-500 text-black rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-amber-500/20 active:scale-95 transition-all">
                            Explore Benefits
                        </button>
                    </div>
                </div>
            )}
          </div>

          <div className="p-10 text-center bg-white border-t border-slate-50 flex items-center justify-between">
            <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">Pass ID: #KH-{user?.id.slice(0,6)}</span>
            <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-slate-100" />
                <div className="w-2 h-2 rounded-full bg-slate-100" />
                <div className="w-2 h-2 rounded-full bg-amber-500" />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
