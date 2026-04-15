import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, MapPin, Calendar } from 'lucide-react';
import { useBookingFlow } from '../hooks/useBookingFlow';

interface WeatherData {
  temp: number;
  condition: 'Sunny' | 'Cloudy' | 'Rainy';
  humidity: number;
  windSpeed: number;
  suggestion: string;
}

const MOCK_DATA: Record<string, WeatherData> = {
  morning: {
    temp: 16,
    condition: 'Sunny',
    humidity: 45,
    windSpeed: 8,
    suggestion: "Crisp mountain air. Perfect for a morning lake-trail trek.",
  },
  afternoon: {
    temp: 22,
    condition: 'Sunny',
    humidity: 40,
    windSpeed: 12,
    suggestion: "Brilliant sunshine. Ideal for an infinity pool session or outdoor photography.",
  },
  evening: {
    temp: 14,
    condition: 'Cloudy',
    humidity: 60,
    windSpeed: 5,
    suggestion: "Cool mist descending. Our signature Malwa Chai awaits by the fireplace.",
  },
  night: {
    temp: 11,
    condition: 'Cloudy',
    humidity: 70,
    windSpeed: 4,
    suggestion: "Starlit sky. Perfect for a cozy bonfire and social jamming.",
  }
};

export function WeatherWidget({ flow }: { flow: ReturnType<typeof useBookingFlow> }) {
  const [data, setData] = useState<WeatherData>(MOCK_DATA.morning);
  const [activeTab, setActiveTab] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');

  useEffect(() => {
    setData(MOCK_DATA[activeTab]);
  }, [activeTab]);

  const Icon = data.condition === 'Sunny' ? Sun : data.condition === 'Rainy' ? CloudRain : Cloud;

  return (
    <div className="bg-white/95 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative group">
       {/* Background Depth Frame */}
       <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-amber-500/5 to-transparent z-0" />
       
       <div className="relative z-10 flex flex-col gap-8">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 text-black rounded-2xl flex items-center justify-center shadow-lg">
                   <MapPin size={20} />
                </div>
                <div>
                   <h4 className="font-bold text-slate-900 tracking-tight">Khurpatal Sky</h4>
                   <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Live Forecast</p>
                </div>
             </div>
             <div className="text-right">
                <span className="text-4xl font-black text-slate-900 leading-none">{data.temp}°</span>
                <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mt-1">{data.condition}</p>
             </div>
          </div>

          <div className="grid grid-cols-4 gap-2 bg-[#FBF6EE] p-1.5 rounded-2xl border border-amber-500/10">
             {(['morning', 'afternoon', 'evening', 'night'] as const).map(tab => (
                <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab 
                        ? 'bg-[#434021] text-white shadow-lg' 
                        : 'text-slate-400 hover:text-amber-600'
                   }`}
                >
                   {tab}
                </button>
             ))}
          </div>

          <AnimatePresence mode="wait">
             <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-[#FBF6EE] rounded-3xl p-6 border border-amber-500/10 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center"
             >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-md border border-amber-100 shrink-0">
                   <Icon size={28} />
                </div>
                <div>
                   <p className="text-sm font-bold text-black leading-snug mb-2">
                      {data.suggestion}
                   </p>
                   <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-black uppercase tracking-wider">
                         <Wind size={12} className="text-amber-500" /> {data.windSpeed} km/h
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-black uppercase tracking-wider">
                         <Thermometer size={12} className="text-amber-500" /> {data.humidity}% hum
                      </div>
                   </div>
                </div>
             </motion.div>
          </AnimatePresence>

          <button 
            onClick={() => flow.openFlow({}, 'dates')}
            className="w-1/2 mx-auto bg-[#434021] text-white py-4 rounded-full flex items-center justify-center gap-3 shadow-xl shadow-[#434021]/20 hover:bg-[#C6A75E] transition-all group"
          >
             <Calendar size={18} className="text-amber-500 group-hover:rotate-12 transition-transform" />
             <span className="text-[10px] font-black uppercase tracking-widest">Check Availability</span>
          </button>
       </div>
    </div>
  );
}
