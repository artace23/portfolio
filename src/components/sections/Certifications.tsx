"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExternalLink, Award, Calendar, ShieldCheck } from "lucide-react";
import Image from "next/image";

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
  },
  {
    title: "PHP Laravel: Build Real Estate Manangement System",
    issuer: "Udemy.com",
    date: "2025",
    image: "/images/certificates/Certificate Laravel Estate Management.jpg",
    link: "https://www.udemy.com/certificate/UC-d5cb88b7-1ec6-45bf-976d-95bf5e133db4/"
  },
  {
    title: "PHP Master Class: The Complete PHP Developer Course",
    issuer: "Udemy.com",
    date: "2025",
    image: "/images/certificates/Certificate PHP Master Class.jpg",
    link: "https://www.udemy.com/certificate/UC-110dca23-7f75-4ab1-b399-30ed78173557/"
  }
];

export const Certifications = () => {
  return (
    <section id="certifications" className="py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Professional Certifications"
          subtitle="A collection of industry-recognized certifications validating technical expertise and commitment to growth."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative h-full flex flex-col p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              <div className="absolute top-4 right-4 z-20">
                <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-1">
                   <ShieldCheck className="w-3 h-3 text-emerald-400" />
                   <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">Verified</span>
                </div>
              </div>

              {/* Certificate Image Placeholder / Thumbnail */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-6 border border-white/5 bg-gray-900 group-hover:scale-[1.02] transition-transform duration-500">
                  {cert.image ? (
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Award className="w-12 h-12 text-emerald-500/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent" />
              </div>

              <div className="space-y-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {cert.title}
                </h3>
                
                <div className="flex flex-col gap-2 pt-4 mt-auto border-t border-white/5">
                   <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Award className="w-4 h-4" /> {cert.issuer}
                   </div>
                   <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" /> {cert.date}
                   </div>
                </div>

                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-emerald-500 text-gray-400 hover:text-white rounded-xl transition-all duration-300 font-bold text-sm"
                >
                  View Certificate <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
