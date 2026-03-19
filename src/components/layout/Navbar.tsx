"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, FileText, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/Magnetic";

const navLinks = [
  { name: "Home", id: "hero" },
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Experience", id: "experience" },
  { name: "Contact", id: "contact" },
];

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Scroll animations for the navbar container
  const navbarY = useTransform(scrollY, [0, 100], [0, -10]);
  const navbarScale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const navbarBlur = useTransform(scrollY, [0, 100], [12, 24]);
  const navbarShadow = useTransform(
    scrollY,
    [0, 100],
    ["0px 10px 30px rgba(0,0,0,0.3)", "0px 20px 50px rgba(0,0,0,0.5)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Use a slightly larger offset for detection

      for (const link of navLinks) {
        const section = document.getElementById(link.id);
        if (section) {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    } else if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
      <motion.nav
        style={{
          y: navbarY,
          scale: navbarScale,
          backdropFilter: `blur(${navbarBlur}px)`,
          boxShadow: navbarShadow,
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-auto flex items-center gap-2 px-3 py-2 bg-gray-950/85 border border-white/10 rounded-full md:gap-4 lg:px-4 lg:py-3"
      >
        {/* Logo */}
        <Magnetic strength={0.25}>
          <div 
            onClick={() => scrollToSection("hero")}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-90 transition-transform"
          >
            A
          </div>
        </Magnetic>

        <div className="h-6 w-px bg-white/10 hidden md:block" />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Magnetic key={link.id} strength={0.3}>
              <button
                onClick={() => scrollToSection(link.id)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                  activeSection === link.id ? "text-white" : "text-gray-300 hover:text-white"
                )}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 bg-white/10 border border-white/10 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </button>
            </Magnetic>
          ))}
        </div>

        <div className="h-6 w-px bg-white/10 hidden md:block" />

        {/* Resume CTA */}
        <Magnetic strength={0.4}>
          <a
            href="/Art_III_Dela_Cruz_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full text-sm font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all"
          >
            <FileText className="w-4 h-4" />
            Resume
          </a>
        </Magnetic>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed top-24 left-6 right-6 z-40 p-6 bg-gray-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl pointer-events-auto md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    "text-xl font-bold text-left py-2 px-4 rounded-2xl transition-all",
                    activeSection === link.id ? "bg-white/10 text-emerald-400" : "text-gray-400"
                  )}
                >
                  {link.name}
                </button>
              ))}
              <div className="h-px bg-white/5 my-2" />
              <a
                href="/Art_III_Dela_Cruz_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20"
              >
                <FileText className="w-5 h-5" />
                View Resume
              </a>
              <div className="flex items-center justify-center gap-8 pt-4">
                <a href="https://github.com/artace23" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/art-iii-dela-cruz-621879157/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:artace011503@gmail.com" className="text-gray-400 hover:text-white">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
