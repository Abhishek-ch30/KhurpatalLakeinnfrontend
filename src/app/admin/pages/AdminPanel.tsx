import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminDashboard } from '../components/AdminDashboard';
import { ReservationsModule } from '../components/ReservationsModule';
import { InventoryModule } from '../components/InventoryModule';
import { HousekeepingModule } from '../components/HousekeepingModule';
import { HistoryModule } from '../components/HistoryModule';
import { 
  Bell, 
  Search, 
  Settings, 
  Calendar,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isAdmin) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'reservations':
        return <ReservationsModule />;
      case 'inventory':
        return <InventoryModule />;
      case 'housekeeping':
        return <HousekeepingModule />;
      case 'history':
        return <HistoryModule />;
      default:
        return (
          <div className="p-8 flex items-center justify-center h-full text-slate-400">
            <div className="text-center">
              <Calendar size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium tracking-tight">Accessing Khurpatal Cloud...</p>
              <p className="text-sm">The <strong>{activeTab}</strong> module is synchronizing with the central registry.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF6EE] flex overflow-hidden font-sans">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 h-screen overflow-y-auto relative bg-[#FBF6EE]">
        {/* Header */}
        <header className={`sticky top-0 z-10 p-6 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm py-4 px-8' : 'bg-transparent'
        }`}>
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400 group-focus-within:text-amber-500 transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Search resources, guests, or logs..." 
                className="w-full bg-white/50 border border-slate-200 py-2.5 pl-10 pr-4 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all shadow-sm font-medium"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-6">
            <button className="p-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-6 w-px bg-slate-200 mx-1" />
            <button className="flex items-center gap-3 bg-slate-900 text-white pl-1.5 pr-4 py-1.5 rounded-2xl shadow-xl shadow-slate-900/20 hover:bg-black transition-all group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center font-black text-black text-[10px]">
                {user?.name?.[0] || 'K'}
              </div>
              <span className="text-[10px] font-black tracking-[0.15em] uppercase">{user?.name || 'KHURPATAL'}</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="pb-12 h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};
