import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { CharReveal, TextReveal } from "../ui/TextReveal";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { experiences, techStack } from "../../data/portfolioData";
import { FaReact, FaHtml5, FaCss3Alt, FaGitAlt } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiTailwindcss, SiNextdotjs, SiVite, SiFramer, SiSupabase, SiAppwrite, SiRedux, SiFigma } from "react-icons/si";

const iconMap = { FaReact, SiJavascript, SiTypescript, FaHtml5, FaCss3Alt, SiTailwindcss, SiNextdotjs, FaGitAlt, SiVite, SiFramer, SiSupabase, SiAppwrite, SiRedux, SiFigma };
const TYPE = {
  Freelance: { color: "#A78BFA", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.3)" },
  Education: { color: "#FBBF24", bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.3)" },
  Training:  { color: "#34D399", bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.3)" },
};
const N = experiences.length;

function MarqueeRow({ items = [], reverse = false }) {
  const rowRef = useRef(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el || items.length === 0) return;

    const totalWidth = el.scrollWidth;
    const copyWidth = totalWidth / 2;
    if (copyWidth <= 0) return;

    let x = reverse ? -copyWidth : 0;
    let rafId;
    let lastTime = performance.now();

    el.style.transform = `translateX(${x}px)`;

    function tick(now) {
      const dt = now - lastTime;
      lastTime = now;
      const speed = (copyWidth / 30000) * dt;

      if (reverse) {
        x += speed;
        if (x >= 0) x -= copyWidth;
      } else {
        x -= speed;
        if (x <= -copyWidth) x += copyWidth;
      }
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
            flexShrink: 0, display: "flex", alignItems: "center", gap: 8,
            padding: "10px 16px", borderRadius: 12,
            border: "1px solid var(--border)", background: "var(--bg-surface)",
            marginRight: "0.75rem"
          }}>
            {Icon && <Icon style={{ fontSize: 18, color: tech.color }} />}
            <span style={{ fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", color: "var(--text-muted)" }}>
              {tech.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function Experience() {
  const outerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const progress = useMotionValue(0);
  const marquee  = [...techStack, ...techStack];

  useEffect(() => {
    let ticking = false;
    const update = () => {
      if (ticking) return;
      ticking = true;
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
  }, [progress, N]);

  const exp = experiences[activeIdx];
  const tc  = TYPE[exp?.type] || { color: "var(--text-muted)", bg: "var(--accent-subtle)", border: "var(--border)" };
  const isLeft = activeIdx % 2 === 0;
  const isMobile = useIsMobile();

  function CardContent({ e, tcolor, idx }) {
    return (
      <div style={{
        padding: isMobile ? 20 : 28, borderRadius: 20,
        background: "var(--bg-surface)", border: "1px solid var(--border)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, ${tcolor}, transparent)`, opacity: 0.8 }} />
        <CharReveal text={e.period} inView={false} stagger={0.04}
          className="text-[11px] font-medium uppercase tracking-[0.15em] mb-[14px]"
          style={{ color: "var(--text-muted)" }} />
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
          <h3 style={{ fontSize: isMobile ? 18 : 20, fontWeight: 900, letterSpacing: "-0.02em", color: "var(--text-primary)", margin: 0 }}>
            {e.company}
          </h3>
          <span style={{ fontSize: 10, fontWeight: 600, padding: "4px 10px", borderRadius: 99,
            background: TYPE[e.type]?.bg || "var(--accent-subtle)", border: `1px solid ${TYPE[e.type]?.border || "var(--border)"}`,
            color: TYPE[e.type]?.color || "var(--text-muted)" }}>
            {e.type}
          </span>
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 12, color: "var(--accent)" }}>
          {e.role}
        </span>
        {e.contributions?.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-muted)", display: "block", marginBottom: 8 }}>
              Core Contributions
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {e.contributions.map((item, ci) => (
                <span key={ci} style={{ fontSize: 12, lineHeight: 1.6, color: "var(--text-secondary)", margin: 0 }}>
                  • {item}
                </span>
              ))}
            </div>
          </div>
        )}
        {e.skills?.length > 0 && (
          <div>
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-muted)", display: "block", marginBottom: 8 }}>
              Skills Gained
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {e.skills.map((skill, si) => (
                <span key={si} style={{ fontSize: 10, fontWeight: 600, padding: "4px 10px", borderRadius: 99, border: "1px solid var(--border)", background: "var(--accent-subtle)", color: "var(--text-secondary)" }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (isMobile) {
    return (
      <section id="experience" style={{ background: "var(--bg)" }}>
        <div style={{ padding: "48px 24px 0" }}>
          <div style={{ marginBottom: 8 }}>
            <CharReveal text="Experience" inView stagger={0.06}
              className="text-[11px] font-semibold uppercase tracking-[0.2em] block mb-2"
              style={{ color: "var(--accent)" }} />
            <h2 style={{ fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1, color: "var(--text-primary)", margin: 0 }}>
              <CharReveal text="My Journey." inView stagger={0.05} />
            </h2>
          </div>
          <div style={{ height: 1, background: "var(--border)", marginBottom: 32 }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: "0 24px 48px" }}>
          {experiences.map((e, idx) => (
            <motion.div key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <CardContent e={e} tcolor={TYPE[e.type]?.color || "var(--text-muted)"} idx={idx} />
            </motion.div>
          ))}
        </div>

        {/* Tech stack */}
        <div style={{ padding: "40px 24px", background: "var(--bg)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div style={{ marginBottom: 36 }}>
                <CharReveal text="Tech Stack" inView stagger={0.06}
                  className="text-[11px] font-semibold uppercase tracking-[0.2em] block mb-[10px]"
                  style={{ color: "var(--accent)" }} />
                <h3 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 900, color: "var(--text-primary)", margin: 0 }}>
                  <CharReveal text="Technologies I work with." inView stagger={0.04} delay={0.15} />
                </h3>
              </div>
              <div style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 64, zIndex: 10, background: "linear-gradient(to right, var(--bg), transparent)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 64, zIndex: 10, background: "linear-gradient(to left, var(--bg), transparent)", pointerEvents: "none" }} />
                {[[marquee, false], [[...marquee].reverse(), true]].map(([items, reverse], ri) => (
                  <div key={ri} className="mb-3">
                    <MarqueeRow items={items} reverse={reverse} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" style={{ background: "var(--bg)" }}>
      {/* Outer: tall container */}
      <div ref={outerRef} style={{ height: `${N * 100}vh`, position: "relative" }}>

        {/* Sticky: pins while outer scrolls */}
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
          <div style={{ paddingTop: 88, paddingBottom: 24, maxWidth: 1100, width: "100%", margin: "0 auto", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
              <div>
                <CharReveal text="Experience" inView stagger={0.06}
                  className="text-[11px] font-semibold uppercase tracking-[0.2em] block mb-2"
                  style={{ color: "var(--accent)" }} />
                <h2 style={{ fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1, color: "var(--text-primary)", margin: 0 }}>
                  <CharReveal text="My Journey." inView stagger={0.05} />
                </h2>
              </div>

              {/* Dots + counter */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
                <div style={{ display: "flex", gap: 8 }}>
                  {experiences.map((_, i) => (
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
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)" }}>
                  {String(activeIdx + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                </span>
              </div>
            </div>
            <div style={{ height: 1, background: "var(--border)", marginTop: 20 }} />
          </div>

          {/* ── Timeline content ── */}
          <div style={{ flex: 1, maxWidth: 1100, width: "100%", margin: "0 auto", position: "relative", minHeight: 0 }}>
            {/* Center vertical line */}
            <div style={{
              position: "absolute", left: "50%", top:0, bottom: 0,
              width: 1, transform: "translateX(-50%)",
              background: "linear-gradient(to bottom, transparent, var(--accent) 20%, var(--accent) 80%, transparent)",
              opacity: 0.4, pointerEvents: "none",
            }} />

            {/* Active dot on line */}
            <div style={{
              position: "absolute", left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
              width: 16, height: 16, borderRadius: "50%",
              background: tc.color, border: "3px solid var(--bg)",
              boxShadow: `0 0 20px ${tc.color}80`,
              transition: "background 0.4s",
              zIndex: 5,
            }} />

            {/* Faded large number on opposite side */}
            <div style={{
              position: "absolute", top: "50%", transform: "translateY(-50%)",
              [isLeft ? "right" : "left"]: 0,
              width: "44%",
              display: "flex", alignItems: "center",
              justifyContent: isLeft ? "flex-start" : "flex-end",
              opacity: 0.06, pointerEvents: "none",
            }}>
              <span style={{ fontSize: "clamp(5rem,12vw,10rem)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.04em" }}>
                {String(activeIdx + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Crossfading card */}
            <AnimatePresence mode="wait">
              <motion.div key={activeIdx}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  top: "5%", transform: "translateY(-50%)",
                  width: "44%",
                  [isLeft ? "left" : "right"]: 0,
                }}
              >
                <CardContent e={exp} tcolor={tc.color} idx={activeIdx} />

                {/* Connector to center line */}
                <div style={{
                  position: "absolute", top: "50%", transform: "translateY(-50%)",
                  [isLeft ? "right" : "left"]: -40,
                  width: 40, height: 1, background: "var(--border-strong)",
                }} />
              </motion.div>
            </AnimatePresence>
          </div>

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

      {/* Tech stack — normal flow after */}
      <div style={{ padding: "80px 24px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ marginBottom: 36 }}>
              <CharReveal text="Tech Stack" inView stagger={0.06}
                className="text-[11px] font-semibold uppercase tracking-[0.2em] block mb-[10px]"
                style={{ color: "var(--accent)" }} />
              <h3 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 900, color: "var(--text-primary)", margin: 0 }}>
                <CharReveal text="Technologies I work with." inView stagger={0.04} delay={0.15} />
              </h3>
            </div>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 64, zIndex: 10, background: "linear-gradient(to right, var(--bg), transparent)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 64, zIndex: 10, background: "linear-gradient(to left, var(--bg), transparent)", pointerEvents: "none" }} />
              {[[marquee, false], [[...marquee].reverse(), true]].map(([items, reverse], ri) => (
                <div key={ri} className="mb-3">
                  <MarqueeRow items={items} reverse={reverse} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
