import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { experiences, techStack } from "../../data/portfolioData";
import { FaReact, FaHtml5, FaCss3Alt, FaGitAlt } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiTailwindcss, SiNextdotjs, SiVite, SiFramer, SiSupabase, SiAppwrite, SiRedux, SiFigma } from "react-icons/si";

const iconMap = { FaReact, SiJavascript, SiTypescript, FaHtml5, FaCss3Alt, SiTailwindcss, SiNextdotjs, FaGitAlt, SiVite, SiFramer, SiSupabase, SiAppwrite, SiRedux, SiFigma };
const TYPE = {
  Freelance: { color: "#E8721C", bg: "rgba(232,114,28,0.1)",  border: "rgba(232,114,28,0.35)" },
  Education: { color: "#FBBF24", bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.35)" },
  Training:  { color: "#4ADE80", bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.35)" },
};
const N = experiences.length;

function MarqueeRow({ items = [], reverse = false }) {
  const rowRef = useRef(null);
  useEffect(() => {
    const el = rowRef.current;
    if (!el || items.length === 0) return;
    const copyWidth = el.scrollWidth / 2;
    if (copyWidth <= 0) return;
    let x = reverse ? -copyWidth : 0;
    let rafId;
    let lastTime = performance.now();
    el.style.transform = `translateX(${x}px)`;
    function tick(now) {
      const dt = now - lastTime; lastTime = now;
      const speed = (copyWidth / 30000) * dt;
      if (reverse) { x += speed; if (x >= 0) x -= copyWidth; }
      else { x -= speed; if (x <= -copyWidth) x += copyWidth; }
      el.style.transform = `translateX(${x}px)`;
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [reverse, items.length]);

  return (
    <div ref={rowRef} style={{ display: "flex", width: "max-content" }}>
      {items.map((tech, i) => {
        const Icon = iconMap[tech.icon];
        return (
          <div key={i} style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            border: "1px solid var(--border)",
            background: "var(--bg)",
            marginRight: "0.75rem",
          }}>
            {Icon && <Icon style={{ fontSize: 16, color: tech.color }} />}
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
              color: "var(--text-muted)",
            }}>
              {tech.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function CardContent({ e, tcolor, isMobile }) {
  const tc = TYPE[e.type] || { color: "var(--text-muted)", bg: "var(--bg-elevated)", border: "var(--border)" };
  return (
    <div style={{
      padding: isMobile ? 20 : 28,
      background: "var(--bg-surface)",
      border: "2px solid var(--border-ink)",
      boxShadow: `4px 4px 0 0 ${tcolor || "var(--accent)"}`,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Top accent bar */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 3,
        background: tcolor || "var(--accent)",
      }} />

      {/* Period */}
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        color: "var(--text-muted)",
        marginBottom: 14,
        marginTop: 4,
      }}>
        {e.period}
      </div>

      {/* Company + type badge */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: isMobile ? 20 : 24,
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          lineHeight: 0.95,
          color: "var(--text-primary)",
          margin: 0,
        }}>
          {e.company}
        </h3>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          padding: "4px 8px",
          background: tc.bg,
          border: `1px solid ${tc.border}`,
          color: tc.color,
        }}>
          {e.type}
        </span>
      </div>

      {/* Role */}
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "var(--accent)",
        display: "block",
        marginBottom: 14,
      }}>
        {e.role}
      </span>

      {/* Contributions */}
      {e.contributions?.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "var(--text-muted)",
            display: "block",
            marginBottom: 8,
          }}>
            CORE_CONTRIBUTIONS
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {e.contributions.map((item, ci) => (
              <span key={ci} style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                lineHeight: 1.6,
                color: "var(--text-secondary)",
              }}>
                — {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {e.skills?.length > 0 && (
        <div>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "var(--text-muted)",
            display: "block",
            marginBottom: 8,
          }}>
            SKILLS_GAINED
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {e.skills.map((skill, si) => (
              <span key={si} className="chip-mono">{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Experience() {
  const outerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const progress = useMotionValue(0);
  const marquee  = [...techStack, ...techStack];
  const isMobile = useIsMobile();

  useEffect(() => {
    let ticking = false;
    const update = () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const el = outerRef.current;
        if (!el) { ticking = false; return; }
        const { top } = el.getBoundingClientRect();
        const scrollable = el.offsetHeight - window.innerHeight;
        if (scrollable <= 0) { ticking = false; return; }
        const p = Math.max(0, Math.min(1, -top / scrollable));
        progress.set(p);
        setActiveIdx(Math.min(Math.floor(p * N), N - 1));
        ticking = false;
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [progress]);

  const exp = experiences[activeIdx];
  const tc  = TYPE[exp?.type] || { color: "var(--accent)" };
  const isLeft = activeIdx % 2 === 0;

  /* Tech stack sub-section — shared between mobile and desktop */
  const TechStackSection = () => (
    <div style={{ padding: isMobile ? "60px 20px" : "80px 64px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ marginBottom: 32 }}>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--accent)",
              display: "block",
              marginBottom: 8,
            }}>
              // TECH_STACK
            </span>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              lineHeight: 0.92,
              color: "var(--text-primary)",
              margin: 0,
            }}>
              TECHNOLOGIES I WORK WITH
            </h3>
            <div className="ink-rule" style={{ marginTop: 16, opacity: 0.15 }} />
          </div>
          <div style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 64, zIndex: 10, background: "linear-gradient(to right, var(--bg), transparent)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 64, zIndex: 10, background: "linear-gradient(to left, var(--bg), transparent)", pointerEvents: "none" }} />
            {[[marquee, false], [[...marquee].reverse(), true]].map(([items, reverse], ri) => (
              <div key={ri} style={{ marginBottom: 12, overflow: "hidden" }}>
                <MarqueeRow items={items} reverse={reverse} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <section id="experience" style={{ background: "var(--bg)" }}>
        
        <div style={{ padding: "60px 20px 0" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "var(--accent)",
              }}>
                // MY_JOURNEY
              </span>
              <span className="stencil-num" style={{ fontSize: "1.8rem", userSelect: "none" }}>
                04
              </span>
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(2.4rem, 8vw, 4rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
              color: "var(--text-primary)",
              margin: 0,
            }}>
              EXPERIENCE
            </h2>
          </div>
          
          <div className="ink-rule-strong" style={{ marginTop: 20, marginBottom: 32 }} />
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: "0 20px 60px" }}>
          {experiences.map((e, idx) => (
            <motion.div key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
            >
              <CardContent e={e} tcolor={TYPE[e.type]?.color} isMobile={true} />
            </motion.div>
          ))}
        </div>
        <TechStackSection />
      </section>
    );
  }

  return (
    <section id="experience" style={{ background: "var(--bg)" }}>
      <div ref={outerRef} style={{ height: `${N * 100}vh`, position: "relative" }}>
        <div style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "var(--bg)",
          display: "flex",
          flexDirection: "column",
          padding: "0 64px",
        }}>

          {/* Header */}
          <div style={{ paddingTop: 88, paddingBottom: 20, maxWidth: 1100, width: "100%", margin: "0 auto", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--accent)",
                  }}>
                    // MY_JOURNEY
                  </span>
                  <span className="stencil-num" style={{ fontSize: "1.8rem", userSelect: "none" }}>
                    04
                  </span>
                </div>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
                  textTransform: "uppercase",
                  letterSpacing: "-0.03em",
                  lineHeight: 0.9,
                  color: "var(--text-primary)",
                  margin: 0,
                }}>
                  EXPERIENCE
                </h2>
              </div>

              {/* Dots + counter */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {experiences.map((_, i) => (
                    <button key={i}
                      onClick={() => {
                        const el = outerRef.current; if (!el) return;
                        window.scrollTo({ top: el.offsetTop + (i / N) * el.offsetHeight, behavior: "smooth" });
                      }}
                      style={{
                        width: i === activeIdx ? 28 : 8,
                        height: 8,
                        borderRadius: 0,
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        background: i === activeIdx ? "var(--accent)" : "var(--border-strong)",
                        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    />
                  ))}
                </div>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--text-muted)",
                }}>
                  {String(activeIdx + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                </span>
              </div>
            </div>
            <div className="ink-rule-strong" style={{ marginTop: 20 }} />
          </div>

          {/* Timeline area */}
          <div style={{ flex: 1, maxWidth: 1100, width: "100%", margin: "0 auto", position: "relative", minHeight: 0 }}>

            {/* Center vertical line */}
            <div style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 2,
              transform: "translateX(-50%)",
              background: "var(--border-strong)",
              opacity: 0.5,
            }} />

            {/* Active square dot on line */}
            <div style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 14,
              height: 14,
              background: tc.color,
              border: `3px solid var(--bg)`,
              boxShadow: `0 0 0 2px ${tc.color}`,
              transition: "background 0.35s, box-shadow 0.35s",
              zIndex: 5,
            }} />

            {/* Ghost index number */}
            <div style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              [isLeft ? "right" : "left"]: 0,
              width: "44%",
              display: "flex",
              alignItems: "center",
              justifyContent: isLeft ? "flex-start" : "flex-end",
              opacity: 0.04,
              pointerEvents: "none",
            }}>
              <span style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(6rem, 14vw, 12rem)",
                letterSpacing: "-0.06em",
                color: "var(--text-primary)",
                lineHeight: 0.85,
              }}>
                {String(activeIdx + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Connector + Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  top: "5%",
                  transform: "translateY(-50%)",
                  width: "44%",
                  [isLeft ? "left" : "right"]: 0,
                }}
              >
                <CardContent e={exp} tcolor={tc.color} isMobile={false} />
                {/* Connector line */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  [isLeft ? "right" : "left"]: -40,
                  width: 40,
                  height: 2,
                  background: "var(--border-strong)",
                }} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Scroll hint */}
          {activeIdx < N - 1 && (
            <div style={{ paddingBottom: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.4, flexShrink: 0 }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "var(--text-muted)",
              }}>
                SCROLL FOR NEXT
              </span>
              <motion.svg
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                style={{ width: 12, height: 12, color: "var(--text-muted)" }}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="square" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </div>
          )}
        </div>
      </div>

      <TechStackSection />
    </section>
  );
}

export default Experience;
