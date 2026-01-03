"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, Search } from "lucide-react";
import Navbar from "../components/Navbar";
import { ProductCard } from "../components/ProductCard";
import { products } from "../lib/data";

// Extract unique categories and roasts for filters
const CATEGORIES = Array.from(new Set(products.map((p) => p.category)));
const ROASTS = ["Light", "Medium", "Dark", "Espresso"];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRoast, setSelectedRoast] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchRoast = selectedRoast ? product.roastLevel === selectedRoast : true;
      return matchCategory && matchRoast;
    });
  }, [selectedCategory, selectedRoast]);

  // Clear filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedRoast(null);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#E5E5E5] selection:bg-[#D4AF37] selection:text-black">
      <Navbar />

      {/* --- HEADER SECTION --- */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 border-b border-white/5 overflow-hidden">
        {/* Subtle Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none" />
        
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 max-w-7xl mx-auto"
        >
            <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-[#D4AF37]" />
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#D4AF37]">
                    Inventory
                </span>
            </div>
            <h1 className="font-serif text-6xl md:text-8xl text-[#E5E5E5] tracking-tight">
                The Archive
            </h1>
        </motion.div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
            
            {/* MOBILE FILTER BUTTON */}
            <button 
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden flex items-center justify-between w-full bg-[#111] border border-white/10 p-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:border-[#D4AF37] transition-colors"
            >
                <span className="flex items-center gap-2"><Filter size={16} /> Filter Results</span>
                <span className="bg-[#D4AF37] text-black h-5 w-5 rounded-full flex items-center justify-center text-[10px]">
                    {filteredProducts.length}
                </span>
            </button>

            {/* SIDEBAR FILTERS */}
            <aside className={`
                fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-xl p-8 transition-transform duration-300 lg:relative lg:inset-auto lg:bg-transparent lg:backdrop-blur-none lg:p-0 lg:transform-none lg:w-64 lg:block border-r border-white/10 lg:border-none
                ${isMobileFilterOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}>
                <div className="flex items-center justify-between lg:hidden mb-12">
                    <span className="font-serif text-3xl">Filters</span>
                    <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 border border-white/20 rounded-full"><X size={20} /></button>
                </div>

                <div className="sticky top-32 space-y-16">
                    {/* Categories Group */}
                    <div>
                        <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Category</h3>
                        <div className="flex flex-col items-start gap-2">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                                    className="group relative px-4 py-2 text-sm transition-colors"
                                >
                                    {selectedCategory === cat && (
                                        <motion.div
                                            layoutId="activeCategory"
                                            className="absolute inset-0 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className={`relative z-10 ${selectedCategory === cat ? "text-[#D4AF37] font-bold" : "text-white/60 group-hover:text-white"}`}>
                                        {cat}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Roast Level Group */}
                    <div>
                        <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Roast Profile</h3>
                        <div className="flex flex-col items-start gap-2">
                            {ROASTS.map((roast) => (
                                <button
                                    key={roast}
                                    onClick={() => setSelectedRoast(selectedRoast === roast ? null : roast)}
                                    className="group relative px-4 py-2 text-sm transition-colors"
                                >
                                    {selectedRoast === roast && (
                                        <motion.div
                                            layoutId="activeRoast"
                                            className="absolute inset-0 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className={`relative z-10 ${selectedRoast === roast ? "text-[#D4AF37] font-bold" : "text-white/60 group-hover:text-white"}`}>
                                        {roast}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Reset Button */}
                    <AnimatePresence>
                        {(selectedCategory || selectedRoast) && (
                            <motion.button 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                onClick={clearFilters}
                                className="w-full py-3 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 border border-red-900/30 hover:bg-red-900/10 rounded-sm transition-all"
                            >
                                Clear Active Filters
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </aside>

            {/* PRODUCT GRID */}
            <div className="flex-1">
                <div className="min-h-[50vh]">
                    {filteredProducts.length === 0 ? (
                        <div className="flex h-96 flex-col items-center justify-center border border-dashed border-white/10 bg-white/[0.02] rounded-lg">
                            <Search className="h-12 w-12 text-white/20 mb-4" />
                            <p className="text-lg font-serif text-[#E5E5E5]">No specimens found.</p>
                            <p className="text-sm text-white/40 mt-2">Try adjusting your calibration.</p>
                            <button onClick={clearFilters} className="mt-6 text-[#D4AF37] underline text-sm hover:text-white">Clear Filters</button>
                        </div>
                    ) : (
                        <motion.div 
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
                        >
                            <AnimatePresence>
                                {filteredProducts.map((product) => (
                                    <motion.div
                                        layout
                                        key={product.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                                    >
                                        {/* w-full ensures it fills the grid column */}
                                        <ProductCard product={product} className="w-full" />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>

        </div>
      </div>
    </main>
  );
}