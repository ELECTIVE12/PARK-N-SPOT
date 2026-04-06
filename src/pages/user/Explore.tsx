import React from 'react';
import { motion } from 'motion/react';
import { Search, Bell, Settings2, MapPin, Navigation, Info, CheckCircle2, AlertCircle, Verified, ChevronDown } from 'lucide-react';

export default function Explore() {
  return (
    <main className="relative h-screen w-full pt-20 overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 z-0 bg-surface-container">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbe6S8uSQjZxiWRh-22Rf6536cNPXKUoUfLbNzxvhKLIu-c34SSsQPspOzVSuwzG4zlg89EMRcuz0kBK2P9rcGbjy9B4F8oFTnAeIKkR_JWkyjRvjiYQwYG2amMSa84ps72KSx2ZS8dgjaAW90fg_Jbz7c8aiwXPN7l6uVbntfA2PSYrq4sWHDtB6gZDjvC35wGE-Bk5LfV2_31PFAoVW8oldwwrCZKL4MnP8Ifc2YP5fhAcDhA1L1o4AdLoPxmX7Ewrv0oZn0Eh2H" 
          alt="Map"
          className="w-full h-full object-cover opacity-60 grayscale-[20%]"
          referrerPolicy="no-referrer"
        />
        
        {/* Interactive Pins */}
        {/* Available */}
        <div className="absolute top-[40%] left-[30%] group cursor-pointer">
          <div className="flex flex-col items-center">
            <div className="bg-[#2e7d32] w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white scale-100 hover:scale-110 transition-transform shadow-lg">
              <span className="text-[10px] font-bold">P</span>
            </div>
            <div className="w-1 h-2 bg-[#2e7d32] -mt-1"></div>
          </div>
        </div>

        {/* Full */}
        <div className="absolute top-[55%] left-[60%] group cursor-pointer">
          <div className="flex flex-col items-center">
            <div className="bg-error w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white opacity-80 shadow-lg">
              <AlertCircle size={14} />
            </div>
            <div className="w-1 h-2 bg-error -mt-1"></div>
          </div>
        </div>

        {/* Limited */}
        <div className="absolute top-[25%] left-[75%] group cursor-pointer">
          <div className="flex flex-col items-center">
            <div className="bg-[#fbc02d] w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-on-surface shadow-lg">
              <Info size={14} />
            </div>
            <div className="w-1 h-2 bg-[#fbc02d] -mt-1"></div>
          </div>
        </div>

        {/* ACTIVE PIN */}
        <div className="absolute top-[45%] left-[50%]">
          <div className="flex flex-col items-center">
            <div className="bg-primary w-10 h-10 rounded-full border-4 border-secondary-container flex items-center justify-center text-white ring-4 ring-primary/20 scale-125 shadow-2xl">
              <Navigation size={18} fill="currentColor" />
            </div>
            <div className="w-1 h-3 bg-primary -mt-1"></div>
          </div>

          {/* Floating Card */}
          <motion.div 
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            className="absolute bottom-full left-1/2 mb-6 w-72 bg-surface-container-lowest/90 backdrop-blur-xl p-5 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-outline-variant/20"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-headline font-bold text-lg text-on-surface leading-tight tracking-tight">Premium North Wing</h3>
                <p className="text-xs font-medium text-secondary uppercase tracking-widest mt-1">Sovereign Architectural</p>
              </div>
              <span className="bg-secondary-container text-on-secondary-container px-2 py-1 text-[10px] font-bold rounded">LEVEL A</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-surface-container-low p-3 rounded-lg border-l-4 border-[#2e7d32]">
                <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-tighter">Available</p>
                <p className="text-xl font-headline font-extrabold text-[#2e7d32]">82 Slots</p>
              </div>
              <div className="bg-surface-container-low p-3 rounded-lg">
                <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-tighter">Distance</p>
                <p className="text-xl font-headline font-extrabold text-on-surface">0.4 <span className="text-xs">mi</span></p>
              </div>
            </div>
            <button className="w-full bg-primary py-3 rounded-sm text-on-primary font-headline font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-container transition-all">
              <Navigation size={14} />
              Navigate
            </button>
          </motion.div>
        </div>
      </div>

      {/* Interface Overlays */}
      <div className="absolute top-24 left-8 flex flex-col gap-3 z-10">
        <div className="bg-surface-container-lowest/90 backdrop-blur-md p-2 rounded-xl shadow-xl flex flex-col gap-2">
          <button className="w-12 h-12 flex items-center justify-center bg-secondary-container text-on-secondary-container rounded-lg hover:scale-95 transition-transform">
            <MapPin size={20} />
          </button>
          <button className="w-12 h-12 flex items-center justify-center bg-surface-container-highest text-on-surface-variant rounded-lg hover:scale-95 transition-transform">
            <span className="material-symbols-outlined">storefront</span>
          </button>
          <button className="w-12 h-12 flex items-center justify-center bg-surface-container-highest text-on-surface-variant rounded-lg hover:scale-95 transition-transform">
            <span className="material-symbols-outlined">directions_walk</span>
          </button>
        </div>
      </div>

      {/* Status Legend */}
      <div className="absolute bottom-28 right-8 z-10">
        <div className="bg-surface-container-lowest/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-xl border border-outline-variant/10">
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2e7d32]"></span>
              Available
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#fbc02d]"></span>
              Limited
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-error"></span>
              Full
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
