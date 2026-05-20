import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { useIsMobile, usePrefersReducedMotion } from "../../hooks/useMediaQuery";
import { MouseGlow } from "../ui/MouseGlow";
import { CharReveal, TextReveal } from "../ui/TextReveal";
import profileImage from "../../assets/profile.webp";

const HeroBackground = lazy(() =>
  import("../three/HeroBackground").then((m) => ({ default: m.HeroBackground }))
);

const wordReveal = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const wordItem = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const heroRef = useRef(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll();
  const heroY       = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const heroScale   = useTransform(scrollYProgress, [0, 0.35], [1, 0.96]);

  const scrollTo = (id) => {
    const el = document.querySelector(`#${id}`);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Mouse glow */}
      {!isMobile && !prefersReducedMotion && <MouseGlow color="rgba(139,92,246,0.1)" size={700} />}

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-100 pointer-events-none" />

      {/* Radial vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, var(--bg) 100%)" }} />

      {/* 3D particles desktop */}
      {!isMobile && <Suspense fallback={null}><HeroBackground /></Suspense>}

      {/* Violet top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 70%)" }} />

      {/* ── Main layout: left text / right image ── */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Text ── */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
              style={{ border: "1px solid var(--border)", background: "var(--accent-subtle)", backdropFilter: "blur(8px)" }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <CharReveal text="Available for work" inView={false} stagger={0.04}
                className="text-[11px] font-medium uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }} />
            </motion.div>

            {/* Heading */}
            <div className="mb-6">
              <motion.div variants={wordReveal} initial="hidden" animate="visible"
                style={{ display: "flex", flexWrap: "wrap", gap: "0 0.25em", marginBottom: "0.1em" }}>
                {["Frontend", "Engineer"].map((w, i) => (
                  <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
                    <motion.span variants={wordItem}
                      className={i === 1 ? "text-gradient-violet pb-4" : ""}
                      style={{ display: "inline-block", fontSize: "clamp(2.8rem,7vw,6rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1, color: i === 0 ? "var(--text-primary)" : undefined }}>
                      {w}
                    </motion.span>
                  </span>
                ))}
              </motion.div>

              <CharReveal text="Hamza Haikal" inView={false} stagger={0.05} delay={0.55}
                className="text-sm font-medium uppercase tracking-[0.25em]"
                style={{ color: "var(--text-muted)" }} />
            </div>

            {/* Description */}
            <TextReveal text="Crafting smooth, immersive digital experiences with React, TypeScript, and precision-built UI — where every interaction is intentional."
              inView={false} delay={0.7} stagger={0.04}
              className="text-base leading-[1.85] max-w-md mb-10"
              style={{ color: "var(--text-secondary)" }} />

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="flex flex-wrap gap-3">
              <Link to="/projects">
                <motion.div
                  className="relative px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group"
                  style={{ background: "var(--accent)", boxShadow: "0 4px 24px var(--accent-glow)" }}
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 32px var(--accent-glow)" }}
                  whileTap={{ scale: 0.97 }}>
                  View My Work
                </motion.div>
              </Link>
              <motion.button onClick={() => scrollTo("contact")}
                className="px-7 py-3.5 rounded-full text-sm font-medium cursor-pointer backdrop-blur-sm transition-all duration-300"
                style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", background: "var(--accent-subtle)" }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                Get In Touch
              </motion.button>
              <motion.a href="Hamza_Haikal_Resume_classic.pdf" download="Hamza_Haikal_CV.pdf"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300"
                style={{ border: "1px solid var(--border)", color: "var(--text-muted)", background: "transparent" }}
                whileHover={{ scale: 1.04, borderColor: "var(--accent)", color: "var(--accent)" }}
                whileTap={{ scale: 0.97 }}>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume
              </motion.a>
            </motion.div>
          </div>

          {/* ── Right: Profile Image ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Floating decorative ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[420px] h-[420px] rounded-full pointer-events-none"
              style={{
                border: "1px dashed rgba(139,92,246,0.2)",
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[340px] h-[340px] rounded-full pointer-events-none"
              style={{
                border: "1px solid rgba(139,92,246,0.12)",
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />

            {/* Photo frame */}
            <div className="relative w-72 h-72 lg:w-80 lg:h-80">
              {/* Glow behind */}
              <div className="absolute -inset-4 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)" }} />

              {/* Image container */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(139,92,246,0.3)",
                  boxShadow: "0 24px 64px rgba(139,92,246,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <img
                  src={profileImage}
                  alt="Hamza Haikal — Frontend Engineer"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                {/* Subtle tint overlay */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(139,92,246,0.15) 100%)" }} />
              </motion.div>

              {/* Floating stat chip — top right */}
              <motion.div
                initial={{ opacity: 0, y: 10, x: 10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="absolute -top-3 -right-4 px-4 py-2.5 rounded-xl text-xs font-semibold"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                }}
              >
                <span style={{ color: "var(--accent)" }}>13+</span> Projects Built
              </motion.div>

              {/* Floating chip — bottom left */}
              <motion.div
                initial={{ opacity: 0, y: 10, x: -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="absolute -bottom-3 -left-4 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                Open to Work
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-3"
      >
        <CharReveal text="Scroll" inView={false} delay={1.6} stagger={0.08}
          className="text-[10px] uppercase tracking-[0.2em] font-medium"
          style={{ color: "var(--text-muted)" }} />
        <div className="w-px h-12 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div className="absolute top-0 w-full"
            style={{ height: "50%", background: "linear-gradient(to bottom, var(--accent), transparent)" }}
            animate={{ y: ["0%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
        </div>
      </motion.div>
    </section>
  );
}
