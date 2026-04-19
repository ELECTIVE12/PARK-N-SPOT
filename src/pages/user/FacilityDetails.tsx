import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  MapPin,
  Navigation,
  CheckCircle2,
  Clock,
  Leaf,
  Shield,
  Car
} from 'lucide-react';

import findparkgo from "../../components/images/findparkgo.png";

export default function FacilityDetails() {

  const { id } = useParams();

  const [saved, setSaved] = useState(false);

  const facilityData: any = {
    "1": {
      name: "West Wing Pavilion",
      location: "Marina Bay",
      slots: "84 / 120"
    },
    "2": {
      name: "Orchard Central Parking",
      location: "Orchard Road",
      slots: "Full"
    },
    "3": {
      name: "Bugis Smart Park",
      location: "Bugis District",
      slots: "32 / 120"
    },
    "4": {
      name: "Downtown Core Garage",
      location: "CBD Singapore",
      slots: "67 / 120"
    }
  };

  const current = facilityData[id as string] || facilityData["1"];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto min-h-screen bg-[#f9fafb]">

      <div className="mb-12">

        <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-xl">

          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${findparkgo})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              animation: 'bgMove 20s ease-in-out infinite alternate',
            }}
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 h-full flex items-center px-6 sm:px-10 text-white">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-3xl"
            >

              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/80">
                Park ‘n Spot Facility Details
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mt-2">
                WHERE EVERY SPACE BECOMES A MOMENT OF CONVENIENCE
              </h1>

              <p className="text-white/70 mt-4 text-sm sm:text-base max-w-xl">
                View real-time parking insights, availability, and smart infrastructure details across the city network.
              </p>

            </motion.div>

          </div>

        </div>

      </div>

      <div className="mb-10">

        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-3">
          Parking Facilities / <span className="text-[#660000]">Facility {id}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">
          {current.name}
        </h1>

        <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl">
          Premium smart parking infrastructure with real-time slot tracking and secure monitoring systems.
        </p>

        <div className="flex gap-3 mt-6">

          <button
            onClick={() => alert(`Navigating to ${current.location}`)}
            className="bg-[#660000] text-white px-5 py-2.5 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-[#7a0000] transition flex items-center gap-2"
          >
            <Navigation size={14} />
            Navigate
          </button>

          <button
            onClick={() => setSaved(!saved)}
            className={`px-5 py-2.5 rounded-md text-xs font-bold uppercase tracking-widest transition border 
              ${saved
                ? "bg-[#660000] text-white border-[#660000]"
                : "border-gray-300 hover:bg-gray-100"
              }`}
          >
            {saved ? "Saved ✓" : "★ Save"}
          </button>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

        <div className="bg-white border rounded-xl p-5 hover:shadow-md transition">
          <Shield className="text-[#660000] mb-3" />
          <h3 className="font-bold">Security Network</h3>
          <p className="text-sm text-gray-500 mt-1">
            24/7 CCTV coverage across parking zones.
          </p>
        </div>

        <div className="bg-white border rounded-xl p-5 hover:shadow-md transition">
          <Car className="text-[#660000] mb-3" />
          <h3 className="font-bold">Smart Allocation</h3>
          <p className="text-sm text-gray-500 mt-1">
            Real-time parking distribution system.
          </p>
        </div>

        <div className="bg-white border rounded-xl p-5 hover:shadow-md transition">
          <Leaf className="text-green-600 mb-3" />
          <h3 className="font-bold">Eco Efficiency</h3>
          <p className="text-sm text-gray-500 mt-1">
            Reduced idle time and emissions.
          </p>
        </div>

      </div>


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <div className="lg:col-span-4 bg-white border rounded-2xl p-6 relative overflow-hidden">

          <div className="absolute left-0 top-0 w-1 h-full bg-[#660000]" />

          <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-8">
            Live Availability
          </h3>

          <div className="text-5xl font-black text-gray-900">
            {current.slots}
          </div>

          <p className="text-[#660000] font-semibold mt-2 text-sm">
            Available Slots
          </p>

          <div className="flex items-center gap-2 mt-6 text-sm font-semibold">
            <CheckCircle2 className="text-[#660000]" size={18} />
            Operational
          </div>

        </div>

        <div className="lg:col-span-8 bg-white border rounded-2xl p-6">

          <h3 className="font-bold text-lg mb-4">
            Parking Usage Overview
          </h3>

          <div className="flex items-end gap-1 h-[260px]">

            {[20, 35, 60, 85, 95, 80, 50, 40, 65, 75, 45, 25].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-[#660000]/10 hover:bg-[#660000] transition rounded-t-sm"
                style={{ height: `${h}%` }}
              />
            ))}

          </div>

        </div>

        <div className="lg:col-span-5 bg-white border rounded-2xl p-6">

          <h3 className="font-bold mb-5">Peak Hours</h3>

          <div className="space-y-5">

            <div className="flex gap-3">
              <Clock className="text-[#660000]" />
              <div>
                <p className="font-bold">Morning</p>
                <p className="text-sm text-gray-500">Higher parking demand</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Leaf className="text-green-600" />
              <div>
                <p className="font-bold">Off Peak</p>
                <p className="text-sm text-gray-500">Better availability</p>
              </div>
            </div>

          </div>

        </div>

        <div className="lg:col-span-7 bg-white border rounded-2xl overflow-hidden">

          <img
            src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200"
            className="w-full h-[260px] object-cover"
            alt="facility"
          />

          <div className="bg-[#660000] text-white p-4 flex items-center gap-2 text-sm">
            <MapPin size={14} />
            {current.location} • Facility {id}
          </div>

        </div>

      </div>

      <div className="mt-12">

        <h2 className="text-lg font-bold mb-4">
          Facility Visuals
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          <img className="rounded-xl h-32 object-cover" src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800" />
          <img className="rounded-xl h-32 object-cover" src="https://images.unsplash.com/photo-1494526585095-c41746248156?w=800" />
          <img className="rounded-xl h-32 object-cover" src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800" />
          <img className="rounded-xl h-32 object-cover" src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=800" />

        </div>

      </div>

      <style>{`
        @keyframes bgMove {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
      `}</style>

    </div>
  );
}