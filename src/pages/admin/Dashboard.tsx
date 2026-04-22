import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight} from "lucide-react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from "recharts";
import { StatData } from "../../types";
import { motion } from "motion/react";
import { store } from "../../lib/store";
import AdminLayout from "./AdminLayout";
import { ADMIN_API_URL } from "../../lib/api";

const lineData = [
  { time: '06:00', occupancy: 150, vacancy: 180 },
  { time: '10:00', occupancy: 120, vacancy: 150 },
  { time: '14:00', occupancy: 160, vacancy: 170 },
  { time: '18:00', occupancy: 80, vacancy: 140 },
  { time: '22:00', occupancy: 110, vacancy: 130 },
];

const pieData = [
  { name: 'Wing A', value: 64, color: '#3e0502' },
  { name: 'Wing B', value: 24, color: '#735a39' },
  { name: 'Underground', value: 12, color: '#e4e2dd' },
];

const barData = [
  { name: '08AM', value: 20 },
  { name: '10AM', value: 35 },
  { name: '12PM', value: 60 },
  { name: '02PM', value: 95 },
  { name: '04PM', value: 80 },
  { name: '06PM', value: 40 },
  { name: '08PM', value: 30 },
];

export function Dashboard() {
  const [stats, setStats] = useState<StatData | null>(null);
  const [viewMode, setViewMode] = useState<'weekly' | 'daily'>('weekly');

  useEffect(() => {
    setStats(store.getStats());
    const handleDataChange = () => setStats(store.getStats());
    window.addEventListener('data-change', handleDataChange);
    return () => window.removeEventListener('data-change', handleDataChange);
  }, []);

  if (!stats) return null;

  return (
    <AdminLayout title="Dashboard">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 lg:p-8 space-y-6 lg:space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="w-full min-w-0">
          <h3 className="text-2xl lg:text-4xl font-extrabold text-on-surface mb-1 break-words">Operational Overview</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-lg relative overflow-hidden group editorial-shadow">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary transition-all group-hover:w-2"></div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-4">Active Sessions</p>
          <div className="flex items-baseline space-x-2">
            <h4 className="text-5xl font-extrabold text-primary leading-none">{stats.activeSessions}</h4>
            <span className="text-xs font-medium text-on-surface-variant">connected</span>
          </div>
          <div className="mt-6 flex -space-x-2">
            {[1, 2, 3].map(i => (
              <img key={i} className="w-6 h-6 rounded-full border-2 border-surface-container-lowest" src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
            ))}
            <div className="w-6 h-6 rounded-full border-2 border-surface-container-lowest bg-surface-container-highest text-[8px] flex items-center justify-center font-bold">+861</div>
          </div>
        </div>

        <Link to="/complaints" className="bg-[#3e0502] p-8 rounded-lg relative overflow-hidden shadow-xl group hover:scale-[1.02] transition-transform">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-6">Daily Incidents</p>
          <div className="flex items-baseline space-x-4 mb-8">
            <h4 className="text-7xl font-extrabold text-white leading-none">0{stats.dailyIncidents}</h4>
            <span className="text-xl font-medium text-white/80">pending</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-[#e4e2dd]">Action Required</span>
            <ArrowRight className="text-white w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface-container-low p-8 rounded-lg">
          <div className="flex justify-between items-center mb-10">
            <h5 className="text-lg font-bold">Usage Trends</h5>
            <div className="flex space-x-4">
              <span className="flex items-center text-xs text-on-surface-variant"><span className="w-2 h-2 rounded-full bg-primary mr-2"></span>Occupancy</span>
              <span className="flex items-center text-xs text-on-surface-variant"><span className="w-2 h-2 rounded-full bg-secondary mr-2"></span>Vacancy</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3e0502" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3e0502" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                <Tooltip />
                <Area type="monotone" dataKey="occupancy" stroke="#3e0502" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                <Area type="monotone" dataKey="vacancy" stroke="#735a39" strokeWidth={2} strokeDasharray="8 4" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface-container-low p-8 rounded-lg flex flex-col">
          <h5 className="text-lg font-bold mb-8">Area Occupancy</h5>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black">78%</span>
                <span className="text-[9px] uppercase tracking-widest opacity-60">Avg. Fill</span>
              </div>
            </div>
            <div className="w-full space-y-3">
              {pieData.map(item => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-xs font-medium">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low p-8 rounded-lg">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h5 className="text-lg font-bold">Peak Inflow Hours</h5>
            <p className="text-xs text-on-surface-variant">Optimal staff allocation based on traffic.</p>
          </div>
          <button 
            onClick={() => setViewMode(viewMode === 'weekly' ? 'daily' : 'weekly')}
            className="text-[10px] font-bold uppercase tracking-widest text-primary border-b-2 border-primary hover:opacity-70 transition-opacity"
          >
            {viewMode === 'weekly' ? 'Weekly View' : 'Daily View'}
          </button>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.value > 80 ? '#3e0502' : '#d4af37'} />
                ))}
              </Bar>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 'bold' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
    </AdminLayout>
  );
}

export default Dashboard;
