'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING');
  
  useEffect(() => {
    const loadingTexts = [
      'INITIALIZING',
      'LOADING ASSETS',
      'RENDERING ENVIRONMENT',
      'ESTABLISHING CONNECTION',
      'FINALIZING'
    ];
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 5;
        
        // Update loading text based on progress
        const textIndex = Math.min(
          Math.floor(newProgress / 20),
          loadingTexts.length - 1
        );
        setLoadingText(loadingTexts[textIndex]);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Allow animation to complete before hiding
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          
          return 100;
        }
        return newProgress;
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, [onLoadingComplete]);
  
  return (
    <div className="fixed inset-0 bg-gray-900 flex justify-center items-center z-50 font-mono text-white">
      <div className="w-4/5 max-w-2xl flex flex-col items-center gap-8">
        <div className="text-4xl font-bold tracking-widest flex items-center animate-pulse">
          <span className="text-emerald-400 mx-2">[</span>
          <span className="bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent bg-clip-text">INITIATING</span>
          <span className="text-emerald-400 mx-2">]</span>
        </div>
        
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden relative">
          <div 
            className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full transition-all duration-300 relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
        
        <div className="w-full flex justify-between text-sm text-gray-400">
          <div className="relative pl-5">
            <span className="absolute left-0 text-emerald-400 animate-blink">&gt;</span>
            {loadingText}
          </div>
          <div className="text-emerald-400 font-bold">{Math.floor(progress)}%</div>
        </div>
      </div>
    </div>
  );
}