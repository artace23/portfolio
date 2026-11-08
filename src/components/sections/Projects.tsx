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
    description: "A gym management web app with QR check-in and a separate admin dashboard for each gym.",
    problem: "Gym owners struggle with manual check-ins, fragmented member data, and lack of real-time attendance tracking.",
    solution: "Built a multi-tenant web app where each gym gets its own admin dashboard, member records, membership billing and QR-code check-in.",
    impact: "Live and usable today. Members scan a QR code at the door and attendance shows up on the owner's dashboard right away.",
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
    description: "A to-do app that works like an RPG: your tasks level up a character.",
    problem: "I kept dropping to-do apps because finishing a task gave no feedback.",
    solution: "Turned tasks into XP: finishing a task raises character attributes and unlocks rewards, in the style of an RPG.",
    impact: "Working app, still in progress. I'm moving the backend to Supabase to add shared features.",
    tags: ["React Native", "Supabase", "TypeScript", "Tailwind CSS"],
    image: "/images/projects/AwakenSystem.png",
    link: "https://github.com/artace23/AwakenSystem",
    github: "https://github.com/artace23/AwakenSystem",
    isFeatured: true,
  },
  {
    title: "SmarTrax Mobile",
    description: "My capstone: a mobile app for renting smart bikes, from unlocking to payment.",
    problem: "Renting a shared bike usually means a clumsy unlock step and unclear payments.",
    solution: "Built a React Native app that unlocks the bike hardware by scanning a QR code, tracks rides with Firebase, and handles payments through an in-app wallet. A PHP backend supports it.",
    impact: "Demonstrated working on real hardware and presented at CCCIS 2025 in Hong Kong, where it won Best Presenter.",
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
    description: "A movie browsing site built with Next.js, with image-heavy pages that stay fast.",
    problem: "Poster-heavy pages tend to load slowly and jump around while images arrive.",
    solution: "Used next/image, lazy loading and fixed image dimensions so the layout doesn't shift while posters load.",
    impact: "Deployed on Vercel. Open it and try it yourself.",
    tags: ["Next.js", "Tailwind CSS", "Media Optimization", "Vercel"],
    image: "/images/projects/ArdStreaming.png",
    link: "https://ardstreamingmovies.vercel.app",
    github: "https://github.com/artace23/ardstreamingmovies",
  },
  {
    title: "Queue Management System",
    description: "A queueing system for busy service offices, built with Laravel.",
    problem: "Walk-in offices lose time to paper tickets and people not knowing when they'll be called.",
    solution: "Built ticket issuing, staff dashboards, service window management and a live board showing who is being served.",
    impact: "Complete working system with separate staff and public views. Source is on GitHub.",
    tags: ["Laravel", "PHP", "MySQL", "Blade"],
    image: "/images/projects/queue_project.png",
    link: "https://github.com/artace23/QMS_development",
    github: "https://github.com/artace23/QMS_development",
  },
  {
    title: "Easy Budget",
    description: "A simple expense tracker for React Native.",
    problem: "Most budgeting apps ask for too many fields, so people stop logging expenses.",
    solution: "Kept entry to a few taps with category shortcuts, and stored data in Firebase so it syncs across devices.",
    impact: "Personal project, working on Android. Source is on GitHub.",
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
          title="Projects"
          subtitle="Things I've built, with links to the live site or source where I can share them."
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

