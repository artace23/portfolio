"use client";

import { Github, Linkedin, Mail, Instagram, ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 px-6 border-t border-white/5 bg-gray-950/50 backdrop-blur-xl z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={scrollToTop}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                A
              </div>
              <span className="text-white font-bold tracking-tight">Art Dela Cruz</span>
            </div>
            <p className="text-gray-500 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Art III Dela Cruz. <br/>All rights reserved. Dedicated to excellence.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center gap-8">
            <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} className="text-gray-400 hover:text-emerald-400 transition-colors text-sm font-medium uppercase tracking-widest">About</button>
            <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} className="text-gray-400 hover:text-emerald-400 transition-colors text-sm font-medium uppercase tracking-widest">Projects</button>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="text-gray-400 hover:text-emerald-400 transition-colors text-sm font-medium uppercase tracking-widest">Contact</button>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex flex-col items-center md:items-end space-y-6">
            <div className="flex items-center gap-6">
              <a href="https://github.com/artace23" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/art-iii-dela-cruz-621879157/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:artace011503@gmail.com" className="text-gray-500 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-emerald-400 uppercase tracking-widest transition-colors"
            >
              Back to Top <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-blue-600/0 opacity-30" />
    </footer>
  );
};
