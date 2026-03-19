"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="text-center mb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 text-transparent bg-clip-text">
          {title}
        </h2>
        <motion.div 
          className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto mb-6 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
};
