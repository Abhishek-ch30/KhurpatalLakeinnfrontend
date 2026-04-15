import React from 'react';
import { Users, Home, ArrowRight } from 'lucide-react';
import { useBookingFlow } from '../../hooks/useBookingFlow';
import { HeroDatePicker } from './HeroDatePicker';

export function DateSelector({ flow }: { flow: ReturnType<typeof useBookingFlow> }) {
  const { state, setState, checkAvailability, nextStep, updateDates } = flow;

  const handleNext = async () => {
    if (!state.checkIn || !state.checkOut) return;
    await checkAvailability(state);
    nextStep();
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-[#434021] tracking-tight leading-none mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Plan Your Journey
        </h2>
        <p className="text-slate-500 font-medium italic">"Select your window to the mountains"</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <HeroDatePicker
          label="Check In"
          date={state.checkIn}
          onSelect={(date) => updateDates(date, state.checkOut)}
        />
        <HeroDatePicker
          label="Check Out"
          date={state.checkOut}
          onSelect={(date) => updateDates(state.checkIn, date)}
          minDate={state.checkIn ? new Date(state.checkIn) : undefined}
        />
      </div>

      {/* Total Nights - Auto Calculated */}
      <div className="mb-12">
        <div className="bg-amber-50/50 rounded-[2rem] px-8 py-5 border border-amber-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                  <span className="font-black text-xs">Nights</span>
               </div>
               <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Your Retreat Duration</span>
            </div>
            <span className="text-2xl font-black text-slate-900">{state.totalNights} {state.totalNights === 1 ? 'Night' : 'Nights'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Preferred Room Type</label>
          <div className="relative group">
            <Home className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" size={24} />
            <select 
              className="w-full pl-16 pr-6 py-6 bg-slate-50 border-none rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-bold text-slate-900 appearance-none text-lg"
              value={state.roomType}
              onChange={(e) => setState({...state, roomType: e.target.value})}
            >
              <option value="All">All Sanctuaries</option>
              <option value="Luxury">Luxury Cottages</option>
              <option value="Dorm">Garden Dorms</option>
            </select>
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Number of Guests</label>
          <div className="relative group">
            <Users className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" size={24} />
            <select 
              className="w-full pl-16 pr-6 py-6 bg-slate-50 border-none rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-bold text-slate-900 appearance-none text-lg"
              value={state.guests}
              onChange={(e) => setState({...state, guests: parseInt(e.target.value)})}
            >
              {[1, 2, 3, 4, 5, 6].map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'Explorer' : 'Explorers'}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!state.checkIn || !state.checkOut}
        className="w-full bg-[#434021] text-white py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 hover:bg-black transition-all shadow-2xl shadow-[#434021]/10 group disabled:opacity-50"
      >
        Explore Available Rooms
        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
      </button>
    </div>
  );
}
