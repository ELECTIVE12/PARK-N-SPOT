import { useEffect, useState } from "react";
import { Complaint, StatData } from "@/src/types";
import { CheckCircle, XCircle, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion } from "motion/react";
import { store } from "@/src/lib/store";
import AdminLayout from "./AdminLayout";

function ComplaintsScreen() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [stats, setStats] = useState<StatData | null>(null);
  const [activeTab, setActiveTab] = useState<'PENDING' | 'IN_PROGRESS' | 'RESOLVED'>('PENDING');
  const [viewingComplaint, setViewingComplaint] = useState<Complaint | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const fetchData = () => {
    setComplaints(store.getComplaints());
    setStats(store.getStats());
  };

  useEffect(() => {
    fetchData();
    const handleDataChange = () => fetchData();
    window.addEventListener('data-change', handleDataChange);
    return () => window.removeEventListener('data-change', handleDataChange);
  }, []);

  const handleStatusUpdate = (id: string, status: Complaint['status']) => {
    store.updateComplaintStatus(id, status);
    fetchData();
  };

  const filteredComplaints = complaints.filter(c => c.status === activeTab);
  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
  const paginatedComplaints = filteredComplaints.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExportPDF = () => {
    const content = [
      "PARK 'N SPOT - COMPLAINTS REPORT",
      `Generated on: ${new Date().toLocaleString()}`,
      "",
      "ID\tTitle\tReporter\tLocation\tStatus\tDate",
      ...complaints.map(c => `${c.id}\t${c.title}\t${c.submittedBy}\t${c.location}\t${c.status}\t${c.date}`)
    ].join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'park-n-spot-complaints-report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout title="Complaints">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 lg:space-y-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        <div className="col-span-1 lg:col-span-8 bg-surface-container-low p-6 lg:p-8 rounded-xl flex flex-col justify-center overflow-hidden w-full">
          <h3 className="text-2xl lg:text-3xl font-extrabold text-primary mb-2 break-words w-full">Resolution Overview</h3>
          <p className="text-sm lg:text-base text-on-surface-variant max-w-lg mb-6 break-words w-full">Manage user feedback and facility maintenance reports. Efficiently curate the Park 'N Spot experience by addressing issues with architectural precision.</p>
          <div className="flex flex-wrap gap-x-8 gap-y-4 lg:gap-12">
            <div className="shrink-0">
              <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Unresolved</p>
              <p className="text-3xl lg:text-4xl font-black text-primary">{stats?.dailyIncidents || 12}</p>
            </div>
            <div className="shrink-0">
              <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Avg. Response</p>
              <p className="text-3xl lg:text-4xl font-black text-secondary">{stats?.avgResponse || "1.4h"}</p>
            </div>
            <div className="shrink-0">
              <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Satisfied Rate</p>
              <p className="text-3xl lg:text-4xl font-black text-primary">{stats?.satisfiedRate || "94%"}</p>
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-4 bg-primary-container p-6 lg:p-8 rounded-xl relative overflow-hidden flex flex-col justify-end min-h-[180px] lg:min-h-[240px] w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-container to-primary/80 opacity-60"></div>
          <img 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40" 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400&auto=format&fit=crop" 
            alt="Facility" 
          />
          <div className="relative z-10 w-full">
            <p className="text-secondary-container font-bold text-lg leading-tight break-words w-full">Priority Escalation Active</p>
            <p className="text-white/70 text-sm mt-1 break-words w-full">3 slots in Zone A require immediate technical attention.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-outline-variant/10 overflow-x-auto pb-1">
        <div className="flex items-center space-x-6 lg:space-x-10 min-w-max px-1">
          {(['PENDING', 'IN_PROGRESS', 'RESOLVED'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
              className={cn(
                "font-bold pb-2 transition-colors relative whitespace-now-nowrap text-sm lg:text-base",
                activeTab === tab ? "text-primary border-b-2 border-primary" : "text-on-surface-variant hover:text-primary border-b-2 border-transparent"
              )}
            >
              {tab.charAt(0) + tab.slice(1).toLowerCase().replace('_', ' ')}
              <span className="ml-2 text-[10px] bg-secondary-container px-2 py-0.5 rounded-full text-on-secondary-container">
                {complaints.filter(c => c.status === tab).length.toString().padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
        <button 
          onClick={handleExportPDF}
          className="mb-2 ml-4 bg-surface-container-highest text-on-surface px-3 py-1.5 rounded-sm text-[10px] lg:text-xs font-bold flex items-center gap-2 hover:bg-surface-container-high transition-all border border-outline-variant/30 shrink-0"
        >
          EXPORT PDF
        </button>
      </div>

      <div className="space-y-4">
        {paginatedComplaints.length > 0 ? paginatedComplaints.map((item) => (
          <div key={item.id} className="group bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-300 rounded-xl overflow-hidden shadow-sm flex items-stretch">
            <div className={cn(
              "w-1.5 self-stretch",
              item.status === 'PENDING' ? "bg-secondary" : item.status === 'IN_PROGRESS' ? "bg-primary" : "bg-outline-variant"
            )}></div>
            <div className="p-4 lg:p-6 flex-1 flex items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 w-full items-center">
                <div className="col-span-1 sm:col-span-2 lg:col-span-4">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter mb-1">ID: #{item.id}</p>
                  <h4 className="text-base lg:text-lg font-bold text-on-surface leading-tight">{item.title}</h4>
                  <p className="text-xs lg:text-sm text-on-surface-variant line-clamp-1 mt-1">{item.description}</p>
                </div>
                <div className="col-span-1 lg:col-span-2">
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold">Submitted By</p>
                  <p className="font-semibold text-xs lg:text-sm">{item.submittedBy}</p>
                </div>
                <div className="col-span-1 lg:col-span-2">
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold">Location</p>
                  <p className="font-semibold text-xs lg:text-sm">{item.location}</p>
                </div>
                <div className="col-span-1 lg:col-span-2">
                  <span className={cn(
                    "inline-flex items-center px-3 py-1 rounded-full text-[10px] lg:text-xs font-bold",
                    item.status === 'PENDING' ? "bg-secondary-container text-on-secondary-container" : 
                    item.status === 'IN_PROGRESS' ? "bg-primary-container text-white" : "bg-surface-container-highest text-on-surface"
                  )}>
                    {item.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex justify-end space-x-2">
                  <button 
                    onClick={() => handleStatusUpdate(item.id, 'RESOLVED')}
                    className="p-2 text-on-surface-variant hover:text-primary transition-colors border border-outline-variant/20 rounded-sm"
                    title="Resolve"
                  >
                    <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(item.id, 'PENDING')}
                    className="p-2 text-on-surface-variant hover:text-error transition-colors border border-outline-variant/20 rounded-sm"
                    title="Reset"
                  >
                    <XCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                  <button 
                    onClick={() => setViewingComplaint(item)}
                    className="p-2 text-on-surface-variant hover:text-secondary transition-colors border border-outline-variant/20 rounded-sm"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="p-20 text-center bg-surface-container-low rounded-xl border-2 border-dashed border-outline-variant/20">
            <p className="text-on-surface-variant font-medium italic">No complaints found in this category.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-1">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="w-10 h-10 flex items-center justify-center rounded bg-surface-container-highest text-on-surface disabled:opacity-50 border border-outline-variant/30"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded text-sm font-bold transition-all border",
                    currentPage === i + 1 ? "bg-primary text-white border-primary" : "bg-surface-container-highest text-on-surface hover:bg-surface-container-high border-outline-variant/30"
                  )}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="w-10 h-10 flex items-center justify-center rounded bg-surface-container-highest text-on-surface disabled:opacity-50 border border-outline-variant/30"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {viewingComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white p-8 rounded-lg editorial-shadow w-full max-w-lg">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-black tracking-tighter">{viewingComplaint.title}</h2>
                <p className="text-sm text-on-surface-variant">Ticket ID: #{viewingComplaint.id}</p>
              </div>
              <span className={cn(
                "px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter",
                viewingComplaint.status === 'PENDING' ? "bg-error/10 text-error" : 
                viewingComplaint.status === 'IN_PROGRESS' ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
              )}>
                {viewingComplaint.status}
              </span>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-surface-container-low rounded-lg">
                  <p className="text-[10px] font-bold uppercase text-on-surface-variant mb-1">Reporter</p>
                  <p className="font-bold">{viewingComplaint.submittedBy}</p>
                </div>
                <div className="p-4 bg-surface-container-low rounded-lg">
                  <p className="text-[10px] font-bold uppercase text-on-surface-variant mb-1">Location</p>
                  <p className="font-bold">{viewingComplaint.location}</p>
                </div>
              </div>
              <div className="p-4 bg-surface-container-low rounded-lg">
                <p className="text-[10px] font-bold uppercase text-on-surface-variant mb-1">Description</p>
                <p className="text-sm leading-relaxed">
                  {viewingComplaint.description}
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-8 gap-4">
              <button 
                onClick={() => handleStatusUpdate(viewingComplaint.id, 'IN_PROGRESS')}
                className="px-6 py-2 rounded-sm font-bold text-sm bg-secondary text-white border border-secondary/50"
              >
                Mark In Progress
              </button>
              <button 
                onClick={() => setViewingComplaint(null)} 
                className="bg-primary text-white px-8 py-2 rounded-sm font-bold text-sm border border-primary/50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
    </AdminLayout>
  );
}

export default ComplaintsScreen;
