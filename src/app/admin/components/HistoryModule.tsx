import React, { useState, useEffect } from 'react';
import { 
  History as HistoryIcon, 
  Search, 
  Download, 
  Clock, 
  Calendar,
  Loader2 
} from 'lucide-react';
import { api } from '../../services/api';
import { toast } from 'sonner';

export const HistoryModule: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      // For now, we fetch all reservations and filter by status or just show all as history
      const data = await api.getReservations();
      setHistory(data);
    } catch (error) {
      toast.error('Failed to load history');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-500" size={32} />
      </div>
    );
  }

  return (
    <div className="p-8 animate-in slide-in-from-bottom-5 duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Khurpatal Archives</h3>
            <p className="text-sm text-slate-500 font-medium">Historical stay records and session logs.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                    type="text" 
                    placeholder="Search by name..."
                    className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500/20 outline-none w-64"
                />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">
              <Download size={14} />
              Archive Report
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {history.length > 0 ? history.map((record) => (
            <div key={record.id} className="flex items-center justify-between p-5 rounded-3xl border border-slate-50 bg-white hover:bg-slate-50/50 transition-all group">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex flex-col items-center justify-center leading-none">
                    <span className="text-[10px] font-black text-slate-400 uppercase">{new Date(record.createdAt).toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-lg font-black text-slate-900">{new Date(record.createdAt).getDate()}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">{record.guestName}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Clock size={10} />
                        Completed
                    </span>
                    <span className="text-[10px] text-slate-300">•</span>
                    <span className="text-[10px] font-bold text-amber-600">{record.room.type}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-10">
                <div className="text-right">
                  <p className="text-xs font-black text-slate-900">₹{record.totalPrice.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400 font-medium">Final Invoice Total</p>
                </div>
                <div className="flex -space-x-2">
                    {[1, 2].map(i => (
                        <div key={i} className="w-8 h-8 rounded-xl border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">PDF</div>
                    ))}
                </div>
              </div>
            </div>
          )) : (
            <div className="py-20 text-center text-slate-400 font-medium">
                The archives are currently empty.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
