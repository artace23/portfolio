"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { User, Rocket, Target, Lightbulb } from "lucide-react";
import Image from "next/image";

const stats = [
  { label: "Engineering", value: "3+ Yrs", icon: <Rocket className="w-5 h-5" /> },
  { label: "Products Shipped", value: "15+", icon: <Target className="w-5 h-5" /> },
  { label: "Problem Solving", value: "100%", icon: <Lightbulb className="w-5 h-5" /> },
  { label: "Tech Stack", value: "Full", icon: <Rocket className="w-5 h-5" /> },
];

export const About = () => {
  return (
    <section id="about" className="py-32 px-6 relative z-10 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="The Builder Mindset"
          subtitle="I don't just build features; I build solutions that drive real-world impact."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 group">
              <Image
                src="/images/profile_avatar.png"
                alt="Art Dela Cruz"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-white tracking-[0.2em] uppercase">Status: Iterating on New Ideas</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-10"
          >
            <div className="space-y-6">
               <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                 Bridging the gap between <span className="text-blue-500">Vision</span> and <span className="text-white">Reality</span>.
               </h3>
               
               <p className="text-gray-400 text-lg leading-relaxed font-light">
                 My journey as a developer started with a simple question: <span className="text-white font-medium italic">&quot;How can I make this work better?&quot;</span> 
                 Since then, I&apos;ve evolved into a Product Engineer who obsesses over the intersection of clean code, 
                 intuitive UX, and business goals.
               </p>

               <p className="text-gray-400 text-lg leading-relaxed font-light">
                 I specialize in <span className="text-white font-medium">Next.js, React Native, and IoT architectures</span>. 
                 But more than my stack, I bring a founder&apos;s energy to every project—treating every line of code 
                 as an investment in a product&apos;s future. Whether it&apos;s a gamified productivity app or a 
                 smart bike rental system, I build with the end-user in mind.
               </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-300 group"
                >
                  <div className="text-blue-500/50 group-hover:text-blue-500 transition-colors mb-4">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="pt-4">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 text-white font-medium group hover:text-blue-400 transition-colors"
              >
                Let&apos;s build the future together <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Added missing import
import { ArrowRight } from "lucide-react";

