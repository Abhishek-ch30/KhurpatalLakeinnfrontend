import React, { useState, useEffect } from 'react';
import { 
  Package, 
  AlertTriangle, 
  ArrowUp, 
  ArrowDown, 
  Plus, 
  History,
  Loader2 
} from 'lucide-react';
import { api } from '../../services/api';
import { toast } from 'sonner';

export const InventoryModule: React.FC = () => {
  const [inventory, setInventory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const data = await api.getInventory();
      setInventory(data);
    } catch (error) {
      toast.error('Failed to load inventory');
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Items', value: inventory.length, icon: Package, color: 'slate' },
          { label: 'Low Stock', value: inventory.filter(i => i.quantity <= i.minThreshold).length, icon: AlertTriangle, color: 'red' },
          { label: 'Recent Stock-in', value: '12', icon: ArrowUp, color: 'emerald' },
          { label: 'Out of Stock', value: inventory.filter(i => i.quantity === 0).length, icon: History, color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 rounded-2xl bg-${stat.color}-50 flex items-center justify-center mb-4 text-${stat.color}-600`}>
              <stat.icon size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <h4 className="text-2xl font-black text-slate-900 mt-1">{stat.value}</h4>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Supply Management</h3>
            <p className="text-sm text-slate-500 font-medium">Global stock tracking for Khurpatal Lake Inn.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-black transition-all shadow-lg shadow-slate-900/10">
            <Plus size={16} />
            Add New Item
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {inventory.map((item) => (
            <div key={item.id} className="p-6 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all group scale-100 hover:scale-[1.02]">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-amber-500 shadow-sm transition-colors">
                  <Package size={24} />
                </div>
                <div className="text-right">
                  <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${item.quantity <= item.minThreshold ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                    {item.quantity <= item.minThreshold ? 'Critical' : 'Healthy'}
                  </span>
                </div>
              </div>
              <h4 className="text-lg font-bold text-slate-900">{item.name}</h4>
              <p className="text-xs text-slate-500 font-medium mb-6">Last updated: Today</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Quantity</span>
                  <span className="text-slate-900 font-bold">{item.quantity} {item.unit}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${item.quantity <= item.minThreshold ? 'bg-red-500' : 'bg-emerald-500'}`} 
                    style={{ width: `${Math.min((item.quantity / (item.minThreshold * 2)) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <button className="py-2 text-[10px] font-black uppercase text-slate-600 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">Adjust</button>
                <button className="py-2 text-[10px] font-black uppercase text-amber-600 bg-amber-50 border border-amber-100 rounded-xl hover:bg-amber-100 transition-colors">Restock</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
