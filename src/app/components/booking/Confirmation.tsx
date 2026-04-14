import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Calendar, MapPin, Download, Sparkles, ArrowRight, Share2, Loader2 } from 'lucide-react';
import { useBookingFlow } from '../../hooks/useBookingFlow';

export function Confirmation({ flow }: { flow: ReturnType<typeof useBookingFlow> }) {
  const { step, state, createBooking, isLoading, getDays, closeFlow } = flow;
  const isSuccess = step === 'success';

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-32 h-32 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl shadow-emerald-500/10"
        >
            <CheckCircle2 size={72} strokeWidth={3} />
        </motion.div>

        <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none mb-6">
            Victory in the Peaks!
        </h2>
        <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm mx-auto mb-12">
            Your stay at <span className="text-amber-500 font-bold">Khurpatal Lake Inn</span> is reserved. The mountains are already preparing for your arrival.
        </p>

        <div className="bg-[#434021] rounded-[3.5rem] p-10 text-white shadow-2xl mb-12 relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-20 -mt-20" />
            
            <div className="flex items-center gap-4 mb-8">
                <Sparkles className="text-amber-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Digital Boarding Pass</span>
            </div>

            <h3 className="text-3xl font-bold mb-8">{state.selectedRoom?.type} Sanctuary</h3>

            <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase text-white/40 tracking-widest">Guest Voyager</p>
                    <p className="text-sm font-bold">{state.guestDetails.fullName}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase text-white/40 tracking-widest">Reservation ID</p>
                    <p className="text-sm font-bold">#KH-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                </div>
                <div className="space-y-1 text-amber-500">
                    <p className="text-[8px] font-black uppercase text-amber-500/40 tracking-widest">Check In</p>
                    <p className="text-sm font-bold uppercase">{new Date(state.checkIn).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <div className="space-y-1 text-emerald-500">
                    <p className="text-[8px] font-black uppercase text-emerald-500/40 tracking-widest">Status</p>
                    <p className="text-sm font-bold uppercase">Confirmed</p>
                </div>
            </div>

            <div className="flex gap-4">
                <button className="flex-1 bg-white text-slate-900 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg">
                    <Download size={16} />
                    Download Pass
                </button>
                <button className="w-16 bg-white/10 text-white rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all">
                    <Share2 size={20} />
                </button>
            </div>
        </div>

        <button 
            onClick={closeFlow}
            className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] hover:text-slate-900 transition-colors"
        >
            Return to Exploration
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">
                Review Reservation
            </h2>
            <p className="text-slate-500 font-medium italic">"Once confirmed, the lake awaits your gaze"</p>
        </div>

        <div className="bg-white rounded-[3.5rem] p-10 md:p-16 border border-slate-100 shadow-xl space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                <div className="space-y-8 flex-1">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Sanctuary Details</p>
                        <h3 className="text-3xl font-black text-[#434021]">{state.selectedRoom?.type}</h3>
                        <div className="flex items-center gap-2 text-slate-500">
                            <MapPin size={16} className="text-amber-500" />
                            <span className="text-sm font-bold italic">Cabin Sector A1, Khurpatal Lake Inn</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-400">
                                <Calendar size={18} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Dates</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">{state.checkIn} — {state.checkOut}</p>
                                <p className="text-xs text-slate-500 font-medium">{getDays()} Nights total</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-400">
                                <MapPin size={18} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Occupancy</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">{state.guests} Explorers</p>
                                <p className="text-xs text-slate-500 font-medium">All ages included</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-80 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-6">Valuation Breakup</p>
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-xs font-bold">
                            <span className="text-slate-500">{state.selectedRoom?.price.toLocaleString()} x {getDays()} Nights</span>
                            <span className="text-slate-900">₹{(state.selectedRoom?.price * getDays()).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-emerald-600">
                            <span>Hospitality Fee</span>
                            <span>WAIVED</span>
                        </div>
                        <div className="h-px bg-slate-200" />
                        <div className="flex justify-between items-end">
                            <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Total</p>
                            <p className="text-2xl font-black text-slate-900">₹{(state.selectedRoom?.price * getDays()).toLocaleString()}</p>
                        </div>
                    </div>
                    <p className="text-[8px] text-slate-400 font-bold uppercase leading-relaxed">By confirming, you agree to our mountain serenity policy and conservation guidelines.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 pt-12 border-t border-slate-50">
                <button
                    onClick={createBooking}
                    disabled={isLoading}
                    className="flex-[2] bg-[#434021] text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 hover:bg-black transition-all shadow-2xl shadow-[#434021]/10 group disabled:opacity-70"
                >
                    {isLoading ? <Loader2 className="animate-spin text-white" size={24} /> : (
                        <>
                            Secure My Stay
                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </>
                    )}
                </button>
            </div>
        </div>
    </div>
  );
}
