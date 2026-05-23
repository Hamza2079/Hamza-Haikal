import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { useIsMobile, usePrefersReducedMotion } from "../../hooks/useMediaQuery";
import { MouseGlow } from "../ui/MouseGlow";
import { CharReveal, TextReveal } from "../ui/TextReveal";
import profileImage from "../../assets/Profile1.webp";

const HeroBackground = lazy(() =>
  import("../three/HeroBackground").then((m) => ({ default: m.HeroBackground }))
);

const MotionLink = motion(Link);

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

  // ── Scroll-driven parallax (desktop only) ──────────────────────────────────
  // On mobile, computing & applying 3 MotionValues on every scroll tick adds
  // unnecessary overhead. We skip transforms entirely and let the section scroll normally.
  const { scrollYProgress } = useScroll();
  const heroY       = useTransform(scrollYProgress, [0, 0.5], [0, isMobile ? 0 : -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, isMobile ? 1 : 0]);
  const heroScale   = useTransform(scrollYProgress, [0, 0.35], [1, isMobile ? 1 : 0.96]);

  const scrollTo = (id) => {
    const el = document.querySelector(`#${id}`);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  // ── Derived flags ──────────────────────────────────────────────────────────
  // Animations that loop forever (rings, float, scroll indicator) are disabled
  // on mobile AND when the user has requested reduced motion.
  const enableLoopAnimations = !isMobile && !prefersReducedMotion;

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Mouse glow — desktop only */}
      {!isMobile && !prefersReducedMotion && <MouseGlow color="rgba(139,92,246,0.1)" size={700} />}

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-100 pointer-events-none" />

      {/* Radial vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, var(--bg) 100%)" }} />

      {/* 3D particles — desktop only */}
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
              style={{
                border: "1px solid var(--border)",
                background: "var(--accent-subtle)",
                // Remove backdropFilter on mobile — inline styles override the CSS * rule,
                // and blur compositing costs are not worth it on mobile GPUs.
                ...(isMobile ? {} : { backdropFilter: "blur(8px)" }),
              }}
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
              className="text-base block leading-[1.85] max-w-md mb-8"
              style={{ color: "var(--text-secondary)" }} />

            {/* ── CTAs ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
            >
              {/* Row 1: two main pills */}
              <div className="flex gap-3 sm:gap-4 items-center mb-6">
                <MotionLink
                  to="/projects"
                  className="relative flex items-center justify-center gap-2 px-5 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white overflow-hidden cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, var(--accent) 0%, #6D28D9 100%)",
                    boxShadow: "0 4px 20px var(--accent-glow)",
                  }}
                  whileHover="hover"
                  whileTap="tap"
                  variants={{
                    hover: { scale: 1.04, boxShadow: "0 8px 32px var(--accent-glow)" },
                    tap: { scale: 0.97 }
                  }}
                >
                  {/* Shimmer effect */}
                  <span className="absolute inset-0 w-full h-full overflow-hidden rounded-full pointer-events-none">
                    <motion.span
                      className="absolute top-0 left-0 w-[50%] h-full opacity-35"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                        transform: "skewX(-20deg)",
                      }}
                      animate={{
                        left: ["-100%", "200%"]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.2,
                        ease: "easeInOut",
                        repeatDelay: 3.5
                      }}
                    />
                  </span>
                  
                  <span>View My Work</span>
                  
                  <motion.svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    variants={{
                      hover: { x: 4 },
                      rest: { x: 0 }
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </motion.svg>
                </MotionLink>

                <motion.button
                  onClick={() => scrollTo("contact")}
                  className="relative inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold cursor-pointer overflow-hidden"
                  style={{
                    border: "1px solid var(--border-strong)",
                    color: "var(--text-primary)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                  whileHover="hover"
                  whileTap="tap"
                  variants={{
                    hover: { 
                      scale: 1.04, 
                      borderColor: "var(--accent)", 
                      background: "var(--accent-subtle)",
                      boxShadow: "0 4px 16px rgba(139, 92, 246, 0.1)"
                    },
                    tap: { scale: 0.97 }
                  }}
                >
                  <span>Get In Touch</span>
                  <motion.svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    variants={{
                      hover: { rotate: 15 },
                      rest: { rotate: 0 }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </motion.svg>
                </motion.button>
              </div>

              {/* Row 2: Resume + Socials */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
                {/* Resume Link */}
                <motion.a
                  href="Hamza_Haikal_Resume_classic.pdf"
                  download="Hamza_Haikal_CV.pdf"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-colors cursor-pointer group"
                  style={{ color: "var(--text-secondary)" }}
                  whileHover="hover"
                  animate="rest"
                >
                  <motion.svg 
                    className="w-4 h-4 shrink-0" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    variants={{
                      hover: { y: 2 },
                      rest: { y: 0 }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </motion.svg>
                  <span className="group-hover:underline underline-offset-4">Download Resume</span>
                </motion.a>

                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-20 hidden sm:inline-block" style={{ color: "var(--text-muted)" }} />

                {/* Social links */}
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/Hamza2079"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5 text-sm font-semibold"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.478-10-10-10z" />
                    </svg>
                    <span>GitHub</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/hamza-haikal"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5 text-sm font-semibold"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Row 3: quick stats */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-6"
                style={{ borderTop: "1px solid var(--border)" }}>
                {[
                  { value: "13+", label: "Projects" },
                  { value: "1+",  label: "Year exp." },
                  { value: "24h", label: "Response" },
                ].map(({ value, label }, i) => (
                  <div key={label} className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{value}</span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
                    {i < 2 && (
                      <span className="ml-3 text-xs" style={{ color: "var(--border-strong)" }}>·</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: Profile Image ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Floating decorative rings — desktop + no-reduced-motion only.
                These run an infinite rotation loop: skipping on mobile saves two
                perpetual GPU compositing layers per page load. */}
            {enableLoopAnimations && (
              <>
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
              </>
            )}

            {/* Photo frame */}
            <div className="relative w-72 h-72 lg:w-80 lg:h-80">
              {/* Glow behind */}
              <div className="absolute -inset-4 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)" }} />

              {/* Image container — float animation disabled on mobile & reduced-motion.
                  The y-keyframe animation creates a new compositing layer; unnecessary on mobile. */}
              <motion.div
                animate={enableLoopAnimations ? { y: [0, -10, 0] } : false}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(139,92,246,0.3)",
                  boxShadow: "0 24px 64px rgba(139,92,246,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                {/* fetchpriority="high" tells the browser this is the LCP image —
                    it gets fetched before lower-priority resources.
                    width/height prevent CLS (layout shift) before the image loads. */}
                <img
                  src={profileImage}
                  alt="Hamza Haikal — Frontend Engineer"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                  width={320}
                  height={320}
                  sizes="(max-width: 1024px) 288px, 320px"
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
                  ...(isMobile ? {} : { backdropFilter: "blur(12px)" }),
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
                  ...(isMobile ? {} : { backdropFilter: "blur(12px)" }),
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

      {/* Scroll indicator — hidden on mobile via CSS, but the inner animation loop
          was still running. Now gated behind enableLoopAnimations. */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-3"
      >
        <CharReveal text="Scroll" inView={false} delay={1.6} stagger={0.08}
          className="text-[10px] uppercase tracking-[0.2em] font-medium"
          style={{ color: "var(--text-muted)" }} />
        <div className="w-px h-12 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          {enableLoopAnimations && (
            <motion.div className="absolute top-0 w-full"
              style={{ height: "50%", background: "linear-gradient(to bottom, var(--accent), transparent)" }}
              animate={{ y: ["0%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
          )}
        </div>
      </motion.div>
    </section>
  );
}
