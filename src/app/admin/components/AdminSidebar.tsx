import React from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  DoorOpen, 
  MessageSquare, 
  ClipboardList, 
  Package, 
  Calendar, 
  BarChart3, 
  Star,
  LogOut,
  ChevronRight,
  History
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'reservations', label: 'Reservations', icon: CalendarDays },
  { id: 'rooms', label: 'Rooms', icon: DoorOpen },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'housekeeping', label: 'Housekeeping', icon: ClipboardList },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'history', label: 'History', icon: History },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'financials', label: 'Financials', icon: BarChart3 },
  { id: 'reviews', label: 'Reviews', icon: Star },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AdminSidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { logout, user } = useAuth();

  return (
    <div className="w-64 h-screen bg-[#0F172A] text-slate-300 flex flex-col border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white tracking-wider flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
            <span className="text-black font-black text-xs">KLI</span>
          </div>
          KHURPATAL
        </h1>
        <p className="text-[10px] text-amber-500/70 font-semibold mt-1 tracking-[0.2em] uppercase">Admin Console</p>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-amber-500 text-black font-semibold shadow-lg shadow-amber-500/10' 
                : 'hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} className={activeTab === item.id ? 'text-black' : 'text-slate-400 group-hover:text-amber-400'} />
              <span className="text-sm tracking-wide">{item.label}</span>
            </div>
            {activeTab === item.id && <ChevronRight size={14} />}
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
            {user?.name?.[0] || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name || 'Admin'}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email || 'admin@khurpatal.com'}</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
        >
          <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};
