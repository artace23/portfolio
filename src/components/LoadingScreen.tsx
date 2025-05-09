'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING');
  const [particles] = useState(() => 
    Array.from({ length: 20 }, () => ({
      size: Math.random() * 4 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2
    }))
  );
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const loadingTexts = [
      'INITIALIZING SYSTEMS',
      'LOADING ASSETS',
      'RENDERING ENVIRONMENT',
      'ESTABLISHING CONNECTION',
      'CALIBRATING INTERFACE',
      'FINALIZING'
    ];
    
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 2;
        
        const textIndex = Math.min(
          Math.floor(newProgress / 20),
          loadingTexts.length - 1
        );
        setLoadingText(loadingTexts[textIndex]);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 150);
    
    return () => {
      document.body.style.overflow = 'auto';
      clearInterval(interval);
    };
  }, [onLoadingComplete]);
  
  return (
    <div className="fixed inset-0 bg-gray-900 flex justify-center items-center z-50 font-mono text-white overflow-hidden">
      {/* Keep all background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-gray-800">
        {/* Add animated grid lines */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`grid-${i}`}
              className="absolute h-px w-full bg-emerald-400/20 transform animate-pulse"
              style={{ top: `${i * 5}%`, animationDelay: `${i * 0.1}s` }}
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`grid-vertical-${i}`}
              className="absolute w-px h-full bg-emerald-400/20 transform animate-pulse"
              style={{ left: `${i * 5}%`, animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute bg-emerald-400/10 rounded-full animate-pulse"
              style={{
                
              }}
            />
          ))}
        </div>
      </div>

      {/* Add scanning line effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(transparent, rgba(52, 211, 153, 0.05), transparent)',
          backgroundSize: '100% 10px',
          animation: 'scan 2s linear infinite'
        }}
      />

      <div className="w-4/5 max-w-2xl flex flex-col items-center gap-8 relative z-10">
        {/* Title with enhanced glitch effect */}
        <div className="text-4xl font-bold tracking-widest flex items-center">
          <span className="text-emerald-400 mx-2 animate-pulse">[</span>
          <span className="loading-text" data-text={loadingText}>
            {loadingText}
          </span>
          <span className="text-emerald-400 mx-2 animate-pulse">]</span>
        </div>
        
        {/* Progress bar with glitch effect */}
        <div className="w-full h-2 bg-gray-800/50 rounded-full overflow-hidden relative">
          <div 
            className="h-full bg-gradient-to-r from-emerald-400 via-blue-500 to-emerald-400 rounded-full transition-all duration-300 relative overflow-hidden bg-[length:200%_auto] animate-gradient glitch-progress"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white/30 rounded-full blur-sm animate-pulse"></div>
          </div>
        </div>
        
        {/* Status display with enhanced glitch effects */}
        <div className="w-full flex justify-between text-sm text-gray-400">
          <div className="relative pl-5 flex items-center gap-2">
            <span className="absolute left-0 text-emerald-400 animate-blink">&gt;</span>
            <span className="text-emerald-400 font-bold glitch-small" data-text={`${Math.floor(progress)}%`}>
              {Math.floor(progress)}%
            </span>
            <span className="h-4 w-[1px] bg-emerald-400/30"></span>
            <span className="text-gray-400 uppercase tracking-wider glitch-small" data-text={loadingText}>
              {loadingText}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
            <span className="text-emerald-400 glitch-small" data-text="SYSTEM ONLINE">
              SYSTEM ONLINE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}