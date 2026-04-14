import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  DoorOpen, 
  DollarSign, 
  Calendar, 
  Award,
  Clock,
  CheckCircle2,
  MessageSquare,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { api } from '../../services/api';

const chartData = [
  { name: 'Mon', revenue: 4500, occupancy: 65 },
  { name: 'Tue', revenue: 5200, occupancy: 75 },
  { name: 'Wed', revenue: 4800, occupancy: 70 },
  { name: 'Thu', revenue: 6100, occupancy: 85 },
  { name: 'Fri', revenue: 8500, occupancy: 95 },
  { name: 'Sat', revenue: 9200, occupancy: 98 },
  { name: 'Sun', revenue: 7800, occupancy: 90 },
];

export const AdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [housekeeping, setHousekeeping] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsData, reservationsData, housekeepingData] = await Promise.all([
          api.getMetrics(),
          api.getReservations(),
          api.getHousekeeping()
        ]);
        
        setMetrics(metricsData);
        setRecentBookings(reservationsData.slice(0, 5));
        setHousekeeping(housekeepingData.slice(0, 3));
      } catch (err: any) {
        setError(err.message || 'Failed to sync with Khurpatal Cloud');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-100px)] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-amber-500" size={48} />
        <p className="text-slate-500 font-medium animate-pulse">Syncing luxury assets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[calc(100vh-100px)] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <AlertCircle size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Synchronization Error</h3>
        <p className="text-slate-500 mt-2 max-w-xs">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-xl font-bold"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Executive Dashboard</h2>
          <p className="text-slate-500 mt-1">Real-time overview of Khurpatal Lake Inn operations.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
          <button className="px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-xl shadow-md">Today</button>
          <button className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">Week</button>
          <button className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">Month</button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {[
          { label: 'Total Bookings', value: metrics.totalBookings, icon: Calendar, trend: '+12%', color: 'blue' },
          { label: 'Check-ins', value: metrics.checkInsToday, icon: Users, trend: 'Today', color: 'emerald' },
          { label: 'Check-outs', value: metrics.checkOutsToday, icon: Users, trend: 'Today', color: 'amber' },
          { label: 'Total Revenue', value: `₹${metrics.totalRevenue.toLocaleString()}`, icon: DollarSign, trend: '+8.4%', color: 'indigo' },
          { label: 'Occupancy', value: `${metrics.occupancyRate.toFixed(1)}%`, icon: DoorOpen, trend: '+5%', color: 'purple' },
          { label: 'Hotel Ranking', value: metrics.hotelRanking, icon: Award, trend: 'Top 5%', color: 'rose' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 bg-slate-50`}>
              <item.icon className="text-slate-900" size={24} />
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{item.label}</p>
            <div className="flex items-end justify-between mt-1">
              <h3 className="text-2xl font-bold text-slate-900">{item.value}</h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                {item.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Revenue Performance</h3>
              <p className="text-sm text-slate-400">Weekly revenue trends and projections.</p>
            </div>
            <div className="flex items-center gap-2 text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">
              <TrendingUp size={16} />
              <span className="text-xs font-bold">+18.2%</span>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 12, fill: '#64748b'}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 12, fill: '#64748b'}}
                  tickFormatter={(value) => `₹${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#F59E0B', strokeWidth: 2, strokeDasharray: '5 5' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Room Status Widget */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 mb-6 font-heading">Room Inventory</h3>
          <div className="flex-1 space-y-6">
            {[
              { label: 'Occupied', color: '#F59E0B', count: metrics.occupiedRooms || 12 },
              { label: 'Reserved', color: '#3B82F6', count: metrics.reservedRooms || 8 },
              { label: 'Available', color: '#10B981', count: metrics.availableRooms || 18 },
              { label: 'Not Ready', color: '#EF4444', count: metrics.dirtyRooms || 0 },
            ].map((status, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-600">{status.label}</span>
                  <span className="text-xs font-black text-slate-900 tracking-tight">{status.count}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000" 
                    style={{ 
                        width: `${(status.count / (metrics.totalRoomCount || 38)) * 100}%`, 
                        backgroundColor: status.color 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 leading-none">
              <Clock size={16} className="text-amber-500" />
              Housekeeping
            </h4>
            <div className="mt-4 space-y-2">
                {housekeeping.map((task, i) => (
                    <div key={i} className="flex items-center justify-between">
                        <span className="text-xs text-slate-600 font-medium">Room {task.room.roomNumber}</span>
                        <span className="text-[10px] uppercase font-bold text-slate-400">{task.type}</span>
                    </div>
                ))}
            </div>
            <button className="w-full mt-6 py-2 px-4 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors">
              View All Tasks
            </button>
          </div>
        </div>
      </div>

      {/* Lists Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900 font-heading">Recent Booking Activity</h3>
            <button className="text-xs font-bold text-amber-600 hover:text-amber-700">View All</button>
          </div>
          <div className="space-y-4">
            {recentBookings.length > 0 ? recentBookings.map((booking, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    {booking.guestName[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">{booking.guestName}</p>
                    <p className="text-xs text-slate-500">{booking.room.type} • {booking.totalPrice.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900">
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </p>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${booking.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            )) : (
                <div className="py-10 text-center text-slate-400">
                    No recent bookings found.
                </div>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900 font-heading">Operational Alerts</h3>
            <button className="text-xs font-bold text-amber-600 hover:text-amber-700">Clear</button>
          </div>
          <div className="space-y-6">
            {[
              { type: 'Booking', message: 'Khurpatal Engine: Peak season spikes detected.', time: 'System', icon: CheckCircle2, color: 'emerald' },
              { type: 'Inventory', message: 'Towel levels approaching low threshold.', time: 'Logistics', icon: Clock, color: 'blue' },
              { type: 'Message', message: 'VIP Guest inquiry for Luxury Suite #102.', time: 'CRM', icon: MessageSquare, color: 'amber' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className={`mt-1 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0`}>
                  <activity.icon className={`text-slate-900`} size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 leading-none">{activity.type}</span>
                    <span className="text-[10px] text-slate-400 font-medium tracking-tight">• {activity.time}</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1 leading-snug">{activity.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
