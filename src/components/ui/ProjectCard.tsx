"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, Code } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
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
  tags,
  image,
  link,
  github,
  banner,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group h-full"
    >
      {/* Glow Effect */}
      <div 
        className={cn(
          "absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500",
          isHovered && "opacity-40"
        )}
      />

      <div className="relative h-full bg-gray-900/80 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden flex flex-col group-hover:border-emerald-500/30 transition-colors duration-500">
        {/* Banner */}
        {banner && (
          <div className={cn("absolute top-3 right-0 z-20 text-[10px] md:text-xs font-bold py-1 px-3 rounded-l-full shadow-lg transform -skew-x-12", banner.color)}>
            {banner.text}
          </div>
        )}

        {/* Image Container */}
        <div className="relative h-48 md:h-56 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/90 z-10" />
            <motion.div
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full"
            >
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center">
                        <Code className="w-12 h-12 text-emerald-500/40" />
                    </div>
                )}
            </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
              {title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto pt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-white/5 text-emerald-400 border border-emerald-400/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/5">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white rounded-lg transition-all text-sm font-bold group/btn"
            >
              Live Demo <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                title="View Source Code"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
