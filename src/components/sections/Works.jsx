import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { projects } from "../../data/portfolioData";

const featured = projects.filter(p => p.featured);
const N = featured.length;

export function Works() {
  const outerRef = useRef(null);
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);
  const isMobile = useIsMobile();

  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveIdx(Math.min(Math.floor(latest * N), N - 1));
  });

  const scrollToProject = (i) => {
    const el = outerRef.current;
    if (!el) return;
    const safeIdx = Math.max(0, Math.min(i, N - 1));
    // Use getBoundingClientRect for true absolute document position
    const elTop = el.getBoundingClientRect().top + window.scrollY;
    const totalScrollable = el.offsetHeight - window.innerHeight;
    const targetY = elTop + (safeIdx / N) * totalScrollable + 5;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.targetTouches[0].clientY;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    const diffY = touchStartY.current - touchEndY.current;
    if (Math.abs(diffY) < 40) return;

    if (diffY > 40 && activeIdx < N - 1) {
      scrollToProject(activeIdx + 1);
    } else if (diffY < -40 && activeIdx > 0) {
      scrollToProject(activeIdx - 1);
    }
  };

  const project = featured[activeIdx];

  return (
    <section id="works" style={{ background: "var(--bg-surface)", position: "relative" }}>
      {/* Torn edge top — transitions from bg to bg-surface */}
      <div style={{
        position: "absolute",
        top: -20,
        left: 0,
        right: 0,
        height: 40,
        background: "var(--bg-surface)",
        zIndex: 2,
      }} className="torn-edge-top" />

      {/* Outer: tall container creates scroll space */}
      <div ref={outerRef} style={{ height: `${N * 100}vh`, position: "relative" }}>

        {/* Sticky viewport */}
        <div style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "var(--bg-surface)",
          display: "flex",
          flexDirection: "column",
          padding: isMobile ? "0 20px" : "0 64px",
        }}>

          {/* ── Section header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              paddingTop: isMobile ? 36 : 88,
              paddingBottom: isMobile ? 12 : 20,
              maxWidth: 1280,
              width: "100%",
              margin: "0 auto",
              flexShrink: 0,
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: isMobile ? 12 : 24,
              flexWrap: "nowrap",
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: isMobile ? 4 : 8 }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "var(--accent)",
                  }}>
                    // SELECTED_WORK
                  </span>
                  <span className="stencil-num" style={{ fontSize: isMobile ? "1.4rem" : "1.8rem", userSelect: "none" }}>
                    03
                  </span>
                </div>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: isMobile ? "clamp(1.6rem, 5.5vw, 2.5rem)" : "clamp(2.4rem, 5.5vw, 5rem)",
                  textTransform: "uppercase",
                  letterSpacing: "-0.03em",
                  lineHeight: 0.9,
                  color: "var(--text-primary)",
                  margin: 0,
                }}>
                  FEATURED<br />
                  <span style={{ color: "var(--accent)" }}>PROJECTS</span>
                </h2>
              </div>

              {/* Counter + dots + View All button beside title */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: isMobile ? 8 : 12, flexShrink: 0 }}>
                <Link to="/projects" style={{ textDecoration: "none" }}>
                  <motion.div
                    className="btn-brutal"
                    style={{ padding: isMobile ? "6px 12px" : "8px 16px", fontSize: isMobile ? 10 : 11 }}
                    whileHover={{ y: -2, boxShadow: "var(--shadow-hard-ink)" }}
                    whileTap={{ y: 0, boxShadow: "none" }}
                  >
                    ALL PROJECTS →
                  </motion.div>
                </Link>

                <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 6 : 10 }}>
                  {/* Prev Arrow Button */}
                  <button
                    disabled={activeIdx === 0}
                    onClick={() => scrollToProject(activeIdx - 1)}
                    style={{
                      padding: "2px 6px",
                      fontSize: 11,
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      background: "transparent",
                      border: "1px solid var(--border-strong)",
                      color: activeIdx === 0 ? "var(--text-muted)" : "var(--text-primary)",
                      cursor: activeIdx === 0 ? "default" : "pointer",
                      opacity: activeIdx === 0 ? 0.35 : 1,
                      transition: "all 0.15s",
                    }}
                    aria-label="Previous Project"
                  >
                    ←
                  </button>

                  <div style={{ display: "flex", gap: isMobile ? 4 : 6 }}>
                    {featured.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => scrollToProject(i)}
                        style={{
                          width: i === activeIdx ? (isMobile ? 18 : 26) : (isMobile ? 6 : 8),
                          height: isMobile ? 6 : 8,
                          background: i === activeIdx ? "var(--accent)" : "var(--border-strong)",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                          transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                          borderRadius: 0,
                        }}
                      />
                    ))}
                  </div>

                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: isMobile ? 10 : 11,
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    fontVariantNumeric: "tabular-nums",
                  }}>
                    {String(activeIdx + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                  </span>

                  {/* Next Arrow Button */}
                  <button
                    disabled={activeIdx === N - 1}
                    onClick={() => scrollToProject(activeIdx + 1)}
                    style={{
                      padding: "2px 6px",
                      fontSize: 11,
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      background: "transparent",
                      border: "1px solid var(--border-strong)",
                      color: activeIdx === N - 1 ? "var(--text-muted)" : "var(--text-primary)",
                      cursor: activeIdx === N - 1 ? "default" : "pointer",
                      opacity: activeIdx === N - 1 ? 0.35 : 1,
                      transition: "all 0.15s",
                    }}
                    aria-label="Next Project"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Hard ink rule */}
            <div className="ink-rule-strong" style={{ marginTop: isMobile ? 12 : 20 }} />
          </motion.div>

          {/* ── Project content crossfade ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{
              flex: 1,
              maxWidth: 1280,
              width: "100%",
              margin: "0 auto",
              minHeight: 0,
              position: "relative",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr",
                  gap: isMobile ? 16 : 56,
                  alignItems: "center",
                  paddingTop: isMobile ? 12 : 24,
                  paddingBottom: isMobile ? 12 : 24,
                }}
              >
                {/* ── Image — rotated, hard shadow, tactile peel card ── */}
                <div
                  className="peel-hover"
                  style={{
                    position: "relative",
                    border: "3px solid var(--border-ink)",
                    overflow: "hidden",
                    aspectRatio: "16/10",
                    cursor: "pointer",
                    boxShadow: "var(--shadow-hard-ink)",
                    transform: `rotate(${activeIdx % 2 === 0 ? -1.5 : 1.5}deg)`,
                  }}
                  onClick={() => navigate(`/project/${project.slug}`)}
                >
                  {/* Tape anchors — Amber */}
                  <div className="tape-anchor" style={{ top: -10, left: 16, width: 88, height: 24, transform: "rotate(-9deg)", zIndex: 10 }} />
                  <div className="tape-anchor" style={{ top: -10, right: 16, width: 80, height: 22, transform: "rotate(7deg)", zIndex: 10 }} />
                  {/* Image with grayscale → color on hover */}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "grayscale(60%) contrast(1.05)",
                      transition: "filter 0.5s ease, transform 0.6s ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.filter = "grayscale(0%) contrast(1)"; e.currentTarget.style.transform = "scale(1.02)"; }}
                    onMouseLeave={e => { e.currentTarget.style.filter = "grayscale(60%) contrast(1.05)"; e.currentTarget.style.transform = "scale(1)"; }}
                  />

                  {/* Dark overlay */}
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)" }} />

                  {/* Category label — top left, label-maker style */}
                  <div style={{ position: "absolute", top: 12, left: 12 }}>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      padding: "5px 10px",
                      background: "var(--bg)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-strong)",
                    }}>
                      {project.category}
                    </span>
                  </div>

                  {/* CTA buttons — bottom, sharp */}
                  <div style={{
                    position: "absolute",
                    bottom: 12, left: 12, right: 12,
                    display: "flex",
                    gap: 8,
                  }}>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px 0",
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "#111111",
                        background: "var(--accent)",
                        border: "none",
                        textDecoration: "none",
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    >
                      ↗ LIVE DEMO
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px 0",
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--text-primary)",
                        background: "rgba(0,0,0,0.6)",
                        border: "1px solid rgba(245,240,232,0.3)",
                        textDecoration: "none",
                      }}
                    >
                      GITHUB
                    </a>
                  </div>
                </div>

                {/* ── Text block ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 12 : 20 }}>
                  {/* Label + year */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "var(--accent)",
                    }}>
                      FEATURED_{String(activeIdx + 1).padStart(2, "0")}
                    </span>
                    <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--text-muted)",
                    }}>
                      {project.year}
                    </span>
                  </div>

                  {/* Title + case study */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                    <h3
                      onClick={() => navigate(`/project/${project.slug}`)}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: isMobile ? "clamp(1.5rem, 4vw, 2.2rem)" : "clamp(1.8rem, 3.5vw, 3rem)",
                        textTransform: "uppercase",
                        letterSpacing: "-0.02em",
                        lineHeight: 0.92,
                        color: "var(--text-primary)",
                        margin: 0,
                        cursor: "pointer",
                      }}
                    >
                      {project.title}
                    </h3>
                    <button
                      onClick={() => navigate(`/project/${project.slug}`)}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        padding: "6px 14px",
                        background: "transparent",
                        color: "var(--accent)",
                        border: "1px solid var(--accent)",
                        cursor: "pointer",
                        flexShrink: 0,
                        alignSelf: "flex-start",
                        transition: "background 0.15s, color 0.15s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#111"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; }}
                    >
                      CASE STUDY →
                    </button>
                  </div>

                  {/* Description */}
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: isMobile ? 13 : 14,
                    lineHeight: isMobile ? 1.6 : 1.8,
                    color: "var(--text-secondary)",
                    margin: 0,
                    maxWidth: isMobile ? "none" : 400,
                  }}>
                    {project.description}
                  </p>

                  {/* Tech tags — label-maker style, no border-radius */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {project.tech.slice(0, 5).map(t => (
                      <span key={t} className="chip-mono">{t}</span>
                    ))}
                  </div>

                  {/* Desktop links */}
                  {!isMobile && (
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-brutal"
                        style={{ textDecoration: "none", fontSize: 11 }}
                      >
                        ↗ LIVE DEMO
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-brutal-ghost"
                        style={{ textDecoration: "none", fontSize: 11 }}
                      >
                        GITHUB
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Scroll hint */}
          {activeIdx < N - 1 && (
            <div style={{
              paddingBottom: isMobile ? 12 : 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              flexShrink: 0,
              cursor: "pointer",
            }}
            onClick={() => scrollToProject(activeIdx + 1)}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: isMobile ? "4px 10px" : "6px 14px",
                background: "var(--bg)",
                border: "1px solid var(--accent)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: isMobile ? 9 : 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--accent)",
                }}>
                  {isMobile ? "SWIPE / SCROLL FOR NEXT" : "SCROLL FOR NEXT"}
                </span>
                <motion.svg
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  style={{ width: 11, height: 11, color: "var(--accent)" }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── All-projects CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          padding: isMobile ? "40px 20px" : "64px",
          borderTop: "2px solid var(--border-ink)",
        }}
      >
        <div style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--text-muted)",
          }}>
            {projects.length} TOTAL PROJECTS
          </span>
          <Link to="/projects" style={{ textDecoration: "none" }}>
            <motion.div
              className="btn-brutal"
              whileHover={{ y: -3, boxShadow: "var(--shadow-hard-ink)" }}
              whileTap={{ y: 0, boxShadow: "none" }}
            >
              VIEW ALL WORK →
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* Torn edge bottom */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: 40,
        background: "var(--bg)",
        zIndex: 2,
      }} className="torn-edge-bottom" />
    </section>
  );
}

export default Works;

