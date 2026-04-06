import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Star, ArrowRight, TrendingUp, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <header className="mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-2"
        >
          <span className="text-secondary font-headline tracking-[0.2em] uppercase text-[10px] font-bold">Welcome back, Curator</span>
          <h1 className="text-4xl md:text-5xl font-headline font-black tracking-tight text-on-surface">Your Mobility Dashboard</h1>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Quick Actions & Stats */}
        <section className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary-container p-8 rounded-xl text-on-primary relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-2xl font-headline font-bold mb-2">Find a Spot</h3>
                <p className="text-on-primary-container text-sm mb-6 max-w-[200px]">Real-time availability across the Sovereign Network.</p>
                <Link to="/explore" className="inline-flex items-center gap-2 bg-surface text-primary px-6 py-3 rounded-sm font-headline font-bold text-xs uppercase tracking-widest hover:bg-secondary-container transition-all">
                  Explore Map <ArrowRight size={14} />
                </Link>
              </div>
              <MapPin size={120} className="absolute -bottom-4 -right-4 text-on-primary-container/20 group-hover:scale-110 transition-transform duration-500" />
            </div>

            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/30 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-headline font-bold text-on-surface">Active Session</h3>
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold mt-1">West Wing Pavilion</p>
                </div>
                <div className="bg-secondary-container p-2 rounded-full text-on-secondary-container">
                  <Clock size={20} />
                </div>
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-3xl font-black text-on-surface">02:45:12</span>
                  <span className="text-xs font-bold text-secondary">ELAPSED</span>
                </div>
                <div className="w-full h-1 bg-outline-variant/30 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    className="h-full bg-secondary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/30">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-headline font-bold text-on-surface uppercase tracking-tight">Recent Activity</h3>
              <Link to="/history" className="text-xs font-bold text-secondary uppercase tracking-widest hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {[
                { name: 'The Grand Pavilion', date: 'Today, 10:24 AM', type: 'Valet Entry', status: 'Active' },
                { name: 'East Plaza Underground', date: 'Yesterday, 06:15 PM', type: 'Self-Park', status: 'Completed' },
                { name: 'Observation Deck North', date: 'May 12, 02:30 PM', type: 'Valet Entry', status: 'Completed' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-surface rounded-lg group hover:bg-surface-container-high transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-surface-container-highest rounded-sm flex items-center justify-center text-on-surface-variant">
                      <TrendingUp size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface text-sm">{activity.name}</h4>
                      <p className="text-xs text-on-surface-variant">{activity.date} • {activity.type}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                    activity.status === 'Active' ? 'bg-secondary-container text-on-secondary-container' : 'bg-outline-variant/20 text-on-surface-variant'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sidebar Info */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container p-8 rounded-xl space-y-6">
            <h3 className="font-headline font-bold text-on-surface uppercase tracking-widest text-xs">Curator Insights</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-secondary mt-1"><Star size={20} fill="currentColor" /></div>
                <div>
                  <h4 className="font-bold text-sm text-on-surface">Elite Status Maintained</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed mt-1">Your contributions to the Sovereign Network have kept your status in the top 5% of curators.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-secondary mt-1"><ShieldCheck size={20} /></div>
                <div>
                  <h4 className="font-bold text-sm text-on-surface">Security Protocol Active</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed mt-1">All facility access points are currently operating under standard Sovereign encryption.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary-container p-8 rounded-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-headline font-bold text-on-secondary-container mb-2">Need Assistance?</h3>
              <p className="text-sm text-on-secondary-container/80 mb-6">Our digital concierge is available 24/7 for elite tier members.</p>
              <button className="w-full py-3 bg-on-secondary-container text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:opacity-90 transition-all">
                Contact Concierge
              </button>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-on-secondary-container/5 rounded-full -mr-12 -mt-12"></div>
          </div>
        </aside>
      </div>
    </main>
  );
}
