"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";

const experiences = [
  {
    title: "Part-Time Mobile Developer (Contract)",
    company: "Trixicon | Tel Aviv, Israel",
    period: "Jan 2026",
    type: "Contract",
    description: [
      "Developed mobile applications using React Native and built WordPress-based solutions",
      "Integrated Amazon services for backend functionality, data handling, and scalable support",
    ],
    color: "emerald",
  },
  {
    title: "AI Test Developer (Contract)",
    company: "CoreThink AI Inc. | United States",
    period: "Dec 2025",
    type: "Contract",
    description: [
      "Tested and evaluated coding model outputs for accuracy, functionality, and edge cases",
      "Identified bugs and inconsistencies, created test scenarios, and improved model performance",
    ],
    color: "blue",
  },
  {
    title: "Software Developer (Contract)",
    company: "Freelance Client | Toril, Philippines",
    period: "Sept 2025 – Feb 2026",
    type: "Contract",
    description: [
      "Developed a Point-of-Sale (POS) system with integrated inventory management for a minimart",
      "Implemented sales tracking, stock monitoring, and reporting features for efficiency",
    ],
    color: "teal",
  },
  {
    title: "Web Developer",
    company: "DSG Son’s Group Inc. | Philippines",
    period: "July 2025",
    type: "Full-Time",
    description: [
      "Developed and maintained web applications using Laravel (PHP) as the primary backend",
      "Implemented server-side logic and database integration with Python data processing scripts",
    ],
    color: "emerald",
  },
  {
    title: "Frontend Developer (Internship)",
    company: "Jairosoft Inc. | Philippines",
    period: "Feb 2025 – May 2025",
    type: "Internship",
    description: [
      "Built responsive web applications using Next.js and Tailwind CSS with 40% performance gain",
      "Participated in Agile development, code reviews, and cross-team collaboration",
    ],
    color: "blue",
  },
  {
    title: "Unity VR Game Developer (Contract)",
    company: "Freelance Client | Philippines",
    period: "Dec 2024 – Jan 2025",
    type: "Contract",
    description: [
      "Developed and prototyped virtual reality (VR) game concepts using Unity",
      "Focusing on core gameplay mechanics, interaction design, and rapid iteration",
    ],
    color: "teal",
  },
  {
    title: "Backend Developer (Contract)",
    company: "HCDC SSG Executive Department | Philippines",
    period: "Sept 2024 - Nov 2024",
    type: "Contract",
    description: [
      "Built a tabulation system and integrated Supabase/PostgreSQL for database management",
      "Developed dynamic and responsive user interfaces using Next.js and Framer Motion",
    ],
    color: "emerald",
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
