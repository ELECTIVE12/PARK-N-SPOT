import React from 'react';
import { motion } from 'motion/react';
import { Award, Grid3X3, Ticket, ConciergeBell, CreditCard, PlusCircle, Home, Briefcase, Dumbbell, ReceiptText, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/');
  };

  return (
    <main className="pt-28 pb-24 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Sidebar */}
      <aside className="hidden md:flex md:col-span-3 flex-col py-10 px-6 bg-surface-container-low h-fit rounded-xl sticky top-28">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-container rounded-sm flex items-center justify-center text-white">
            <Award size={24} fill="currentColor" />
          </div>
          <div>
            <h3 className="font-headline font-black text-[#330000] text-lg uppercase tracking-tight">The Curator</h3>
            <p className="font-headline text-xs uppercase tracking-widest text-on-surface-variant">Elite Tier</p>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          {[
            { name: 'Gallery', icon: Grid3X3, active: false },
            { name: 'Reservations', icon: Ticket, active: false },
            { name: 'Valet', icon: ConciergeBell, active: false },
            { name: 'Accounts', icon: CreditCard, active: true },
          ].map((item) => (
            <a 
              key={item.name}
              href="#" 
              className={`flex items-center gap-4 py-3 px-4 transition-all duration-300 font-headline text-sm uppercase tracking-widest ${
                item.active 
                  ? "bg-surface-container-highest text-[#330000] border-l-4 border-[#330000] font-bold" 
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <item.icon size={18} /> {item.name}
            </a>
          ))}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 py-3 px-4 mt-8 transition-all duration-300 font-headline text-sm uppercase tracking-widest text-error hover:bg-error/10 border-none bg-transparent cursor-pointer"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="md:col-span-9 space-y-8">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface mb-2">Account Settings</h1>
            <p className="text-on-surface-variant font-body max-w-xl">Curate your parking preferences and view your historical engagement across the Sovereign Architectural ecosystem.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-error/10 text-error rounded-sm font-headline font-bold text-[10px] uppercase tracking-widest border-none cursor-pointer"
          >
            <LogOut size={14} /> Logout
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Info */}
          <section className="bg-surface-container-low rounded-xl p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary-container"></div>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-[#330000]">Personal Information</h2>
              <button className="text-sm font-semibold text-primary-container hover:underline transition-all">Edit details</button>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Full Name', value: 'Julian Vane-Tempest' },
                { label: 'Email Address', value: 'julian.vane@sovereign.arch' },
                { label: 'Member Since', value: 'October 2022' },
              ].map((field) => (
                <div key={field.label} className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{field.label}</label>
                  <div className="bg-surface p-4 rounded-sm border-none text-on-surface font-medium">{field.value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Saved Locations */}
          <section className="bg-surface-container-low rounded-xl p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-[#330000]">Saved Locations</h2>
              <PlusCircle size={24} className="text-primary-container cursor-pointer" />
            </div>
            <div className="space-y-3">
              {[
                { name: 'The Penthouse', info: 'Level P1, Bay 14-B', icon: Home },
                { name: 'Financial District', info: 'Level B3, Valet Priority', icon: Briefcase },
                { name: 'Sovereign Spa', info: 'Surface Level, South Wing', icon: Dumbbell },
              ].map((loc) => (
                <div key={loc.name} className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 transition-all hover:scale-[1.02] cursor-pointer">
                  <div className="w-10 h-10 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container">
                    <loc.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">{loc.name}</h4>
                    <p className="text-xs text-on-surface-variant">{loc.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Parking History */}
          <section className="lg:col-span-2 bg-surface-container-low rounded-xl p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-[#330000]">Parking History</h2>
              <button className="px-6 py-2 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-primary-container transition-all">View All Activity</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Central Plaza Valet', time: '3 Hours 15 Minutes', date: 'May 12, 2024', price: '$45.00' },
                { name: 'The Glass House', time: 'Overnight Stay', date: 'May 10, 2024', price: '$120.00' },
                { name: 'South Wing Bay', time: '1 Hour 40 Minutes', date: 'May 08, 2024', price: '$22.00' },
              ].map((item) => (
                <div key={item.name} className="bg-surface p-6 rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-widest py-1 px-2 bg-secondary-container text-on-secondary-container rounded-full">Completed</span>
                    <span className="text-xs text-on-surface-variant font-medium">{item.date}</span>
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-lg">{item.name}</h4>
                    <p className="text-xs text-on-surface-variant">{item.time}</p>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center">
                    <span className="text-lg font-black text-on-surface">{item.price}</span>
                    <ReceiptText size={18} className="text-on-surface-variant" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
