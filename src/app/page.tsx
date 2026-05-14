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
import { BuilderLog } from "@/components/sections/BuilderLog";
import { TheLab } from "@/components/sections/TheLab";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
    <div className="relative min-h-screen bg-[#0A0A0A] text-white selection:bg-blue-500/30 selection:text-blue-200">
      <Background />
      <Navbar />

      <main>
        <Hero scrollToSection={scrollToSection} />
        
        <div className="space-y-0 relative">
          <BuilderLog />
          <About />
          <Projects />
          <Experience />
          <TheLab />
          <Skills />
          <Achievements />
          <Certifications />
          <Contact />
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

