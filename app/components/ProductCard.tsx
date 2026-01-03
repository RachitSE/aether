"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Import Link
import { Product } from "../lib/data";
import { useCart } from "../context/CartContext";
import { cn } from "../lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Stop link navigation
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link href={`/shop/${product.slug}`} className="block"> {/* Wrap in Link */}
        <motion.div
        whileHover={{ y: -10 }}
        className={cn(
            "group relative h-[500px] w-[340px] flex-shrink-0 cursor-pointer overflow-hidden bg-[#121212] border border-white/10 transition-colors hover:border-[#D4AF37]/30",
            className
        )}
        >
        {/* Top Badge */}
        <div className="absolute left-0 top-0 z-10 flex w-full justify-between p-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
            {product.category}
            </span>
            {product.isLimited && (
            <span className="bg-[#D4AF37] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-black">
                Limited
            </span>
            )}
        </div>

        {/* Image Container */}
        <div className="relative h-[65%] w-full overflow-hidden bg-[#151515]">
            <motion.div 
                className="h-full w-full relative"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7 }}
            >
                <Image 
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
            </motion.div>
            
            <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-[#121212] to-transparent" />
        </div>

        {/* Content */}
        <div className="flex h-[35%] flex-col justify-between p-6">
            <div>
                <div className="mb-2 flex items-baseline justify-between">
                    <h3 className="font-serif text-xl text-[#E5E5E5] group-hover:text-[#D4AF37] transition-colors duration-300">
                        {product.name}
                    </h3>
                    <span className="font-mono text-sm text-[#D4AF37]">${product.price}</span>
                </div>
                <p className="line-clamp-2 text-xs leading-relaxed text-white/60">
                    {product.tagline}
                </p>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                <div className="flex gap-2">
                    {product.tastingNotes?.slice(0, 2).map((note, i) => (
                        <span key={i} className="text-[9px] uppercase tracking-wider text-white/40">
                            {note}
                        </span>
                    ))}
                </div>
                
                <button 
                    onClick={handleAddToCart}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5E5E5] text-black transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#D4AF37] hover:!scale-125"
                    aria-label="Add to cart"
                >
                    <Plus size={14} />
                </button>
            </div>
        </div>
        </motion.div>
    </Link>
  );
};