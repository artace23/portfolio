'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

export default function ClientLoadingWrapper({ 
  children 
}: { 
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  
  // Force loading state to be true on initial render
  useEffect(() => {
    setLoading(true);
  }, []);
  
  const handleLoadingComplete = () => {
    setLoading(false);
  };
  
  return (
    <>
      {loading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
        {children}
      </div>
    </>
  );
}