'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Add theme context
import { useTheme } from 'next-themes';

// Animated background component (keep your existing code)
const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * (canvas?.width ?? window.innerWidth);
        this.y = Math.random() * (canvas?.height ?? window.innerHeight);
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(94, 234, 212, ${Math.random() * 0.5 + 0.1})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > (canvas?.width ?? window.innerWidth)) this.x = 0;
        else if (this.x < 0) this.x = canvas?.width ?? window.innerWidth;
        
        if (this.y > (canvas?.height ?? window.innerHeight)) this.y = 0;
        else if (this.y < 0) this.y = canvas?.height ?? window.innerHeight;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles
    const particlesArray: Particle[] = [];
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000));
    
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      ctx.strokeStyle = 'rgba(94, 234, 212, 0.05)';
      ctx.lineWidth = 0.5;
      const gridSize = 40;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      // Connect nearby particles
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(94, 234, 212, ${0.1 * (1 - distance/100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);
  
  // Change from absolute to fixed positioning to ensure it covers the entire page
  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

const AnimateOnScroll = ({ 
  children, 
  className = '',
  animation = 'fade-up'
}: { 
  children: React.ReactNode; 
  className?: string;
  animation?: 'fade-up' | 'fade-left' | 'fade-right'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = elementRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only set visibility if we haven't animated yet
        if (!hasAnimated) {
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            setHasAnimated(true);
            // Once animated, disconnect the observer
            observer.disconnect();
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]); // Add hasAnimated to dependency array

  const animationClasses = {
    'fade-up': {
      visible: 'translate-y-0 opacity-100 scale-100 rotate-0',
      hidden: 'translate-y-20 opacity-0 scale-95 rotate-2'
    },
    'fade-left': {
      visible: 'translate-x-0 opacity-100 scale-100 rotate-0',
      hidden: 'translate-x-20 opacity-0 scale-95 -rotate-2'
    },
    'fade-right': {
      visible: 'translate-x-0 opacity-100 scale-100 rotate-0',
      hidden: '-translate-x-20 opacity-0 scale-95 rotate-2'
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transform transition-all duration-1000 ease-out will-change-transform ${
        isVisible || hasAnimated
          ? animationClasses[animation].visible
          : animationClasses[animation].hidden
      } ${className}`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        perspective: '1000px'
      }}
    >
      {children}
    </div>
  );
};

const ClientAnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  if (!mounted) return null;
  return <AnimatedBackground />;
};



// Project card component
const ProjectCard = ({ 
  title, 
  description, 
  tags, 
  image, 
  delay,
  banner,
  link 
}: { 
  title: string; 
  description: string; 
  tags: string[]; 
  image: string; 
  delay: number;
  banner?: {
    text: string;
    color: string;
  };
  link: string;
}) => {
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px)' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    
    const multiplier = 20;
    const rotateX = ((y - rect.height / 2) / rect.height) * multiplier;
    const rotateY = ((rect.width / 2 - x) / rect.width) * multiplier;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    });
  };
  
  const handleMouseLeave = () => {
    setTiltStyle({ transform: 'perspective(1000px)' });
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleCardClick = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className="relative group cursor-pointer"
      style={{ 
        animationDelay: `${delay}ms`,
      }}
      onClick={handleCardClick}
    >
      {/* Modified glow effect that follows cursor */}
      <div 
        className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-75 transition-opacity duration-300 ease-in-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgb(52, 211, 153), rgb(59, 130, 246))`,
          filter: 'blur(8px)',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
          willChange: 'filter'
        }}
      ></div>
      <div 
        className="relative bg-gray-800 rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 ease-in-out z-10 hover:shadow-2xl"
        style={{
          ...tiltStyle,
          backfaceVisibility: 'hidden',
          transform: `${tiltStyle.transform} translateZ(0)`,
          WebkitFontSmoothing: 'subpixel-antialiased'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {banner && (
          <div className={`absolute top-4 right-0 z-20 ${banner.color} text-white text-xs py-1 px-3 rounded-l-full shadow-lg transform -skew-x-12`}>
            {banner.text}
          </div>
        )}
        <div className="relative h-48 overflow-hidden group-hover:h-56 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 z-10"></div>
          <div className="w-full h-full bg-gray-700 flex items-center justify-center text-4xl font-bold text-gray-600 overflow-hidden">
            {image ? (
              <div className="w-full h-full relative overflow-hidden rounded-t-xl">
                <Image 
                  src={image} 
                  alt={title} 
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-300" 
                  style={{
                    backfaceVisibility: 'hidden',
                    perspective: '1000px',
                    WebkitFontSmoothing: 'antialiased'
                  }}
                />
              </div>
            ) : (
              <span className="transform group-hover:scale-110 transition-transform duration-300">
                {title.substring(0, 2).toUpperCase()}
              </span>
            )}
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent bg-clip-text group-hover:bg-gradient-to-l transition-all duration-300">
            {title}
          </h3>
          <div className="relative flex-grow">
            <p className={`text-gray-300 mb-4 transition-all duration-300 ${isHovered ? 'line-clamp-none' : 'line-clamp-3'}`}>
              {description}
            </p>
            {!isHovered && description.length > 150 && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-800 to-transparent"></div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 rounded-full bg-gray-700 text-emerald-400 group-hover:bg-emerald-400/10 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Click indicator */}
          <div className="mt-3 text-xs text-gray-500 group-hover:text-emerald-400 transition-colors duration-300 flex items-center justify-center">
            <span>Click to view project</span>
            <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section header component
const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className="text-center mb-16 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent bg-clip-text">
        {title}
      </h2>
      <div className="h-0.5 w-24 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto mb-6"></div>
      <p className="text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
};

// Add this new component after your existing components
const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Left side decorative elements */}
      <div className="absolute left-0 inset-y-0 w-32">
        <div className="absolute top-1/4 left-4 w-3 h-3 bg-emerald-400/20 rounded-full animate-float-slow"></div>
        <div className="absolute top-1/3 left-12 w-2 h-2 bg-blue-400/20 rounded-full animate-float-slower"></div>
        <div className="absolute top-2/3 left-8 w-4 h-4 bg-emerald-400/20 rounded-full animate-float"></div>
        <div className="absolute top-3/4 left-16 w-2 h-2 bg-blue-400/20 rounded-full animate-pulse"></div>
      </div>
      
      {/* Right side decorative elements */}
      <div className="absolute right-0 inset-y-0 w-32">
        <div className="absolute top-1/4 right-4 w-3 h-3 bg-blue-400/20 rounded-full animate-float-slow"></div>
        <div className="absolute top-1/2 right-12 w-2 h-2 bg-emerald-400/20 rounded-full animate-float-slower"></div>
        <div className="absolute top-2/3 right-8 w-4 h-4 bg-blue-400/20 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-16 w-2 h-2 bg-emerald-400/20 rounded-full animate-pulse"></div>
      </div>
      
      {/* Diagonal lines */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-16 h-px bg-gradient-to-r from-emerald-400/10 to-transparent transform rotate-45"></div>
        <div className="absolute top-1/3 right-0 w-16 h-px bg-gradient-to-l from-blue-400/10 to-transparent transform -rotate-45"></div>
        <div className="absolute bottom-1/4 left-0 w-16 h-px bg-gradient-to-r from-blue-400/10 to-transparent transform -rotate-45"></div>
        <div className="absolute bottom-1/3 right-0 w-16 h-px bg-gradient-to-l from-emerald-400/10 to-transparent transform rotate-45"></div>
      </div>
    </div>
  );
};

// Add this new component
const DesktopDecorations = () => {
  return (
    <div className="hidden lg:block absolute inset-0 pointer-events-none">
      {/* Top left decorative corner */}
      <div className="absolute top-0 left-0 w-64 h-64">
        <div className="absolute top-8 left-8 w-32 h-px bg-gradient-to-r from-emerald-400/20 to-transparent transform rotate-45"></div>
        <div className="absolute top-16 left-16 w-16 h-16 border border-emerald-400/10 rounded-full animate-spin-slow"></div>
        <div className="absolute top-24 left-24 w-2 h-2 bg-emerald-400/30 rounded-full animate-pulse"></div>
      </div>
      
      {/* Top right decorative corner */}
      <div className="absolute top-0 right-0 w-64 h-64">
        <div className="absolute top-8 right-8 w-32 h-px bg-gradient-to-l from-blue-400/20 to-transparent transform -rotate-45"></div>
        <div className="absolute top-16 right-16 w-16 h-16 border border-blue-400/10 rounded-full animate-spin-slow-reverse"></div>
        <div className="absolute top-24 right-24 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
      </div>
      
      {/* Floating dots */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-emerald-400/40 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-emerald-400/40 rounded-full animate-float-slow"></div>
      </div>
    </div>
  );
};

const CertificationCard = ({ 
  title, 
  issuer, 
  date, 
  image, 
  link 
}: { 
  title: string;
  issuer: string;
  date: string;
  image: string;
  link: string;
}) => {
  const handleCardClick = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className="relative group min-w-[300px] h-[400px] mx-4 transition-all duration-300 hover:scale-110 hover:z-10 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
      <div className="relative h-full bg-gray-800 overflow-hidden rounded-xl">
        <div className="h-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 z-10"></div>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent bg-clip-text">
            {title}
          </h3>
          <p className="text-gray-300 mb-2">{issuer}</p>
          <p className="text-sm text-emerald-400 mb-3">{date}</p>
          
          {/* Click indicator */}
          <div className="text-xs text-gray-500 group-hover:text-emerald-400 transition-colors duration-300 flex items-center justify-center">
            <span>Click to view certificate</span>
            <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const CertificationsSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(null);
  const [duplicateCount, setDuplicateCount] = useState(3);

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isHovered || isDragging) return;

    const scroll = () => {
      if (!scrollContainer) return;
      scrollContainer.scrollLeft += 0.5;

      // Reset scroll position when reaching halfway to create seamless loop
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
    };

    const startAnimation = () => {
      scroll();
      animationRef.current = requestAnimationFrame(startAnimation);
    };

    animationRef.current = requestAnimationFrame(startAnimation);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, isDragging]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  // Touch drag handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const certifications = [
    {
      title: "PHP Laravel: Build Amazing Streaming Service",
      issuer: "Udemy.com",
      date: "2025",
      image: "/images/certificates/Certificate Laravel Streaming Service.jpg",
      link: "https://www.udemy.com/certificate/UC-03444cc4-0302-407c-9c70-f19530198a19/"
    },
    {
      title: "Python for Everyone Master the Basics of Programming",
      issuer: "Udemy.com",
      date: "2025",
      image: "/images/certificates/Certificate Python master basics programming.jpg",
      link: "https://www.udemy.com/certificate/UC-4b209ae5-1315-4a55-b8c8-2ad59b5640a3/"
    },
    {
      title: "React JS: TypeScript, Redux, RTK & Modern Web Dev 2025",
      issuer: "Udemy.com",
      date: "2025",
      image: "/images/certificates/Certificate React,typescript 2025.jpg",
      link: "https://www.udemy.com/certificate/UC-8a783253-2605-460d-bf0a-37a0544a694d/"
    }
  ];

  // Create multiple duplicates for seamless infinite scroll
  const duplicatedCertifications = Array(duplicateCount).fill(certifications).flat();

  return (
    <section className="py-20 relative">
      <SectionHeader
        title="Certifications"
        subtitle="Professional certifications and achievements"
      />
      
      <div className="max-w-full mx-auto">
        {/* Instructions for mobile users */}
        <div className="text-center mb-6 md:hidden">
          <p className="text-sm text-gray-400">Swipe left/right to browse certificates</p>
        </div>
        
        <div 
          ref={scrollRef}
          className={`overflow-x-auto scrollbar-hide select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex space-x-6 py-8 px-4">
            {duplicatedCertifications.map((cert, index) => (
              <CertificationCard
                key={`${cert.title}-${index}`}
                {...cert}
              />
            ))}
          </div>
        </div>
        
        {/* Desktop instructions */}
        <div className="text-center mt-6 hidden md:block">
          <p className="text-sm text-gray-400">Hover to pause • Drag to scroll • Click certificates to view</p>
        </div>
      </div>
    </section>
  );
};

// Add these new animations to your tailwind.config.js
// In your Home component, add the FloatingElements component:
export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Refs for scroll functionality
  const projectsRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    setMounted(true);
    
    // Remove loading class after mounting
    const timeoutId = setTimeout(() => {
      document.body.classList.remove('loading');
    }, 1000); // Adjust timing as needed
    
    return () => {
      setMounted(false);
      clearTimeout(timeoutId);
      document.body.classList.remove('loading');
    };
  }, []);

  // Scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) return null;
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-gray-900 text-white transition-colors duration-300">
      {/* Background that adapts to theme */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-gray-800 z-0 transition-colors duration-300"></div>
      <ClientAnimatedBackground />
      <FloatingElements />
      
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center px-4 relative">
        <DesktopDecorations />
        {/* Content */}
        <div className="z-10 max-w-4xl w-full flex flex-col items-center text-center space-y-8 animate-fade-in">
          {/* Profile image with enhanced animation */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-400 shadow-lg shadow-emerald-500/20 animate-float group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-3xl font-bold relative overflow-hidden transition-transform duration-300 transform group-hover:scale-110">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 animate-pulse"></div>
              AD
            </div>
          </div>
          
          {/* Enhanced name and title with animation */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent bg-clip-text animate-gradient">
              ART III DELA CRUZ
            </h1>
            <div className="h-0.5 w-24 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto transform transition-all duration-300 hover:w-32"></div>
            <p className="text-xl text-gray-300 font-light">
              <span className="text-emerald-400">Full Stack Developer</span> | 
              <span className="text-blue-400"> IoT Developer</span> | 
              <span className="text-emerald-300"> Mobile App Development</span>
            </p>
          </div>
          
          {/* Dynamic intro text */}
          <div className="mx-auto h-6">
            <p className="typing-multi-animation pr-1 text-gray-300 min-h-[24px] font-medium">
            </p>
          </div>
          
          {/* Enhanced CTA Buttons with hover effects */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <button
              onClick={() => projectsRef.current && scrollToSection(projectsRef as React.RefObject<HTMLElement>)}
              className="rounded-full border border-solid border-transparent transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-blue-600 text-white gap-2 hover:from-emerald-600 hover:to-blue-700 hover:scale-105 font-medium text-sm sm:text-base h-12 px-8 group cursor-pointer"
            >
              View My Work
              <svg className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button
              onClick={() => contactRef.current && scrollToSection(contactRef as React.RefObject<HTMLElement>)}
              className="rounded-full border border-solid border-emerald-400/30 transition-all duration-300 flex items-center justify-center hover:bg-emerald-400/10 hover:scale-105 font-medium text-sm sm:text-base h-12 px-8 cursor-pointer"
            >
              Contact Me
            </button>
          </div>
          
          {/* Enhanced Social links with animations */}
          <div className="flex gap-6 mt-6 animate-slide-up" style={{ animationDelay: "0.7s" }}>
            {/* GitHub */}
            <a href="https://github.com/artace23" target="_blank" rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 transform"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/art-iii-dela-cruz-621879157/" target="_blank" rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 transform"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Enhanced Scroll indicator */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:text-emerald-400 transition-colors duration-300"
          onClick={() => projectsRef.current && scrollToSection(projectsRef as React.RefObject<HTMLElement>)}
        >
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
      
      {/* Projects Section */}
      <section ref={projectsRef} id="projects" className="py-20 px-4 relative">
        <div className="container mx-auto relative z-10">
          <SectionHeader 
            title="My Projects" 
            subtitle="Here are some of my recent projects. Each one represents a unique challenge and solution."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Cross Blazers Cup Website",
                description: "A responsive and collaborative website developed for the Cross Blazers Cup, highlighting the team's achievements, schedules, and upcoming events. Built with a modern, user-friendly design, the project was a group effort, and my primary contribution focused on implementing the tabulation system for tracking game results and team standings.",
                tags: ["Next.js", "Supabase", "Tailwind CSS"],
                image: "/images/projects/crossblazers_website.png",
                link: "https://hcdc.crossblazerscup.com/",
                delay: 700
              },
              {
                title: "SmarTrax Mobile App",
                description: "A capstone group project focused on providing a smart bike and e-bike rental solution. The app allows users to locate, unlock, and rent bikes or e-bikes using QR scanning, manage ride history, and monitor their wallet balance. It features real-time tracking, Firebase integration for authentication and data storage, and a clean, mobile-friendly UI.",
                tags: ["React Native", "Firebase", "PHP", "MySQL"],
                image: "/images/projects/smartrax_project.jpg",
                link: "https://github.com/artace23",
                delay: 300,
                banner: {
                  text: "Presented at Hong Kong CCCIS(2025) 5th Conference",
                  color: "bg-gradient-to-r from-emerald-400 to-blue-500"
                }
              },
              {
                title: "Queue Management System",
                description: "A full-featured queue management system designed to streamline service flow in offices or service centers. It includes modules for managing staff accounts, service windows, and customer transactions, ensuring efficient queuing and real-time updates.",
                tags: ["Laravel", "PHP", "MySQL", "Blade"],
                image: "/images/projects/queue_project.png",
                link: "https://github.com/artace23/QMS_development",
                delay: 100
              },
              {
                title: "District Management System",
                description: "A comprehensive web-based system designed to streamline administrative tasks and citizen records within a barangay. It includes modules for managing resident profiles, barangay clearances, certificates, and official announcements.",
                tags: ["PHP", "Laravel", "Blade", "Tailwind CSS"],
                image: "/images/projects/barangay_system.png",
                link: "http://sk-buhangin-district.great-site.net/",
                delay: 500
              },              
              // {
              //   title: "Car Navigation App",
              //   description: "A currently under develop car mobile application that allows users to navigate their car using voice commands. It leverages Google's speech recognition API to convert spoken commands into actionable instructions for the car's navigation system.",
              //   tags: ["React Native", "Firebase", "Google Speech API", "Google Maps API"],
              //   image: "",
              //   link: "https://github.com/artace23",
              //   delay: 900
              // },
              {
                title: "Easy Budget App",
                description: "A user-friendly mobile application designed to help users manage their personal finances effectively. Built with React Native and Firebase, it offers features like expense tracking, budget planning, and financial insights to help users make informed financial decisions.",
                tags: ["React Native", "Firebase", "Typescript"],
                image: "/images/projects/easybudget_project.jpg",
                link: "https://github.com/artace23/EasyBudget-App",
                delay: 900
              },
              {
                title: "Portfolio Website",
                description: "This very website! A showcase of my skills and projects built with modern web technologies. Built using Next.js 14 with TypeScript for type safety, styled with Tailwind CSS for a responsive design, and featuring smooth animations and interactive elements. The site includes a dynamic particle background, project cards with 3D hover effects, and sections for showcasing my projects, skills, and certifications. All components are custom-built with performance and accessibility in mind.",
                tags: ["Next.js", "TypeScript", "Tailwind CSS"],
                image: "/images/projects/portfolio.png",
                link: "https://artdelacruz.vercel.app",
                delay: 1100
              }
            ].map((project, index) => (
              <AnimateOnScroll 
                key={project.title}
                animation={index % 2 === 0 ? 'fade-left' : 'fade-right'}
                className="h-full"
              >
                <ProjectCard {...project} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-20 px-4 relative">
        <div className="container mx-auto relative z-10">
          <SectionHeader 
            title="About Me" 
            subtitle="Learn more about my background, skills, and what drives me as a developer."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* About image */}
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              <div className="relative rounded-xl overflow-hidden border-2 border-emerald-400/20 shadow-lg shadow-emerald-500/10"><div className="aspect-w-4 aspect-h-3 bg-gray-800 flex items-center justify-center">
                  <Image
                    src="/images/profile.jpg"
                    alt="Art III Dela Cruz"
                    width={800}
                    height={800}
                    className="object-cover w-full h-full"
                    quality={100}
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-blue-500/10"></div>
              </div>
            </div>
            
            {/* About content */}
            <div className="space-y-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
              <h3 className="text-2xl font-bold text-white">My Journey</h3>
              <p className="text-gray-300">
                I'm a passionate Full Stack Developer with expertise in building modern web applications. 
                With a background in both front-end and back-end technologies, I create seamless, 
                user-focused experiences that solve real-world problems.
              </p>
              
              {/* Modern Achievements Section */}
              <div className="mt-8">
                <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl font-bold text-white">Achievements</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-emerald-400/20 to-transparent"></div>
                </div>
                
                <div className="relative group">
                  {/* Modern Navigation Buttons */}
                  <button 
                    onClick={() => {
                      const container = document.getElementById('achievements-container');
                      if (container) {
                        container.scrollBy({ left: -320, behavior: 'smooth' });
                      }
                    }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 border border-white/20 hover:border-emerald-400/50 shadow-lg hover:shadow-emerald-400/25 opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={() => {
                      const container = document.getElementById('achievements-container');
                      if (container) {
                        container.scrollBy({ left: 320, behavior: 'smooth' });
                      }
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 border border-white/20 hover:border-emerald-400/50 shadow-lg hover:shadow-emerald-400/25 opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {/* Modern Scrollable Container */}
                  <div 
                    id="achievements-container"
                    className="overflow-x-auto scrollbar-hide px-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    <div className="flex gap-6 pb-6" style={{ width: 'max-content' }}>
                      {/* Modern Achievement Cards */}
                      <div className="group/card relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm p-6 rounded-2xl border border-white/10 min-w-[320px] max-w-[380px] flex-shrink-0 hover:border-emerald-400/30 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-400/10">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-blue-500/5 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Icon */}
                        <div className="relative mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <h4 className="font-semibold text-lg text-white mb-2 group-hover/card:text-emerald-400 transition-colors duration-300">Capstone Project Showcase</h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            Officially selected to represent Holy Cross of Davao College at the CCCIS 2025 Conference in Hong Kong, China.
                          </p>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-60"></div>
                        <div className="absolute bottom-4 right-6 w-1 h-1 bg-blue-500 rounded-full opacity-40"></div>
                      </div>
                      
                      <div className="group/card relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm p-6 rounded-2xl border border-white/10 min-w-[320px] max-w-[380px] flex-shrink-0 hover:border-emerald-400/30 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-400/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-blue-500/5 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <h4 className="font-semibold text-lg text-white mb-2 group-hover/card:text-emerald-400 transition-colors duration-300">Recognition</h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            Awarded "Best Presenter" for presenting the capstone project titled "SmarTrax" in Parallel 1 - Data Innovation.
                          </p>
                        </div>
                        
                        <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-60"></div>
                        <div className="absolute bottom-4 right-6 w-1 h-1 bg-blue-500 rounded-full opacity-40"></div>
                      </div>
                      
                      <div className="group/card relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm p-6 rounded-2xl border border-white/10 min-w-[320px] max-w-[380px] flex-shrink-0 hover:border-emerald-400/30 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-400/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-blue-500/5 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <h4 className="font-semibold text-lg text-white mb-2 group-hover/card:text-emerald-400 transition-colors duration-300">Programming Competition</h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            Secured 1st place in the Programming Competition organized by ITS organization in Holy Cross of Davao College in the year 2023.
                          </p>
                        </div>
                        
                        <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-60"></div>
                        <div className="absolute bottom-4 right-6 w-1 h-1 bg-blue-500 rounded-full opacity-40"></div>
                      </div>
                      
                      <div className="group/card relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm p-6 rounded-2xl border border-white/10 min-w-[320px] max-w-[380px] flex-shrink-0 hover:border-emerald-400/30 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-400/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-blue-500/5 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <h4 className="font-semibold text-lg text-white mb-2 group-hover/card:text-emerald-400 transition-colors duration-300">TOPCIT Level 2 Achiever</h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            Attained Level 2 certification in three consecutive TOPCIT examinations in the Philippines during 2023-2024, demonstrating consistent technical proficiency.
                          </p>
                        </div>
                        
                        <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-60"></div>
                        <div className="absolute bottom-4 right-6 w-1 h-1 bg-blue-500 rounded-full opacity-40"></div>
                      </div>
                      
                      <div className="group/card relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm p-6 rounded-2xl border border-white/10 min-w-[320px] max-w-[380px] flex-shrink-0 hover:border-emerald-400/30 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-400/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-blue-500/5 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <h4 className="font-semibold text-lg text-white mb-2 group-hover/card:text-emerald-400 transition-colors duration-300">HCDC Intramurals Tabulation System</h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            Developed a comprehensive tabulation system for HCDC intramural games, enabling efficient scoring and results tracking across multiple sports events
                          </p>
                        </div>
                        
                        <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-60"></div>
                        <div className="absolute bottom-4 right-6 w-1 h-1 bg-blue-500 rounded-full opacity-40"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Modern Progress Indicator */}
                  <div className="flex justify-center mt-6">
                    <div className="flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-400 font-medium">Scroll to explore achievements</span>
                      <div className="w-2 h-2 ybg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Added Experience Section */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-white mb-4">Experience</h3>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-emerald-400/20">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-emerald-400">Front-End Developer Intern</h4>
                      <span className="text-sm text-gray-400">Feb 2025 - Present</span>
                    </div>
                    <p className="text-gray-300 mb-2">Jairosoft Inc.</p>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Designed and implemented responsive web applications using Next.js and Tailwind CSS</li>
                      <li>Enhanced performance by 40% through efficient state management and code optimization</li>
                      <li>Collaborated in Agile teams and contributed to code quality through regular reviews</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-emerald-400/20">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-emerald-400">Full Stack Developer</h4>
                      <span className="text-sm text-gray-400">2021 - Present</span>
                    </div>
                    <p className="text-gray-300 mb-2">Freelance</p>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Developed and deployed client websites, custom IoT solutions, and full-stack web applications</li>
                      <li>Implemented responsive, user-centric UI designs using modern front-end frameworks</li>
                      <li>Integrated third-party APIs, authentication systems, and payment gateways</li>
                      <li>Collaborated with clients to gather requirements, propose solutions, and deliver results on time</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mt-8">My Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-emerald-400">Frontend</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li>React / Next.js</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>PHP Laravel/Native</li>
                    <li>React Native (Mobile)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-emerald-400">Backend</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li>Node.js / Express</li>
                    <li>MongoDB / PostgreSQL</li>
                    <li>AWS / Firebase</li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-6">
                <button
                  onClick={() => contactRef.current && scrollToSection(contactRef as React.RefObject<HTMLElement>)}
                  className="rounded-full border border-solid border-emerald-400/30 transition-colors flex items-center justify-center hover:bg-emerald-400/10 font-medium text-sm h-12 px-8"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CertificationsSection />
      
      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-20 px-4 relative">
        <div className="container mx-auto relative z-10">
          <SectionHeader 
            title="Contact Me" 
            subtitle="Interested in working together? Let's connect and discuss your project."
          />
          
          <div className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <form className="space-y-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="What would you like to discuss?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>
              
              <button 
                type="submit"
                className="w-full rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gradient-to-r from-emerald-500 to-blue-600 text-white gap-2 hover:from-emerald-600 hover:to-blue-700 font-medium text-sm h-12"
              >
                Send Message
              </button>
            </form>
          </div>
          
          {/* Alternative contact methods */}
          <div className="mt-12 flex flex-col md:flex-row justify-center gap-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <a href="mailto:artace23@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-emerald-400 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>artace23@gmail.com</span>
            </a>
            <a href="tel:+639654298604" className="flex items-center gap-3 text-gray-300 hover:text-emerald-400 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+63 965 429 8604</span>
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800 relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Art III Dela Cruz. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="https://github.com/artace23" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/art-iii-dela-cruz-621879157/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
