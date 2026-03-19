"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { User, Briefcase, Award, Heart } from "lucide-react";
import Image from "next/image";

const stats = [
  { label: "Years Experience", value: "3+", icon: <Briefcase className="w-5 h-5" /> },
  { label: "Projects Completed", value: "15+", icon: <Award className="w-5 h-5" /> },
  { label: "Achievements", value: "5+", icon: <Award className="w-5 h-5" /> },
  { label: "Satisfaction", value: "100%", icon: <Heart className="w-5 h-5" /> },
];

export const About = () => {
  return (
    <section id="about" className="py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="About Me"
          subtitle="A passionate developer dedicated to building impactful digital solutions."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/profile_avatar.png"
                alt="Art III Dela Cruz"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-white tracking-wide uppercase">Open for new opportunities</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <User className="text-emerald-400 w-6 h-6" />
                 <h3 className="text-2xl md:text-3xl font-bold">My Professional Journey</h3>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">
                I&apos;m a Full Stack Developer from the Philippines with a strong focus on 
                <span className="text-emerald-400 font-medium"> building modern, high-performance web and mobile applications</span>. 
                With expertise in Next.js, React Native, and full-stack architecture, I thrive on turning complex problems 
                into intuitive digital experiences.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                 My background spans across standard web development, backend engineering with Laravel and Node.js, 
                 and specialized IoT solutions, allowing me to approach every project with a comprehensive technical perspective.
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
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2 hover:border-emerald-500/30 transition-colors"
                >
                  <div className="text-emerald-400 flex justify-center">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
