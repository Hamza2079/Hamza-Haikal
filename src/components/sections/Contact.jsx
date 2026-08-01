import { motion } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useIsMobile } from "../../hooks/useMediaQuery";

const socialLinks = [
  { name: "GitHub",   href: "https://github.com/Hamza2079",         icon: FaGithub  },
  { name: "LinkedIn", href: "https://linkedin.com/in/hamza-haikal", icon: FaLinkedin },
  { name: "Email",    href: "mailto:hamzahaikal28@gmail.com",        icon: FaEnvelope },
];

export function Contact() {
  const isMobile = useIsMobile();
  const [formData, setFormData]         = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send("service_y1ah4a4", "template_6wbd25y",
        { from_name: formData.name, from_email: formData.email, message: formData.message, to_email: "hamzahaikal28@gmail.com" },
        "xWNJOeKRTA-4NTOu7");
      setIsSubmitting(false); setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch {
      setIsSubmitting(false); setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  /* Typewriter-style input base */
  const inputBase = {
    width: "100%",
    padding: "14px 0",
    background: "transparent",
    border: "none",
    borderBottom: "2px solid var(--border-strong)",
    color: "var(--text-primary)",
    fontFamily: "var(--font-body)",
    fontSize: 15,
    outline: "none",
    transition: "border-color 0.2s ease",
    display: "block",
  };

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        padding: isMobile ? "64px 20px 0" : "120px 64px 0",
        background: "var(--bg-surface)",
        borderTop: "2px solid var(--border-ink)",
        overflow: "hidden",
      }}
    >
      {/* Ghost text */}
      <div className="section-ghost-number" style={{
        top: -40,
        right: -10,
        color: "var(--text-primary)",
        opacity: 0.05,
      }}>
        05
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: isMobile ? 40 : 64 }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--accent)",
              }}>
                // STAY_IN_TOUCH
              </span>
              <span className="stencil-num" style={{ fontSize: "1.8rem", userSelect: "none" }}>
                05
              </span>
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: isMobile ? "clamp(2.5rem, 10vw, 4rem)" : "clamp(3.5rem, 8vw, 6.5rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              lineHeight: 0.88,
              color: "var(--text-primary)",
              margin: 0,
            }}>
              LET'S CREATE<br />
              <span style={{ color: "var(--accent)" }}>SOMETHING.</span>
            </h2>
          </div>
          <div style={{ marginTop: 20, height: 2, background: "var(--accent)", width: 70 }} />
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: isMobile ? 14 : 16,
            lineHeight: 1.7,
            color: "var(--text-secondary)",
            maxWidth: 420,
            marginTop: 16,
          }}>
            Have an idea? Have a deadline? Either way — I'm in.
            <br />I typically respond within 24 hours.
          </p>

          {/* Email button — responsive width */}
          <motion.a
            href="mailto:hamzahaikal28@gmail.com"
            whileHover={{ y: -3, boxShadow: "var(--shadow-hard-ink)" }}
            whileTap={{ y: 0, boxShadow: "none" }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginTop: 20,
              padding: "12px 20px",
              fontFamily: "var(--font-mono)",
              fontSize: isMobile ? 10 : 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#111111",
              background: "var(--accent)",
              border: "2px solid var(--accent)",
              textDecoration: "none",
              maxWidth: "100%",
              overflowWrap: "anywhere",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
          >
            <FaEnvelope style={{ fontSize: 12, flexShrink: 0 }} />
            <span>hamzahaikal28@gmail.com</span>
          </motion.a>
        </motion.div>

        {/* ── Form + Social grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 40 : 64,
          alignItems: "start",
        }}>
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 20 : 32,
            }}>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <label style={{
                  fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.14em",
                  color: "var(--text-muted)", display: "block", marginBottom: 6,
                }}>NAME_</label>
                <input
                  type="text" name="name" id="contact-name"
                  value={formData.name} onChange={handleChange}
                  required placeholder="Your name"
                  style={inputBase}
                  onFocus={e => e.target.style.borderBottomColor = "var(--accent)"}
                  onBlur={e => e.target.style.borderBottomColor = "var(--border-strong)"}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.18 }}
              >
                <label style={{
                  fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.14em",
                  color: "var(--text-muted)", display: "block", marginBottom: 6,
                }}>EMAIL_</label>
                <input
                  type="email" name="email" id="contact-email"
                  value={formData.email} onChange={handleChange}
                  required placeholder="your@email.com"
                  style={inputBase}
                  onFocus={e => e.target.style.borderBottomColor = "var(--accent)"}
                  onBlur={e => e.target.style.borderBottomColor = "var(--border-strong)"}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.26 }}
            >
              <label style={{
                fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.14em",
                color: "var(--text-muted)", display: "block", marginBottom: 6,
              }}>MESSAGE_</label>
              <textarea
                name="message" id="contact-message"
                value={formData.message} onChange={handleChange}
                required rows={isMobile ? 4 : 5}
                placeholder="Tell me about your project, timeline, goals..."
                style={{ ...inputBase, resize: "none", padding: "12px 0" }}
                onFocus={e => e.target.style.borderBottomColor = "var(--accent)"}
                onBlur={e => e.target.style.borderBottomColor = "var(--border-strong)"}
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ y: -3, boxShadow: "var(--shadow-hard-ink)" }}
              whileTap={{ y: 0, boxShadow: "none" }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "14px 28px",
                background: submitStatus === "error" ? "#EF4444" : "var(--accent)",
                color: "#111111",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                opacity: isSubmitting ? 0.6 : 1,
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ width: 14, height: 14, border: "2px solid rgba(17,17,17,0.3)", borderTop: "2px solid #111" }}
                  />
                  SENDING…
                </>
              ) : submitStatus === "success" ? "✓ MESSAGE SENT!"
                : submitStatus === "error" ? "✕ FAILED. TRY AGAIN"
                  : "SEND MESSAGE →"}
            </motion.button>

            {submitStatus === "success" && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "#4ADE80",
                  textAlign: "center",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Thanks! I'll get back to you soon.
              </motion.p>
            )}
          </motion.form>

          {/* Social + info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            {/* Available stamp */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 16px",
              border: "2px solid rgba(74,222,128,0.3)",
              background: "rgba(74,222,128,0.08)",
            }}>
              <span style={{ width: 8, height: 8, background: "#4ADE80", borderRadius: "50%", flexShrink: 0 }} />
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#4ADE80",
              }}>
                AVAILABLE FOR WORK
              </span>
            </div>

            {/* Social links */}
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 16px",
                    border: "2px solid var(--border-ink)",
                    background: "var(--bg-surface)",
                    boxShadow: "var(--shadow-hard-ink)",
                    textDecoration: "none",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-ink)"; }}
                >
                  <div style={{
                    width: 34,
                    height: 34,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--border-strong)",
                    background: "var(--bg-elevated)",
                    color: "var(--accent)",
                    flexShrink: 0,
                  }}>
                    <Icon style={{ fontSize: 14 }} />
                  </div>
                  <div style={{ minWidth: 0, overflow: "hidden" }}>
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--text-primary)",
                    }}>
                      {social.name}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--text-muted)",
                      marginTop: 2,
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}>
                      {social.href.startsWith("mailto") ? social.href.replace("mailto:", "") : social.href.replace("https://", "")}
                    </div>
                  </div>
                </motion.a>
              );
            })}

            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9.5,
              lineHeight: 1.6,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--text-muted)",
              borderTop: "1px solid var(--border)",
              paddingTop: 14,
              marginTop: 4,
            }}>
              Typical response within 24 hours.<br />For urgent inquiries, email directly.
            </p>
          </motion.div>
        </div>

        {/* ── High-Contrast Dark Block Footer ── */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            marginTop: isMobile ? 48 : 80,
            marginLeft: isMobile ? -20 : -64,
            marginRight: isMobile ? -20 : -64,
            marginBottom: 0,
            padding: isMobile ? "32px 20px" : "40px 64px",
            background: "var(--bg-footer)",
            color: "#F5F2EB",
            borderTop: "4px solid var(--accent)",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: isMobile ? 16 : 24,
          }}
        >
          <div>
            <span style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 20,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              color: "#F5F2EB",
            }}>
              HAMZA HAIKAL
            </span>
            <span style={{
              display: "block",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--accent)",
              marginTop: 4,
            }}>
              FRONTEND ENGINEER & UI ARCHITECT
            </span>
          </div>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "rgba(245, 242, 235, 0.6)",
          }}>
            © 2026 — ALL RIGHTS RESERVED
          </span>
        </motion.footer>
      </div>
    </section>
  );
}

export default Contact;
