import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedCounter } from "../ui/AnimatedCounter";
import { CharReveal, TextReveal } from "../ui/TextReveal";
import { services } from "../../data/portfolioData";
import { useIsMobile } from "../../hooks/useMediaQuery";
import profileImage from "../../assets/profile.webp";

// Icon map for each service — SVG paths drawn inline so no extra dep
const serviceIcons = [
  // Code brackets — React / Next.js
  <svg key="code" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>,
  // Layout grid — Responsive UI
  <svg key="layout" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>,
  // Zap — Performance
  <svg key="zap" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>,
  // Sparkles — Animation / Tooling
  <svg key="sparkles" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v1m0 16v1M4.22 4.22l.7.7m12.16 12.16.7.7M3 12h1m16 0h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7" />
    <circle cx="12" cy="12" r="4" />
  </svg>,
];

export function About() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : 30]);

  // Card hover variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    },
    hover: {
      y: -6,
      borderColor: "var(--accent)",
      boxShadow: "0 12px 40px rgba(139, 92, 246, 0.08)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <section ref={sectionRef} id="about" className="relative py-24 md:py-32 px-6 overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Background radial glows */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 50% at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 40% 40% at 10% 80%, rgba(139,92,246,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow / Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-8 rounded-full" style={{ background: "var(--accent)" }} />
          <CharReveal text="About Me" inView stagger={0.06}
            className="text-[11px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: "var(--accent)" }} />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">

          {/* CARD 1: Full-Bleed Profile Portrait (Spans 2 columns) */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, margin: "-40px" }}
            className="md:col-span-2 relative rounded-3xl border overflow-hidden transition-all duration-300 group flex flex-col justify-between"
            style={{ borderColor: "var(--border)", minHeight: "380px" }}
          >
            {/* Full-bleed background image with parallax */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <motion.div className="w-full h-full">
                <img
                  src={profileImage}
                  alt="Hamza Haikal"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
              {/* Availability Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Identity</span>
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-black/40 backdrop-blur-md border border-white/10">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  <span className="text-white/90">Available</span>
                </div>
              </div>

              {/* Personal Details */}
              <div className="mt-auto">
                <h3 className="text-xl font-bold tracking-tight text-white mb-1">
                  Hamza Haikal
                </h3>
                <p className="text-xs font-semibold text-gradient-violet">
                  Frontend Engineer
                </p>
              </div>
            </div>
          </motion.div>

          {/* CARD 2: Editorial Philosophy (Spans 4 columns) */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, margin: "-40px" }}
            className="md:col-span-4 flex flex-col p-8 rounded-3xl border justify-between relative transition-all duration-300"
            style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
          >
            {/* Background grid texture inside card */}
            <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

            <div className="relative z-10 mb-6">
              <span className="text-[10px] font-bold text-gradient-violet uppercase tracking-widest block mb-4">Philosophy</span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug mb-5" style={{ color: "var(--text-primary)" }}>
                Transforming ideas into <span className="text-gradient-violet">reality.</span>
              </h2>
              <div className="space-y-4">
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  I am dedicated to crafting fluid digital interfaces that combine clean structure, high speed, and visual elegance. I believe that writing code is as much about architecture and design as it is about problem solving.
                </p>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  My process centers on code hygiene, performance budgets, and creating responsive systems. I focus on translating complex user journeys into delightful animations and bulletproof interactive layouts.
                </p>
              </div>
            </div>

            {/* Highlight quote footer */}
            <div className="pt-4 relative z-10" style={{ borderTop: "1px solid var(--border)" }}>
              <p className="text-xs italic" style={{ color: "var(--text-muted)" }}>
                "Every line of code should be written with intention, accessibility, and scale in mind."
              </p>
            </div>
          </motion.div>

          {/* CARD 3: Stats Dashboard (Spans 2 columns) */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, margin: "-40px" }}
            className="md:col-span-2 flex flex-col p-6 rounded-3xl border justify-between transition-all duration-300"
            style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
          >
            <div>
              <span className="text-[10px] font-bold text-gradient-violet uppercase tracking-widest block mb-4">Dashboard</span>
              <h3 className="text-lg font-bold tracking-tight mb-6" style={{ color: "var(--text-primary)" }}>
                Key Metrics
              </h3>
            </div>

            {/* Vertical Stats stack */}
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              {[
                { val: 1,  label: "Years Exp.", suffix: "+" },
                { val: 13, label: "Projects Deployed",  suffix: "+" },
                { val: 1, label: "Happy Clients", },
              ].map(({ val, label, suffix }) => (
                <div
                  key={label}
                  className="flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 hover:border-[var(--accent)]"
                  style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
                >
                  <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                    {label}
                  </span>
                  <span className="text-xl font-black text-gradient-violet shrink-0 ml-4">
                    <AnimatedCounter value={val} suffix={suffix} />
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 text-center" style={{ borderTop: "1px solid var(--border)" }}>
              <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                ⚡ Performance Output
              </p>
            </div>
          </motion.div>

          {/* CARD 4: Capabilities Grid (Spans 4 columns) */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, margin: "-40px" }}
            className="md:col-span-4 p-8 rounded-3xl border transition-all duration-300"
            style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
          >
            <div className="mb-6">
              <span className="text-[10px] font-bold text-gradient-violet uppercase tracking-widest block mb-1">Services</span>
              <h3 className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                My Core Expertise
              </h3>
            </div>

            {/* 2x2 Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {services.map((service, idx) => (
                <div
                  key={service.number}
                  className="flex gap-4 items-start p-4 rounded-2xl border transition-all duration-300 hover:bg-[rgba(255,255,255,0.015)]"
                  style={{ borderColor: "var(--border)" }}
                >
                  {/* Icon Box */}
                  <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--accent)" }}>
                    <div className="w-4 h-4">{serviceIcons[idx]}</div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                      {service.title}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
