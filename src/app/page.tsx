"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Background } from "@/components/layout/Background";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Achievements } from "@/components/sections/Achievements";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { ScrollToTop } from "@/components/ui/ScrollToTop"; // I'll create this next

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Smooth scroll polyfill or fixes if needed
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#030712] text-white selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Dynamic Background Layers */}
      <Background />
      
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero scrollToSection={scrollToSection} />
        
        <div className="space-y-0 relative">
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Achievements />
          <Certifications />
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Utilities */}
      <ScrollToTop />
    </div>
  );
}
