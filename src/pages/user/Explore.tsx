import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../lib/api';

import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
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

interface CarparkLocation {
  lat: number;
  lng: number;
}

interface Carpark {
  carparkNumber: string;
  area: string;
  development: string;
  location: CarparkLocation;
  availableLots: number;
  lotType: string;
  agencyCode: string;
  fetchedAt: string;
}

type MarkerColor = 'green' | 'gold' | 'red';

const SINGAPORE_CENTER: [number, number] = [1.3521, 103.8198];

// Demo carpark data — shown when the backend is unavailable
const DEMO_CARPARKS: Carpark[] = [
  { carparkNumber: 'OM1', area: 'Orchard', development: 'ION Orchard', location: { lat: 1.3040, lng: 103.8340 }, availableLots: 45, lotType: 'C', agencyCode: 'URA', fetchedAt: new Date().toISOString() },
  { carparkNumber: 'OM2', area: 'Orchard', development: 'Takashimaya', location: { lat: 1.3035, lng: 103.8335 }, availableLots: 12, lotType: 'C', agencyCode: 'URA', fetchedAt: new Date().toISOString() },
  { carparkNumber: 'OM3', area: 'Orchard', development: 'Paragon', location: { lat: 1.3038, lng: 103.8350 }, availableLots: 0, lotType: 'C', agencyCode: 'URA', fetchedAt: new Date().toISOString() },
  { carparkNumber: 'MB1', area: 'Marina', development: 'Marina Bay Sands', location: { lat: 1.2830, lng: 103.8610 }, availableLots: 88, lotType: 'C', agencyCode: 'LTA', fetchedAt: new Date().toISOString() },
  { carparkNumber: 'MB2', area: 'Marina', development: 'Suntec City', location: { lat: 1.2955, lng: 103.8585 }, availableLots: 5, lotType: 'C', agencyCode: 'URA', fetchedAt: new Date().toISOString() },
  { carparkNumber: 'MB3', area: 'Marina', development: 'Millenia Walk', location: { lat: 1.2930, lng: 103.8570 }, availableLots: 30, lotType: 'C', agencyCode: 'URA', fetchedAt: new Date().toISOString() },
  { carparkNumber: 'HF1', area: 'Harbourfront', development: 'VivoCity', location: { lat: 1.2645, lng: 103.8225 }, availableLots: 120, lotType: 'C', agencyCode: 'LTA', fetchedAt: new Date().toISOString() },
  { carparkNumber: 'HF2', area: 'Harbourfront', development: 'Harbourfront Centre', location: { lat: 1.2625, lng: 103.8185 }, availableLots: 8, lotType: 'C', agencyCode: 'URA', fetchedAt: new Date().toISOString() },
  { carparkNumber: 'HF3', area: 'Harbourfront', development: 'Sentosa Gateway', location: { lat: 1.2550, lng: 103.8230 }, availableLots: 0, lotType: 'C', agencyCode: 'LTA', fetchedAt: new Date().toISOString() },
];

const createMarkerSvg = (fillColor: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 10.105 12.5 28.5 12.5 28.5S25 22.605 25 12.5C25 5.596 19.404 0 12.5 0z" fill="${fillColor}" stroke="#5b0b0b" stroke-width="1.5"/>
      <circle cx="12.5" cy="12.5" r="5" fill="white"/>
    </svg>
  `)}`;

const createIcon = (color: MarkerColor) =>
  new L.Icon({
    iconUrl: createMarkerSvg(
      color === 'green' ? '#16a34a' : color === 'gold' ? '#eab308' : '#dc2626'
    ),
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [12, -28],
    shadowSize: [41, 41],
  });

const getStatusLabel = (lots: number): string => {
  if (lots > 20) return 'Available';
  if (lots > 0) return 'Limited';
  return 'Full';
};

const getMarkerColor = (lots: number): MarkerColor => {
  if (lots > 20) return 'green';
  if (lots > 0) return 'gold';
  return 'red';
};

const availableIcon = createIcon('green');
const limitedIcon = createIcon('gold');
const fullIcon = createIcon('red');

const getMarkerIcon = (lots: number) => {
  if (lots > 20) return availableIcon;
  if (lots > 0) return limitedIcon;
  return fullIcon;
};

const isValidLocation = (location: CarparkLocation | undefined) =>
  Boolean(
    location &&
      Number.isFinite(location.lat) &&
      Number.isFinite(location.lng) &&
      Math.abs(location.lat) <= 90 &&
      Math.abs(location.lng) <= 180
  );

function MapViewportController({ points }: { points: CarparkLocation[] }) {
  const map = useMap();

  useEffect(() => {
    const updateMapSize = () => map.invalidateSize();

    updateMapSize();
    window.addEventListener('resize', updateMapSize);

    return () => window.removeEventListener('resize', updateMapSize);
  }, [map]);

  useEffect(() => {
    if (points.length === 0) {
      map.setView(SINGAPORE_CENTER, 11);
      return;
    }

    if (points.length === 1) {
      map.setView([points[0].lat, points[0].lng], 15);
      return;
    }

    map.fitBounds(
      L.latLngBounds(points.map((point) => [point.lat, point.lng] as [number, number])),
      { padding: [32, 32], maxZoom: 15 }
    );
  }, [map, points]);

  return null;
}

const Map = MapContainer as any;
const MapTile = TileLayer as any;
const MapMarker = Marker as any;
const MapTooltip = Tooltip as any;

async function parseParkingResponse(res: Response) {
  const contentType = res.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return res.json();
  }

  const text = await res.text();
  const stripped = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  throw new Error(
    stripped ||
      `Parking API returned ${contentType || 'a non-JSON response'} instead of JSON.`
  );
}

export default function Explore() {
  const navigate = useNavigate();

  const [carparks, setCarparks] = useState<Carpark[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fromCache, setFromCache] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(() => window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const fetchParking = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_URL}/api/parking/availability`);

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await parseParkingResponse(res);
        const fetched = data.data ?? [];
        if (fetched.length === 0) {
          // Backend responded but no data — fall back to demo
          setCarparks(DEMO_CARPARKS);
          setFromCache(true);
        } else {
          setCarparks(fetched);
          setFromCache(data.fromCache ?? false);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to fetch parking data';
        console.warn('Parking fetch failed, using demo data:', message);
        setCarparks(DEMO_CARPARKS);
        setFromCache(true);
      } finally {
        setLoading(false);
      }
    };

    fetchParking();
    const interval = setInterval(fetchParking, 60_000);
    return () => clearInterval(interval);
  }, []);

  const validCarparks = carparks.filter((carpark) => isValidLocation(carpark.location));
  const mapPoints = validCarparks.map((carpark) => carpark.location);

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
                Park 'n Spot Map Dashboard
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black leading-tight">
                WHERE EVERY SPACE BECOMES A MOMENT OF CONVENIENCE
              </h1>
              <p className="text-white/70 text-sm sm:text-base max-w-xl">
                Real-time parking availability across Singapore's smart network.
              </p>
              {!loading && (
                <span className={`w-fit text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                  fromCache
                    ? 'bg-yellow-500/20 text-yellow-300'
                    : 'bg-green-500/20 text-green-300'
                }`}>
                  {fromCache ? '⚠ Showing cached data' : '● Live data'}
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-8 lg:px-10 mt-10">
        {loading && (
          <div className="w-full h-[55vh] rounded-2xl border flex items-center justify-center bg-surface-container-low">
            <p className="text-on-surface-variant font-headline font-bold uppercase tracking-widest text-sm animate-pulse">
              Fetching live parking data...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="w-full h-[55vh] rounded-2xl border flex flex-col items-center justify-center bg-red-50 gap-4">
            <p className="text-red-700 font-bold text-sm">⚠ {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-xs uppercase tracking-widest font-bold px-4 py-2 bg-[#660000] text-white rounded-md"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="w-full h-[55vh] rounded-2xl overflow-hidden shadow-lg border">
            <Map
              center={SINGAPORE_CENTER}
              zoom={11}
              scrollWheelZoom={true}
              className="w-full h-full"
            >
              <MapViewportController points={mapPoints} />
              <MapTile
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {validCarparks.map((cp, i) => (
                <MapMarker
                  key={`${cp.carparkNumber}-${i}`}
                  position={[cp.location.lat, cp.location.lng]}
                  icon={getMarkerIcon(cp.availableLots)}
                  eventHandlers={{
                    click: () => navigate(`/facility/${cp.carparkNumber}`)
                  }}
                >
                  <MapTooltip direction="top" offset={[0, -10]} opacity={1}>
                    <div className="w-64 max-h-60 overflow-y-auto space-y-2 pr-1">
                      <div className="flex justify-between bg-gray-50 border-l-4 border-[#660000] px-3 py-2 rounded-md">
                        <span>📍 Location</span>
                        <span className="text-[#660000] font-bold text-right max-w-[140px] truncate">
                          {cp.development}
                        </span>
                      </div>
                      <div className="flex justify-between bg-gray-50 border-l-4 border-[#660000] px-3 py-2 rounded-md">
                        <span>🚗 Status</span>
                        <span className={
                          cp.availableLots > 20
                            ? 'text-green-700 font-bold'
                            : cp.availableLots > 0
                              ? 'text-yellow-600 font-bold'
                              : 'text-red-700 font-bold'
                        }>
                          {getStatusLabel(cp.availableLots)}
                        </span>
                      </div>
                      <div className="flex justify-between bg-gray-50 border-l-4 border-[#660000] px-3 py-2 rounded-md">
                        <span>🏢 Area</span>
                        <span className="text-[#660000] font-bold">{cp.area || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between bg-gray-50 border-l-4 border-[#660000] px-3 py-2 rounded-md">
                        <span>🅿️ Slots</span>
                        <span className="text-[#660000] font-bold">{cp.availableLots}</span>
                      </div>
                      <div className="flex justify-between bg-gray-50 border-l-4 border-[#660000] px-3 py-2 rounded-md">
                        <span>🏷 Type</span>
                        <span>{cp.lotType}</span>
                      </div>
                    </div>
                  </MapTooltip>
                </MapMarker>
              ))}
            </Map>
          </div>
        )}

        {!loading && !error && carparks.length === 0 && (
          <p className="text-center text-on-surface-variant text-sm mt-6">
            No carpark data available for the selected zones right now.
          </p>
        )}
      </div>

      <div className="px-6 sm:px-8 lg:px-10 mt-6 mb-12">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#660000]">
              Availability Status
            </h3>
            {!loading && (
              <span className="text-xs text-on-surface-variant">
                {validCarparks.length} carpark{validCarparks.length !== 1 ? 's' : ''} found near your zones
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600" />
              <p className="font-bold text-sm">Available</p>
              <p className="text-xs text-on-surface-variant">More than 20 slots</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <p className="font-bold text-sm">Limited</p>
              <p className="text-xs text-on-surface-variant">1 – 20 slots left</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600" />
              <p className="font-bold text-sm">Full</p>
              <p className="text-xs text-on-surface-variant">0 slots available</p>
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
        .leaflet-tooltip {
          font-size: 14px !important;
          line-height: 1.4 !important;
          padding: 10px !important;
          max-width: 280px !important;
          white-space: normal !important;
          background: rgba(255, 255, 255, 0.98) !important;
          border: 1px solid #ddd !important;
          border-radius: 10px !important;
          box-shadow: 0 6px 18px rgba(0,0,0,0.15) !important;
          color: #111 !important;
        }
        .leaflet-tooltip * {
          font-size: inherit !important;
        }
        .leaflet-tooltip .w-64 {
          width: 260px !important;
        }
      `}</style>

    </div>
  );
}
