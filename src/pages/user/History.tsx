import React from 'react';
import { Star, Building2, Landmark, TreePine, ChevronDown, Calendar } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function History() {
  const locations = [
    {
      name: "The Grand Pavilion",
      type: "Premier Landmark",
      area: "Main Plaza",
      access: "Outdoor Access",
      time: "Today, 10:20 AM",
      status: "Available",
      statusColor: "bg-green-800",
      fav: true,
      icon: Building2
    },
    {
      name: "South Wing Bay",
      type: "Corporate Suites",
      area: "Level 03 • Zone C",
      access: "Elevator Access",
      time: "Yesterday, 04:15 PM",
      status: "Full",
      statusColor: "bg-red-900",
      fav: false,
      icon: Landmark
    },
    {
      name: "North Garden Gated",
      type: "Eco-Friendly Park",
      area: "Premium Row",
      access: "EV Ready",
      time: "Oct 19, 2024",
      status: "Available",
      statusColor: "bg-green-800",
      fav: true,
      icon: TreePine
    }
  ];

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tight text-primary leading-tight">Recent Viewed Locations</h1>
          <p className="text-on-surface-variant mt-2 font-body max-w-md">A chronological record of your recently explored parking destinations and architectural highlights.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant bg-surface-container-low px-4 py-2 rounded-lg cursor-pointer">
          <Calendar size={16} />
          <span>Last 90 Days</span>
          <ChevronDown size={16} className="ml-2" />
        </div>
      </header>

      <div className="space-y-4">
        {/* List Headers */}
        <div className="hidden md:grid grid-cols-12 px-8 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60">
          <div className="col-span-1">Fav</div>
          <div className="col-span-4">Location</div>
          <div className="col-span-3">Area/Level</div>
          <div className="col-span-2">Last Viewed</div>
          <div className="col-span-2 text-right">Status</div>
        </div>

        {locations.map((loc, i) => (
          <div key={i} className="group bg-surface-container-low hover:bg-surface-container-highest transition-all duration-300 rounded-lg md:rounded-none md:border-b border-outline-variant/10">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center px-8 py-6 gap-4">
              <div className="col-span-1 flex items-center">
                <button className={cn("transition-transform hover:scale-110", loc.fav ? "text-secondary" : "text-on-surface-variant/40")}>
                  <Star size={20} fill={loc.fav ? "currentColor" : "none"} />
                </button>
              </div>
              <div className="col-span-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface-variant rounded flex items-center justify-center text-primary">
                    <loc.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-on-surface">{loc.name}</h4>
                    <p className="text-xs text-on-surface-variant">{loc.type}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <p className="font-body text-sm font-semibold text-on-surface">{loc.area}</p>
                <p className="text-xs text-on-surface-variant">{loc.access}</p>
              </div>
              <div className="col-span-2">
                <p className="font-body text-sm font-medium text-on-surface">{loc.time}</p>
              </div>
              <div className="col-span-2 text-right flex flex-col items-end justify-center">
                <span className={cn("text-[10px] uppercase font-bold text-white px-2 py-0.5 rounded", loc.statusColor)}>
                  {loc.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button className="px-8 py-3 bg-primary text-on-primary font-headline text-sm font-bold uppercase tracking-widest hover:bg-primary-container transition-colors rounded-sm">
          Load More Locations
        </button>
      </div>
    </main>
  );
}
