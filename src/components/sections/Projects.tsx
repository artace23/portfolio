"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";

const projects = [
  {
    title: "FocusFlow",
    description: "A productivity and focus management mobile app built with Apache Cordova, helping users build better work habits through focus sessions, task tracking, and analytics.",
    problem: "Users struggle to maintain consistent work habits due to fragmented tools for focus, task management, and progress tracking.",
    solution: "Built a cross-platform mobile app with a Pomodoro-style Flow Ring timer, priority-based task management, real-time session statistics, and configurable preferences — all stored locally for a privacy-first experience.",
    impact: "Delivered a fully offline-capable mobile app running natively on Android via Cordova, featuring animated progress rings, daily goal tracking, and a 7-day activity chart.",
    tags: ["Apache Cordova", "JavaScript", "HTML/CSS", "Android"],
    image: "/images/projects/FocusFlow.png",
    link: "https://github.com/artace23",
    github: "https://github.com/artace23",
    isFeatured: true,
    banner: {
      text: "Cross-Platform Mobile",
      color: "bg-gradient-to-r from-orange-500 to-amber-500",
    },
  },
  {
    title: "CoreGPass",
    description: "A premium SaaS gym management ecosystem with real-time QR check-in capabilities and multi-tenant admin dashboards.",
    problem: "Gym owners struggle with manual check-ins, fragmented member data, and lack of real-time attendance tracking.",
    solution: "Architected a high-performance SaaS platform with sub-second QR verification, automated membership billing, and a centralized management hub.",
    impact: "Optimized operations for multiple gym facilities, enabling 100% automated check-ins and providing owners with data-driven growth insights.",
    tags: ["ReactJS", "Supabase", "TypeScript", "SaaS"],
    image: "/images/projects/coregpass.png",
    link: "https://coregpass.vercel.app/login",
    github: "https://github.com/artace23",
    isFeatured: true,
    banner: {
      text: "Production SaaS",
      color: "bg-blue-600",
    },
  },
  {
    title: "AwakenSystem",
    description: "A gamified productivity ecosystem that bridges the gap between daily tasks and RPG-style character progression.",
    problem: "Traditional productivity tools fail to sustain long-term user motivation due to lack of immediate feedback loops.",
    solution: "Integrated a real-time character development system where task completion translates directly into attribute growth and unlockable rewards.",
    impact: "Created a high-retention environment for personal goal setting, currently being expanded with Supabase for real-time multiplayer features.",
    tags: ["React Native", "Supabase", "TypeScript", "Tailwind CSS"],
    image: "/images/projects/AwakenSystem.png",
    link: "https://github.com/artace23/AwakenSystem",
    github: "https://github.com/artace23/AwakenSystem",
    isFeatured: true,
  },
  {
    title: "SmarTrax Mobile",
    description: "An end-to-end IoT solution for smart micro-mobility management, from hardware unlocking to wallet payments.",
    problem: "Urban micro-mobility faces friction in seamless vehicle unlocking and secure, transparent payment processing.",
    solution: "Developed a cross-platform mobile app with QR-based hardware integration, real-time Firebase tracking, and an automated wallet system.",
    impact: "Awarded Best Presenter @ CCCIS 2025. Successfully demonstrated zero-latency hardware response for bike rental operations.",
    tags: ["React Native", "Firebase", "PHP", "IoT"],
    image: "/images/projects/smartrax_project.jpg",
    link: "https://github.com/artace23/smartrax",
    github: "https://github.com/artace23/smartrax",
    isFeatured: true,
    banner: {
      text: "Awarded Best Presenter @ CCCIS 2025",
      color: "bg-gradient-to-r from-blue-600 to-indigo-600",
    },
  },
  {
    title: "ArdStreaming",
    description: "A high-performance media streaming platform engineered for zero-latency content delivery and optimized visual experiences.",
    problem: "Large media assets and high-resolution streaming often lead to significant layout shifts and slow initial load times (LCP).",
    solution: "Engineered a custom media delivery pipeline with automated image optimization and lazy-loading strategies.",
    impact: "Boosted LCP by 25% and achieved a near-perfect Lighthouse performance score across all media-heavy pages.",
    tags: ["Next.js", "Tailwind CSS", "Media Optimization", "Vercel"],
    image: "/images/projects/ArdStreaming.png",
    link: "https://ardstreamingmovies.vercel.app",
    github: "https://github.com/artace23/ardstreamingmovies",
  },
  {
    title: "Queue Management System",
    description: "Enterprise-grade service flow optimization tool designed for high-traffic office environments.",
    problem: "Physical queuing leads to operational inefficiencies and poor user experiences in public service offices.",
    solution: "Built a multi-module system featuring staff dashboards, service window management, and real-time live transaction feeds.",
    impact: "Reduced perceived wait times by 35% through better queue distribution and transparent status updates.",
    tags: ["Laravel", "PHP", "MySQL", "Blade"],
    image: "/images/projects/queue_project.png",
    link: "https://github.com/artace23/QMS_development",
    github: "https://github.com/artace23/QMS_development",
  },
  {
    title: "Easy Budget",
    description: "A precision-focused personal finance manager designed for rapid expense tracking and financial health visualization.",
    problem: "Complexity in financial apps often leads to user churn and inconsistent expense logging.",
    solution: "Streamlined the data entry process to under 3 seconds using a custom UI architecture and automated categorization.",
    impact: "Helping users achieve 20% higher savings rates through clear, actionable financial insights.",
    tags: ["React Native", "Firebase", "Typescript"],
    image: "/images/projects/easybudget_project.jpg",
    link: "https://github.com/artace23/EasyBudget-App",
    github: "https://github.com/artace23/EasyBudget-App",
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-16 md:py-32 px-4 sm:px-6 bg-[#0A0A0A] relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Product Lab"
          subtitle="A selection of shipped products and engineered solutions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 w-full">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

