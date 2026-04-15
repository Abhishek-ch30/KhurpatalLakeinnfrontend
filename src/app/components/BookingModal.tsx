import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, CreditCard, Loader2, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { HeroDatePicker } from './booking/HeroDatePicker';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom: any;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, selectedRoom }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Success
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState<any[]>([]);
  
  const [bookingData, setBookingData] = useState({
    roomId: '',
    checkIn: '',
    checkOut: '',
    guestCount: '2'
  });

  useEffect(() => {
    if (isOpen) {
      fetchRooms();
      setStep(1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedRoom) {
      setBookingData(prev => ({ ...prev, roomId: selectedRoom.id }));
    }
  }, [selectedRoom]);

  const fetchRooms = async () => {
    try {
      const data = await api.getRooms();
      setRooms(data);
      if (!selectedRoom && data.length > 0) {
        setBookingData(prev => ({ ...prev, roomId: data[0].id }));
      }
    } catch (err) {
      console.error('Failed to load rooms');
    }
  };

  const calculateTotal = () => {
    const room = rooms.find(r => r.id === bookingData.roomId) || selectedRoom;
    if (!room || !bookingData.checkIn || !bookingData.checkOut) return 0;
    
    const start = new Date(bookingData.checkIn);
    const end = new Date(bookingData.checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights * room.price : 0;
  };

  const handleBooking = async () => {
    setIsLoading(true);
    try {
      await api.createBooking({
        ...bookingData,
        guestId: user?.id,
        guestName: user?.name,
        guestEmail: user?.email,
        totalPrice: calculateTotal()
      });
      setStep(3);
      toast.success('Your Himalayan retreat is secured!');
    } catch (err: any) {
      toast.error(err.message || 'Booking failed. Please check availability.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const currentRoom = rooms.find(r => r.id === bookingData.roomId) || selectedRoom;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 backdrop-blur-xl bg-black/60">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[850px]"
        >
          {/* Left Side: Room Visual & Info (Hidden on Mobile) */}
          <div className="hidden md:block w-[400px] bg-slate-900 text-white p-12 relative overflow-hidden">
             <div className="absolute inset-0 opacity-40">
                <img 
                    src={currentRoom?.type.toLowerCase().includes('luxury') 
                        ? "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    } 
                    className="w-full h-full object-cover"
                    alt="Room View"
                />
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
             
             <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-8">
                    <Sparkles className="text-amber-500" size={24} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Stay at Khurpatal</span>
                </div>
                
                <h3 className="text-4xl font-bold tracking-tight mb-2 leading-[0.9]">{currentRoom?.type || 'Select a Sanctuary'}</h3>
                <div className="flex items-center gap-2 text-amber-500 mb-8">
                    <MapPin size={14} />
                    <span className="text-xs font-bold uppercase tracking-widest">Uttarakhand, India</span>
                </div>

                <div className="mt-auto space-y-6 bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                    <div className="flex items-center justify-between">
                        <span className="text-white/50 text-[10px] font-black uppercase tracking-widest">Rate</span>
                        <span className="text-lg font-black tracking-tight">₹{currentRoom?.price.toLocaleString()} <span className="text-[10px] opacity-40">/ night</span></span>
                    </div>
                </div>
             </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 p-8 md:p-16 flex flex-col">
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-3 text-slate-400 hover:text-slate-900 bg-slate-50 rounded-2xl transition-all z-20"
            >
              <X size={24} />
            </button>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-3xl font-black text-[#434021] tracking-tight mb-2">Reservation Details</h2>
                    <p className="text-slate-500 font-medium mb-12">Confirm your check-in dates and guest count.</p>

                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <HeroDatePicker
                          label="Check In"
                          date={bookingData.checkIn}
                          onSelect={(date) => setBookingData({...bookingData, checkIn: date})}
                        />
                        <HeroDatePicker
                          label="Check Out"
                          date={bookingData.checkOut}
                          onSelect={(date) => setBookingData({...bookingData, checkOut: date})}
                          minDate={bookingData.checkIn ? new Date(bookingData.checkIn) : undefined}
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Number of Guests</label>
                        <div className="relative group">
                          <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" size={20} />
                          <select 
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-amber-500/10 transition-all font-bold text-slate-900 appearance-none"
                            value={bookingData.guestCount}
                            onChange={(e) => setBookingData({...bookingData, guestCount: e.target.value})}
                          >
                            {[1, 2, 3, 4, 5, 6].map(n => (
                              <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                            ))}
                            <option value="6+">6+ Guests (Bulk Enquiry)</option>
                          </select>
                        </div>
                      </div>

                      {!selectedRoom && (
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Preferred Room</label>
                            <select 
                                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-amber-500/10 transition-all font-bold text-slate-900 appearance-none"
                                value={bookingData.roomId}
                                onChange={(e) => setBookingData({...bookingData, roomId: e.target.value})}
                            >
                                {rooms.map(room => (
                                    <option key={room.id} value={room.id}>{room.type} — ₹{room.price}/night</option>
                                ))}
                            </select>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Confirm Payment</h2>
                    <p className="text-slate-500 font-medium mb-12">Simulated payment for your mountain getaway.</p>

                    <div className="bg-[#FBF6EE] rounded-[2.5rem] p-8 space-y-6 mb-12 border border-blue-100">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Guest Profile</span>
                            <span className="text-slate-900 font-black tracking-tight">{user?.name}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Total Stay</span>
                            <span className="text-2xl font-black text-slate-900">₹{calculateTotal().toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <CreditCard className="text-amber-600" size={32} />
                        <div>
                            <p className="text-sm font-black text-slate-900 uppercase tracking-wider">Functional Mock Payment</p>
                            <p className="text-xs text-slate-400 font-medium">Safe & Secure sandbox environment</p>
                        </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                    <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 size={64} />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">You're All Set!</h2>
                    <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-sm mx-auto mb-10">
                        The mountains are calling. Check your Khurpatal Pass in your profile for stay details.
                    </p>
                    <button 
                      onClick={onClose}
                      className="px-12 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl shadow-slate-900/10"
                    >
                      Return to Explore
                    </button>
                  </motion.div>
                )}
            </div>

            {step < 3 && (
              <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col md:flex-row gap-4">
                {step === 2 && (
                    <button 
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 text-slate-400 font-black uppercase tracking-widest text-xs hover:text-slate-900 transition-all"
                    >
                        Back
                    </button>
                )}
                <button 
                  onClick={() => step === 1 ? setStep(2) : handleBooking()}
                  disabled={isLoading}
                  className="flex-[2] bg-slate-900 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-black transition-all shadow-2xl shadow-slate-900/10 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                    <>
                      {step === 1 ? 'Go to Payment' : `Confirm ₹${calculateTotal().toLocaleString()}`}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
