import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';

import findparkgo from "../../components/images/findparkgo.png";
import 'leaflet/dist/leaflet.css';

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const createIcon = (color: string) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

export default function Explore() {

  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;

  return (
    <div className="min-h-screen w-full bg-white">

      <div className="pt-24 px-6 sm:px-8 lg:px-10">

        <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden shadow-xl">

          <div
            className="absolute inset-0 will-change-transform"
            style={{
              backgroundImage: `url(${findparkgo})`,
              backgroundSize: '120%',
              backgroundPosition: 'center',
              animation: isMobile
                ? 'bgMoveMobile 25s ease-in-out infinite alternate'
                : 'bgMove 20s ease-in-out infinite alternate',
            }}
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 h-full flex items-center px-6 sm:px-10 text-white">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-3 max-w-4xl"
            >

              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/80">
                Park ‘n Spot Map Dashboard
              </span>

              <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black leading-tight">
                WHERE EVERY SPACE BECOMES A MOMENT OF CONVENIENCE
              </h1>

              <p className="text-white/70 text-sm sm:text-base max-w-xl">
                Real-time parking availability across Singapore’s smart network.
              </p>

            </motion.div>

          </div>

        </div>
      </div>

      <div className="px-6 sm:px-8 lg:px-10 mt-10">

        <div className="w-full h-[55vh] rounded-2xl overflow-hidden shadow-lg border">

          <MapContainer
            center={[1.3521, 103.8198]}
            zoom={12}
            scrollWheelZoom={true}
            className="w-full h-full"
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
              position={[1.3521, 103.8198]}
              icon={createIcon("green")}
              eventHandlers={{ click: () => navigate('/facility/1') }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div className="w-64 space-y-2">

                  <div className="flex justify-between bg-gray-50 border-l-4 border-[#660000] px-3 py-2 rounded-md">
                    <span>📍 Location</span>
                    <span className="text-[#660000] font-bold">Orchard Central</span>
                  </div>

                  <div className="flex justify-between bg-gray-50 border-l-4 border-[#660000] px-3 py-2 rounded-md">
                    <span>🚗 Status</span>
                    <span>Available</span>
                  </div>

                  <div className="flex justify-between bg-gray-50 border-l-4 border-[#660000] px-3 py-2 rounded-md">
                    <span>📏 Distance</span>
                    <span className="text-[#660000] font-bold">0.4 km</span>
                  </div>

                  <div className="flex justify-between bg-gray-50 border-l-4 border-[#660000] px-3 py-2 rounded-md">
                    <span>🅿️ Slots</span>
                    <span className="text-[#660000] font-bold">82</span>
                  </div>

                </div>
              </Tooltip>
            </Marker>

            <Marker
              position={[1.3600, 103.8200]}
              icon={createIcon("red")}
              eventHandlers={{ click: () => navigate('/facility/2') }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div className="w-64 space-y-2">

                  <div className="flex justify-between bg-gray-50 border-l-4 border-[#660000] px-3 py-2 rounded-md">
                    <span>📍 Location</span>
                    <span className="text-[#660000] font-bold">Marina Bay</span>
                  </div>

                  <div className="flex justify-between bg-gray-50 border-l-4 border-[#660000] px-3 py-2 rounded-md">
                    <span>🚗 Status</span>
                    <span>Full</span>
                  </div>

                  <div className="flex justify-between bg-gray-50 border-l-4 border-[#660000] px-3 py-2 rounded-md">
                    <span>📏 Distance</span>
                    <span className="text-[#660000] font-bold">1.2 km</span>
                  </div>

                  <div className="flex justify-between bg-gray-50 border-l-4 border-[#660000] px-3 py-2 rounded-md">
                    <span>🅿️ Slots</span>
                    <span className="text-[#660000] font-bold">0</span>
                  </div>

                </div>
              </Tooltip>
            </Marker>

            <Marker
              position={[1.3400, 103.8300]}
              icon={createIcon("gold")}
              eventHandlers={{ click: () => navigate('/facility/3') }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div className="w-64 space-y-2">

                  <div className="flex justify-between bg-gray-50 border-l-4 border-[#660000] px-3 py-2 rounded-md">
                    <span>📍 Location</span>
                    <span className="text-[#660000] font-bold">Bugis Junction</span>
                  </div>

                  <div className="flex justify-between bg-gray-50 border-l-4 border-[#660000] px-3 py-2 rounded-md">
                    <span>🚗 Status</span>
                    <span>Limited</span>
                  </div>

                  <div className="flex justify-between bg-gray-50 border-l-4 border-[#660000] px-3 py-2 rounded-md">
                    <span>📏 Distance</span>
                    <span className="text-[#660000] font-bold">0.8 km</span>
                  </div>

                  <div className="flex justify-between bg-gray-50 border-l-4 border-[#660000] px-3 py-2 rounded-md">
                    <span>🅿️ Slots</span>
                    <span className="text-[#660000] font-bold">12</span>
                  </div>

                </div>
              </Tooltip>
            </Marker>

          </MapContainer>

        </div>
      </div>

      <div className="px-6 sm:px-8 lg:px-10 mt-6 mb-12">

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

          <h3 className="text-sm font-bold uppercase tracking-widest text-[#660000] mb-6">
            Availability Status
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
              <p className="font-bold text-sm">Available</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <p className="font-bold text-sm">Limited</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <p className="font-bold text-sm">Full</p>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @keyframes bgMove {
          0% { transform: scale(1) translate(0px, 0px); }
          50% { transform: scale(1.08) translate(-20px, -10px); }
          100% { transform: scale(1) translate(0px, 0px); }
        }

        @keyframes bgMoveMobile {
          0% { transform: scale(1) translate(0px, 0px); }
          50% { transform: scale(1.12) translate(-10px, -5px); }
          100% { transform: scale(1) translate(0px, 0px); }
        }
      `}</style>

    </div>
  );
}