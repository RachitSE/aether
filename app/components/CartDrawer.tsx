"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import Image from "next/image";

export const CartDrawer = () => {
  const { cart, removeFromCart, toggleCart, isCartOpen, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-[#0f0f0f] border-l border-white/10 shadow-2xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 p-6">
                <h2 className="font-serif text-2xl text-[#E5E5E5]">Your Cache</h2>
                <button onClick={toggleCart} className="text-white/50 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center text-white/40">
                    <ShoppingBag size={48} className="mb-4 opacity-20" />
                    <p>Your brewing cache is empty.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative h-20 w-20 overflow-hidden rounded-sm bg-white/5">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif text-lg text-[#E5E5E5]">{item.name}</h3>
                          <p className="text-sm text-aether-gold">${item.price}</p>
                          <div className="mt-2 flex items-center gap-3">
                            <span className="text-xs text-white/40">Qty: {item.quantity}</span>
                            <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-xs text-red-400 hover:text-red-300 underline"
                            >
                                Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 bg-[#0a0a0a] p-6">
                <div className="mb-4 flex justify-between text-[#E5E5E5]">
                  <span>Subtotal</span>
                  <span className="font-mono text-lg">${cartTotal}</span>
                </div>
                <button className="w-full rounded-sm bg-aether-gold py-4 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-white">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};