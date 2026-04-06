import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Info, CheckCircle2, Clock, Leaf } from 'lucide-react';

export default function FacilityDetails() {
  return (
    <div className="pt-32 pb-24 px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12">
        <div className="flex-1">
          <nav className="flex mb-4 text-xs font-headline font-bold uppercase tracking-widest text-on-surface-variant">
            <span>Parking Facilities</span>
            <span className="mx-2">/</span>
            <span className="text-primary font-bold">The Sovereign West Wing</span>
          </nav>
          <h1 className="text-5xl md:text-6xl font-headline font-black tracking-tight text-on-surface mb-4">West Wing Pavilion</h1>
          <p className="text-on-surface-variant max-w-xl text-lg leading-relaxed">
            Premium climate-controlled parking featuring 24/7 valet assistance and oversized bays for executive vehicles.
          </p>
        </div>
        <div className="flex gap-4 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-sm font-bold tracking-tight hover:opacity-90 transition-all">
            <Navigation size={20} />
            Navigate
          </button>
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 border border-outline px-8 py-4 rounded-sm font-bold tracking-tight hover:bg-surface-container-low transition-all">
            <span className="material-symbols-outlined">favorite</span>
            Save to Favorites
          </button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Real-time Status */}
        <div className="md:col-span-4 bg-surface-container-low p-8 relative overflow-hidden flex flex-col justify-between h-[400px]">
          <div className="absolute top-0 left-0 w-2 h-full bg-secondary"></div>
          <div>
            <h3 className="text-sm font-headline font-bold uppercase tracking-widest text-on-surface-variant mb-12">Real-time Status</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-8xl font-black text-on-surface tracking-tighter">84</span>
              <span className="text-2xl font-bold text-on-surface-variant">/ 120</span>
            </div>
            <p className="text-lg font-medium text-secondary mt-2">Available Slots Now</p>
          </div>
          <div className="pt-8 border-t border-outline-variant/30">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Status</p>
                <p className="font-bold text-on-surface">Optimal Flow</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <CheckCircle2 size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Availability Trend */}
        <div className="md:col-span-8 bg-surface-container-highest p-8 flex flex-col h-[400px]">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xl font-bold text-on-surface">Estimated Availability Trend</h3>
              <p className="text-on-surface-variant text-sm">Predicted slot occupancy based on architectural data modeling</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-surface-container-lowest text-[10px] font-bold uppercase tracking-tighter rounded-full border border-outline/10">Today</span>
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">Weekly</span>
            </div>
          </div>
          
          <div className="flex-1 flex items-end gap-1 px-4">
            {[20, 35, 60, 85, 95, 80, 50, 40, 65, 75, 45, 25].map((height, i) => (
              <div 
                key={i}
                className="flex-1 bg-primary/10 rounded-t-sm hover:bg-primary transition-colors cursor-help group relative"
                style={{ height: `${height}%` }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {i + 6}:00 - {100 - height}%
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold uppercase text-on-surface-variant/60 tracking-widest">
            <span>06:00 AM</span>
            <span>12:00 PM</span>
            <span>06:00 PM</span>
            <span>12:00 AM</span>
          </div>
        </div>

        {/* Peak Hours */}
        <div className="md:col-span-5 bg-surface-container-high p-8">
          <h3 className="text-xl font-bold text-on-surface mb-6">Peak Operational Hours</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex-shrink-0 bg-primary-container flex items-center justify-center text-white">
                <Clock size={24} />
              </div>
              <div>
                <p className="font-bold text-on-surface">Morning Rush</p>
                <p className="text-sm text-on-surface-variant italic">08:30 AM — 10:15 AM</p>
              </div>
              <div className="ml-auto text-error font-bold text-xs uppercase tracking-tighter">High Density</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex-shrink-0 bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <Leaf size={24} />
              </div>
              <div>
                <p className="font-bold text-on-surface">Serene Window</p>
                <p className="text-sm text-on-surface-variant italic">02:00 PM — 04:30 PM</p>
              </div>
              <div className="ml-auto text-secondary font-bold text-xs uppercase tracking-tighter">Recommended</div>
            </div>
          </div>
        </div>

        {/* Location Snapshot */}
        <div className="md:col-span-7 bg-surface-container-lowest p-2 shadow-sm flex items-stretch">
          <div className="w-full h-full min-h-[250px] relative overflow-hidden group">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtFA7rqFtDCwrlx3MGj2LCdeEiqWWxpEtk5HigJoW1Pls-ANemEtAFSus-1EoFmivD2NayZy5Q2Mkf9p9AABO1CtZl-EPILpF7wKQ3JJXsPAS8zVtzWOQDei0N0hhRoTC2cb99csRSmsGwoMbmkJQxl8hnqjdZkAD7GsKROxlhTR9JjX_gzh0evm-ItmR1Qj0Xn2vSlSNMHecqCbOT7p3yxPxWJrbuugihTJ2QKO-m5wmYKhaHPXARX_L2KeVA7tNdv9dZ7JbTa7NY" 
              alt="Map"
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <div className="bg-primary text-on-primary px-4 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <MapPin size={14} />
                Sector 4, Sovereign Estate
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
