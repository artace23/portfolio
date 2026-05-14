"use client";

import { motion } from "framer-motion";
import { Terminal, GitCommit, Clock, ArrowRight } from "lucide-react";

const logs = [
  {
    time: "Just Shipped",
    type: "ship",
    title: "CoreGPass Production Launch",
    project: "CoreGPass",
    details: "Finalized multi-tenant SaaS architecture and optimized QR check-in latency for production use.",
  },
  {
    time: "2 hours ago",
    type: "feature",
    title: "Integrated Supabase Auth",
    project: "AwakenSystem",
    details: "Implemented robust authentication flow with real-time session handling.",
  },
  {
    time: "Yesterday",
    type: "fix",
    title: "Optimized Image Rendering",
    project: "ArdStreaming",
    details: "Reduced layout shift and improved LCP by 25% through next/image optimization.",
  },
  {
    time: "2 days ago",
    type: "ship",
    title: "Deployed v2.0 Roadmap",
    project: "Portfolio",
    details: "Complete redesign focusing on product-centric storytelling and performance.",
  },
];

export const BuilderLog = () => {
  return (
    <section className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">
              <Terminal className="w-4 h-4" /> Live Momentum
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">The Builder&apos;s Log</h2>
          </div>
          <p className="text-gray-500 max-w-md text-sm md:text-base font-light">
            A transparent feed of what I&apos;m currently shipping, fixing, and architecting.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all flex flex-col md:flex-row gap-6 items-start md:items-center"
            >
              <div className="flex items-center gap-4 min-w-[140px]">
                <div className={`p-2 rounded-lg ${
                  log.type === 'feature' ? 'bg-blue-500/10 text-blue-500' : 
                  log.type === 'fix' ? 'bg-emerald-500/10 text-emerald-500' : 
                  'bg-purple-500/10 text-purple-500'
                }`}>
                  <GitCommit className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{log.time}</span>
              </div>

              <div className="flex-grow space-y-1">
                <div className="flex items-center gap-3">
                  <h4 className="text-white font-bold text-lg">{log.title}</h4>
                  <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                    {log.project}
                  </span>
                </div>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{log.details}</p>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4 text-blue-500" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
            <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Tracking 15+ Active Repositories</span>
            </div>
        </div>
      </div>
    </section>
  );
};
