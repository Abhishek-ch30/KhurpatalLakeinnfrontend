import React, { useState, useEffect } from 'react';
import { 
  Brush, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Loader2 
} from 'lucide-react';
import { api } from '../../services/api';
import { toast } from 'sonner';

export const HousekeepingModule: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await api.getHousekeeping();
      setTasks(data);
    } catch (error) {
      toast.error('Failed to load housekeeping tasks');
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
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Active Maintenance</h3>
            <p className="text-sm text-slate-500 font-medium">Real-time room readiness and cleaning log.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">ST</div>
                ))}
            </div>
            <span className="text-xs text-slate-400 font-medium ml-2">8 Staff Active</span>
          </div>
        </div>

        <div className="space-y-4">
          {tasks.length > 0 ? tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-6 rounded-[2rem] border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-amber-100 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${task.status === 'PENDING' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'}`}>
                  {task.status === 'PENDING' ? <Clock size={24} /> : <CheckCircle2 size={24} />}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-bold text-slate-900">Room {task.room.roomNumber}</h4>
                    <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded-lg tracking-widest">{task.type}</span>
                  </div>
                  <p className="text-sm text-slate-500 font-medium mt-1">Due by {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="text-right hidden md:block">
                  <p className="text-xs font-bold text-slate-900">Assigned To</p>
                  <p className="text-[10px] text-slate-400 font-medium">Duty Officer #2</p>
                </div>
                <button className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  task.status === 'PENDING' 
                    ? 'bg-slate-900 text-white hover:bg-black' 
                    : 'bg-emerald-500 text-white cursor-default'
                }`}>
                  {task.status === 'PENDING' ? 'Mark Complete' : 'Finished'}
                </button>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-amber-500 transition-colors" />
              </div>
            </div>
          )) : (
            <div className="py-20 text-center text-slate-400 font-medium">
                All rooms are currently serviced and ready for check-in.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
