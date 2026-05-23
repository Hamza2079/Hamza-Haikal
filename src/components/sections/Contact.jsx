import { motion } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { CharReveal, TextReveal } from "../ui/TextReveal";
import emailjs from "@emailjs/browser";

const socialLinks = [
  { name: "GitHub",   href: "https://github.com/Hamza2079",         icon: FaGithub },
  { name: "LinkedIn", href: "https://linkedin.com/in/hamza-haikal", icon: FaLinkedin },
  { name: "Email",    href: "mailto:hamzahaikal28@gmail.com",        icon: FaEnvelope },
];

export function Contact() {
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

  const inputStyle = {
    width: "100%", padding: "14px 16px", borderRadius: 12,
    background: "var(--bg-surface)", border: "1px solid var(--border)",
    color: "var(--text-primary)", fontSize: 14, outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
  };

  return (
    <section id="contact" className="relative py-36 px-6 overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom, rgba(139,92,246,0.1) 0%, transparent 70%)" }} />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* CTA Header */}
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-20 text-center">
          <CharReveal text="Contact" inView stagger={0.06}
            className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-5 block"
            style={{ color: "var(--accent)" }} />
          <h2 className="font-black tracking-tight leading-[1.0] mb-6" style={{ fontSize: "clamp(2.8rem,7vw,6rem)", color: "var(--text-primary)" }}>
            <CharReveal text="Let's build" inView stagger={0.04} /><br />
            <CharReveal text="something." inView delay={0.2} stagger={0.04} className="text-gradient-violet py-1" />
          </h2>
          <TextReveal text="Have a project in mind? Drop a message — I respond within 24 hours."
            inView delay={0.3} stagger={0.04}
            className="text-base max-w-md block mx-auto leading-[1.85] mb-8"
            style={{ color: "var(--text-secondary)" }} />
          <motion.a href="mailto:hamzahaikal28@gmail.com"
            whileHover={{ scale: 1.03, boxShadow: "0 0 30px var(--accent-glow)" }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300"
            style={{ background: "var(--accent)" }}>
            <FaEnvelope className="text-xs" />
            hamzahaikal28@gmail.com
          </motion.a>
        </motion.div>

        {/* Form + Social */}
        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Form */}
          <motion.form initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8 }}
            onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "var(--text-muted)" }}>Name</label>
                <input type="text" name="name" id="contact-name" value={formData.name} onChange={handleChange} required placeholder="John Doe" style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px var(--accent-subtle)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "var(--text-muted)" }}>Email</label>
                <input type="email" name="email" id="contact-email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px var(--accent-subtle)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "var(--text-muted)" }}>Message</label>
              <textarea name="message" id="contact-message" value={formData.message} onChange={handleChange} required rows={5}
                placeholder="Tell me about your project..." style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px var(--accent-subtle)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }} />
            </div>
            <motion.button type="submit" disabled={isSubmitting}
              whileHover={{ scale: 1.02, boxShadow: "0 0 24px var(--accent-glow)" }} whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 disabled:opacity-50 transition-all duration-300"
              style={{ background: submitStatus === "error" ? "#EF4444" : "var(--accent)" }}>
              {isSubmitting ? (
                <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Sending…</>
              ) : submitStatus === "success" ? <><span>✓</span> Message Sent!</>
              : submitStatus === "error" ? <><span>✕</span> Failed. Try again.</>
              : "Send Message"}
            </motion.button>
            {submitStatus === "success" && (
              <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-center text-emerald-400">
                Thanks! I'll get back to you soon.
              </motion.p>
            )}
          </motion.form>

          {/* Social */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
            className="md:col-span-2 space-y-4">
            {/* Available badge */}
            <div className="flex items-center gap-3 px-5 py-4 rounded-xl" style={{ border: "1px solid var(--border)", background: "var(--bg-surface)" }}>
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <CharReveal text="Available for freelance" inView delay={0.1} stagger={0.04}
                className="text-xs font-medium"
                style={{ color: "var(--text-secondary)" }} />
            </div>

            {/* Social links */}
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a key={social.name} href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group"
                  style={{ border: "1px solid var(--border)", background: "var(--bg-surface)" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{ background: "var(--accent-subtle)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                    <Icon className="text-sm" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <CharReveal text={social.name} inView delay={0.15} stagger={0.05}
                      className="text-sm font-medium transition-colors"
                      style={{ color: "var(--text-primary)" }} />
                    <CharReveal text={social.href.startsWith("mailto") ? social.href.replace("mailto:", "") : social.href.replace("https://", "")}
                      inView delay={0.25} stagger={0.03}
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }} />
                  </div>
                </motion.a>
              );
            })}
            <TextReveal text="Typical response within 24 hours. For urgent inquiries, email directly."
              inView delay={0.2} stagger={0.04}
              className="text-xs leading-[1.8]"
              style={{ color: "var(--text-muted)" }} />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="relative z-10 max-w-5xl mx-auto mt-24 pt-10 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid var(--border)" }}>
        <div>
          <CharReveal text="Hamza Haikal " inView delay={0.1} stagger={0.05}
            className="text-sm font-bold"
            style={{ color: "var(--text-secondary)" }} />
          <CharReveal text="| Frontend Engineer" inView delay={0.2} stagger={0.04}
            className="text-xs mt-0.5"
            style={{ color: "var(--text-muted)" }} />
        </div>
        <CharReveal text="© 2025 · All rights reserved" inView delay={0.15} stagger={0.04}
          className="text-xs"
          style={{ color: "var(--text-muted)" }} />
      </motion.footer>
    </section>
  );
}

export default Contact;
