import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ChevronDown, Verified } from 'lucide-react';

export default function Report() {
  return (
    <main className="pt-32 px-6 max-w-4xl mx-auto min-h-screen">
      <header className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-4">Contribute to the Sovereign Network</h1>
        <p className="text-on-surface-variant text-lg max-w-2xl">Your real-time insights maintain the integrity of our architectural ecosystem. Please provide accurate availability data for your current location.</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-surface-container-low rounded-xl p-8 shadow-sm">
          <form className="space-y-8">
            <div className="space-y-2">
              <label className="block font-headline text-sm font-bold tracking-widest uppercase text-on-surface-variant">Location</label>
              <div className="relative">
                <select className="w-full bg-surface-container-high border-none rounded-sm py-4 px-5 text-on-surface focus:ring-1 focus:ring-outline appearance-none">
                  <option>The Grand Pavilion - Wing A</option>
                  <option>East Plaza Underground</option>
                  <option>Observation Deck North</option>
                  <option>The Atrium - Level 4</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-on-surface-variant">
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block font-headline text-sm font-bold tracking-widest uppercase text-on-surface-variant">Reported Status</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="relative flex flex-col p-5 bg-surface-container-lowest rounded-md cursor-pointer border-l-4 border-secondary hover:bg-surface-container-highest transition-all group">
                  <input type="radio" name="status" value="available" className="hidden peer" defaultChecked />
                  <span className="font-headline font-bold text-on-surface mb-1">Available</span>
                  <span className="text-xs text-on-surface-variant">Facilities are open and under capacity.</span>
                  <div className="absolute top-4 right-4 text-secondary opacity-0 peer-checked:opacity-100">
                    <CheckCircle2 size={18} fill="currentColor" />
                  </div>
                </label>
                
                <label className="relative flex flex-col p-5 bg-surface-container-lowest rounded-md cursor-pointer border-l-4 border-primary-container hover:bg-surface-container-highest transition-all group">
                  <input type="radio" name="status" value="full" className="hidden peer" />
                  <span className="font-headline font-bold text-on-surface mb-1">Full</span>
                  <span className="text-xs text-on-surface-variant">Capacity reached. No further access.</span>
                  <div className="absolute top-4 right-4 text-primary-container opacity-0 peer-checked:opacity-100">
                    <CheckCircle2 size={18} fill="currentColor" />
                  </div>
                </label>

                <label className="relative flex flex-col p-5 bg-surface-container-lowest rounded-md cursor-pointer border-l-4 border-outline hover:bg-surface-container-highest transition-all group">
                  <input type="radio" name="status" value="incorrect" className="hidden peer" />
                  <span className="font-headline font-bold text-on-surface mb-1">Incorrect Info</span>
                  <span className="text-xs text-on-surface-variant">Digital data conflicts with physical site.</span>
                  <div className="absolute top-4 right-4 text-outline opacity-0 peer-checked:opacity-100">
                    <CheckCircle2 size={18} fill="currentColor" />
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-headline text-sm font-bold tracking-widest uppercase text-on-surface-variant">Additional Notes</label>
              <textarea 
                className="w-full bg-surface-container-high border-none rounded-sm py-4 px-5 text-on-surface focus:ring-1 focus:ring-outline placeholder:text-on-surface-variant/50" 
                placeholder="Describe environmental conditions or specific access issues..." 
                rows={4}
              ></textarea>
            </div>

            <div className="pt-4">
              <button className="w-full md:w-auto px-12 py-4 bg-primary-container text-white font-headline font-bold rounded-sm hover:bg-primary transition-all duration-300 shadow-lg">
                Submit Report
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-secondary-container p-6 rounded-xl relative overflow-hidden h-64">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuADJ6W0VnkfGZlIdRjavS8ZEFWXmRRAXS0YbuM6CSMsJuRRaSNiOa5PKCAnN7bGOPqBi3n2ZekDjwDNIJ--M2UjEhdAmivUOMfoKZ6y2p9jwXMxMXeXeFhqNApZeHvdt_QvM6rGKKhg5_yGyCL8n2MKQCH_GwwOKiyhYWgXf7Wx9Va_ed8XvpvEfiroMMsXM-1KygUu0nBXcY4g9T77tu5OuZN_XMptvXzp0UkD-Qjoow4lJCz7A-VEFYZMCthJ9-6SVoS6Zv03_TAP" 
              alt="Architecture"
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10 h-full flex flex-col justify-end">
              <h3 className="font-headline font-black text-on-secondary-container text-xl leading-tight mb-2">Integrity in Action</h3>
              <p className="text-on-secondary-container text-sm leading-relaxed">Crowdsourced data ensures the Sovereign Network remains the premier authority in facility management.</p>
            </div>
          </div>
          <div className="bg-surface-container p-6 rounded-xl flex items-center gap-4">
            <div className="bg-surface-container-lowest p-3 rounded-full text-primary-container">
              <Verified size={24} />
            </div>
            <div>
              <p className="font-headline font-bold text-on-surface">Verified Status</p>
              <p className="text-xs text-on-surface-variant">Elite Tier Curator contributions are prioritized.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
