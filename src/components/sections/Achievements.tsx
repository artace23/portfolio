"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Trophy, Star, Lightbulb, Target, ArrowRight, ArrowLeft } from "lucide-react";
import { useRef } from "react";

const achievements = [
  {
    title: "International Showcase",
    description: "Selected to represent Holy Cross of Davao College at the CCCIS 2025 Conference in Hong Kong, China.",
    icon: <Target className="w-6 h-6" />,
    color: "blue",
  },
  {
    title: "Best Presenter Award",
    description: "Awarded 'Best Presenter' for the capstone project 'SmarTrax' in Data Innovation at CCCIS 2025.",
    icon: <Trophy className="w-6 h-6" />,
    color: "blue",
  },
  {
    title: "1st Place Programming",
    description: "Secured 1st place in the Programming Competition organized by ITS organization in 2023.",
    icon: <Star className="w-6 h-6" />,
    color: "slate",
  },
  {
    title: "TOPCIT Level 2",
    description: "Attained Level 2 certification in three consecutive TOPCIT examinations during 2023-2024.",
    icon: <Lightbulb className="w-6 h-6" />,
    color: "slate",
  },
  {
    title: "Enterprise Systems",
    description: "Developed an enterprise-grade tabulation system for high-stakes institutional events.",
    icon: <Target className="w-6 h-6" />,
    color: "blue",
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
    <section id="achievements" className="py-32 px-6 relative z-10 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Impact & Recognition"
          subtitle="Acknowledged for engineering excellence and research contributions."
        />

        <div className="relative group/container">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 p-3 bg-white/5 border border-white/10 rounded-full text-white opacity-0 group-hover/container:opacity-100 transition-all hidden lg:flex hover:bg-white/10 hover:border-blue-500/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => scroll("right")}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 p-3 bg-white/5 border border-white/10 rounded-full text-white opacity-0 group-hover/container:opacity-100 transition-all hidden lg:flex hover:bg-white/10 hover:border-blue-500/50"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-8 pb-12 snap-x no-scrollbar scroll-smooth"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {achievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="min-w-[320px] md:min-w-[450px] snap-center group/card p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all duration-500 flex flex-col justify-between"
              >
                <div className="space-y-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover/card:scale-110 group-hover/card:bg-blue-500/10 group-hover/card:border-blue-500/20 transition-all duration-500 ${
                    achievement.color === 'blue' ? 'text-blue-500' : 'text-gray-400'
                  }`}>
                    {achievement.icon}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white group-hover/card:text-blue-400 transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                      {achievement.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <div className="w-8 h-[1px] bg-white/10 group-hover/card:w-16 group-hover/card:bg-blue-500 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex justify-center mt-4 lg:hidden">
           <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Swipe to explore</span>
           </div>
        </div>
      </div>
    </section>
  );
};

