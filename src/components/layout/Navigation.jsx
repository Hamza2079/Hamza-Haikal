import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useCallback, memo, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

const navItems = [
  { id: "home",       label: "Home"       },
  { id: "about",      label: "About"      },
  { id: "works",      label: "Works"      },
  { id: "experience", label: "Exp."       },
  { id: "contact",    label: "Contact"    },
];

/* ── Light/dark toggle icons ── */
const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
);

function NavigationComponent({ activeNav, setActiveNav }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden]     = useState(false);
  const { theme, toggle, isDark } = useTheme();
  const location  = useLocation();
  const navigate  = useNavigate();
  const { scrollY } = useScroll();
  const prevY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 60);
    if (y < 80) { setHidden(false); return; }
    setHidden(y > prevY.current && y > 140);
    prevY.current = y;
  });

  const scrollToSection = useCallback((id) => {
    const el = document.querySelector(`#${id}`);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const handleNavClick = useCallback((id) => {
    if (location.pathname !== "/") {
      setMobileMenuOpen(false);
      navigate("/", { state: { targetId: id } });
    } else {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        setTimeout(() => { scrollToSection(id); if (setActiveNav) setActiveNav(id); }, 300);
      } else {
        scrollToSection(id);
        if (setActiveNav) setActiveNav(id);
      }
    }
  }, [location.pathname, navigate, scrollToSection, setActiveNav, mobileMenuOpen]);

  useEffect(() => {
    if (location.state?.targetId) {
      const id = location.state.targetId;
      const timer = setTimeout(() => {
        scrollToSection(id);
        if (setActiveNav) setActiveNav(id);
        window.history.replaceState({}, document.title);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.state, scrollToSection, setActiveNav]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: scrolled ? `2px solid var(--border)` : "2px solid transparent",
        background: scrolled ? "var(--bg)" : "transparent",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div style={{
        maxWidth: 1440,
        margin: "0 auto",
        padding: "0 clamp(16px, 4vw, 64px)",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}>

        {/* ── Stamped logo block ── */}
        <motion.button
          onClick={() => handleNavClick("home")}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 18,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            background: "transparent",
            border: "2px solid var(--border-ink)",
            padding: "4px 10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            lineHeight: 1,
            transform: "rotate(-1deg)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          whileHover={{
            rotate: 1,
            boxShadow: "var(--shadow-hard-ink)",
          }}
          whileTap={{ scale: 0.96 }}
        >
          H.H
        </motion.button>

        {/* ── Desktop nav — mono links with | separators ── */}
        <nav style={{ display: "none", alignItems: "center", gap: 0 }} className="md:flex">
          {navItems.map((item, i) => (
            <span key={item.id} style={{ display: "flex", alignItems: "center" }}>
              {i > 0 && (
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--border-strong)",
                  padding: "0 8px",
                  lineHeight: 1,
                }}>|</span>
              )}
              <button
                onClick={() => handleNavClick(item.id)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: activeNav === item.id ? 700 : 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: activeNav === item.id ? "var(--accent)" : "var(--text-muted)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 4px",
                  position: "relative",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => {
                  if (activeNav !== item.id) e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={e => {
                  if (activeNav !== item.id) e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                {item.label}
                {activeNav === item.id && (
                  <motion.span
                    layoutId="navUnderline"
                    style={{
                      position: "absolute",
                      bottom: -2,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: "var(--accent)",
                    }}
                  />
                )}
              </button>
            </span>
          ))}
        </nav>

        {/* ── Right controls ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

          {/* Theme toggle — square, no rounded */}
          <motion.button
            onClick={toggle}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle theme"
            style={{
              width: 36, height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "2px solid var(--border-strong)",
              color: "var(--text-secondary)",
              cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--border-ink)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--border-strong)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ display: "flex", alignItems: "center" }}
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Hire Me — brutalist sharp button */}
          <motion.button
            onClick={() => handleNavClick("contact")}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "9px 18px",
              background: "var(--accent)",
              color: "#111111",
              border: "2px solid var(--accent)",
              cursor: "pointer",
              display: "none",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            className="sm:block"
            whileHover={{ y: -2, boxShadow: "var(--shadow-hard-ink)" }}
            whileTap={{ y: 0, boxShadow: "none" }}
          >
            Hire Me
          </motion.button>

          {/* Mobile hamburger */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.92 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36, height: 36,
              background: "transparent",
              border: "2px solid var(--border-strong)",
              color: "var(--text-secondary)",
              cursor: "pointer",
            }}
            className="md:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
              {mobileMenuOpen
                ? <path d="M18 6L6 18M6 6l12 12" />
                : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* ── Mobile menu — full-width, hard border ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              overflow: "hidden",
              background: "var(--bg)",
              borderTop: "2px solid var(--border-ink)",
              borderBottom: "2px solid var(--border)",
            }}
          >
            <div style={{ padding: "16px clamp(16px,4vw,64px)" }}>
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    fontWeight: activeNav === item.id ? 700 : 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    padding: "12px 0",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid var(--border)",
                    color: activeNav === item.id ? "var(--accent)" : "var(--text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  {String(idx + 1).padStart(2, "0")} — {item.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                onClick={() => handleNavClick("contact")}
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: 16,
                  padding: "13px 0",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  background: "var(--accent)",
                  color: "#111111",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Hire Me →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export const Navigation = memo(NavigationComponent);
