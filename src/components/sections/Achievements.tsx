"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Trophy, Star, Lightbulb, Target, ArrowRight, ArrowLeft } from "lucide-react";
import { useRef } from "react";

const achievements = [
  {
    title: "Capstone Project Showcase",
    description: "Officially selected to represent Holy Cross of Davao College at the CCCIS 2025 Conference in Hong Kong, China.",
    icon: <Target className="w-6 h-6" />,
    color: "emerald",
  },
  {
    title: "Best Presenter Award",
    description: "Awarded 'Best Presenter' for the capstone project 'SmarTrax' in Parallel 1 - Data Innovation at CCCIS 2025.",
    icon: <Trophy className="w-6 h-6" />,
    color: "blue",
  },
  {
    title: "1st Place Programming",
    description: "Secured 1st place in the Programming Competition organized by ITS organization in HCDC in 2023.",
    icon: <Star className="w-6 h-6" />,
    color: "teal",
  },
  {
    title: "TOPCIT Level 2 Achiever",
    description: "Attained Level 2 certification in three consecutive TOPCIT examinations in the Philippines during 2023-2024.",
    icon: <Lightbulb className="w-6 h-6" />,
    color: "purple",
  },
  {
    title: "HCDC Intramurals Tabulation",
    description: "Developed a comprehensive tabulation system for HCDC intramural games, enabling efficient scoring and results tracking.",
    icon: <Target className="w-6 h-6" />,
    color: "emerald",
  },
];

export const Achievements = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section id="achievements" className="py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Key Achievements"
          subtitle="A track record of excellence, recognition, and continuous growth in the field of technology."
        />

        <div className="relative group/container">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 p-2 bg-gray-900 border border-white/10 rounded-full text-white opacity-0 group-hover/container:opacity-100 transition-opacity hidden lg:flex hover:border-emerald-500/50"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => scroll("right")}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 p-2 bg-gray-900 border border-white/10 rounded-full text-white opacity-0 group-hover/container:opacity-100 transition-opacity hidden lg:flex hover:border-emerald-500/50"
          >
            <ArrowRight className="w-6 h-6" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-8 snap-x no-scrollbar scroll-smooth"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {achievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="min-w-[300px] md:min-w-[400px] snap-center group/card p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-500/30 transition-all duration-500"
              >
                <div className="space-y-6">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gray-900 border border-white/10 group-hover/card:scale-110 transition-transform duration-500 ${
                    achievement.color === 'emerald' ? 'text-emerald-400' : 
                    achievement.color === 'blue' ? 'text-blue-400' : 
                    achievement.color === 'teal' ? 'text-teal-400' : 'text-purple-400'
                  }`}>
                    {achievement.icon}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover/card:text-emerald-400 transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>

                {/* Decorative dots */}
                <div className="absolute top-6 right-6 flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/20" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex justify-center mt-6 lg:hidden">
           <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Swipe to explore</span>
           </div>
        </div>
      </div>
    </section>
  );
};
