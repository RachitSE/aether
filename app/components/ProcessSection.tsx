"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Bean, Flame, ThermometerSun, CupSoda, Droplets } from "lucide-react";

// --- RELIABLE DATA ---
const processes = [
  {
    id: "01",
    title: "The Source",
    subtitle: "Origin Selection",
    description: "We bypass brokers. We trek to the volcanic ridges of Volcán Barú to hand-select Gesha micro-lots that exist at the edge of cultivable altitude.",
    // Farmer holding red cherries (Verified)
    image: "https://images.unsplash.com/photo-1552346989-e069318e20a5?auto=format&fit=crop&q=80&w=1000",
    icon: <Bean className="h-6 w-6" />,
  },
  {
    id: "02",
    title: "Thermal Shock",
    subtitle: "Roasting Physics",
    description: "Roasted in a cast-iron Probat. We manipulate the Rate of Rise (RoR) to caramelize sugars without carbonizing the cellulose structure.",
    // Roasting Machine / Drum (Verified)
    image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=1000",
    icon: <Flame className="h-6 w-6" />,
  },
  {
    id: "03",
    title: "Sensory Audit",
    subtitle: "Quality Control",
    description: "Blind cupping protocols. Laser diffraction particle analysis. If the TDS yield isn't within 0.01% of our target, the batch is discarded.",
    // NEW LINK: Barista inspecting coffee quality (High Reliability)
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1000",
    icon: <ThermometerSun className="h-6 w-6" />,
  },
  {
    id: "04",
    title: "Liquid Gold",
    subtitle: "Extraction",
    description: "The final alchemy. We calibrate water mineral content to match the bean's density, resulting in a cup of unparalleled clarity and viscosity.",
    // Pour Over Extraction (Verified)
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=1000",
    icon: <Droplets className="h-6 w-6" />,
  },
];
export const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative bg-aether-black py-32 md:py-64 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-64 -mt-64 h-[800px] w-[800px] rounded-full bg-aether-gold/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -ml-64 -mb-64 h-[800px] w-[800px] rounded-full bg-aether-gold/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32 text-center"
        >
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-aether-gold">The Protocol</span>
            <h2 className="mt-6 font-serif text-5xl md:text-7xl text-aether-white">
                From Soil to <span className="text-aether-gold italic">Soul</span>
            </h2>
        </motion.div>

        <div className="relative">
            {/* CENTRAL BEAM LINE */}
            <div className="absolute left-[20px] top-0 bottom-0 w-[2px] bg-aether-white/10 md:left-1/2 md:-ml-[1px]">
                <motion.div 
                    style={{ scaleY, transformOrigin: "top" }}
                    className="w-full h-full bg-gradient-to-b from-aether-gold via-yellow-500 to-aether-gold shadow-[0_0_20px_2px_rgba(212,175,55,0.5)]"
                />
            </div>

            {/* Steps Container */}
            <div className="flex flex-col gap-24 md:gap-48">
                {processes.map((process, index) => (
                    <TimelineCard 
                        key={process.id} 
                        data={process} 
                        index={index} 
                        isEven={index % 2 === 0} 
                    />
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

// --- INTERNAL CARD COMPONENT ---
const TimelineCard = ({ data, index, isEven }: { data: any; index: number; isEven: boolean }) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`relative flex flex-col md:flex-row items-center gap-12 ${
                isEven ? "md:flex-row-reverse" : ""
            }`}
        >
            {/* Center Node (The glowing dot) */}
            <div className="absolute left-[20px] md:left-1/2 top-0 md:top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-aether-gold bg-aether-black shadow-[0_0_15px_rgba(212,175,55,0.8)] z-10" />

            {/* Text Side */}
            <div className={`w-full pl-16 md:w-1/2 md:pl-0 ${isEven ? "md:pr-24 text-left md:text-right" : "md:pl-24 text-left"}`}>
                <div className={`mb-4 flex items-center gap-3 ${isEven ? "md:flex-row-reverse" : ""}`}>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-aether-white/5 text-aether-gold">
                        {data.icon}
                    </span>
                    <span className="font-mono text-sm text-aether-gold/60">{data.id}</span>
                </div>
                <h3 className="mb-2 font-serif text-4xl text-aether-white">{data.title}</h3>
                <span className="mb-6 block text-xs font-bold uppercase tracking-widest text-aether-white/40">{data.subtitle}</span>
                <p className="text-lg leading-relaxed text-aether-white/70">
                    {data.description}
                </p>
            </div>

            {/* Image Side */}
            <div className="w-full pl-12 md:w-1/2 md:pl-0">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-aether-white/10 group">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 h-4 w-4 border-l border-t border-aether-gold z-20" />
                    <div className="absolute bottom-0 right-0 h-4 w-4 border-r border-b border-aether-gold z-20" />
                    
                    {/* Image Hover Scale */}
                    <motion.img 
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                        src={data.image} 
                        alt={data.title} 
                        className="h-full w-full object-cover opacity-80 transition-opacity duration-500 hover:opacity-100"
                    />
                    
                    {/* Scanline Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
                </div>
            </div>

        </motion.div>
    );
};