"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";

const experiences = [
  {
    title: "Front-End Developer Intern",
    company: "Jairosoft Inc.",
    period: "Feb 2025 - June 2025",
    type: "Internship",
    description: [
      "Designed and implemented responsive web applications using Next.js and Tailwind CSS",
      "Enhanced performance by 40% through efficient state management and code optimization",
      "Collaborated in Agile teams and contributed to code quality through regular reviews",
    ],
    color: "emerald",
  },
  {
    title: "Back-End Developer",
    company: "HCDC SSG Executive Department",
    period: "Sept 2024 — Nov 2024",
    type: "Volunteer",
    description: [
      "Backend Developer in charge of tabulation and backend development of the site",
      "Integrated Supabase and PostgreSQL to manage and enhance database functionalities",
      "Designed and implemented responsive user interfaces",
    ],
    color: "blue",
  },
  {
    title: "Full Stack Developer",
    company: "Self-Employed",
    period: "2021 - Present",
    type: "Freelance",
    description: [
      "Developed and deployed client websites, custom IoT solutions, and full-stack applications",
      "Implemented responsive, user-centric UI designs using modern front-end frameworks",
      "Integrated third-party APIs, authentication systems, and payment gateways",
    ],
    color: "teal",
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          title="Work Experience"
          subtitle="My professional journey and the impact I've made at various organizations."
        />

        <div className="relative space-y-12">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-blue-500/50 to-transparent hidden md:block" />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-8px] md:left-1/2 md:ml-[-8px] top-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-emerald-400 z-10 hidden md:block" />

              {/* Content Card */}
              <div className="flex-1">
                <div className="group relative p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-emerald-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10">
                  <div className="flex flex-wrap justify-between items-start mb-4 gap-4">
                    <div className="space-y-1">
                      <h4 className={`text-xl font-bold ${exp.color === 'emerald' ? 'text-emerald-400' : exp.color === 'blue' ? 'text-blue-400' : 'text-teal-400'}`}>
                        {exp.title}
                      </h4>
                      <p className="text-white font-medium flex items-center gap-2">
                         <Briefcase className="w-4 h-4 text-gray-400" /> {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400">
                           {exp.type}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" /> {exp.period}
                        </div>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.description.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-500/50 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Spacer for desktop layout */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
