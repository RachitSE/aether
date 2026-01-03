import Navbar from './components/Navbar';
import { Hero } from './components/Hero'; 
import FeaturedSection from './components/FeaturedSection';
import { ProcessSection } from './components/ProcessSection';

export default function Home() {
  return (
    <main className="bg-aether-black min-h-screen text-aether-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <ProcessSection />
      <FeaturedSection />
      
      <footer className="py-24 border-t border-aether-white/5 bg-aether-black text-center relative overflow-hidden">
         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
         <h2 className="font-serif text-[10vw] text-aether-white/5 leading-none select-none pointer-events-none">AETHER</h2>
         <p className="relative z-10 text-xs text-aether-white/40 uppercase tracking-[0.3em] mt-[-5vw]">&copy; 2026 Aether Brewing. Kolkata.</p>
      </footer>
    </main>
  );
}