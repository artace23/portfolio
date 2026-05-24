"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, FileText, Zap, Globe, Cpu } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export const Hero = ({ scrollToSection }: HeroProps) => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-[#0A0A0A]">      
      {/* Background Subtle Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Text Content */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] break-words"
            >
              Building products that <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                bridge code and business value.
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
            >
              Full-stack engineer with a founder mindset. I don&apos;t just write code; 
              I build scalable, high-performance solutions for real-world problems.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center lg:justify-start px-4 sm:px-0"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="group relative px-8 py-4 bg-white text-black rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
            >
              <span className="relative flex items-center gap-2">
                See My Builds <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <a
              href="/Art_III_Dela_Cruz_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              type="application/pdf"
              className="group px-8 py-4 bg-transparent border border-white/10 text-white rounded-full font-bold hover:bg-white/5 transition-all hover:border-white/30 hover:scale-105 active:scale-95 flex items-center gap-2 justify-center"
            >
              View Resume <FileText className="w-4 h-4" />
            </a>

            <button
              onClick={() => scrollToSection("contact")}
              className="group px-8 py-4 bg-transparent border border-white/10 text-gray-400 rounded-full font-bold hover:bg-white/5 transition-all hover:border-white/30 hover:scale-105 active:scale-95 flex items-center gap-2 justify-center"
            >
              Contact
            </button>
          </motion.div>

          {/* Trust Marks / Mini Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pt-6 sm:pt-8 flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500"
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <Zap className="w-4 h-4" /> 3+ Years Exp
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Globe className="w-4 h-4" /> 15+ Shipped
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Cpu className="w-4 h-4" /> IoT Specialist
            </div>
          </motion.div>
        </div>

        {/* Profile / Visual Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:col-span-5 relative hidden lg:block"
        >
          <div className="relative z-10 w-full aspect-square rounded-[2.5rem] overflow-hidden border border-white/10 bg-gradient-to-br from-gray-800 to-black p-1 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <Image 
              src="/images/profile_avatar.png" 
              alt="Art Dela Cruz" 
              fill 
              className="object-cover opacity-90 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-8 left-8 right-8 z-20">
               <div className="text-white font-bold text-2xl">Art Dela Cruz</div>
               <div className="text-white/50 text-sm tracking-widest uppercase">Product Engineer</div>
            </div>
          </div>
          
          {/* Decorative Rings */}
          <div className="absolute -top-10 -right-10 w-64 h-64 border border-white/5 rounded-full animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 border border-white/5 rounded-full animate-pulse delay-700" />
        </motion.div>
      </div>

      {/* Social Links Side Bar (Desktop) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="hidden xl:flex absolute left-10 bottom-10 flex-col gap-6"
      >
        <a href="https://github.com/artace23" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors transform hover:scale-110">
          <Github className="w-5 h-5" />
        </a>
        <a href="https://www.linkedin.com/in/art-iii-dela-cruz-621879157/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors transform hover:scale-110">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="mailto:artace011503@gmail.com" className="text-gray-500 hover:text-white transition-colors transform hover:scale-110">
          <Mail className="w-5 h-5" />
        </a>
        <div className="w-px h-12 bg-white/10 mx-auto" />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
        onClick={() => scrollToSection("projects")}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent group-hover:h-16 transition-all duration-500" />
        <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold group-hover:text-white transition-colors">
          Explore Builds
        </span>
      </motion.div>
    </section>
  );
};

