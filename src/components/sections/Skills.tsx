"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Layout, Server, Smartphone, Wrench, Database, Layers } from "lucide-react";

const skillGroups = [
  {
    title: "Product Experience",
    icon: <Layout className="w-6 h-6 text-blue-400" />,
    skills: ["React / Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI"],
    color: "blue",
  },
  {
    title: "System Architecture",
    icon: <Server className="w-6 h-6 text-slate-400" />,
    skills: ["Node.js / Express", "PHP / Laravel", "PostgreSQL", "Supabase", "Redis"],
    color: "slate",
  },
  {
    title: "Mobile Ecosystem",
    icon: <Smartphone className="w-6 h-6 text-blue-500" />,
    skills: ["React Native", "Expo", "Firebase", "RevenueCat", "Mobile UX"],
    color: "blue",
  },
  {
    title: "Dev & Growth",
    icon: <Layers className="w-6 h-6 text-slate-300" />,
    skills: ["Git / CI/CD", "Docker", "Vercel / AWS", "PostHog", "SEO Optimization"],
    color: "slate",
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-32 px-6 relative z-10 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Engineering Toolkit"
          subtitle="A curated selection of technologies I use to build scalable products."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all duration-500"
            >
              <div className="flex flex-col items-center text-center space-y-8">
                <div className="p-5 rounded-[1.5rem] bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all duration-500">
                  {group.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white tracking-tight">{group.title}</h3>
                
                <div className="w-full flex flex-wrap justify-center gap-2">
                  {group.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="px-3 py-1.5 text-[10px] font-bold rounded-xl bg-white/[0.03] text-gray-500 border border-white/5 group-hover:text-gray-300 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

