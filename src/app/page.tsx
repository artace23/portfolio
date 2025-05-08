'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

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
        isVisible 
          ? animationClasses[animation].visible
          : hasAnimated 
            ? animationClasses[animation].hidden
            : 'opacity-0'
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
  link, 
  delay,
  banner 
}: { 
  title: string; 
  description: string; 
  tags: string[]; 
  image: string; 
  link: string;
  delay: number;
  banner?: {
    text: string;
    color: string;
  };
}) => {
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px)' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update mouse position for gradient
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
  };
  
  return (
    <div 
      className="relative group"
      style={{ 
        animationDelay: `${delay}ms`,
      }}
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
        className="relative bg-gray-800 rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 ease-in-out z-10"
        style={{
          ...tiltStyle,
          backfaceVisibility: 'hidden',
          transform: `${tiltStyle.transform} translateZ(0)`,
          WebkitFontSmoothing: 'subpixel-antialiased'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
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
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" 
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
          <p className="text-gray-300 mb-4 flex-grow">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 rounded-full bg-gray-700 text-emerald-400 group-hover:bg-emerald-400/10 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
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

// Add these new animations to your tailwind.config.js
// In your Home component, add the FloatingElements component:
export default function Home() {
  // Refs for scroll functionality
  const projectsRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  
  // Scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Full-page background that extends to all sections */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-gray-800 z-0"></div>
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
              className="rounded-full border border-solid border-transparent transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-blue-600 text-white gap-2 hover:from-emerald-600 hover:to-blue-700 hover:scale-105 font-medium text-sm sm:text-base h-12 px-8 group"
            >
              View My Work
              <svg className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button
              onClick={() => contactRef.current && scrollToSection(contactRef as React.RefObject<HTMLElement>)}
              className="rounded-full border border-solid border-emerald-400/30 transition-all duration-300 flex items-center justify-center hover:bg-emerald-400/10 hover:scale-105 font-medium text-sm sm:text-base h-12 px-8"
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
                link: "https://github.com/artace23",
                delay: 100
              },
              {
                title: "Barangay Management System",
                description: "A comprehensive web-based system designed to streamline administrative tasks and citizen records within a barangay. It includes modules for managing resident profiles, barangay clearances, certificates, and official announcements.",
                tags: ["PHP", "Laravel", "Blade", "Tailwind CSS"],
                image: "/images/projects/barangay_system.png",
                link: "https://github.com/artace23",
                delay: 500
              },              
              {
                title: "Mobile Application",
                description: "Mobile application for tracking workouts, nutrition, and progress with personalized recommendations.",
                tags: ["React Native", "GraphQL", "AWS"],
                image: "",
                link: "https://github.com/artace23",
                delay: 900
              },
              {
                title: "Portfolio Website",
                description: "This very website! A showcase of my skills and projects built with modern web technologies.",
                tags: ["Next.js", "TypeScript", "Tailwind CSS"],
                image: "",
                link: "https://github.com/artace23",
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
              
              {/* Added Achievements Section */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-white mb-4">Achievements</h3>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-emerald-400/20">
                    <h4 className="font-medium text-emerald-400">Capstone Project Showcase</h4>
                    <p className="text-gray-300">
                      Officially selected to represent Holy Cross of Davao College at the CCCIS 2025 Conference in Hong Kong, China.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-emerald-400/20">
                    <h4 className="font-medium text-emerald-400">Recognition</h4>
                    <p className="text-gray-300">Awarded "Best Innovation" for developing an AI-powered task management system</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-emerald-400/20">
                    <h4 className="font-medium text-emerald-400">Leadership</h4>
                    <p className="text-gray-300">Led a team of 5 developers in delivering enterprise-level applications</p>
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
                    <li>UI/UX Design</li>
                    <li>PHP Laravel/Native</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-emerald-400">Backend</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li>Node.js / Express</li>
                    <li>MongoDB / PostgreSQL</li>
                    <li>RESTful APIs</li>
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
