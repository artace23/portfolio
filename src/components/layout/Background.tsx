"use client";

import { useEffect, useRef, useState } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

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
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.color = `rgba(94, 234, 212, ${Math.random() * 0.3 + 0.05})`;
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

    const particlesArray: Particle[] = [];
    const particleCount = Math.min(
      80,
      Math.floor((canvas.width * canvas.height) / 15000)
    );

    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(94, 234, 212, 0.03)";
      ctx.lineWidth = 0.5;
      const gridSize = 60;

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

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(94, 234, 212, ${0.08 * (1 - distance / 150)})`;
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
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" />;
};

const FloatingElements = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="absolute left-0 inset-y-0 w-32">
      <div className="absolute top-1/4 left-4 w-3 h-3 bg-emerald-400/10 rounded-full animate-float" />
      <div className="absolute top-2/3 left-8 w-4 h-4 bg-teal-400/10 rounded-full animate-float-delayed" />
    </div>
    <div className="absolute right-0 inset-y-0 w-32">
      <div className="absolute top-1/3 right-12 w-2 h-2 bg-blue-400/10 rounded-full animate-float-slow" />
      <div className="absolute top-3/4 right-16 w-2 h-2 bg-emerald-400/10 rounded-full animate-pulse" />
    </div>
  </div>
);

const DesktopDecorations = () => (
  <div className="hidden lg:block absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-0 w-64 h-64 overflow-hidden">
      <div className="absolute top-8 left-8 w-32 h-px bg-gradient-to-r from-emerald-400/10 to-transparent rotate-45" />
      <div className="absolute top-16 left-16 w-32 h-32 border border-emerald-400/5 rounded-full animate-spin-slow" />
    </div>
    <div className="absolute top-0 right-0 w-64 h-64 overflow-hidden">
      <div className="absolute top-8 right-8 w-32 h-px bg-gradient-to-l from-blue-400/10 to-transparent -rotate-45" />
      <div className="absolute top-16 right-16 w-32 h-32 border border-blue-400/5 rounded-full animate-spin-slow-reverse" />
    </div>
  </div>
);

export const Background = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div className="fixed inset-0 bg-[#030712] z-[-2]" />
      <div className="fixed inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-blue-500/5 z-[-1]" />
      <AnimatedBackground />
      <FloatingElements />
      <DesktopDecorations />
    </>
  );
};
