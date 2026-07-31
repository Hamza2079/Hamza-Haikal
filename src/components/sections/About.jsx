import { motion } from "framer-motion";
import { services } from "../../data/portfolioData";
import { useIsMobile } from "../../hooks/useMediaQuery";
import profileImage from "../../assets/profile.webp";

/* ── SVG icons ── */
const serviceIcons = [
  <svg key="code" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>,
  <svg key="layout" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>,
  <svg key="zap" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>,
  <svg key="star" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>,
];

export function About() {
  const isMobile = useIsMobile();

  const profileRows = [
    { k: "NAME",     v: "HAMZA HAIKAL"           },
    { k: "ROLE",     v: "FRONTEND ENGINEER"       },
    { k: "BASE",     v: "MENOUFIA (SHEBEN EL KOM) / REMOTE" },
    { k: "EMAIL",    v: "hamzahaikal28@gmail.com" },
    { k: "STATUS",   v: "FULL-TIME · PART-TIME · FREELANCE", green: true },
  ];

  const coreValues = [
    "SHIP FAST, REFINE RELENTLESSLY",
    "DETERMINISTIC RENDER PATHS",
    "ZERO-COMPROMISE PERFORMANCE",
    "PRODUCTION-READY ON DAY ONE",
  ];

  const highlights = [
    { label: "LOCATION",     value: "Sheben El Kom" },
    { label: "AVAILABILITY", value: "Full / Part / Freelance" },
    { label: "TECH STACK",   value: "React & Next.js" },
  ];

  return (
    <section
      id="about"
      style={{
        background: "var(--bg)",
        overflow: "hidden",
        borderTop: "2px solid var(--border-ink)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "40px 20px" : "64px 48px" }}>
        
        {/* ── SECTION HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderBottom: "2px solid var(--border-ink)",
            paddingBottom: 20,
            marginBottom: 40,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <motion.span
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10, fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.15em",
                  color: "var(--accent)",
                }}
              >
                // MANIFESTO & PROFILE
              </motion.span>
              <span className="stencil-num" style={{ fontSize: "1.8rem", userSelect: "none" }}>
                02
              </span>
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: isMobile ? "clamp(2.4rem, 9vw, 3.8rem)" : "clamp(3.2rem, 5vw, 4.8rem)",
              textTransform: "uppercase", letterSpacing: "-0.03em",
              lineHeight: 0.88, color: "var(--text-primary)", margin: 0,
            }}>
              ABOUT <span style={{ color: "var(--accent)" }}>ME.</span>
            </h2>
          </div>
        </motion.div>

        {/* ── BOLD MANIFESTO BANNER (Inspired by Editorial brutalism) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{
            marginBottom: 48,
            paddingBottom: 32,
            borderBottom: "2px solid var(--border)",
          }}
        >
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: isMobile ? "clamp(2rem, 7.5vw, 3rem)" : "clamp(2.8rem, 4.2vw, 4.4rem)",
            textTransform: "none",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "var(--text-primary)",
            margin: "0 0 24px 0",
            maxWidth: 1050,
          }}>
            I don't just{" "}
            <span style={{ textDecoration: "line-through", textDecorationThickness: "3px", textDecorationColor: "var(--border-strong)", opacity: 0.45 }}>
              write code
            </span>
            . I{" "}
            <span style={{
              fontFamily: "var(--font-marker)",
              fontStyle: "italic",
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}>
              ARCHITECT
            </span>{" "}
            digital impact.
          </h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 16 : 40,
          }}>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: isMobile ? 15 : 16,
              lineHeight: 1.75,
              color: "var(--text-secondary)",
              margin: 0,
            }}>
              Every click is a commitment. I engineer the logic underlying every layout with the same intensity as the visual surface — instant load speeds, responsive behavior, and the subtle details users feel without ever having to think about.
            </p>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: isMobile ? 14 : 15,
              lineHeight: 1.75,
              color: "var(--text-muted)",
              margin: 0,
            }}>
              Shipping production software taught me what actually matters: <strong style={{ color: "var(--text-primary)" }}>code with purpose, build for scale, ship without fear</strong>. Structure over clutter. Speed over noise. Then make it visually unforgettable.
            </p>
          </div>
        </motion.div>

        {/* ── MAIN BALANCED GRID (2 EQUAL-HEIGHT COLUMNS) ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "360px 1fr",
          gap: isMobile ? 32 : 44,
          alignItems: "stretch",
          marginBottom: 40,
        }}>
          
          {/* LEFT COLUMN: Photo & Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: 20, justifyContent: "space-between" }}
          >
            {/* Polaroid Photo Card */}
            <motion.div
              initial={{ opacity: 0, rotate: -6, y: 20 }}
              whileInView={{ opacity: 1, rotate: -2.5, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="peel-hover"
              style={{
                border: "3px solid var(--border-ink)",
                padding: "8px 8px 40px",
                background: "var(--bg-surface)",
                boxShadow: "var(--shadow-hard-ink)",
                position: "relative",
              }}
            >
              {/* Tape anchor */}
              <div className="tape-anchor" style={{ top: -10, right: "18%", width: 88, height: 24, transform: "rotate(7deg)", zIndex: 20 }} />

              {/* Amber glow */}
              <div style={{
                position: "absolute", bottom: -20, right: -20,
                width: 140, height: 140,
                background: "var(--accent-glow)",
                filter: "blur(28px)",
                borderRadius: "50%", pointerEvents: "none", zIndex: 0,
              }} />

              <div style={{ position: "relative", overflow: "hidden", maxHeight: 340, zIndex: 1 }}>
                <img
                  src={profileImage}
                  alt="Hamza Haikal"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "100%", height: 340,
                    objectFit: "cover", objectPosition: "top center",
                    display: "block",
                    filter: "contrast(1.06) brightness(0.9) saturate(0.9)",
                  }}
                />
                {/* Amber tint */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(135deg, transparent 55%, rgba(245,158,11,0.16))",
                  pointerEvents: "none",
                }} />
              </div>

              <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, textAlign: "center", zIndex: 2 }}>
                <span className="marker-callout" style={{ fontSize: 14 }}>HAMZA HAIKAL →</span>
              </div>

              {/* Glass sticker badge */}
              <div className="glass-panel z-20" style={{
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
                    OPEN<br />FOR<br />HIRE
                  </span>
                </div>
            </motion.div>

            {/* Core Values Box — amber accent-left border */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{
                border: "2px solid var(--border-ink)",
                borderLeft: "4px solid var(--spray-accent)",
                padding: "18px 22px",
                background: "var(--bg-surface)",
                boxShadow: "4px 4px 0 0 var(--spray-accent)",
              }}
            >
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 9.5,
                fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.14em", color: "var(--spray-accent)",
                display: "block", marginBottom: 10,
              }}>
                // ARCHITECTURAL_PRINCIPLES
              </span>
              {coreValues.map((v, i) => (
                <motion.div
                  key={v}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.08 + i * 0.07 }}
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: 9.5, fontWeight: 600,
                    color: "var(--text-secondary)",
                    padding: "6px 0",
                    borderBottom: i < coreValues.length - 1 ? "1px solid var(--border)" : "none",
                    display: "flex", alignItems: "center", gap: 8,
                  }}
                >
                  <span style={{ width: 8, height: 2, background: "var(--spray-accent)", display: "inline-block", flexShrink: 0 }} />
                  {v}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Profile Data Table, Stats & Quote */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: 20, justifyContent: "space-between" }}
          >
            {/* Profile Data Table */}
            <div style={{
              border: "2px solid var(--border-ink)",
              boxShadow: "var(--shadow-hard-ink)",
              background: "var(--bg-surface)",
              overflow: "hidden",
            }}>
              {profileRows.map(({ k, v, green }, i) => (
                <div key={k} style={{
                  display: "grid",
                  gridTemplateColumns: "90px 1fr",
                  borderBottom: i < profileRows.length - 1 ? "1px solid var(--border)" : "none",
                }}>
                  <div style={{
                    padding: "9px 12px",
                    background: "var(--bg-elevated)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 8,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--text-muted)",
                    borderRight: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                  }}>
                    {k}
                  </div>
                  <div style={{
                    padding: "9px 12px",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    fontWeight: 600,
                    color: green ? "#4ADE80" : "var(--text-primary)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    overflowWrap: "anywhere",
                  }}>
                    {green && <span style={{ width: 5, height: 5, background: "#4ADE80", borderRadius: "50%", flexShrink: 0 }} />}
                    {v}
                  </div>
                </div>
              ))}
            </div>

            {/* Highlights Row */}
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              border: "2px solid var(--border-ink)",
              boxShadow: "var(--shadow-hard-ink)",
              background: "var(--bg-elevated)",
            }}>
              {highlights.map(({ label, value }, i) => (
                <div key={label} style={{
                  padding: "16px 14px",
                  textAlign: "center",
                  borderRight: !isMobile && i < 2 ? "1px solid var(--border)" : "none",
                  borderBottom: isMobile && i < 2 ? "1px solid var(--border)" : "none",
                }}>
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                    color: "var(--accent)",
                    lineHeight: 1.1,
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                  }}>
                    {value}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 8,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--text-muted)",
                  }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Quote Block */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.2 }}
              style={{
                borderLeft: "4px solid var(--accent)",
                padding: "16px 20px",
                background: "var(--bg-elevated)",
              }}
            >
              <p style={{
                fontFamily: "var(--font-marker)",
                fontStyle: "italic",
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--text-secondary)",
                margin: 0,
              }}>
                "Good code makes an application work. Great frontend architecture makes it feel alive."
              </p>
            </motion.div>

          </motion.div>

        </div>

        {/* ── SERVICES GRID (Full width bottom) ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ marginBottom: 16 }}>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--accent)",
              display: "block",
            }}>
              // CORE_CAPABILITIES
            </span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
            border: "2px solid var(--border-ink)",
            boxShadow: "var(--shadow-hard-ink)",
            background: "var(--bg-surface)",
          }}>
            {services.map((s, i) => (
              <motion.div
                key={s.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.06 + i * 0.09 }}
                style={{
                  padding: "20px 20px",
                  borderRight: !isMobile && i < 3 ? "1px solid var(--border)" : "none",
                  borderBottom: isMobile && i < 3 ? "1px solid var(--border)" : "none",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg-elevated)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--bg-surface)"}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    fontWeight: 700,
                    color: "var(--accent)",
                  }}>
                    0{i + 1}
                  </span>
                  <div style={{
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--border-strong)",
                    color: "var(--accent)",
                  }}>
                    <div style={{ width: 13, height: 13 }}>{serviceIcons[i]}</div>
                  </div>
                </div>

                <h4 style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 15,
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                  color: "var(--text-primary)",
                  margin: "0 0 6px 0",
                }}>
                  {s.title}
                </h4>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11.5,
                  lineHeight: 1.55,
                  color: "var(--text-muted)",
                  margin: 0,
                }}>
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default About;
