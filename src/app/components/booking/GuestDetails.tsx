import React from 'react';
import { User, Mail, Phone, Clock, MessageSquare, CreditCard, ArrowRight } from 'lucide-react';
import { useBookingFlow } from '../../hooks/useBookingFlow';

export function GuestDetails({ flow }: { flow: ReturnType<typeof useBookingFlow> }) {
  const { state, setState, nextStep, getDays } = flow;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState({
      ...state,
      guestDetails: {
        ...state.guestDetails,
        [name]: value
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Final Particulars
        </h2>
        <p className="text-slate-500 font-medium italic">"Customizing your Himalayan sanctuary"</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column: Form */}
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                            name="fullName"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900" 
                            value={state.guestDetails.fullName}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Contact Phone</label>
                    <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                            name="phone"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900" 
                            value={state.guestDetails.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Arrival Time (Optional)</label>
                <div className="relative group">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <select 
                        name="arrivalTime"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 appearance-none"
                        value={state.guestDetails.arrivalTime}
                        onChange={handleChange}
                    >
                        <option value="">Don't know yet</option>
                        <option value="12:00 PM">12:00 PM (Check-in)</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                        <option value="06:00 PM">06:00 PM</option>
                        <option value="Late Night">Late Night</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">ID Proof Type</label>
                <div className="relative group">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <select 
                        name="idProofType"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 appearance-none"
                        value={state.guestDetails.idProofType}
                        onChange={handleChange}
                    >
                        <option value="Aadhar">Aadhar Card</option>
                        <option value="Passport">Passport</option>
                        <option value="ID">Pan Card</option>
                        <option value="Driver">Driving License</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Special Requests</label>
                <div className="relative group">
                    <MessageSquare className="absolute left-4 top-4 text-slate-300" size={18} />
                    <textarea 
                        name="specialRequests"
                        rows={4}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 resize-none" 
                        placeholder="Flower decoration, extra bed, vegan breakfast..."
                        value={state.guestDetails.specialRequests}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>

        {/* Right Column: Summary Stick Card */}
        <div className="space-y-8">
            <div className="bg-[#434021] text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 mb-8">Reservation Summary</h3>
                
                <div className="space-y-6">
                    <div className="flex justify-between items-end border-b border-white/10 pb-4">
                        <div>
                            <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Selected Sanctuary</p>
                            <p className="text-xl font-bold">{state.selectedRoom?.type}</p>
                        </div>
                        <p className="text-xl font-black text-amber-500">₹{state.selectedRoom?.price.toLocaleString()}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest mb-1">Check In</p>
                            <p className="text-sm font-bold">{state.checkIn}</p>
                        </div>
                        <div>
                            <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest mb-1">Stay Period</p>
                            <p className="text-sm font-bold">{getDays()} Nights</p>
                        </div>
                    </div>
                    
                    <div>
                        <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest mb-1">Total Valuation</p>
                        <p className="text-4xl font-black text-white leading-none">₹{(state.selectedRoom?.price * getDays()).toLocaleString()}</p>
                        <p className="text-[8px] text-white/30 font-bold uppercase tracking-widest mt-2">Inclusive of all mountain taxes</p>
                    </div>
                </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2rem] flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <CreditCard size={20} />
                </div>
                <div>
                    <p className="text-xs font-black text-emerald-900 uppercase tracking-widest">Pay at Property</p>
                    <p className="text-[10px] text-emerald-600 font-medium">No advance payment required for your commitment.</p>
                </div>
            </div>

            <button
                onClick={nextStep}
                className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 hover:bg-black transition-all shadow-2xl shadow-slate-900/20 group"
            >
                Review Confirmation
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
        </div>
      </div>
    </div>
  );
}
