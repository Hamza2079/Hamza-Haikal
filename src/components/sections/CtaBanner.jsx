import { motion } from "framer-motion";

/**
 * CtaBanner — compact banner between About and Works.
 * Serious, authoritative, brutalist style.
 */
export function CtaBanner() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
  };

  return (
    <div style={{ padding: "0 clamp(20px,5vw,64px)", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            padding: "28px 36px",
            border: "2px solid var(--border-ink)",
            background: "var(--bg-elevated)",
            boxShadow: "var(--shadow-hard)",
          }}
        >
          {/* Left: text */}
          <div>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "var(--accent)",
              margin: "0 0 8px",
            }}>
              // TECHNICAL_ENGAGEMENTS
            </p>
            <p style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
              color: "var(--text-primary)",
              margin: "0 0 8px",
            }}>
              READY TO BUILD A PRODUCTION-GRADE SYSTEM?
            </p>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "var(--text-muted)",
              margin: 0,
              maxWidth: 520,
            }}>
              Engineering bespoke frontend solutions that deliver high performance — from architecture to deployment.
            </p>
          </div>

          {/* Right: CTA */}
          <motion.button
            onClick={scrollToContact}
            whileHover={{ y: -3, boxShadow: "var(--shadow-hard-ink)" }}
            whileTap={{ y: 0, boxShadow: "none" }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "13px 28px",
              background: "var(--accent)",
              color: "#111111",
              border: "2px solid var(--accent)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
          >
            INITIATE CONTACT →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
