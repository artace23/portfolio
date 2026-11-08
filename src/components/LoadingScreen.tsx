'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

// Short, honest intro: just the name and a quick bar, then out of the way.
export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(onLoadingComplete, 700);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-[#0A0A0A] flex flex-col justify-center items-center gap-5 z-50 text-white"
    >
      <span className="text-sm tracking-[0.3em] uppercase text-white/60">Art Dela Cruz</span>
      <div className="w-40 h-px bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-white/70"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}
