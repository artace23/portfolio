export const contact = {
  email: "artace011503@gmail.com",
  phone: "+63 993 957 3856",
  phoneHref: "tel:+639939573856",
  github: "https://github.com/artace23",
  linkedin: "https://www.linkedin.com/in/art-iii-dela-cruz-621879157/",
  resume: "/Art_III_Dela_Cruz_CV.pdf",
};

// Locations shown on the globe. "home" is where I work from; arcs run from it to the others.
export type PlaceKind = "home" | "work" | "event";

export const places: {
  id: string;
  name: string;
  lat: number;
  lng: number;
  kind: PlaceKind;
  note: string;
}[] = [
  {
    id: "ph",
    name: "Philippines",
    lat: 12.88,
    lng: 121.77,
    kind: "home",
    note: "Home base. DSG Son's Group, Jairosoft and my freelance clients.",
  },
  {
    id: "il",
    name: "Israel",
    lat: 31.05,
    lng: 34.85,
    kind: "work",
    note: "Remote contract with Trixicon, Jan–Feb 2026.",
  },
  {
    id: "us",
    name: "United States",
    lat: 39.8,
    lng: -98.6,
    kind: "work",
    note: "Remote contract with CoreThink AI, Dec 2025.",
  },
  {
    id: "hk",
    name: "Hong Kong",
    lat: 22.32,
    lng: 114.17,
    kind: "event",
    note: "Presented SmarTrax at CCCIS 2025 and won Best Presenter.",
  },
];

export type Project = {
  title: string;
  tagline: string;
  summary: string;
  highlights?: string[];
  stack: string[];
  image: string;
  live?: string;
  code?: string;
  badge?: string;
};

export const featured: Project[] = [
  {
    title: "SmarTrax",
    tagline: "Smart bike rental app with hardware unlocking",
    summary:
      "My capstone project. A React Native app that unlocks a bike by scanning a QR code, tracks rides in Firebase and handles payments through an in-app wallet, backed by a PHP service.",
    highlights: [
      "Tested on real bike hardware, not just a simulator",
      "In-app wallet for rental payments",
      "Presented at CCCIS 2025 in Hong Kong",
    ],
    stack: ["React Native", "Firebase", "PHP", "IoT"],
    image: "/images/projects/smartrax_project.jpg",
    code: "https://github.com/artace23/smartrax",
    badge: "Best Presenter, CCCIS 2025",
  },
  {
    title: "CoreGPass",
    tagline: "Gym management with QR check-in",
    summary:
      "A multi-tenant web app for gyms. Each gym gets its own admin dashboard, member records, membership billing and QR-code check-in.",
    highlights: [
      "QR verification at the door",
      "Automated membership billing",
      "Separate dashboards for each gym",
    ],
    stack: ["React", "TypeScript", "Supabase"],
    image: "/images/projects/coregpass.png",
    live: "https://coregpass.vercel.app/login",
  },
  {
    title: "ArdStreaming",
    tagline: "Movie browsing site built for speed",
    summary:
      "A Next.js site for browsing movies. Poster-heavy pages use image optimization and lazy loading to load quickly and avoid layout jumps.",
    highlights: [
      "Image optimization with next/image",
      "Lazy loading for image-heavy pages",
      "Deployed on Vercel",
    ],
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
    image: "/images/projects/ArdStreaming.png",
    live: "https://ardstreamingmovies.vercel.app",
    code: "https://github.com/artace23/ardstreamingmovies",
  },
];

export const more: Project[] = [
  {
    title: "AwakenSystem",
    tagline: "RPG-style to-do app",
    summary: "Finishing tasks levels up a character. Built with React Native, with a Supabase backend in progress.",
    stack: ["React Native", "Supabase", "TypeScript"],
    image: "/images/projects/AwakenSystem.png",
    code: "https://github.com/artace23/AwakenSystem",
  },
  {
    title: "Queue Management System",
    tagline: "Queueing for busy service offices",
    summary: "Ticketing, staff dashboards, service window management and a live board, built with Laravel.",
    stack: ["Laravel", "PHP", "MySQL"],
    image: "/images/projects/queue_project.png",
    code: "https://github.com/artace23/QMS_development",
  },
  {
    title: "FocusFlow",
    tagline: "Offline focus timer and task tracker",
    summary: "A Pomodoro-style timer with task priorities, daily goals and a 7-day activity chart. Data stays on the device.",
    stack: ["Apache Cordova", "JavaScript", "Android"],
    image: "/images/projects/FocusFlow.png",
    code: "https://github.com/artace23",
  },
  {
    title: "Easy Budget",
    tagline: "Simple expense tracker",
    summary: "A React Native app for logging expenses quickly, with Firebase storage.",
    stack: ["React Native", "Firebase", "TypeScript"],
    image: "/images/projects/easybudget_project.jpg",
    code: "https://github.com/artace23/EasyBudget-App",
  },
];

export const services = [
  {
    title: "Web apps and dashboards",
    text: "Business websites, admin dashboards and internal tools built with Next.js, React or Laravel.",
  },
  {
    title: "Mobile apps",
    text: "Android and iOS apps with React Native or Expo, backed by Firebase or Supabase.",
  },
  {
    title: "Device-connected systems",
    text: "Apps that talk to physical things, like QR unlocking and hardware integration, as in SmarTrax.",
  },
  {
    title: "POS and inventory",
    text: "Sales tracking, stock management and reporting for small businesses.",
  },
];

export const process = [
  { step: "01", title: "Talk it through", text: "We agree on what you need, what is out of scope and how you'll know it works." },
  { step: "02", title: "Build in small steps", text: "You see working pieces early and can change direction before it gets expensive." },
  { step: "03", title: "Launch and support", text: "I deploy it, hand over the access and stay available for fixes." },
];

export const experience = [
  {
    role: "Software Engineer",
    org: "DSG Son's Group Inc.",
    place: "Philippines",
    dates: "Jul 2025 – Present",
    type: "Full-time",
    points: [
      "Build and maintain internal web systems and a cross-platform mobile app for Android and iOS.",
      "Integrated Python data analysis modules into Laravel dashboards.",
      "Improved server-side processing for large datasets.",
    ],
  },
  {
    role: "Product Engineer",
    org: "Trixicon",
    place: "Israel",
    dates: "Jan 2026 – Feb 2026",
    type: "Contract",
    points: [
      "Built React Native mobile apps and WordPress sites for international clients.",
      "Worked on backend data pipelines on AWS.",
    ],
  },
  {
    role: "AI Systems Evaluator",
    org: "CoreThink AI Inc.",
    place: "USA",
    dates: "Dec 2025",
    type: "Contract",
    points: [
      "Reviewed code written by coding LLMs and tested it against realistic scenarios.",
      "Found and reported logic errors and set up benchmarking checks.",
    ],
  },
  {
    role: "Full Stack Engineer (Lead)",
    org: "Freelance",
    place: "Philippines",
    dates: "Sep 2025 – Feb 2026",
    type: "Contract",
    points: [
      "Built and deployed a POS and inventory system for a local business.",
      "Designed a custom reporting engine for sales and stock insights.",
    ],
  },
  {
    role: "Frontend Engineering Intern",
    org: "Jairosoft Inc.",
    place: "Philippines",
    dates: "Feb 2025 – May 2025",
    type: "Internship",
    points: [
      "Improved core web vitals on production Next.js apps.",
      "Shipped feature modules in an Agile team.",
    ],
  },
  {
    role: "Full Stack Developer",
    org: "Freelance",
    place: "Philippines",
    dates: "Jun 2022 – Present",
    type: "Contract",
    points: [
      "Built websites and internal tools for local businesses with React and Node.js.",
      "Handled the work end to end: requirements, build, deployment and upkeep.",
    ],
  },
];

export const skills = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "PHP / Laravel", "MySQL", "PostgreSQL", "Supabase", "Python"] },
  { group: "Mobile", items: ["React Native", "Expo", "Firebase", "Apache Cordova"] },
  { group: "Tools", items: ["Git", "Docker", "Vercel", "AWS"] },
];

export const awards = [
  { title: "Best Presenter, CCCIS 2025", text: "Awarded for my capstone SmarTrax (Data Innovation) at the conference in Hong Kong, representing Holy Cross of Davao College." },
  { title: "1st place, programming competition", text: "Organized by the ITS organization, 2023." },
  { title: "TOPCIT Level 2", text: "Reached Level 2 in three consecutive TOPCIT exams, 2023–2024." },
  { title: "Tabulation system", text: "Built a tabulation system used at high-stakes institutional events." },
];

export const certificates = [
  { title: "PHP Laravel: Build Amazing Streaming Service", href: "https://www.udemy.com/certificate/UC-03444cc4-0302-407c-9c70-f19530198a19/" },
  { title: "Python for Everyone: Master the Basics of Programming", href: "https://www.udemy.com/certificate/UC-4b209ae5-1315-4a55-b8c8-2ad59b5640a3/" },
  { title: "React JS: TypeScript, Redux, RTK & Modern Web Dev 2025", href: "https://www.udemy.com/certificate/UC-8a783253-2605-460d-bf0a-37a0544a694d/" },
  { title: "PHP Laravel: Build Real Estate Management System", href: "https://www.udemy.com/certificate/UC-d5cb88b7-1ec6-45bf-976d-95bf5e133db4/" },
  { title: "PHP Master Class: The Complete PHP Developer Course", href: "https://www.udemy.com/certificate/UC-110dca23-7f75-4ab1-b399-30ed78173557/" },
];
