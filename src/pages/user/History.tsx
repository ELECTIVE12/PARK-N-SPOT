import React, { useState, useMemo } from 'react';
import {
  Star,
  Building2,
  Landmark,
  TreePine,
  Calendar
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import findparkgo from "../../components/images/findparkgo.png";

export default function History() {

  const allLocations = [
    {
      name: "Orchard Central Parking",
      type: "Shopping District",
      area: "Orchard Road • Level B3",
      access: "Elevator Access",
      time: "Today",
      status: "Available",
      statusColor: "bg-[#006400]",
      icon: Building2,
      daysAgo: 0,
    },
    {
      name: "Marina Bay Sands Parking",
      type: "Premium District",
      area: "Bayfront • Zone A",
      access: "EV & VIP Access",
      time: "Yesterday",
      status: "Full",
      statusColor: "bg-[#660000]",
      icon: Landmark,
      daysAgo: 1,
    },
    {
      name: "Bugis Junction Parking",
      type: "Commercial Hub",
      area: "Bugis • Level 2",
      access: "Standard Access",
      time: "3 Days Ago",
      status: "Available",
      statusColor: "bg-[#006400]",
      icon: TreePine,
      daysAgo: 3,
    },
  ];

  const [range, setRange] = useState(90);
  const [favState, setFavState] = useState({});
  const [visibleCount, setVisibleCount] = useState(3);

  const filtered = useMemo(() => {
    return allLocations.filter(item => item.daysAgo <= range);
  }, [range]);

  const toggleFav = (index) => {
    setFavState(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const visibleLocations = filtered.slice(0, visibleCount);

  return (
    <main className="relative z-10 min-h-screen pt-24 pb-24 px-4 sm:px-6 md:px-12 lg:px-24 max-w-[1500px] mx-auto text-white">

      {/* HERO ONLY BACKGROUND */}
      <div className="relative mb-12 rounded-2xl overflow-hidden">

        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${findparkgo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        {/* lighter overlay (NOT black heavy shadow) */}
        <div className="absolute inset-0 -z-10 bg-black/50" />

        {/* HERO */}
        <header className="flex flex-col items-center text-center gap-5 py-14 px-6">

          <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/70">
            History Dashboard
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black">
            Park ’n Spot
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl">
            WHERE EVERY SPACE BECOMES A MOMENT OF CONVENIENCE
          </p>

          {/* CLEAN CALENDAR (NO BLACK SHADOW) */}
          <div className="flex items-center gap-3 text-sm font-semibold bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">

            <Calendar size={16} />

            <select
              value={range}
              onChange={(e) => {
                setRange(Number(e.target.value));
                setVisibleCount(3);
              }}
              className="bg-transparent text-white outline-none cursor-pointer"
            >
              <option className="text-black" value={7}>Last 7 Days</option>
              <option className="text-black" value={30}>Last 30 Days</option>
              <option className="text-black" value={90}>Last 90 Days</option>
            </select>

          </div>

        </header>
      </div>

      {/* TABLE HEADER (FORCE VISIBILITY FIX) */}
      <div className="hidden md:grid grid-cols-12 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white text-center relative z-10">

        <div className="col-span-1">Fav</div>
        <div className="col-span-4">Location</div>
        <div className="col-span-3">Area</div>
        <div className="col-span-2">Viewed</div>
        <div className="col-span-2">Status</div>

      </div>

      {/* LIST */}
      <div className="space-y-3 relative z-10">

        {visibleLocations.map((loc, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-md hover:bg-white/15 transition rounded-xl md:rounded-none md:border-b border-white/10"
          >

            <div className="grid grid-cols-1 md:grid-cols-12 items-center px-5 sm:px-6 md:px-8 py-5 gap-4 text-center">

              {/* FAVORITE */}
              <div className="col-span-1 flex justify-center">
                <button
                  onClick={() => toggleFav(i)}
                  className={cn(
                    "transition-transform hover:scale-110",
                    favState[i] ? "text-yellow-400" : "text-white/40"
                  )}
                >
                  <Star size={20} fill={favState[i] ? "currentColor" : "none"} />
                </button>
              </div>

              {/* LOCATION */}
              <div className="col-span-4 flex flex-col items-center md:flex-row md:justify-center gap-3">

                <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center">
                  <loc.icon size={20} />
                </div>

                <div>
                  <h4 className="font-bold">{loc.name}</h4>
                  <p className="text-xs text-white/60">{loc.type}</p>
                </div>

              </div>

              {/* AREA */}
              <div className="col-span-3">
                <p className="text-sm font-semibold">{loc.area}</p>
                <p className="text-xs text-white/60">{loc.access}</p>
              </div>

              {/* TIME */}
              <div className="col-span-2 text-sm text-white/60">
                {loc.time}
              </div>

              {/* STATUS */}
              <div className="col-span-2">
                <span className={cn(
                  "text-[10px] uppercase font-bold text-white px-2 py-0.5 rounded",
                  loc.statusColor
                )}>
                  {loc.status}
                </span>
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* LOAD MORE */}
      {visibleCount < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button className="px-10 py-3 bg-[#660000] text-white font-bold uppercase tracking-widest rounded-sm hover:bg-[#7a0000] transition">
            Load More Locations
          </button>
        </div>
      )}

    </main>
  );
}