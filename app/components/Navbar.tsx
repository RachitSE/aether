"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { NAV_LINKS } from "../lib/data";
import { useCart } from "../context/CartContext"; // Import Context
import { CartDrawer } from "./CartDrawer"; // Import the Drawer Component

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Cart Hook
  const { toggleCart, cart } = useCart();

  // Premium Scroll Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setHasScrolled(latest > 50);
  });

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center py-6 transition-all duration-300 ${
          hasScrolled ? "py-4" : "py-6"
        }`}
      >
        <div
          className={`relative flex items-center justify-between px-8 py-4 transition-all duration-500 ${
            hasScrolled
              ? "w-[90%] md:w-[60%] rounded-full bg-aether-black/80 backdrop-blur-md border border-white/10" // Using white/10 generic if ash isn't loaded
              : "w-full px-12 bg-transparent border-transparent"
          }`}
        >
          {/* Desktop Left Links */}
          <div className="hidden md:flex gap-8 items-center">
            {NAV_LINKS.slice(0, 2).map((link) => (
              <NavLink key={link.label} href={link.href} label={link.label} />
            ))}
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="group flex flex-col items-center justify-center">
              <span className="font-serif text-2xl text-[#E5E5E5] tracking-tighter italic">
                Aether
              </span>
              <span className="h-[1px] w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Desktop Right Links */}
          <div className="hidden md:flex gap-8 items-center">
            {NAV_LINKS.slice(2, 4).map((link) => (
              <NavLink key={link.label} href={link.href} label={link.label} />
            ))}
            
            {/* CART BUTTON */}
            <button 
                onClick={toggleCart}
                className="relative p-2 text-[#E5E5E5] hover:text-[#D4AF37] transition-colors"
            >
              <ShoppingBag size={20} />
              {/* Only show dot if cart has items */}
              {cart.length > 0 && (
                  <span className="absolute top-1 right-0 h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_10px_#D4AF37]" />
              )}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex gap-4">
            <button onClick={toggleCart} className="text-[#E5E5E5]">
                 <ShoppingBag size={20} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-[#E5E5E5]"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Render the Cart Drawer here so it's always available */}
      <CartDrawer />

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#0a0a0a] text-[#E5E5E5]"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-[#E5E5E5] hover:text-[#D4AF37] transition-colors"
            >
              <X size={32} />
            </button>
            
            <div className="flex flex-col gap-8 text-center">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-serif text-4xl italic hover:text-[#D4AF37] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="relative text-xs uppercase tracking-[0.2em] text-[#E5E5E5]/70 hover:text-[#D4AF37] transition-colors duration-300 font-sans group"
  >
    {label}
    <span className="absolute -bottom-2 left-1/2 h-[1px] w-0 bg-[#D4AF37] transition-all duration-300 -translate-x-1/2 group-hover:w-1/2"></span>
  </Link>
);