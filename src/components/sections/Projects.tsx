"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";

const projects = [
  {
    title: "Cross Blazers Cup Website",
    description: "A responsive and collaborative website developed for the Cross Blazers Cup, highlighting achievements, schedules, and events. Implemented the tabulation system for tracking game results and team standings.",
    tags: ["Next.js", "Supabase", "Tailwind CSS"],
    image: "/images/projects/crossblazers_website.png",
    link: "https://hcdc.crossblazerscup.com/",
    github: "https://github.com/artace23",
  },
  {
    title: "SmarTrax Mobile App",
    description: "A smart bike/e-bike rental solution featuring QR unlocking, ride history, and wallet management. Featured real-time tracking and Firebase integration. Capstone project presented at CCCIS 2025.",
    tags: ["React Native", "Firebase", "PHP", "MySQL"],
    image: "/images/projects/smartrax_project.jpg",
    link: "https://github.com/artace23/smartrax",
    github: "https://github.com/artace23/smartrax",
    banner: {
      text: "Awarded Best Presenter @ CCCIS 2025",
      color: "bg-gradient-to-r from-emerald-500 to-blue-600",
    },
  },
  {
    title: "Queue Management System",
    description: "Full-featured QMS designed to streamline service flow in offices. Includes modules for staff accounts, service windows, and real-time transaction updates.",
    tags: ["Laravel", "PHP", "MySQL", "Blade"],
    image: "/images/projects/queue_project.png",
    link: "https://github.com/artace23/QMS_development",
    github: "https://github.com/artace23/QMS_development",
  },
  {
    title: "District Management System",
    description: "Comprehensive barangay administrative system for resident profiles, clearances, certificates, and official announcements.",
    tags: ["PHP", "Laravel", "Blade", "Tailwind CSS"],
    image: "/images/projects/barangay_system.png",
    link: "http://sk-buhangin-district.great-site.net/",
    github: "https://github.com/artace23",
  },
  {
    title: "Easy Budget App",
    description: "User-friendly personal finance app with expense tracking, budget planning, and financial insights built with React Native.",
    tags: ["React Native", "Firebase", "Typescript"],
    image: "/images/projects/easybudget_project.jpg",
    link: "https://github.com/artace23/EasyBudget-App",
    github: "https://github.com/artace23/EasyBudget-App",
  },
  {
    title: "Portfolio Website",
    description: "The very site you are viewing! Built with Next.js 15, Framer Motion, and Tailwind CSS. Features 3D interactions and smooth animations.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/images/projects/portfolio.png",
    link: "https://artdelacruz.vercel.app",
    github: "https://github.com/artace23/portfolio",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 px-4 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Featured Projects"
          subtitle="Explore my latest work, ranging from web systems to mobile applications and IoT solutions."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};
