import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  Loader2 
} from 'lucide-react';
import { api } from '../../services/api';
import { toast } from 'sonner';

export const ReservationsModule: React.FC = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const data = await api.getReservations();
      setReservations(data);
    } catch (error) {
      toast.error('Failed to load reservations');
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Active Reservations</h3>
            <p className="text-sm text-slate-500 font-medium">Manage currently confirmed guest stays.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">
              <Filter size={14} />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all shadow-lg shadow-slate-900/10">
              <Download size={14} />
              Export CSV
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">ID</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Guest Details</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Stay Period</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Accommodation</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Status</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Revenue</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {reservations.length > 0 ? reservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="py-5 px-2 text-xs font-black text-slate-400">#BK-{reservation.id.slice(0, 4).toUpperCase()}</td>
                  <td className="py-5 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                        {reservation.guestName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-none">{reservation.guestName}</p>
                        <p className="text-[10px] text-slate-400 mt-1 font-medium">{reservation.guestEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-2">
                    <p className="text-xs font-bold text-slate-700 leading-none">
                      {new Date(reservation.checkIn).toLocaleDateString()} - {new Date(reservation.checkOut).toLocaleDateString()}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium tracking-tight">Khurpatal Local Time</p>
                  </td>
                  <td className="py-5 px-2">
                    <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-1 rounded-lg uppercase tracking-wider border border-amber-100/50">
                      {reservation.room.type}
                    </span>
                  </td>
                  <td className="py-5 px-2">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${reservation.status === 'CONFIRMED' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      <span className={`text-[10px] uppercase font-black tracking-[0.1em] ${reservation.status === 'CONFIRMED' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {reservation.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-2 font-black text-slate-900 text-xs">
                    ₹{reservation.totalPrice.toLocaleString()}
                  </td>
                  <td className="py-5 px-2 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-emerald-500 transition-colors bg-white rounded-lg shadow-sm border border-slate-100">
                        <CheckCircle2 size={14} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 transition-colors bg-white rounded-lg shadow-sm border border-slate-100">
                        <XCircle size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="py-20 text-center text-slate-400 font-medium">
                    No active reservations found in the system.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
