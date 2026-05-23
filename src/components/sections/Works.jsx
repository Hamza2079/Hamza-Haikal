import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CharReveal, TextReveal } from "../ui/TextReveal";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { projects } from "../../data/portfolioData";

const featured = projects.filter(p => p.featured);
const N = featured.length;

export function Works() {
  const outerRef = useRef(null);
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveIdx(Math.min(Math.floor(latest * N), N - 1));
  });

  const project = featured[activeIdx];

  return (
    <section id="works" style={{ background: "var(--bg)" }}>
      {/* Outer: tall container creates scroll space — N full screens */}
      <div ref={outerRef} style={{ height: `${N * 100}vh`, position: "relative" }}>

        {/* Sticky: pins to viewport, shows full content while outer scrolls */}
        <div style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "var(--bg)",
          display: "flex",
          flexDirection: "column",
          padding: "0 24px",
        }}>
          {/* ── Title stays pinned ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ paddingTop: isMobile ? 48 : 88, paddingBottom: 24, maxWidth: 1280, width: "100%", margin: "0 auto", flexShrink: 0 }}
          >
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: isMobile ? "wrap" : "nowrap" }}>
              <div>
                <CharReveal text="Selected Work" inView stagger={0.06}
                  className="text-[11px] font-semibold uppercase tracking-[0.2em] block mb-2"
                  style={{ color: "var(--accent)" }} />
                <h2 style={{ fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1, color: "var(--text-primary)", margin: 0 }}>
                  <CharReveal text="Featured" inView stagger={0.04} />{' '}
                  <CharReveal text="Projects." inView delay={0.2} stagger={0.035} className="text-gradient-violet" />
                </h2>
              </div>

              {/* Dots + counter */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
                <div style={{ display: "flex", gap: 8 }}>
                  {featured.map((_, i) => (
                    <button key={i}
                      onClick={() => {
                        const el = outerRef.current; if (!el) return;
                        window.scrollTo({ top: el.offsetTop + (i / N) * el.offsetHeight, behavior: "smooth" });
                      }}
                      style={{
                        width: i === activeIdx ? 24 : 8, height: 8, borderRadius: 4,
                        border: "none", padding: 0, cursor: "pointer",
                        background: i === activeIdx ? "var(--accent)" : "var(--border-strong)",
                        transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>
                  {String(activeIdx + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                </span>
              </div>
            </div>
            <div style={{ height: 1, background: "var(--border)", marginTop: 20 }} />
          </motion.div>

          {/* ── Project content: crossfades ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ flex: 1, maxWidth: 1280, width: "100%", margin: "0 auto", minHeight: 0, position: "relative" }}
          >
            <AnimatePresence mode="wait">
              <motion.div key={activeIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute", inset: 0,
                  display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: isMobile ? 24 : 48, alignItems: "center",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "16/10", cursor: "pointer" }}
                  onClick={() => navigate(`/project/${project.slug}`)}>
                  <div style={{
                    width: "100%", height: "100%",
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "cover", backgroundPosition: "center",
                    transition: "transform 0.6s",
                  }} />
                  <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: "rgba(9,9,11,0.3)" }} />

                  {/* Category */}
                  <div style={{ position: "absolute", top: 14, left: 14 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em",
                      padding: "6px 12px", borderRadius: 99, background: "rgba(9,9,11,0.8)",
                      color: "#fff" }}>
                      {project.category}
                    </span>
                  </div>

                  {/* Always-visible CTA buttons */}
                  <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, display: "flex", gap: 10 }}>
                    <a href={project.demo} target="_blank" rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                        padding: "10px 0", borderRadius: 99, fontSize: 13, fontWeight: 700, color: "#fff",
                        background: "var(--accent)", boxShadow: "0 4px 20px rgba(139,92,246,0.5)", textDecoration: "none" }}>
                      <CharReveal text="↗ Live Demo" inView={false} delay={0.2} stagger={0.06} />
                    </a>
                    <a href={project.github} target="_blank" rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                        padding: "10px 0", borderRadius: 99, fontSize: 13, fontWeight: 700, color: "#fff",
                        background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)",
                        backdropFilter: "blur(8px)", textDecoration: "none" }}>
                      <CharReveal text="GitHub" inView={false} delay={0.3} stagger={0.06} />
                    </a>
                  </div>
                </div>

                {/* Text */}
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <CharReveal text={`Project ${String(activeIdx + 1).padStart(2, "0")}`} inView={false} stagger={0.04}
                      className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                      style={{ color: "var(--accent)" }} />
                    <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{project.year}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.05,
                      color: "var(--text-primary)", margin: 0, cursor: "pointer" }}
                      onClick={() => navigate(`/project/${project.slug}`)}>
                      <CharReveal text={project.title} inView={false} stagger={0.04} delay={0.15} />
                    </h3>
                    <button onClick={() => navigate(`/project/${project.slug}`)}
                      style={{ padding: "6px 14px", borderRadius: 99, fontSize: 11, fontWeight: 600,
                        background: "var(--accent)", color: "#fff", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Case Study →
                    </button>
                  </div>

                  <TextReveal text={project.description} inView={false} delay={0.25} stagger={0.035}
                    className="text-[14px] leading-[1.85]"
                    style={{ color: "var(--text-secondary)", margin: 0, maxWidth: isMobile ? "none" : 420 }} />

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {project.tech.slice(0, 5).map(t => (
                      <span key={t} style={{ fontSize: 12, padding: "6px 12px", borderRadius: 99,
                        border: "1px solid var(--border)", background: "var(--accent-subtle)", color: "var(--text-secondary)" }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {!isMobile && (
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
                      <a href={project.demo} target="_blank" rel="noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px",
                          borderRadius: 99, fontSize: 13, fontWeight: 700, color: "#fff",
                          background: "var(--accent)", boxShadow: "0 4px 20px var(--accent-glow)", textDecoration: "none" }}>
                        ↗ Live Demo
                      </a>
                      <a href={project.github} target="_blank" rel="noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 20px",
                          borderRadius: 99, fontSize: 13, fontWeight: 600,
                          border: "1px solid var(--border-strong)", color: "var(--text-secondary)",
                          background: "var(--bg-surface)", textDecoration: "none" }}>
                        GitHub
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Scroll hint */}
          {activeIdx < N - 1 && (
            <div style={{ paddingBottom: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.45, flexShrink: 0 }}>
              <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--text-muted)" }}>scroll for next</span>
              <motion.svg animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}
                style={{ width: 14, height: 14, color: "var(--text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </div>
          )}
        </div>
      </div>

      {/* All-projects CTA in normal flow after */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ padding: isMobile ? "32px 24px" : "64px 24px", background: "var(--bg)" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <CharReveal text={`${projects.length} total projects`} inView delay={0.15} stagger={0.05}
            className="text-[13px]"
            style={{ color: "var(--text-muted)" }} />
          <Link to="/projects" style={{ textDecoration: "none" }}>
            <motion.div whileHover={{ x: 4 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "12px 24px",
                borderRadius: 99, fontSize: 14, fontWeight: 700,
                background: "var(--accent)", color: "#fff",
                boxShadow: "0 4px 20px var(--accent-glow)", cursor: "pointer" }}>
              View all work
              <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default Works;
