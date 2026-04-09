import { useEffect, useState } from "react";
import { TrendingUp, FileText, Calendar, ChevronDown, XCircle } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { StatData } from "../../types";
import { motion } from "motion/react";
import { store } from "../../lib/store";
import AdminLayout from "./AdminLayout";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFReport } from "../../components/PDFReport";




const chartData = [
  { name: 'Mon', value: 80, turnover: 90 },
  { name: 'Tue', value: 20, turnover: 40 },
  { name: 'Wed', value: 50, turnover: 70 },
  { name: 'Thu', value: 30, turnover: 50 },
  { name: 'Fri', value: 10, turnover: 30 },
  { name: 'Sat', value: 40, turnover: 60 },
  { name: 'Sun', value: 20, turnover: 40 },
];

const occupancyData = [
  { id: 'P1', name: 'Premium North Wing', location: 'Level 1, Entrance A', value: 98, color: '#3e0502' },
  { id: 'V2', name: 'Visitor Deck South', location: 'Level 2, Entrance C', value: 74, color: '#735a39' },
  { id: 'L4', name: 'Long-Stay East', location: 'Level 4, Ramp B', value: 52, color: '#87726f' },
];

const activityLog = [
  { jp: 'JP', name: 'James Pendleton', location: 'North Wing, Level 1' },
  { jp: 'MA', name: 'Marcus Aurelius', location: 'South Deck, Level 2' },
  { jp: 'SC', name: 'Sarah Connor', location: 'East Ramp, Level 4' },
  { jp: 'ED', name: 'Elena Davies', location: 'Central Hub, Level 1' },
];

function ReportsScreen() {
  const [stats, setStats] = useState<StatData | null>(null);
  const [isViewingAllZones, setIsViewingAllZones] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "2023-10-01", end: "2023-10-31" });

  useEffect(() => {
    setStats(store.getStats());
    const handleDataChange = () => setStats(store.getStats());
    window.addEventListener('data-change', handleDataChange);
    return () => window.removeEventListener('data-change', handleDataChange);
  }, []);

  const handleDateChange = (start: string, end: string) => {
    setDateRange({ start, end });
    setIsCalendarOpen(false);
    
    fetch("/api/stats")
      .then(res => res.json())
      .then(data => {
        const seed = start.split('-').reduce((acc, val) => acc + parseInt(val), 0);
        const shift = (seed % 10) - 5;
        setStats({
          ...data,
          utilization: Math.min(100, Math.max(0, data.utilization + shift)),
          availableSlots: Math.max(0, data.availableSlots - (shift * 10)),
          activeSessions: Math.max(0, data.activeSessions + (shift * 10))
        });
      });
  };

  return (
    <AdminLayout title="Reports">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 lg:space-y-8 max-w-7xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/80 backdrop-blur-md p-4 rounded-lg editorial-shadow mb-4 lg:mb-8 relative z-30 gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 w-full sm:w-auto min-w-0">
            <h2 className="text-lg lg:text-xl font-bold tracking-tight text-on-surface break-words shrink-0">Reports & Analytics</h2>
            <div className="relative w-full sm:w-auto min-w-0">
              <div 
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                className="flex items-center bg-surface-container-low px-4 py-2 rounded-sm border border-outline-variant/30 cursor-pointer hover:bg-surface-container-high transition-colors w-full sm:w-auto justify-between gap-2"
              >
                <div className="flex items-center min-w-0">
                  <Calendar className="text-on-surface-variant w-4 h-4 mr-2 shrink-0" />
                  <span className="text-xs lg:text-sm font-medium text-on-surface truncate">
                    {new Date(dateRange.start).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} - {new Date(dateRange.end).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                  </span>
                </div>
                <ChevronDown className="text-on-surface-variant w-4 h-4 shrink-0" />
              </div>

              {isCalendarOpen && (
                <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2 z-50 bg-white p-4 lg:p-6 rounded-lg editorial-shadow border border-outline-variant/10 w-[calc(100vw-2rem)] sm:w-80">
                  <h4 className="text-sm font-bold mb-4 uppercase tracking-widest text-on-surface-variant">Select Range</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase mb-1">Start Date</label>
                        <input 
                          type="date" 
                          className="w-full bg-surface-container-low border-none p-2 rounded text-xs"
                          value={dateRange.start}
                          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase mb-1">End Date</label>
                        <input 
                          type="date" 
                          className="w-full bg-surface-container-low border-none p-2 rounded text-xs"
                          value={dateRange.end}
                          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="pt-4 flex flex-col gap-2">
                      <button 
                        onClick={() => handleDateChange("2023-10-01", "2023-10-31")}
                        className="text-left px-3 py-2 text-xs font-medium hover:bg-surface-container-low rounded transition-colors border border-transparent hover:border-outline-variant/20"
                      >
                        Last 30 Days
                      </button>
                      <button 
                        onClick={() => handleDateChange("2023-10-24", "2023-10-31")}
                        className="text-left px-3 py-2 text-xs font-medium hover:bg-surface-container-low rounded transition-colors border border-transparent hover:border-outline-variant/20"
                      >
                        Last 7 Days
                      </button>
                    </div>
                    <button 
                      onClick={() => setIsCalendarOpen(false)}
                      className="w-full bg-primary text-white py-2 rounded-sm font-bold text-xs mt-4 border border-primary/50"
                    >
                      Apply Range
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* PDF Download Button */}
          <PDFDownloadLink
            document={
              <PDFReport 
                stats={stats}
                dateRange={dateRange}
                occupancyData={occupancyData}
                activityLog={activityLog}
              />
            }
            fileName={`park-n-spot-report-${dateRange.start}-to-${dateRange.end}.pdf`}
          >
            {({ blob, url, loading, error }) => (
              <button 
                disabled={loading}
                className="bg-surface-container-highest text-on-surface px-4 py-2 rounded-sm text-xs font-bold flex items-center gap-2 hover:bg-surface-container-high transition-all border border-outline-variant/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    Export PDF
                  </>
                )}
              </button>
            )}
          </PDFDownloadLink>
        </div>

        {/* Your existing dashboard content (no changes needed here) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3 bg-surface-container-lowest rounded-xl p-8 border-l-4 border-primary editorial-shadow">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-on-surface-variant text-sm font-medium uppercase tracking-widest mb-1">Total Facility Utilization</p>
                <h3 className="text-4xl font-extrabold tracking-tighter text-on-surface">{stats?.utilization}%</h3>
              </div>
              <div className="flex items-center gap-1 text-primary font-bold">
                <TrendingUp className="w-4 h-4" />
                <span>+4.2% vs last month</span>
              </div>
            </div>
            <div className="h-64 w-full bg-surface-container-low/50 rounded-lg overflow-hidden relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <Area type="monotone" dataKey="value" stroke="#3e0502" strokeWidth={4} fill="transparent" />
                  <Area type="monotone" dataKey="turnover" stroke="#735a39" strokeWidth={2} strokeDasharray="8 4" fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-8 text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-tighter">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>
          <div className="bg-secondary-container rounded-xl p-8 flex flex-col justify-center relative overflow-hidden editorial-shadow">
            <div className="relative z-10">
              <p className="text-on-secondary-container text-xs font-bold uppercase tracking-widest mb-2">Peak Hour</p>
              <h4 className="text-3xl font-black text-on-secondary-container tracking-tight">08:45 AM</h4>
              <p className="mt-4 text-on-secondary-container/80 text-sm leading-relaxed">System capacity usually reaches its zenith during the morning commute window.</p>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Calendar className="w-32 h-32" />
            </div>
          </div>
        </div>

        {/* Rest of your existing content... */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Keep your existing occupancy and activity log sections */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold tracking-tight">Occupancy by Zone</h3>
              <span 
                onClick={() => setIsViewingAllZones(true)}
                className="text-xs font-bold text-on-surface-variant cursor-pointer hover:text-primary underline underline-offset-4"
              >
                View All
              </span>
            </div>
            <div className="bg-surface-container-low rounded-xl overflow-hidden p-1 space-y-1">
              {occupancyData.map(zone => (
                <div key={zone.id} className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-surface-container-highest text-on-surface rounded-sm font-bold text-xs">{zone.id}</div>
                    <div>
                      <p className="font-bold text-sm">{zone.name}</p>
                      <p className="text-xs text-on-surface-variant">{zone.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-lg">{zone.value}%</p>
                    <div className="w-24 h-1 bg-surface-container-highest rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${zone.value}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold tracking-tight">Recent Activity Log</h3>
            </div>
            <div className="bg-surface-container-lowest shadow-sm rounded-xl overflow-hidden">
              <div className="overflow-x-auto pb-2">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant text-[10px] uppercase tracking-widest">
                      <th className="px-4 lg:px-6 py-4 font-bold whitespace-nowrap">People</th>
                      <th className="px-4 lg:px-6 py-4 font-bold whitespace-nowrap">Recent View Location</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-medium">
                    {activityLog.map((log, i) => (
                      <tr key={i} className="hover:bg-surface-container-low transition-colors group">
                        <td className="px-4 lg:px-6 py-4 flex items-center gap-3 whitespace-nowrap">
                          <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-xs shrink-0">{log.jp}</div>
                          <span className="truncate">{log.name}</span>
                        </td>
                        <td className="px-4 lg:px-6 py-4 text-on-surface-variant font-mono text-xs lg:text-sm whitespace-nowrap">{log.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {isViewingAllZones && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white p-8 rounded-lg editorial-shadow w-full max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black tracking-tighter">All Facility Zones</h2>
                <button onClick={() => setIsViewingAllZones(false)} className="p-2 hover:bg-surface-container-low rounded-full transition-colors">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                {[...occupancyData, ...occupancyData, ...occupancyData].map((zone, i) => (
                  <div key={i} className="p-4 bg-surface-container-low rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-bold">{zone.name}</p>
                      <p className="text-xs text-on-surface-variant">{zone.location}</p>
                    </div>
                    <span className="font-black text-primary">{zone.value}%</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-8">
                <button onClick={() => setIsViewingAllZones(false)} className="bg-primary text-white px-8 py-2 rounded-sm font-bold border border-primary/50">Close Registry</button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AdminLayout>
  );
}

export default ReportsScreen;