import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, MapPin, Sparkles, Coffee, Calendar } from 'lucide-react';
import { useBookingFlow } from '../hooks/useBookingFlow';

interface WeatherData {
  temp: number;
  condition: 'Sunny' | 'Cloudy' | 'Rainy';
  humidity: number;
  windSpeed: number;
  suggestion: string;
}

interface WeatherWidgetProps {
  flow: ReturnType<typeof useBookingFlow>;
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

export function WeatherWidget() {
  const [data, setData] = useState<WeatherData>(MOCK_DATA.morning);
  const [activeTab, setActiveTab] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');

  useEffect(() => {
    setData(MOCK_DATA[activeTab]);
  }, [activeTab]);

  const Icon = data.condition === 'Sunny' ? Sun : data.condition === 'Rainy' ? CloudRain : Cloud;

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative group">
       {/* Decorative Gradient */}
       <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-700" />
       
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

          <div className="grid grid-cols-4 gap-2">
             {(['morning', 'afternoon', 'evening', 'night'] as const).map(tab => (
                <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab 
                        ? 'bg-[#434021] text-white shadow-xl rotate-3' 
                        : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                   }`}
                >
                   {tab}
                </button>
             ))}
          </div>

          <AnimatePresence mode="wait">
             <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-amber-50/50 rounded-3xl p-5 border border-amber-100/50 flex gap-4 items-start"
             >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-600 border border-amber-100 shrink-0">
                   <Icon size={24} />
                </div>
                <div>
                   <p className="text-sm font-bold text-slate-700 leading-snug">
                      {data.suggestion}
                   </p>
                   <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                         <Wind size={12} /> {data.windSpeed} km/h
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                         <Thermometer size={12} /> {data.humidity}% hum
                      </div>
                   </div>
                </div>
             </motion.div>
          </AnimatePresence>

          <button 
            onClick={() => flow.openFlow({}, 'dates')}
            className="w-full bg-white border border-slate-100 py-4 rounded-2xl flex items-center justify-center gap-3 group/btn hover:border-amber-500 transition-all"
          >
             <Calendar size={18} className="text-amber-600 group-hover/btn:rotate-12 transition-transform" />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 group-hover/btn:text-amber-600">Check Availability</span>
          </button>
       </div>
    </div>
  );
}
