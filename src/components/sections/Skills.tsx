"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Layout, Server, Smartphone, Wrench, Database, Cloud } from "lucide-react";

const skillGroups = [
  {
    title: "Frontend Development",
    icon: <Layout className="w-6 h-6 text-emerald-400" />,
    skills: ["React / Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn/UI"],
    color: "emerald",
  },
  {
    title: "Backend Development",
    icon: <Server className="w-6 h-6 text-blue-400" />,
    skills: ["Node.js / Express", "PHP / Laravel", "PostgreSQL", "MongoDB", "RESTful APIs"],
    color: "blue",
  },
  {
    title: "Mobile & Hybrid",
    icon: <Smartphone className="w-6 h-6 text-teal-400" />,
    skills: ["React Native", "Expo", "Firebase", "App Store Deployment", "Mobile UX"],
    color: "teal",
  },
  {
    title: "Tools & DevOps",
    icon: <Wrench className="w-6 h-6 text-purple-400" />,
    skills: ["Git / GitHub", "Docker", "Vercel", "AWS", "Agile / Scrum"],
    color: "purple",
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Technical Arsenal"
          subtitle="A comprehensive overview of the technologies and tools I master to bring digital visions to life."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  {group.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">{group.title}</h3>
                
                <div className="w-full flex flex-wrap justify-center gap-2">
                  {group.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 text-xs font-bold rounded-full bg-white/5 text-gray-400 border border-white/5 group-hover:text-white transition-colors"
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
