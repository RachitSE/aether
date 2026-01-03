"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";

// --- CONFIGURATION ---
const PLANS = [
  {
    id: "alchemist",
    title: "The Alchemist",
    subtitle: "Rotating Single Origins",
    desc: "A tour of the unknown. We ship a different rare micro-lot every cycle.",
    priceMultiplier: 1.25,
    tag: "Adventurous"
  },
  {
    id: "anchor",
    title: "The Anchor",
    subtitle: "Signature House Blends",
    desc: "Engineered consistency. Our award-winning Voidwalker blend.",
    priceMultiplier: 1.0,
    tag: "Comfort"
  },
];

// Added particleSize config for the physics engine
const GRINDS = [
  { id: "whole", label: "Whole Bean", desc: "Intact", particleSize: 5.5, color: ["#6F4E37", "#4B3621"] },
  { id: "french", label: "French Press", desc: "Coarse Salt", particleSize: 4, color: ["#8B5A2B", "#6F4E37"] },
  { id: "filter", label: "Pour Over", desc: "Sea Sand", particleSize: 2.5, color: ["#A07855", "#8B5A2B"] },
  { id: "espresso", label: "Espresso", desc: "Fine Flour", particleSize: 1.5, color: ["#C4A484", "#A07855"] },
];

const VOLUMES = [
  { id: "250", label: "250g", priceBase: 22, particleCount: 200 },
  { id: "500", label: "500g", priceBase: 40, particleCount: 400 },
  { id: "1000", label: "1kg", priceBase: 75, particleCount: 800 },
];

const FREQUENCIES = [
  { id: "7", label: "Weekly", discount: 0.15 },
  { id: "14", label: "Bi-Weekly", discount: 0.10 },
  { id: "30", label: "Monthly", discount: 0.05 },
];

export default function SubscriptionPage() {
  const [plan, setPlan] = useState(PLANS[0]);
  const [grind, setGrind] = useState(GRINDS[0]);
  const [volume, setVolume] = useState(VOLUMES[0]);
  const [frequency, setFrequency] = useState(FREQUENCIES[1]);

  // Price Logic
  const basePrice = volume.priceBase * plan.priceMultiplier;
  const discountAmount = basePrice * frequency.discount;
  const finalPrice = basePrice - discountAmount;

  return (
    <main className="min-h-screen bg-[#050505] text-[#E5E5E5] selection:bg-[#D4AF37] selection:text-black">
      <Navbar />

      <div className="mx-auto max-w-[1400px] px-6 pt-32 pb-24 lg:px-12">
        
        {/* HEADER */}
        <div className="mb-20">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#D4AF37]">
              Calibration
          </span>
          <h1 className="mt-2 font-serif text-5xl md:text-7xl text-[#E5E5E5]">
              The Protocol
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-24 lg:grid-cols-12">
          
          {/* --- LEFT: CONTROLS (Span 7) --- */}
          <div className="space-y-24 lg:col-span-7">
            
            {/* 1. PROFILE */}
            <section>
                <StepHeader number="01" title="Select Profile" />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {PLANS.map((p) => (
                        <button 
                            key={p.id}
                            onClick={() => setPlan(p)}
                            className={`group relative flex flex-col items-start rounded-sm border p-8 text-left transition-all duration-300 ${
                                plan.id === p.id 
                                ? "border-[#D4AF37] bg-[#D4AF37]/5" 
                                : "border-white/10 bg-[#111] hover:border-white/30"
                            }`}
                        >
                            <div className="mb-4 flex w-full justify-between">
                                <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${plan.id === p.id ? "bg-[#D4AF37] text-black" : "bg-white/10 text-white/50"}`}>
                                    {p.tag}
                                </span>
                                {plan.id === p.id && <Check size={16} className="text-[#D4AF37]" />}
                            </div>
                            <h4 className="font-serif text-2xl text-[#E5E5E5]">{p.title}</h4>
                            <p className="mt-4 text-sm leading-relaxed text-white/60">{p.desc}</p>
                        </button>
                    ))}
                </div>
            </section>

            {/* 2. MASS (PHYSICS SIMULATION) */}
            <section>
                <StepHeader number="02" title="Weigh Output" />
                
                {/* THE PHYSICS CANVAS */}
                <div className="relative mb-8 h-96 w-full overflow-hidden rounded-sm border border-white/10 bg-[#0A0A0A] shadow-2xl">
                    
                    {/* The Simulation */}
                    <PhysicsScale 
                        targetCount={volume.particleCount} 
                        grindType={grind} 
                    />
                    
                    {/* Floating HUD Display (Glassmorphism) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/10 h-32 w-32 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1">Target</span>
                         <div className="flex items-baseline text-white">
                             <Counter value={parseInt(volume.id)} />
                             <span className="ml-1 text-sm text-white/50">g</span>
                         </div>
                    </div>

                    {/* Scale Base Visual */}
                    <div className="absolute bottom-0 w-full h-2 bg-gradient-to-t from-[#222] to-transparent border-t border-white/5" />
                </div>

                {/* Controls */}
                <div className="grid grid-cols-3 gap-4">
                    {VOLUMES.map((v) => (
                        <button
                            key={v.id}
                            onClick={() => setVolume(v)}
                            className={`flex flex-col items-center justify-center py-4 rounded-sm border transition-all ${
                                volume.id === v.id
                                ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                                : "border-white/10 text-white hover:bg-white/5"
                            }`}
                        >
                            <span className="text-xl font-bold font-serif">{v.label}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* 3. GRIND */}
            <section>
                <StepHeader number="03" title="Calibrate Grind" />
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {GRINDS.map((g) => (
                        <button
                            key={g.id}
                            onClick={() => setGrind(g)}
                            className={`group relative overflow-hidden rounded-sm border p-4 text-center transition-all ${
                                grind.id === g.id
                                ? "border-[#D4AF37]"
                                : "border-white/10 hover:border-white/30"
                            }`}
                        >
                            <span className={`block text-sm font-bold ${grind.id === g.id ? "text-white" : "text-white/60"}`}>
                                {g.label}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-white/30">
                                {g.desc}
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            {/* 4. CADENCE */}
            <section>
                <StepHeader number="04" title="Cadence" />
                <div className="flex flex-col gap-3">
                    {FREQUENCIES.map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setFrequency(f)}
                            className={`flex items-center justify-between rounded-sm px-6 py-4 border transition-all ${
                                frequency.id === f.id
                                ? "border-[#D4AF37] bg-[#D4AF37]/5"
                                : "border-white/10 bg-[#111] hover:border-white/30"
                            }`}
                        >
                            <span className={`font-medium ${frequency.id === f.id ? "text-white" : "text-white/60"}`}>Every {f.label}</span>
                            <span className={`text-xs font-bold px-2 py-1 rounded-sm ${frequency.id === f.id ? "bg-[#D4AF37] text-black" : "bg-white/10 text-white/50"}`}>
                                Save {f.discount * 100}%
                            </span>
                        </button>
                    ))}
                </div>
            </section>

          </div>

          {/* --- RIGHT: MANIFEST (Sticky) --- */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
                <div className="rounded-sm border border-white/10 bg-[#0A0A0A] p-8 shadow-2xl">
                    <h3 className="mb-8 font-serif text-3xl text-[#E5E5E5]">Manifest</h3>
                    
                    <div className="space-y-4 text-sm">
                        <SummaryRow label="Profile" value={plan.title} />
                        <SummaryRow label="Mass" value={volume.label} />
                        <SummaryRow label="Grind" value={grind.label} />
                        <SummaryRow label="Cadence" value={`Every ${frequency.label}`} />
                    </div>

                    <div className="my-8 h-[1px] w-full bg-white/10" />

                    <div className="flex items-end justify-between">
                        <div>
                            <span className="block text-[10px] uppercase tracking-widest text-white/40">Total / Shipment</span>
                        </div>
                        <div className="font-serif text-5xl text-white">
                            ${finalPrice.toFixed(2)}
                        </div>
                    </div>

                    <div className="mt-2 text-right text-xs text-[#D4AF37]">
                        {frequency.discount * 100}% Frequency Discount Applied
                    </div>

                    <button className="group mt-8 flex w-full items-center justify-center gap-2 rounded-sm bg-[#D4AF37] py-5 text-sm font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-white">
                        <span>Initialize Payment</span>
                        <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

// --- HELPER COMPONENTS ---

const StepHeader = ({ number, title }: { number: string, title: string }) => (
    <div className="mb-8 flex items-center gap-4 border-b border-white/10 pb-4">
        <span className="font-mono text-lg text-[#D4AF37]">{number}</span>
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
            {title}
        </h3>
    </div>
);

const SummaryRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex justify-between border-b border-white/5 pb-3 last:border-0">
        <span className="text-white/40">{label}</span>
        <span className="text-white font-medium text-right">{value}</span>
    </div>
);

// --- PHYSICS ENGINE COMPONENT ---
const PhysicsScale = ({ targetCount, grindType }: { targetCount: number, grindType: any }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<any[]>([]);
    const animationFrame = useRef<number>(0);
    const spawnedCount = useRef(0);
    const pileHeights = useRef<number[]>([]); 

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Reset
        particles.current = [];
        spawnedCount.current = 0;
        
        const width = canvas.width = canvas.offsetWidth;
        const height = canvas.height = canvas.offsetHeight;
        pileHeights.current = new Array(width).fill(height);

        // Spawn rate varies by grind type to keep visual density pleasing
        const spawnRate = grindType.id === 'espresso' ? 8 : 3; 

        const loop = () => {
            ctx.clearRect(0, 0, width, height);

            // 1. SPAWN
            if (spawnedCount.current < targetCount) {
                for (let i = 0; i < spawnRate; i++) {
                    if (spawnedCount.current >= targetCount) break;
                    particles.current.push({
                        x: width / 2 + (Math.random() - 0.5) * 40, // Wider spawn
                        y: -10,
                        vx: (Math.random() - 0.5) * 2, 
                        vy: Math.random() * 2 + 2, // Initial downward velocity
                        settled: false,
                        // Pick random color from grind config
                        color: grindType.color[Math.floor(Math.random() * grindType.color.length)],
                        size: grindType.particleSize * (Math.random() * 0.5 + 0.8) // Slight size variation
                    });
                    spawnedCount.current++;
                }
            }

            // 2. PHYSICS
            particles.current.forEach(p => {
                if (p.settled) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.fill();
                    return;
                }

                // Gravity & Friction
                p.vy += 0.2;
                p.x += p.vx;
                p.y += p.vy;

                // Wall Bounce
                if (p.x < 0 || p.x > width) p.vx *= -0.5;

                // PILE COLLISION
                const xIndex = Math.floor(p.x);
                if (xIndex >= 0 && xIndex < width) {
                    const groundLevel = pileHeights.current[xIndex];
                    
                    if (p.y + p.size >= groundLevel) {
                        // Settle
                        p.y = groundLevel - p.size;
                        p.settled = true;
                        
                        // Grow Pile
                        const spread = Math.ceil(p.size * 2);
                        for(let i = -spread; i <= spread; i++) {
                             if (pileHeights.current[xIndex + i] !== undefined) {
                                 // Add height (subtract Y) based on particle size and spread
                                 pileHeights.current[xIndex + i] -= (p.size * 0.8); 
                             }
                        }
                    }
                }
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });

            animationFrame.current = requestAnimationFrame(loop);
        };

        loop();
        return () => cancelAnimationFrame(animationFrame.current);
    }, [targetCount, grindType]); // Re-run when volume OR grind changes

    return <canvas ref={canvasRef} className="h-full w-full block" />;
};

// Animated Number
function Counter({ value }: { value: number }) {
  const motionValue = useMotionValue(0);
  const roundedValue = useTransform(motionValue, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 1.5, ease: "circOut" });
    return controls.stop;
  }, [value, motionValue]);

  useEffect(() => {
    const unsubscribe = roundedValue.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [roundedValue]);

  return <span className="font-serif text-5xl text-white tabular-nums">{displayValue}</span>;
}