"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Code, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  tags: string[];
  image: string;
  link: string;
  github?: string;
  banner?: {
    text: string;
    color: string;
  };
}

export const ProjectCard = ({
  title,
  description,
  problem,
  solution,
  impact,
  tags,
  image,
  link,
  github,
  banner,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-[#111111] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all duration-500"
    >
      {/* Top Image Section */}
      <div className="relative aspect-video overflow-hidden">
        {banner && (
          <div className={cn("absolute top-4 left-4 z-20 text-[10px] font-bold py-1.5 px-3 rounded-full shadow-xl backdrop-blur-md uppercase tracking-wider", banner.color)}>
            {banner.text}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent z-10 opacity-60" />
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="p-8 space-y-8 flex-grow flex flex-col">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed font-light italic">
              {description}
            </p>
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all group/link"
          >
            <ArrowUpRight className="w-5 h-5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* The Narrative */}
        <div className="grid grid-cols-1 gap-6 py-2 border-y border-white/5">
          <div className="space-y-1">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-500/80">The Problem</div>
            <p className="text-gray-400 text-xs leading-relaxed">{problem}</p>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-500/80">The Solution</div>
            <p className="text-gray-400 text-xs leading-relaxed">{solution}</p>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-400/80">The Impact</div>
            <p className="text-gray-400 text-xs leading-relaxed font-medium">{impact}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex flex-wrap gap-2 items-center justify-between mt-auto">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-md bg-white/[0.03] text-gray-400 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

