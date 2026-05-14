"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rocket, Calendar, CheckCircle2, Milestone } from "lucide-react";

const experiences = [
  {
    title: "Product Engineer (Contract)",
    company: "Trixicon | Israel",
    period: "Jan 2026 - Present",
    type: "Contract",
    impact: "Architecting cross-platform mobile solutions and WordPress ecosystems, focusing on seamless AWS integration for high-concurrency data handling.",
    milestones: [
      "Engineered mobile applications with React Native for international markets.",
      "Optimized backend data pipelines using Amazon Web Services (AWS).",
    ],
    color: "blue",
  },
  {
    title: "AI Systems Evaluator (Contract)",
    company: "CoreThink AI Inc. | USA",
    period: "Dec 2025",
    type: "Contract",
    impact: "Enhanced model reliability by stress-testing coding LLMs against real-world production scenarios and edge cases.",
    milestones: [
      "Identified and mitigated 30+ critical logic errors in AI-generated code.",
      "Developed standardized benchmarking protocols for model performance evaluation.",
    ],
    color: "slate",
  },
  {
    title: "Full Stack Engineer (Lead)",
    company: "Freelance | Philippines",
    period: "Sept 2025 – Feb 2026",
    type: "Contract",
    impact: "Built and deployed a production-grade POS & Inventory system for a local enterprise, automating sales tracking and stock management.",
    milestones: [
      "Reduced manual inventory reconciliation time by 80%.",
      "Designed a custom reporting engine for real-time business insights.",
    ],
    color: "blue",
  },
  {
    title: "Software Engineer",
    company: "DSG Son’s Group Inc. | Philippines",
    period: "July 2025",
    type: "Full-Time",
    impact: "Spearheaded the development of internal web systems using Laravel, bridging legacy data with modern Python processing scripts.",
    milestones: [
      "Integrated Python-based data analysis modules into Laravel dashboards.",
      "Improved server-side processing efficiency for large-scale datasets.",
    ],
    color: "slate",
  },
  {
    title: "Frontend Engineering Intern",
    company: "Jairosoft Inc. | Philippines",
    period: "Feb 2025 – May 2025",
    type: "Internship",
    impact: "Contributed to high-performance web applications, achieving significant Lighthouse score improvements across the board.",
    milestones: [
      "Achieved a 40% performance gain in core web vitals using Next.js optimization.",
      "Collaborated in an Agile environment to ship 5+ feature modules.",
    ],
    color: "blue",
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-32 px-6 relative z-10 bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          title="Product Roadmap"
          subtitle="A history of shipping, engineering, and solving complex problems."
        />

        <div className="relative space-y-20">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/50 via-white/10 to-transparent hidden md:block" />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Indicator */}
              <div className="absolute left-[-4px] md:left-1/2 md:ml-[-4px] top-0 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10 hidden md:block" />

              {/* Content Card */}
              <div className="flex-1">
                <div className="group relative p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-blue-500/20 transition-all duration-500">
                  <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
                    <div className="space-y-2">
                      <h4 className={`text-xl font-bold ${exp.color === 'blue' ? 'text-blue-400' : 'text-gray-300'}`}>
                        {exp.title}
                      </h4>
                      <div className="text-white/80 font-medium flex items-center gap-2 text-sm">
                         <Milestone className="w-4 h-4 text-blue-500/50" /> {exp.company}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-500">
                           {exp.type}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-wider">
                          <Calendar className="w-3 h-3" /> {exp.period}
                        </div>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                    <span className="text-blue-500 font-bold mr-2">Impact:</span> {exp.impact}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-white/5">
                    {exp.milestones.map((item, j) => (
                      <div key={j} className="flex items-start gap-3 text-gray-400 text-xs leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-blue-500/30 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
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

