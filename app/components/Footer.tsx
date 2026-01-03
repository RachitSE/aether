"use client";

import React from "react";
import Link from "next/link";
import { Github, Globe, Twitter, Instagram, ArrowUpRight } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Sitemap",
    links: [
      { label: "The Archive", href: "/shop" },
      { label: "The Protocol", href: "/subscription" },
      { label: "Extraction Lab", href: "/methodology" },
      { label: "Sanctuaries", href: "/locations" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Shipping Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Protocol", href: "#" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#050505] text-[#E5E5E5] print:hidden">
      <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-12">
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-4">
            <Link href="/" className="group inline-flex flex-col">
              <span className="font-serif text-3xl italic tracking-tighter text-[#E5E5E5]">
                Aether
              </span>
              <span className="h-[1px] w-0 bg-[#D4AF37] transition-all duration-500 group-hover:w-full"></span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/50">
              Precision coffee engineering. Sourcing the rarest micro-lots from the edge of the known world and roasting them with mathematical exactitude.
            </p>
            <div className="mt-8 flex items-center gap-4">
               {/* Socials */}
               <SocialLink href="#" icon={<Instagram size={18} />} />
               <SocialLink href="#" icon={<Twitter size={18} />} />
            </div>
          </div>

          {/* LINKS GRID */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-4 lg:pl-12">
            {FOOTER_LINKS.map((section) => (
              <div key={section.title}>
                <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href}
                        className="text-sm text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* DEVELOPER / NEWSLETTER COLUMN */}
          <div className="lg:col-span-4">
             <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                System Architecture
             </h4>
             <p className="mb-6 text-sm text-white/50">
                Designed & Engineered by <span className="text-white">Rachit</span>.
             </p>
             
             <div className="flex flex-col gap-4">
                <a 
                    href="https://github.com/rachitse" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border border-white/10 bg-white/5 p-4 transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
                >
                    <div className="flex items-center gap-3">
                        <Github size={20} className="text-white/70 group-hover:text-[#D4AF37]" />
                        <span className="text-sm font-bold text-white/90">@rachitse</span>
                    </div>
                    <ArrowUpRight size={16} className="text-white/30 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#D4AF37]" />
                </a>

                <a 
                    href="#" // Replace with your actual portfolio link
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border border-white/10 bg-white/5 p-4 transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
                >
                    <div className="flex items-center gap-3">
                        <Globe size={20} className="text-white/70 group-hover:text-[#D4AF37]" />
                        <span className="text-sm font-bold text-white/90">View Portfolio</span>
                    </div>
                    <ArrowUpRight size={16} className="text-white/30 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#D4AF37]" />
                </a>
             </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[10px] uppercase tracking-widest text-white/30 md:flex-row">
            <span>© {currentYear} Aether Brewing. All rights reserved.</span>
            <div className="flex gap-6">
                <span>System Status: Operational</span>
                <span>V2.0.4</span>
            </div>
        </div>

      </div>
    </footer>
  );
}

const SocialLink = ({ href, icon }: { href: string, icon: React.ReactNode }) => (
    <a 
        href={href}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
    >
        {icon}
    </a>
);