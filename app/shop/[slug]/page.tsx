"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Truck, ShieldCheck, Thermometer, Box } from "lucide-react";
import Navbar from "../../components/Navbar";
import { products } from "../../lib/data";
import { useCart } from "../../context/CartContext";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  // Find product matching the slug
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#050505] text-white">
        <div className="text-center">
            <h1 className="font-serif text-4xl">404</h1>
            <p className="mt-2 text-white/50">Specimen not found in archive.</p>
            <button onClick={() => router.back()} className="mt-6 text-[#D4AF37] underline">Return</button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-[#E5E5E5]">
      <Navbar />

      <div className="relative mx-auto max-w-[1400px] pt-32 px-6 lg:px-12 pb-24">
        
        {/* Breadcrumb / Back */}
        <button 
            onClick={() => router.back()} 
            className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-[#D4AF37] transition-colors"
        >
            <ArrowLeft size={16} /> Back to Archive
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* LEFT: Sticky Image */}
            <div className="relative">
                <div className="sticky top-32">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative aspect-square w-full overflow-hidden rounded-sm border border-white/5 bg-[#121212]"
                    >
                        <Image 
                            src={product.image} 
                            alt={product.name} 
                            fill 
                            className="object-cover"
                            priority
                        />
                        {/* Grain Overlay */}
                        <div className="absolute inset-0 opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/noise.png')] mix-blend-overlay pointer-events-none" />
                    </motion.div>

                    {/* Quick Specs Grid under image (Desktop) */}
                    <div className="mt-8 hidden grid-cols-3 gap-4 lg:grid">
                        {Object.entries(product.specs || {}).map(([key, value]) => (
                            <div key={key} className="border-t border-white/10 pt-4">
                                <span className="block text-[10px] font-bold uppercase tracking-widest text-white/40">{key}</span>
                                <span className="mt-1 block font-mono text-sm text-[#D4AF37]">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT: Product Details */}
            <div className="flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="mb-4 flex items-center gap-3">
                        <span className="rounded-full border border-[#D4AF37] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                            {product.category}
                        </span>
                        {product.isLimited && (
                            <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" /> Limited Lot
                            </span>
                        )}
                    </div>

                    <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] text-[#E5E5E5] mb-6">
                        {product.name}
                    </h1>

                    <div className="flex items-center justify-between border-y border-white/10 py-6 mb-8">
                        <span className="font-mono text-3xl text-[#D4AF37]">${product.price}</span>
                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/50">
                           {product.category !== "Equipment" && (
                             <span className="flex items-center gap-2">
                                <Thermometer size={14} /> Roast: {product.roastLevel}
                             </span>
                           )}
                           <span className="flex items-center gap-2">
                                <Box size={14} /> In Stock
                           </span>
                        </div>
                    </div>

                    <p className="text-lg leading-relaxed text-white/70 mb-12 font-light">
                        {product.description}
                    </p>

                    {/* Tasting Notes */}
                    <div className="mb-12">
                        <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">Tasting Profile</h3>
                        <div className="flex flex-wrap gap-3">
                            {product.tastingNotes.map((note) => (
                                <span key={note} className="bg-white/5 px-4 py-2 text-sm text-[#E5E5E5] border border-white/5 rounded-sm">
                                    {note}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Specs for Mobile (shown here if lg hidden) */}
                    <div className="lg:hidden grid grid-cols-2 gap-6 mb-12 border-t border-white/10 pt-8">
                        {Object.entries(product.specs || {}).map(([key, value]) => (
                            <div key={key}>
                                <span className="block text-[10px] font-bold uppercase tracking-widest text-white/40">{key}</span>
                                <span className="mt-1 block font-mono text-sm text-[#D4AF37]">{value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="sticky bottom-6 z-20 flex flex-col gap-4 bg-[#050505]/90 backdrop-blur-md p-4 lg:static lg:bg-transparent lg:p-0">
                        <button 
                            onClick={() => addToCart(product)}
                            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-sm bg-[#D4AF37] py-5 text-sm font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-white"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Acquire <ShoppingBag size={16} />
                            </span>
                        </button>
                        
                        <p className="text-center text-[10px] text-white/30 uppercase tracking-widest flex items-center justify-center gap-4 mt-2">
                            <span className="flex items-center gap-1"><Truck size={12} /> Free Global Shipping</span>
                            <span className="flex items-center gap-1"><ShieldCheck size={12} /> Freshness Guaranteed</span>
                        </p>
                    </div>

                </motion.div>
            </div>
        </div>
      </div>
    </main>
  );
}