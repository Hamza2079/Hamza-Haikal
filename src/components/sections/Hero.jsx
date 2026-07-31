import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { AnimatedCounter } from "../ui/AnimatedCounter";
import profileImage from "../../assets/Profile1.webp";

const MotionLink = motion(Link);

/* ── Stagger character entrance on hover ── */
function SplitHoverText({ text, style }) {
  const [hovered, setHovered] = useState(false);
  const chars = text.split("");
  return (
    <span
      style={{ display: "inline-flex", flexWrap: "wrap", cursor: "default", ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          animate={hovered
            ? { y: [0, -10, 0], opacity: [1, 0.3, 1] }
            : { y: 0, opacity: 1 }
          }
          transition={{
            duration: 0.38,
            delay: hovered ? i * 0.032 : i * 0.018,
            ease: "easeInOut",
          }}
          style={{ display: "inline-block", whiteSpace: ch === " " ? "pre" : "normal" }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Stagger container helper ── */
const stagger = (delay = 0, dur = 0.55) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: dur, delay, ease: [0.22, 1, 0.36, 1] },
});

export function Hero() {
  const heroRef = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll();
  const heroY       = useTransform(scrollYProgress, [0, 0.5], [0, isMobile ? 0 : -70]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.38], [1, isMobile ? 1 : 0]);
  const photoY      = useTransform(scrollYProgress, [0, 0.5], [0, isMobile ? 0 : -40]);

  const scrollTo = useCallback((id) => {
    const el = document.querySelector(`#${id}`);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >


      {/* ── Top accent line ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 3, background: "var(--accent)",
          transformOrigin: "left", zIndex: 2,
        }}
      />

      {/* ── Side rotated label ── */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          style={{
            position: "absolute", right: 24, top: "50%",
            transform: "translateY(-50%) rotate(90deg)",
            transformOrigin: "center",
            fontFamily: "var(--font-mono)", fontSize: 9,
            fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "var(--text-muted)",
            zIndex: 5, whiteSpace: "nowrap",
          }}
        >
          HAMZA HAIKAL — FRONTEND ARCHITECT — VOL.01
        </motion.div>
      )}

      {/* ── Main content ── */}
      <motion.div
        style={{
          position: "relative", zIndex: 10, width: "100%",
          maxWidth: 1440, margin: "0 auto",
          padding: "clamp(100px,14vh,136px) clamp(20px,5vw,64px) clamp(64px,8vh,96px)",
          y: heroY, opacity: heroOpacity,
        }}
      >
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.15fr 0.85fr",
          gap: isMobile ? 52 : 80,
          alignItems: "center",
        }}>

          {/* ════ LEFT: Text ════ */}
          <div>

            {/* Status pill — glass panel */}
            <motion.div {...stagger(0.05, 0.4)} style={{ marginBottom: 32, display: "flex", flexWrap: "wrap", gap: 10 }}>
              <div className="glass-panel" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "7px 14px",
                border: "1px solid var(--accent-dim)",
              }}>
                <span className="pulse-dot" />
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 10,
                  fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.1em", color: "var(--text-primary)",
                }}>OPEN TO WORK</span>
              </div>

              <div style={{
                display: "inline-flex", alignItems: "center",
                padding: "7px 14px",
                border: "2px solid var(--border)",
                background: "var(--bg-surface)",
                fontFamily: "var(--font-mono)", fontSize: 10,
                fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.1em", color: "var(--text-muted)",
              }}>MENOUFIA / REMOTE</div>

              <div style={{
                display: "inline-flex", alignItems: "center",
                padding: "7px 14px",
                border: "2px solid var(--accent-dim)",
                background: "var(--bg-surface)",
                fontFamily: "var(--font-mono)", fontSize: 10,
                fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.1em", color: "var(--spray-accent)",
              }}>FULL-TIME · PART-TIME · FREELANCE</div>
            </motion.div>

            {/* Marker annotation */}
            <motion.div {...stagger(0.12, 0.4)} style={{ marginBottom: 8 }}>
              <span className="marker-callout" style={{ fontSize: isMobile ? 13 : 17 }}>
                // FRONTEND ENGINEER & UI ARCHITECT
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div {...stagger(0.18, 0.6)} style={{ marginBottom: 20 }}>
              <h1 style={{
                fontFamily: "var(--font-stencil)", fontWeight: 400,
                fontSize: "clamp(4rem, 12vw, 10.5rem)",
                textTransform: "uppercase", letterSpacing: "0.01em",
                lineHeight: 0.82, margin: 0,
                color: "var(--text-primary)",
              }}>
                <SplitHoverText text="I BUILD" style={{ display: "block" }} />
                <SplitHoverText
                  text="THINGS."
                  style={{ display: "block", color: "var(--spray-accent)" }}
                />
              </h1>
            </motion.div>

            {/* Sub-label row */}
            <motion.div
              {...stagger(0.28, 0.5)}
              style={{
                display: "flex", alignItems: "center", gap: 16,
                borderTop: "2px solid var(--border-ink)", paddingTop: 16,
                marginBottom: 24,
              }}
            >
              <span className="stencil-num-accent" style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)" }}>
                01
              </span>
              <p style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(1rem, 2.2vw, 1.6rem)",
                textTransform: "uppercase", letterSpacing: "-0.01em",
                color: "var(--text-secondary)", margin: 0, lineHeight: 1.1,
              }}>
                FAST. RESPONSIVE. <span style={{ color: "var(--spray-accent)" }}>UNFORGETTABLE.</span>
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              {...stagger(0.36, 0.5)}
              style={{
                fontFamily: "var(--font-body)", fontSize: 15.5,
                lineHeight: 1.78, color: "var(--text-secondary)",
                maxWidth: 520, marginBottom: 36,
              }}
            >
              I turn complex ideas into smooth, modern, and high-performing React & Next.js web applications. Built for speed, styled with precision, and designed to deliver real results.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...stagger(0.44, 0.5)}
              style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 44 }}
            >
              <MotionLink
                to="/projects"
                className="btn-brutal"
                style={{ padding: "14px 30px", fontSize: 11, textDecoration: "none" }}
                whileHover={{ y: -4, boxShadow: "var(--shadow-hard-ink)" }}
                whileTap={{ y: 0, boxShadow: "none" }}
              >
                VIEW MY WORK ↗
              </MotionLink>

              <motion.button
                onClick={() => scrollTo("contact")}
                className="btn-brutal-ghost"
                style={{ padding: "14px 26px", fontSize: 11 }}
                whileHover={{ y: -4, boxShadow: "var(--shadow-hard-ink)" }}
                whileTap={{ y: 0, boxShadow: "none" }}
              >
                LET'S TALK
              </motion.button>

              <motion.a
                href="Hamza_Haikal_Resume_classic.pdf"
                download="Hamza_Haikal_CV.pdf"
                style={{
                  fontFamily: "var(--font-mono)", fontSize: 11,
                  fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.08em", padding: "14px 22px",
                  background: "var(--bg-surface)", color: "var(--text-primary)",
                  border: "2px solid var(--border-ink)",
                  display: "inline-flex", alignItems: "center",
                  gap: 8, textDecoration: "none",
                }}
                whileHover={{ y: -3, boxShadow: "var(--shadow-hard)" }}
                whileTap={{ y: 0 }}
              >
                RÉSUMÉ ↓
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              {...stagger(0.54, 0.5)}
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: 20,
                display: "flex", flexWrap: "wrap",
                gap: "14px 40px", alignItems: "center",
              }}
            >
              {[
                { k: "PROJECTS", val: 13, suffix: "+" },
                { k: "EXPERIENCE", val: 1, suffix: "+ YR" },
                { k: "CLIENTS", val: 1,  },
              ].map(({ k, val, suffix }) => (
                <div key={k} style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600,
                    textTransform: "uppercase", letterSpacing: "0.1em",
                    color: "var(--text-muted)",
                  }}>{k}:</span>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 15,
                    fontWeight: 700, color: "var(--spray-accent)",
                  }}>
                    <AnimatedCounter value={val} suffix={suffix} />
                  </span>
                </div>
              ))}

              <div style={{ display: "flex", gap: 18, marginLeft: "auto" }}>
                {[
                  { label: "GITHUB",   href: "https://github.com/Hamza2079" },
                  { label: "LINKEDIN", href: "https://linkedin.com/in/hamza-haikal" },
                ].map(({ label, href }) => (
                  <motion.a
                    key={label} href={href} target="_blank" rel="noreferrer"
                    style={{
                      fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.1em",
                      color: "var(--text-muted)",
                      textDecoration: "underline",
                      textDecorationColor: "var(--spray-accent)",
                    }}
                    whileHover={{ color: "var(--spray-accent)" }}
                  >
                    {label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ════ RIGHT: Photo card ════ */}
          <motion.div
            initial={{ opacity: 0, x: 44 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "relative", display: "flex",
              justifyContent: isMobile ? "center" : "flex-end",
              y: photoY,
            }}
          >
            {/* Amber glow behind photo */}
            <div style={{
              position: "absolute",
              width: isMobile ? 220 : 290,
              height: isMobile ? 220 : 290,
              background: "var(--accent-glow)",
              filter: "var(--blur-lg)",
              borderRadius: "50%",
              top: "20%", right: isMobile ? "auto" : "4%",
              transform: "translate(10%, -10%)",
              zIndex: 0,
              pointerEvents: "none",
            }} />

            {/* Polaroid frame */}
            <div style={{ position: "relative", display: "inline-block", zIndex: 1 }}>
              <motion.div
                className="peel-hover"
                style={{
                  background: "var(--bg-surface)",
                  border: "3px solid var(--border-ink)",
                  padding: "12px 12px 56px 12px",
                  boxShadow: "var(--shadow-hard-ink)",
                  transform: "rotate(4deg)",
                  position: "relative",
                  width: isMobile ? 240 : 300,
                }}
              >
                {/* Image */}
                <div style={{
                  width: "100%", aspectRatio: "1/1.12",
                  overflow: "hidden", position: "relative",
                  border: "1px solid var(--border)",
                }}>
                  <img
                    src={profileImage}
                    alt="Hamza Haikal — Frontend Engineer"
                    loading="eager" decoding="async" fetchPriority="high"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block",
                      filter: "contrast(1.06) brightness(0.9) saturate(0.9)" }}
                  />
                  {/* Amber tint overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(135deg, transparent 60%, rgba(245,158,11,0.18))",
                    pointerEvents: "none",
                  }} />
                </div>

                {/* Caption */}
                <div style={{ position: "absolute", bottom: 14, left: 12, right: 12, textAlign: "center" }}>
                  <span className="marker-callout" style={{ fontSize: 14 }}>
                    HAMZA HAIKAL →
                  </span>
                </div>

                {/* Glass status badge — top right */}
                <div className="glass-panel" style={{
                  position: "absolute", top: -18, right: -18,
                  width: 70, height: 70,
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  textAlign: "center", transform: "rotate(-14deg)",
                  border: "2px solid var(--accent-dim)",
                  boxShadow: "3px 3px 0 0 var(--spray-accent)",
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 7.5,
                    fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "var(--text-primary)", lineHeight: 1.35,
                  }}>
                    FRONT<br />END<br />2026
                  </span>
                </div>
              </motion.div>

              {/* Tape anchors */}
              <div className="tape-anchor" style={{
                top: -12, left: "14%", width: 90, height: 24,
                transform: "rotate(-10deg)", zIndex: 20,
              }} />
              <div className="tape-anchor" style={{
                bottom: 22, right: -14, width: 80, height: 22,
                transform: "rotate(7deg)", zIndex: 20,
              }} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
