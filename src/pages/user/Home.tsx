
import React from 'react';
import {motion} from 'motion/react';
import {MapPin, TrendingUp, ArrowRight} from 'lucide-react';
import {Link} from 'react-router-dom';
import {Footer} from '../../components/footer';

export default function Home() {
  return (
    <main className="flex flex-col lg:ml-32">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center px-8 md:px-20 bg-surface-container-low overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <span className="text-secondary font-headline tracking-[0.3em] uppercase text-xs mb-6 block font-bold">
            Where every space becomes a moment of convenience
          </span>

          <h1 className="text-6xl md:text-7xl font-headline font-extrabold tracking-tight mb-6 text-primary">
            Park ‘n <span className="text-[#660000]">Spot</span>
          </h1>

          <p className="text-lg text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
            Easily locate available parking spaces with real-time updates, predictive trends, and community-powered reports.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/explore"
              className="bg-[#660000] text-surface-container px-10 py-4 font-headline font-bold rounded-sm tracking-wide hover:bg-primary-container transition-all duration-300 active:scale-[0.98] shadow-lg flex items-center gap-2"
            >
              View Map <ArrowRight size={16} />
            </Link>

            <Link
              to="/login"
              className="border border-outline-variant/50 px-10 py-4 text-on-surface font-headline font-semibold rounded-sm tracking-wide hover:bg-surface transition-all"
            >
              Log In
            </Link>
          </div>
        </motion.div>
      </section>

      {/* MAP PREVIEW */}
      <section className="py-24 px-8 md:px-20 bg-surface">
        <div className="mb-10 flex justify-between items-center">
          <h2 className="text-3xl font-headline font-bold text-primary">
            Parking Map Overview
          </h2>
          <Link to="/explore" className="text-sm font-bold text-secondary uppercase hover:underline">
            Open Full Map
          </Link>
        </div>

        <div className="h-72 bg-surface-container-low rounded-sm flex items-center justify-center text-on-surface-variant border border-outline-variant/30">
          Map Preview (Static Template)
        </div>
      </section>

      {/* AVAILABILITY + TRENDS */}
      <section className="py-24 px-8 md:px-20 bg-surface-container-low">
        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-surface p-8 rounded-sm border-l-4 border-[#660000]">
            <h3 className="text-lg font-headline font-bold mb-2 text-primary">
              Available Slots
            </h3>
            <p className="text-4xl font-black text-[#660000]">128</p>
            <p className="text-sm text-on-surface-variant mt-2">
              Across nearby parking areas
            </p>
          </div>

          <div className="bg-surface p-8 rounded-sm border border-outline-variant/30">
            <div className="flex items-center gap-2 mb-3 text-primary">
              <TrendingUp size={18} />
              <h3 className="text-lg font-headline font-bold">
                Peak Hours
              </h3>
            </div>
            <p className="text-sm text-on-surface-variant">
              Parking is usually full between <strong>5 PM - 7 PM</strong>. Best time is before 9 AM.
            </p>
          </div>

        </div>
      </section>

      {/* USER REPORTS */}
      <section className="py-24 px-8 md:px-20 bg-surface">
        <div className="mb-10 flex justify-between items-center">
          <h2 className="text-3xl font-headline font-bold text-primary">
            Recent Reports
          </h2>
          <Link to="/reports" className="text-sm font-bold text-secondary uppercase hover:underline">
            View All
          </Link>
        </div>

        <div className="space-y-4">
          {[
            { location: 'Main Street Parking', slots: '5 slots available' },
            { location: 'City Mall Basement', slots: 'Almost full' },
            { location: 'Riverside Parking', slots: '12 slots available' },
          ].map((report, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-5 bg-surface-container-low rounded-sm border border-outline-variant/30"
            >
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[#660000]" />
                <span className="font-bold text-sm">{report.location}</span>
              </div>
              <span className="text-xs text-on-surface-variant">
                {report.slots}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 md:px-20 bg-surface-container-low text-center">
        <h2 className="text-3xl font-headline font-bold mb-4 text-primary">
          Start Finding Parking
        </h2>
        <p className="text-on-surface-variant mb-8">
          Log in to access full features and contribute parking reports.
        </p>

        <Link
          to="/login"
          className="inline-block w-full max-w-sm bg-[#660000] py-4 text-surface-container font-headline font-bold text-sm tracking-[0.2em] uppercase rounded-sm hover:bg-primary-container transition-all duration-300 active:scale-[0.98] shadow-lg"
        >
          LOG IN
        </Link>
      </section>

      {/* FOOTER */}
      <Footer />

    </main>
  );
}