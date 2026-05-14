'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('SYNCING_CORE');
  const [isExiting, setIsExiting] = useState(false);
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const loadingPhases = [
      { text: 'BOOTING_PRODUCT_LAB', duration: 300 },
      { text: 'SYST_CORE_V2.0', duration: 400 },
      { text: 'OPTIMIZING_UX', duration: 300 },
      { text: 'READY', duration: 200 }
    ];

    const runPhases = async () => {
      let currentProgress = 0;
      for (const phase of loadingPhases) {
        setLoadingText(phase.text);
        const steps = 10;
        const increment = (100 / loadingPhases.length) / steps;
        
        for (let i = 0; i < steps; i++) {
          await new Promise(r => setTimeout(r, phase.duration / steps));
          currentProgress += increment;
          setProgress(Math.min(currentProgress, 100));
        }
      }
      
      setIsExiting(true);
      setTimeout(() => {
        onLoadingComplete();
      }, 500);
    };

    runPhases();
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [onLoadingComplete]);
  
  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-[#0A0A0A] flex justify-center items-center z-50 font-mono text-white overflow-hidden"
        >
          {/* Minimal Grid Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
             <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>
          
          <div className="w-full max-w-md px-10 flex flex-col items-center gap-6 relative z-10">
            {/* Terminal Style Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
              </div>
              <div className="h-px w-24 bg-white/10" />
              <span className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-bold">Art Dela Cruz / Lab</span>
            </div>

            {/* Progress Display */}
            <div className="w-full space-y-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <div className="text-xs text-white/40 tracking-wider">PROCESS_STATE</div>
                  <motion.div 
                    key={loadingText}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm font-bold text-white tracking-widest flex items-center gap-2"
                  >
                    <span className="text-blue-500">&gt;</span> {loadingText}
                  </motion.div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/40 tracking-wider">COMPLETED</div>
                  <div className="text-sm font-bold text-blue-500">{Math.floor(progress)}%</div>
                </div>
              </div>

              {/* Minimal Progress Bar */}
              <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Footer Info */}
            <div className="flex justify-between w-full mt-2 text-[10px] text-white/20 tracking-widest uppercase">
              <span>Stable Build v2.6</span>
              <span>EST_00ms</span>
            </div>
          </div>

          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.4)_100%)] pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}