import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ChevronDown, Verified } from 'lucide-react';

export default function Report() {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <main className="pt-32 px-6 max-w-4xl mx-auto min-h-screen">
      <header className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-4">Help Make Park ‘n Spot Better</h1>
        <p className="text-on-surface-variant text-lg max-w-2xl">Report real-time parking availability at your location to help keep the data accurate and reliable.</p>
      </header>

      <section className="flex justify-center mb-4">
        <div className="w-full max-w-2xl bg-surface-container-low rounded-xl p-8 shadow-sm">
          <form className="space-y-8">
            <div className="space-y-2">
              <label className="block font-headline text-sm font-bold tracking-widest uppercase text-[#330000]">Location</label>
              <div className="relative">
                <select className="w-full bg-surface-container-high border-none rounded-sm py-4 px-5 text-on-surface focus:ring-1 focus:ring-outline appearance-none">
                  <option>Municipal </option>
                  <option>The Cabanas</option>
                  <option>North Polo</option>
                  <option>Convention Center</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-on-surface-variant">
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            <div className="space-y-4 ">
              <label className="block font-headline text-sm font-bold tracking-widest uppercase text-[#330000]">Reported Status</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                <label className="relative flex flex-col p-5 bg-surface-container-lowest rounded-md cursor-pointer border-l-4 border-[#660000] hover:bg-surface-container-highest transition-all group">
                  <input type="radio" name="status" value="available" className="hidden peer" defaultChecked />
                  <span className="font-headline font-bold text-on-surface mb-1">Available</span>
                  <span className="text-xs text-on-surface-variant">Facilities are open and under capacity.</span>
                  <div className="absolute top-4 right-4 text-secondary opacity-0 peer-checked:opacity-100">
                    <CheckCircle2 size={18} fill="currentColor" />
                  </div>
                </label>

                <label className="relative flex flex-col p-5 bg-surface-container-lowest rounded-md cursor-pointer border-l-4 border-[#660000] hover:bg-surface-container-highest transition-all group">
                  <input type="radio" name="status" value="full" className="hidden peer" />
                  <span className="font-headline font-bold text-on-surface mb-1">Full</span>
                  <span className="text-xs text-on-surface-variant">Capacity reached. No further access.</span>
                  <div className="absolute top-4 right-4 text-primary-container opacity-0 peer-checked:opacity-100">
                    <CheckCircle2 size={18} fill="currentColor" />
                  </div>
                </label>

                <label className="relative flex flex-col p-5 bg-surface-container-lowest rounded-md cursor-pointer border-l-4 border-[#660000] hover:bg-surface-container-highest transition-all group">
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
              <label className="block font-headline text-sm font-bold tracking-widest uppercase text-[#330000]">Additional Notes</label>
              <textarea
                className="w-full bg-surface-container-high border-none rounded-sm py-4 px-5 text-on-surface focus:ring-1 focus:ring-outline placeholder:text-on-surface-variant/50"
                placeholder="Describe the current situation..."
                rows={4}
              ></textarea>
            </div>

            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="w-full md:w-auto px-12 py-4 bg-primary-container text-white font-headline font-bold rounded-sm hover:bg-primary transition-all duration-300 shadow-lg">

              Submit Report
            </button>

            {submitted && (
              <p className="text-[#330000] text-sm mt-4 flex items-center gap-2">
                <CheckCircle2 size={16} /> Report submitted. Thank you! Your update helps keep parking information accurate.
              </p>
            )}


          </form>
        </div>



      </section>

    </main>
  );
}
