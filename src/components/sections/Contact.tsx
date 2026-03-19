"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Mail, Phone, Send, Github, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";

export const Contact = () => {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle form submission here
    console.log("Form submitted:", formState);
    alert("Thank you for your message! This is a demo form.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <section id="contact" className="py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Get In Touch"
          subtitle="Interested in working together or have a question? Feel free to reach out!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-10"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">Let&apos;s talk about your next project</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                I&apos;m currently available for freelance work and full-time positions. 
                If you have a project that needs a modern touch, let&apos;s connect!
              </p>
            </div>

            <div className="space-y-6">
              <a href="mailto:artace011503@gmail.com" className="group flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">Email Me</div>
                  <div className="text-white font-medium">artace011503@gmail.com</div>
                </div>
              </a>

              <a href="tel:+639939573856" className="group flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">Call Me</div>
                  <div className="text-white font-medium">+63 993 957 3856</div>
                </div>
              </a>
            </div>

            <div className="flex items-center gap-6 pt-6">
               <a href="https://github.com/artace23" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:text-emerald-400 hover:border-emerald-400/30 transition-all">
                  <Github className="w-6 h-6" />
               </a>
               <a href="https://www.linkedin.com/in/art-iii-dela-cruz-621879157/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:text-blue-400 hover:border-blue-400/30 transition-all">
                  <Linkedin className="w-6 h-6" />
               </a>
               <a href="#" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:text-pink-400 hover:border-pink-400/30 transition-all">
                  <Instagram className="w-6 h-6" />
               </a>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-gray-400 uppercase tracking-widest px-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-gray-400 uppercase tracking-widest px-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-bold text-gray-400 uppercase tracking-widest px-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  required
                  value={formState.subject}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                  placeholder="Inquiry about project"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-gray-400 uppercase tracking-widest px-1">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all resize-none"
                  placeholder="Tell me more about your idea..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
              >
                Send Message <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
