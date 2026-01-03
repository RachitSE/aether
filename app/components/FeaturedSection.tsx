"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { products } from '../lib/data'; // Fixed Import
import { ProductCard } from './ProductCard'; // Fixed Import

export default function FeaturedSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="shop" className="bg-[#0a0a0a] py-32 border-t border-white/5 overflow-hidden">
      
      {/* Section Header */}
      <div className="container mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-bold"
          >
            Available Specimens
          </motion.span>
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-4 font-serif text-4xl md:text-6xl text-[#E5E5E5] leading-none"
          >
            The Curated Vault
          </motion.h2>
        </div>
        
        {/* Decorative Line */}
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-8 hidden md:block" />
        
        <button className="group flex items-center gap-2 text-sm text-[#888] hover:text-[#D4AF37] transition-colors uppercase tracking-widest">
          View All Compounds
          <span className="block h-[1px] w-4 bg-[#888] group-hover:bg-[#D4AF37] transition-colors" />
        </button>
      </div>

      {/* Horizontal Scroll Container with Drag */}
      <div 
        ref={containerRef}
        className="relative w-full pl-6 md:pl-12"
      >
        <motion.div 
            className="flex gap-8 w-max cursor-grab active:cursor-grabbing pb-12 pr-12"
            drag="x"
            dragConstraints={containerRef} // Limits drag
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          
          {/* "More" Card */}
          <div className="flex h-[480px] w-[200px] items-center justify-center border border-white/10 hover:border-[#D4AF37] transition-colors cursor-pointer group">
              <span className="text-xs uppercase tracking-widest text-white/40 group-hover:text-[#D4AF37] transition-colors rotate-90">
                View Full Archive
              </span>
          </div>
        </motion.div>
      </div>

    </section>
  );
}