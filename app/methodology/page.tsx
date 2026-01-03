"use client";

import React, { useState, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { FlaskConical, Timer, Thermometer, Scale, Droplets, Download, Activity, Scan, Settings2 } from "lucide-react";
import Navbar from "../components/Navbar";

// --- DATA ---
const METHODS = [
  {
    id: "v60",
    name: "V60 Pour Over",
    ratio: 16,
    grind: "Medium-Fine",
    temp: 96,
    timeBase: 180,
    desc: "Percolation method. High clarity, tea-like body.",
    steps: ["Bloom (2x weight)", "Pour to 60%", "Pour to 100%", "Draw down"],
    stats: { acidity: 90, body: 40, clarity: 100, sweetness: 70 }
  },
  {
    id: "aeropress",
    name: "AeroPress",
    ratio: 14,
    grind: "Medium",
    temp: 90,
    timeBase: 120,
    desc: "Immersion + Pressure. Versatile, full body.",
    steps: ["Add Water", "Stir (10s)", "Steep (1min)", "Press (30s)"],
    stats: { acidity: 60, body: 70, clarity: 60, sweetness: 80 }
  },
  {
    id: "french",
    name: "French Press",
    ratio: 15,
    grind: "Coarse",
    temp: 98,
    timeBase: 240,
    desc: "Full Immersion. Heavy body, rich texture.",
    steps: ["Add Water", "Stir Crust", "Steep (4min)", "Plunge"],
    stats: { acidity: 30, body: 100, clarity: 20, sweetness: 85 }
  },
  {
    id: "espresso",
    name: "Espresso",
    ratio: 2, 
    grind: "Fine",
    temp: 93,
    timeBase: 30,
    desc: "High Pressure. Syrupy, intense concentration.",
    steps: ["Distribute", "Tamp", "Pre-infuse", "Extract"],
    stats: { acidity: 80, body: 95, clarity: 50, sweetness: 90 }
  }
];

export default function MethodologyPage() {
  const [selectedMethod, setSelectedMethod] = useState(METHODS[0]);
  const [waterVolume, setWaterVolume] = useState(300);
  
  // Guard Rail for Slider State
  useEffect(() => {
    const isEspresso = selectedMethod.id === 'espresso';
    if (isEspresso) {
      if (waterVolume > 60 || waterVolume < 20) setWaterVolume(40); 
    } else {
      if (waterVolume < 200) setWaterVolume(300); 
    }
  }, [selectedMethod]); 

  // -- MATH --
  const isEspresso = selectedMethod.id === 'espresso';
  const coffeeDose = waterVolume / selectedMethod.ratio;
  
  const totalTimeSeconds = selectedMethod.timeBase + (waterVolume > 500 ? 30 : 0);
  const minutes = Math.floor(totalTimeSeconds / 60);
  const seconds = totalTimeSeconds % 60;

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#E5E5E5] selection:bg-[#D4AF37] selection:text-black">
      
      {/* --- ADVANCED PRINT ENGINE --- */}
      <style jsx global>{`
        @media print {
          @page { 
            size: A4 portrait; 
            margin: 0; 
          }
          body { 
            background: white; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
          }
          /* Hide everything by default */
          body * { visibility: hidden; }
          
          /* Reveal only the blueprint and its children */
          #printable-blueprint, #printable-blueprint * { 
            visibility: visible; 
          }

          #printable-blueprint {
            position: fixed;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            margin: 0;
            padding: 40px !important; /* Proper padding for A4 */
            border-radius: 0 !important;
            box-shadow: none !important;
            background: #F0F0F0 !important; /* Slight off-white paper tone */
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          /* Force text colors for print */
          .print-text-black { color: #000 !important; }
          .print-border-black { borderColor: #000 !important; }
          
          /* Hide non-print UI inside the card */
          .no-print { display: none !important; }
          
          /* Show print-only elements */
          .only-print { display: block !important; }
        }
      `}</style>

      <div className="print:hidden">
        <Navbar />
      </div>

      <div className="mx-auto max-w-[1600px] px-6 pt-32 pb-24 lg:px-12 print:p-0">
        
        {/* HEADER (Screen Only) */}
        <div className="mb-20 flex flex-col justify-between gap-8 border-b border-white/5 pb-12 md:flex-row md:items-end print:hidden">
          <div>
             <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#D4AF37]">
                Sector 04
             </span>
             <h1 className="mt-4 font-serif text-5xl md:text-7xl text-[#E5E5E5]">
                Extraction Lab
             </h1>
          </div>
          <Activity className="h-10 w-10 text-white/20" />
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          
          {/* --- LEFT: CONTROLS (Hidden on Print) --- */}
          <div className="flex flex-col gap-12 lg:col-span-7 print:hidden">
            {/* METHOD SELECTOR */}
            <section>
                <SectionLabel icon={<Settings2 size={14} />} label="Select Apparatus" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {METHODS.map((m) => (
                        <button
                            key={m.id}
                            onClick={() => setSelectedMethod(m)}
                            className={`group relative overflow-hidden rounded-sm border p-6 text-left transition-all duration-300 ${
                                selectedMethod.id === m.id
                                ? "border-[#D4AF37] bg-[#D4AF37]/5"
                                : "border-white/10 bg-[#111] hover:border-white/30"
                            }`}
                        >
                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <h4 className={`font-serif text-xl ${selectedMethod.id === m.id ? "text-[#D4AF37]" : "text-white"}`}>
                                        {m.name}
                                    </h4>
                                    <span className="text-xs text-white/40">{m.desc}</span>
                                </div>
                                {selectedMethod.id === m.id && (
                                    <motion.div layoutId="active-dot" className="h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* RADAR & SLIDER */}
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                <section className="relative aspect-square w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-6">
                    <FlavorRadar stats={selectedMethod.stats} />
                </section>

                <section className="flex flex-col justify-between rounded-sm border border-white/10 bg-[#0A0A0A] p-8">
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-[10px] uppercase tracking-widest text-white/30">Variable</span>
                            <span className="text-[10px] uppercase tracking-widest text-white/30">{isEspresso ? "Yield" : "Water"}</span>
                        </div>
                        <div className="text-center mb-12">
                            <span className="font-mono text-6xl font-bold text-white">
                                {waterVolume}
                            </span>
                            <span className="text-xl text-[#D4AF37] ml-2">ml</span>
                        </div>
                    </div>
                    {/* Slider Input */}
                    <input
                        type="range"
                        min={isEspresso ? 20 : 200}
                        max={isEspresso ? 60 : 1000}
                        step={isEspresso ? 1 : 10}
                        value={waterVolume}
                        onChange={(e) => setWaterVolume(Number(e.target.value))}
                        className="w-full accent-[#D4AF37]"
                    />
                </section>
            </div>
          </div>

          {/* --- RIGHT: THE BLUEPRINT --- */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 perspective-1000">
                <TiltCard>
                    <div id="printable-blueprint" className="relative h-full overflow-hidden rounded-sm bg-[#E5E5E5] text-[#111] shadow-2xl transition-transform duration-100 print:shadow-none print:h-full print:w-full">
                        
                        {/* Print-Only Branding */}
                        <div className="only-print hidden mb-8 border-b-2 border-black pb-4">
                            <div className="flex justify-between items-end">
                                <h1 className="font-serif text-4xl font-bold tracking-tighter">Aether Brewing.</h1>
                                <span className="font-mono text-xs">OFFICIAL CALIBRATION SHEET</span>
                            </div>
                        </div>

                        {/* Paper Texture (Visible on Print) */}
                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none print:opacity-10" />

                        {/* Top Bar */}
                        <div className="bg-[#111] p-4 text-white flex justify-between items-center relative z-20 print:bg-black print:text-white print:mb-8">
                            <span className="font-mono text-xs text-[#D4AF37]">RECIPE_ID: {Math.floor(coffeeDose * 100)}</span>
                            <Scan size={16} className="text-white/50" />
                        </div>

                        <div className="p-8 relative z-10 print:p-0">
                            
                            {/* Main Title Area */}
                            <div className="flex justify-between items-start mb-12 border-b-2 border-black pb-6 print:mb-8">
                                <div>
                                    <h2 className="font-serif text-4xl font-bold uppercase leading-none print:text-5xl">{selectedMethod.name}</h2>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 mt-2 block print:text-black/60">Brew Architecture v2.0</span>
                                </div>
                                <div className="h-16 w-16 border-2 border-black rounded-full flex items-center justify-center print:border-4">
                                    <FlaskConical size={24} className="print:w-8 print:h-8" />
                                </div>
                            </div>

                            {/* Big Stats */}
                            <div className="grid grid-cols-2 gap-8 mb-12 print:mb-8 print:gap-12">
                                <StatBox label="Dose (In)" value={`${coffeeDose.toFixed(1)}g`} icon={<Scale size={14}/>} />
                                <StatBox label="Water (Out)" value={`${waterVolume}ml`} icon={<Droplets size={14}/>} />
                            </div>

                            {/* Secondary Grid */}
                            <div className="flex justify-between bg-black/5 p-4 rounded-sm mb-12 border border-black/5 print:bg-transparent print:border-y-2 print:border-x-0 print:border-black print:rounded-none print:py-6">
                                <div className="text-center">
                                    <span className="block text-[9px] font-bold uppercase tracking-widest text-black/40 mb-1 print:text-black">Ratio</span>
                                    <span className="font-bold font-mono text-lg">1:{selectedMethod.ratio}</span>
                                </div>
                                <div className="w-[1px] h-8 bg-black/10 print:bg-black" />
                                <div className="text-center">
                                    <span className="block text-[9px] font-bold uppercase tracking-widest text-black/40 mb-1 print:text-black">Temp</span>
                                    <span className="font-bold font-mono text-lg">{selectedMethod.temp}°C</span>
                                </div>
                                <div className="w-[1px] h-8 bg-black/10 print:bg-black" />
                                <div className="text-center">
                                    <span className="block text-[9px] font-bold uppercase tracking-widest text-black/40 mb-1 print:text-black">Total Time</span>
                                    <span className="font-bold font-mono text-[#B8860B] text-lg print:text-black">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                                </div>
                            </div>

                            {/* Steps */}
                            <div>
                                <span className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-4 print:text-black print:mb-6">Execution Sequence</span>
                                <div className="space-y-3 relative print:space-y-6">
                                    <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-black/10 print:bg-black/20" />
                                    {selectedMethod.steps.map((step, i) => (
                                        <div key={i} className="flex items-center gap-4 relative z-10">
                                            <div className="h-6 w-6 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center border-[3px] border-[#E5E5E5] print:border-[#F0F0F0] print:h-8 print:w-8 print:text-xs">
                                                {i + 1}
                                            </div>
                                            <span className="font-mono text-sm font-bold uppercase text-black/80 print:text-black print:text-lg">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        {/* Print Footer */}
                        <div className="only-print hidden absolute bottom-0 w-full border-t border-black p-4">
                            <div className="flex justify-between text-[10px] font-mono uppercase">
                                <span>Generated via Aether Protocol</span>
                                <span>{new Date().toLocaleDateString()}</span>
                            </div>
                        </div>

                        {/* Export Button (No Print) */}
                        <div 
                            onClick={handlePrint}
                            className="bg-[#D4AF37] p-3 text-center cursor-pointer hover:bg-[#b5952f] transition-colors flex items-center justify-center gap-2 no-print"
                        >
                            <Download size={14} className="text-black" />
                            <span className="text-xs font-bold uppercase tracking-widest text-black">Export Blueprint</span>
                        </div>

                    </div>
                </TiltCard>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

// --- SUBCOMPONENTS ---

const SectionLabel = ({ icon, label }: any) => (
    <div className="mb-6 flex items-center gap-3 text-[#D4AF37]">
        {icon}
        <span className="text-xs font-bold uppercase tracking-[0.2em]">{label}</span>
    </div>
);

const StatBox = ({ label, value, icon }: any) => (
    <div className="relative group">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2 print:text-black/60">
            {icon} {label}
        </div>
        <div className="font-mono text-5xl font-bold tracking-tighter text-black group-hover:text-[#B8860B] transition-colors print:text-6xl print:text-black">
            {value}
        </div>
        <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-black/20 group-hover:w-full group-hover:bg-[#B8860B] transition-all duration-500 print:w-full print:bg-black" />
    </div>
);

// Tilt Card Wrapper
const TiltCard = ({ children }: { children: React.ReactNode }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
};

// Flavor Radar Chart
const FlavorRadar = ({ stats }: { stats: { acidity: number, body: number, clarity: number, sweetness: number } }) => {
    const center = 100;
    const scale = 0.8;
    const p1y = center - (stats.acidity * scale); const p1x = center;
    const p2x = center + (stats.body * scale); const p2y = center;
    const p3y = center + (stats.clarity * scale); const p3x = center;
    const p4x = center - (stats.sweetness * scale); const p4y = center;
    const pathData = `M${p1x},${p1y} L${p2x},${p2y} L${p3x},${p3y} L${p4x},${p4y} Z`;

    return (
        <div className="h-full w-full flex items-center justify-center relative">
            <svg viewBox="0 0 200 200" className="w-full h-full max-w-[300px] overflow-visible">
                <circle cx="100" cy="100" r="20" fill="none" stroke="#333" strokeDasharray="4 4" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#333" />
                <line x1="100" y1="20" x2="100" y2="180" stroke="#333" />
                <line x1="20" y1="100" x2="180" y2="100" stroke="#333" />
                <text x="100" y="15" textAnchor="middle" fill="#666" fontSize="8" fontWeight="bold">ACIDITY</text>
                <text x="190" y="102" textAnchor="start" fill="#666" fontSize="8" fontWeight="bold">BODY</text>
                <text x="100" y="195" textAnchor="middle" fill="#666" fontSize="8" fontWeight="bold">CLARITY</text>
                <text x="10" y="102" textAnchor="end" fill="#666" fontSize="8" fontWeight="bold">SWEETNESS</text>
                <motion.path 
                    d={pathData}
                    fill="rgba(212, 175, 55, 0.2)"
                    stroke="#D4AF37"
                    strokeWidth="2"
                    initial={{ d: "M100,100 L100,100 L100,100 L100,100 Z" }}
                    animate={{ d: pathData }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
            </svg>
        </div>
    );
};