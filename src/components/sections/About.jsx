import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedCounter } from "../ui/AnimatedCounter";
import { CharReveal, TextReveal } from "../ui/TextReveal";
import { services } from "../../data/portfolioData";
import profileImage from "../../assets/profile.webp";

export function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={sectionRef} id="about" className="relative py-36 px-6 overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Radial bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
          <CharReveal text="About" inView stagger={0.06}
            className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-4 block"
            style={{ color: "var(--accent)" }} />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-black tracking-tight leading-[1.05]" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", color: "var(--text-primary)" }}>
              <CharReveal text="Transforming ideas" inView stagger={0.035} /><br />
              <span className="text-gradient-violet"><CharReveal text="into reality." inView stagger={0.04} delay={0.3} /></span>
            </h2>
            <TextReveal text="I specialize in building end-to-end solutions that deliver exceptional user experiences — from concept to deployment."
              inView stagger={0.05} delay={0.4}
              className="text-base leading-[1.9] max-w-sm lg:max-w-xs lg:text-right"
              style={{ color: "var(--text-muted)" }} />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Profile */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28">
            {/* Photo */}
            <div className="relative mb-10">
              <motion.div style={{ y: imgY }} className="relative aspect-[4/5] max-w-xs overflow-hidden rounded-2xl">
                <div className="absolute -inset-px rounded-2xl pointer-events-none z-10"
                  style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.35) 0%, transparent 50%, rgba(139,92,246,0.12) 100%)" }} />
                <img src={profileImage} alt="Hamza Haikal" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "rgba(139,92,246,0.04)" }} />
              </motion.div>
              {/* Name card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-4 -right-4 px-5 py-4 rounded-xl"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", backdropFilter: "blur(16px)" }}>
                <CharReveal text="Hamza Haikal" inView delay={0.5} stagger={0.05}
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }} />
                <CharReveal text="Frontend Engineer" inView delay={0.7} stagger={0.04}
                  className="text-xs font-medium mt-0.5"
                  style={{ color: "var(--accent)" }} />
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
              {[{ val: 1, label: "Year Experience", suffix: "+" }, { val: 13, label: "Projects Built", suffix: "+" }].map(({ val, label, suffix }, i) => (
                <motion.div key={label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.1 * (i + 1), duration: 0.6 }}>
                  <p className="font-black leading-none" style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)", color: "var(--text-primary)" }}>
                    <AnimatedCounter value={val} suffix={suffix} />
                  </p>
                  <CharReveal text={label} inView delay={0.1 * (i + 1) + 0.2} stagger={0.04}
                    className="text-sm mt-1"
                    style={{ color: "var(--text-muted)" }} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Services */}
          <div>
            {services.map((service, idx) => (
              <motion.div key={service.number}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
                className="group py-8" style={{ borderTop: idx === 0 ? "none" : "1px solid var(--border)", borderBottom: idx === services.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div className="flex gap-8 items-start">
                  <CharReveal text={service.number} inView delay={idx * 0.1} stagger={0.06}
                    className="text-xs font-semibold tabular-nums mt-1 shrink-0 tracking-wider"
                    style={{ color: "var(--text-muted)" }} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <CharReveal text={service.title} inView delay={idx * 0.1 + 0.1} stagger={0.04}
                        className="text-lg font-bold transition-colors duration-300 group-hover:text-[var(--accent-hover)]"
                        style={{ color: "var(--text-primary)" }} />
                      <motion.span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0 mt-0.5"
                        style={{ color: "var(--accent)" }} animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                    </div>
                    <TextReveal text={service.description} inView delay={idx * 0.1 + 0.2} stagger={0.04}
                      className="text-sm leading-[1.8]"
                      style={{ color: "var(--text-secondary)" }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
