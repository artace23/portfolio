"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, FileText } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export const Hero = ({ scrollToSection }: HeroProps) => {
  return (
    <section id="hero" className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">      
      <div className="z-10 max-w-5xl w-full flex flex-col items-center text-center space-y-10">
        {/* Profile Image with Premium Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full blur-md opacity-40 group-hover:opacity-60 transition duration-500 animate-pulse" />
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-emerald-400/50 p-1 bg-gray-900">
            <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-4xl font-bold">
              <Image 
                src="/images/profile_avatar.png" 
                alt="Art III Dela Cruz" 
                fill 
                className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
              />
              <span className="sr-only">AD</span>
            </div>
          </div>
        </motion.div>

        {/* Name and Title */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 text-transparent bg-clip-text">
              ART III DELA CRUZ
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 font-light flex flex-wrap justify-center gap-x-3 gap-y-2"
          >
            <span className="text-emerald-400 font-medium">Full Stack Developer</span>
            <span className="text-gray-600 hidden md:inline">|</span>
            <span className="text-blue-400 font-medium">IoT Developer</span>
            <span className="text-gray-600 hidden md:inline">|</span>
            <span className="text-teal-400 font-medium">Mobile App Expert</span>
          </motion.div>
        </div>

        {/* Typing Animation Replacement (CSS based from original, but polished) */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.6 }}
           className="h-8"
        >
          <p className="typing-multi-animation text-gray-300 font-medium md:text-lg italic tracking-wide" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-5 mt-4"
        >
          <a
            href="/Art_III_Dela_Cruz_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-emerald-500 text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center gap-2">
              View Resume <FileText className="w-4 h-4" />
            </span>
          </a>
          
          <button
            onClick={() => scrollToSection("contact")}
            className="group px-8 py-4 bg-transparent border border-gray-700 text-white rounded-full font-bold hover:bg-white/5 transition-all hover:border-emerald-400/50 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            Contact Me <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center gap-8 mt-4"
        >
          <a href="https://github.com/artace23" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald-400 transition-colors transform hover:scale-110">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/art-iii-dela-cruz-621879157/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors transform hover:scale-110">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="mailto:artace011503@gmail.com" className="text-gray-500 hover:text-teal-400 transition-colors transform hover:scale-110">
            <Mail className="w-6 h-6" />
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={() => scrollToSection("projects")}
      >
        <span className="text-gray-500 text-sm font-medium group-hover:text-emerald-400 transition-colors uppercase tracking-widest">
          Projects
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-500 group-hover:text-emerald-400 transition-colors"
        >
          <ArrowRight className="w-5 h-5 rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  );
};
