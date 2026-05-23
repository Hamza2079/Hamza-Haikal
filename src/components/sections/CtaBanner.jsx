import { motion } from "framer-motion";

/**
 * CtaBanner — compact inline card between About and Works.
 * Left: eyebrow label + bold headline. Right: CTA button.
 */
export function CtaBanner() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 px-8 py-7 rounded-2xl"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
          }}
        >
          {/* Left: text */}
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2"
              style={{ color: "var(--accent)" }}
            >
              Need a bespoke solution?
            </p>
            <p
              className="text-lg sm:text-xl font-bold leading-snug mb-1.5"
              style={{ color: "var(--text-primary)" }}
            >
              Let's discuss your technical requirements.
            </p>
            <p
              className="text-sm leading-relaxed max-w-lg"
              style={{ color: "var(--text-muted)" }}
            >
              I specialize in building end-to-end solutions that deliver exceptional
              user experiences — from concept to deployment.
            </p>
          </div>

          {/* Right: CTA */}
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 28px var(--accent-glow)" }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white cursor-pointer shrink-0"
            style={{
              background: "var(--accent)",
              boxShadow: "0 4px 16px var(--accent-glow)",
            }}
          >
            Initiate Consultation
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
