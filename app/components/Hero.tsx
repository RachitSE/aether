"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Coffee, Droplets } from "lucide-react";
import { cn } from "../lib/utils"; // Ensure this path matches your utils file

// --- CONFIGURATION ---
const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=2000", // Classic Pour Over
    alt: "Artisan Pour Over",
    subtitle: "The Art of Extraction",
    title: "Precision in Every Pour",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=2000", // Dark Roasted Beans
    alt: "Roasted Beans",
    subtitle: "Single Origin Sourcing",
    title: "Rare Beans. Dark Roasts.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000", // Espresso/Cafe Vibe
    alt: "Espresso Shot",
    subtitle: "Est. 2026 — Kolkata",
    title: "Aether Brewing Co.",
  },
];

const AUTOPLAY_DELAY = 6000; // Time in ms between slides

// --- COMPONENTS ---

const SlideIndicator = ({ active, onClick }: { active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "h-1.5 transition-all duration-500 rounded-full",
      active ? "w-8 bg-aether-gold" : "w-2 bg-white/40 hover:bg-white/80"
    )}
    aria-label="Go to slide"
  />
);

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      
      {/* BACKGROUND SLIDESHOW */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={SLIDES[currentSlide].id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0 h-full w-full"
        >
          {/* Image */}
          <img
            src={SLIDES[currentSlide].image}
            alt={SLIDES[currentSlide].alt}
            className="h-full w-full object-cover"
          />
          
          {/* Overlays for Readability */}
          <div className="absolute inset-0 bg-black/40" /> {/* General Dimmer */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" /> {/* Gradient */}
        </motion.div>
      </AnimatePresence>

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        
        {/* Animated Text Content */}
        <div className="max-w-4xl space-y-8">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide} // Re-animate text on slide change
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    {/* Subtitle / Badge */}
                    <span className="mb-6 inline-block rounded-full border border-aether-gold/30 bg-black/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-aether-gold backdrop-blur-md">
                        {SLIDES[currentSlide].subtitle}
                    </span>

                    {/* Main Title - Clean & Elegant, Not Massive */}
                    <h1 className="font-serif text-5xl font-medium leading-tight tracking-tight text-[#E5E5E5] sm:text-7xl md:text-8xl">
                        {SLIDES[currentSlide].title}
                    </h1>
                </motion.div>
            </AnimatePresence>

            {/* Static Description (Doesn't change with slides) */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mx-auto max-w-xl text-lg font-light leading-relaxed text-gray-200/90"
            >
                We source beans from the edge of the known world and roast them with mathematical precision. Welcome to the new standard.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col items-center justify-center gap-4 sm:flex-row pt-8"
            >
                <button className="group relative flex h-14 w-48 items-center justify-center gap-2 overflow-hidden rounded-sm bg-aether-gold px-6 text-sm font-bold uppercase tracking-widest text-black transition-all hover:bg-white">
                    <span className="relative z-10 flex items-center gap-2">
                        Shop Roast <Coffee size={16} />
                    </span>
                </button>

                <button className="group flex h-14 w-48 items-center justify-center gap-2 rounded-sm border border-white/20 px-6 text-sm font-bold uppercase tracking-widest text-white transition-all hover:border-aether-gold hover:text-aether-gold backdrop-blur-sm">
                    Our Method <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
            </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-3">
            {SLIDES.map((_, index) => (
                <SlideIndicator
                    key={index}
                    active={index === currentSlide}
                    onClick={() => setCurrentSlide(index)}
                />
            ))}
        </div>
      </div>
    </section>
  );
};