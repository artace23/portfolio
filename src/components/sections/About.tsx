"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { User, Rocket, Target, Lightbulb } from "lucide-react";
import Image from "next/image";

const stats = [
  { label: "Freelancing since", value: "2022", icon: <Rocket className="w-5 h-5" /> },
  { label: "Projects listed below", value: "7", icon: <Target className="w-5 h-5" /> },
  { label: "CCCIS 2025 Best Presenter", value: "HK", icon: <Lightbulb className="w-5 h-5" /> },
];

export const About = () => {
  return (
    <section id="about" className="py-32 px-6 relative z-10 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="About"
          subtitle="A bit about how I work and what I've been building."
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
                 I like building things people use every day.
               </h3>

               <p className="text-gray-400 text-lg leading-relaxed font-light">
                 I started out making small websites for local businesses in 2022 and kept going from there.
                 Today I work as a software engineer at DSG Son&apos;s Group, building internal web systems
                 and mobile apps, and I take on freelance projects on the side.
               </p>

               <p className="text-gray-400 text-lg leading-relaxed font-light">
                 My main tools are <span className="text-white font-medium">Next.js, React Native and Laravel</span>.
                 My capstone, SmarTrax, a bike-rental app that unlocks hardware over QR, won Best Presenter
                 at CCCIS 2025 in Hong Kong. I&apos;m currently looking for a full-time role where I can keep
                 working across web and mobile.
               </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
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
                Get in touch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

