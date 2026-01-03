"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, ArrowUpRight, Navigation, Globe, Phone, CloudRain, Sun, Cloud, Wind, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";

// --- DATA ---
const LOCATIONS = [
  {
    id: "tokyo",
    city: "Tokyo",
    district: "Shibuya",
    coords: "35.6591° N, 139.7006° E",
    timezone: "Asia/Tokyo",
    address: "14-2 Udagawacho, Shibuya City",
    phone: "+81 3-5555-0199",
    desc: "A brutalist concrete sanctuary amidst the neon chaos. Silence is the soundtrack here.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000",
    weather: { temp: "14°C", condition: "Mist", icon: Cloud },
    features: ["Omakase Bar", "Silent Zone", "Roastery"]
  },
  {
    id: "london",
    city: "London",
    district: "Shoreditch",
    coords: "51.5260° N, 0.0782° W",
    timezone: "Europe/London",
    address: "42 Redchurch St, London E2 7DP",
    phone: "+44 20 7946 0958",
    desc: "Housed in a repurposed textile warehouse. Exposed brick, rain on glass, and warmth.",
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=2000",
    weather: { temp: "9°C", condition: "Drizzle", icon: CloudRain },
    features: ["Cupping Lab", "Bakery", "Vinyl Lounge"]
  },
  {
    id: "ny",
    city: "New York",
    district: "SoHo",
    coords: "40.7233° N, 74.0030° W",
    timezone: "America/New_York",
    address: "101 Spring St, New York, NY 10012",
    phone: "+1 212-555-0182",
    desc: "Cast iron architecture meets modern extraction. A refuge from the Manhattan grid.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=2000",
    weather: { temp: "18°C", condition: "Clear", icon: Sun },
    features: ["Espresso Bar", "Gear Shop", "Training Center"]
  },
  {
    id: "kolkata",
    city: "Kolkata",
    district: "Park Street",
    coords: "22.5530° N, 88.3524° E",
    timezone: "Asia/Kolkata",
    address: "18/2 Park St, Kolkata, WB 700071",
    phone: "+91 33 2255 0100",
    desc: "Heritage meets avant-garde. High ceilings, colonial pillars, and the future of coffee.",
    image: "https://images.unsplash.com/photo-1565538420-15f276229497?auto=format&fit=crop&q=80&w=2000",
    weather: { temp: "28°C", condition: "Humid", icon: Wind },
    features: ["Heritage Site", "Full Kitchen", "Event Space"]
  }
];

export default function LocationsPage() {
  const [activeLocation, setActiveLocation] = useState(LOCATIONS[0]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-[#E5E5E5] selection:bg-[#D4AF37] selection:text-black">
      <Navbar />

      {/* --- CINEMATIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
            <motion.div
                key={activeLocation.id}
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full"
            >
                {/* Ken Burns Effect Image */}
                <motion.div
                    animate={{ scale: 1.1 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                    className="h-full w-full"
                >
                    <img 
                        src={activeLocation.image} 
                        alt={activeLocation.city} 
                        className="h-full w-full object-cover opacity-50"
                    />
                </motion.div>
                
                {/* Vignette & Gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_120%)]" />
            </motion.div>
        </AnimatePresence>
      </div>

      {/* --- MAIN INTERFACE --- */}
      <div className="relative z-10 flex min-h-screen flex-col pt-32 lg:flex-row">
        
        {/* LEFT: NAVIGATOR */}
        <div className="flex w-full flex-col justify-center px-6 lg:w-1/2 lg:px-24">
            <div className="mb-12">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#D4AF37]">
                    Network
                </span>
                <h1 className="mt-2 font-serif text-5xl md:text-7xl text-[#E5E5E5]">
                    The Sanctuaries
                </h1>
            </div>

            <div className="flex flex-col space-y-1">
                {LOCATIONS.map((loc, idx) => (
                    <button
                        key={loc.id}
                        onMouseEnter={() => setActiveLocation(loc)}
                        onClick={() => setActiveLocation(loc)}
                        className={`group relative flex items-center justify-between border-b py-8 text-left transition-all duration-500 ${
                            activeLocation.id === loc.id 
                            ? "border-[#D4AF37] px-8 bg-white/5" 
                            : "border-white/5 px-0 hover:px-4 hover:bg-white/5"
                        }`}
                    >
                        <div className="flex items-baseline gap-8">
                            <span className={`font-mono text-xs transition-colors ${activeLocation.id === loc.id ? "text-[#D4AF37]" : "text-white/20"}`}>
                                0{idx + 1}
                            </span>
                            <div>
                                <span className={`block font-serif text-4xl transition-all duration-300 ${activeLocation.id === loc.id ? "text-white scale-105 origin-left" : "text-white/40 group-hover:text-white"}`}>
                                    {loc.city}
                                </span>
                                <span className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-500 block mt-1 ${activeLocation.id === loc.id ? "text-[#D4AF37] opacity-100 translate-y-0" : "text-white/30 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"}`}>
                                    {loc.district}
                                </span>
                            </div>
                        </div>

                        {/* Hover Arrow */}
                        <ArrowUpRight 
                            className={`transition-all duration-500 ${activeLocation.id === loc.id ? "text-[#D4AF37] opacity-100 rotate-45" : "text-white/30 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"}`} 
                            size={24} 
                        />
                    </button>
                ))}
            </div>
        </div>

        {/* RIGHT: LIVE DATA CARD */}
        <div className="flex w-full items-end justify-start px-6 pb-12 lg:w-1/2 lg:justify-center lg:pb-0 lg:items-center">
            
            <motion.div
                key={activeLocation.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="w-full max-w-lg"
            >
                <div className="relative overflow-hidden border border-white/10 bg-[#0A0A0A]/80 p-10 backdrop-blur-2xl shadow-2xl">
                    
                    {/* Decorative Top Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] to-transparent" />

                    {/* Header: District & Time */}
                    <div className="mb-8 flex items-start justify-between">
                        <div>
                            <h2 className="font-serif text-5xl text-white mb-2">{activeLocation.district}</h2>
                            <div className="flex items-center gap-3 text-xs font-mono text-[#D4AF37]">
                                <MapPin size={12} />
                                <span>{activeLocation.coords}</span>
                            </div>
                        </div>
                        
                        {/* Live Clock Component */}
                        <LiveClock timezone={activeLocation.timezone} />
                    </div>

                    {/* Atmosphere / Weather Strip */}
                    <div className="flex items-center gap-6 mb-8 border-y border-white/10 py-4">
                        <div className="flex items-center gap-3">
                            <activeLocation.weather.icon size={20} className="text-white/60" />
                            <div>
                                <span className="block text-xl font-bold text-white">{activeLocation.weather.temp}</span>
                                <span className="text-[10px] uppercase tracking-wider text-white/40">{activeLocation.weather.condition}</span>
                            </div>
                        </div>
                        <div className="h-8 w-[1px] bg-white/10" />
                        <div className="flex-1">
                             <div className="flex flex-wrap gap-2">
                                {activeLocation.features.map((feat) => (
                                    <span key={feat} className="bg-white/5 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white/60 border border-white/5">
                                        {feat}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Narrative */}
                    <p className="mb-10 text-lg font-light leading-relaxed text-white/80">
                        {activeLocation.desc}
                    </p>

                    {/* Contact Info */}
                    <div className="space-y-4 mb-10">
                        <div className="flex items-start gap-4 group cursor-pointer">
                            <div className="p-2 rounded-full bg-white/5 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                                <Globe size={16} />
                            </div>
                            <div>
                                <span className="block text-[10px] font-bold uppercase tracking-widest text-white/40">Address</span>
                                <span className="text-sm text-white/90">{activeLocation.address}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group cursor-pointer">
                            <div className="p-2 rounded-full bg-white/5 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                                <Phone size={16} />
                            </div>
                            <div>
                                <span className="block text-[10px] font-bold uppercase tracking-widest text-white/40">Contact</span>
                                <span className="text-sm text-white/90">{activeLocation.phone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 border border-white/20 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black">
                            <Navigation size={14} /> Directions
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-[#D4AF37] py-4 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-white">
                            <Calendar size={14} /> Book Table
                        </button>
                    </div>

                </div>
            </motion.div>

        </div>
      </div>
    </main>
  );
}

// --- LIVE CLOCK COMPONENT ---
// Ticks every second and formats time for the specific timezone
const LiveClock = ({ timezone }: { timezone: string }) => {
    const [time, setTime] = useState("");

    useEffect(() => {
        // Update immediately
        const updateTime = () => {
            const now = new Date();
            const timeString = new Intl.DateTimeFormat("en-US", {
                timeZone: timezone,
                hour: "2-digit",
                minute: "2-digit",
                // second: "2-digit", // Optional: remove second for cleaner look
                hour12: false,
            }).format(now);
            setTime(timeString);
        };
        
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [timezone]);

    return (
        <div className="text-right">
             <div className="flex items-center gap-2 justify-end text-[#D4AF37] animate-pulse">
                <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_red]" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Live</span>
             </div>
             <div className="font-mono text-4xl text-white font-bold tracking-tighter">
                {time}
             </div>
        </div>
    );
};