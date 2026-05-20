import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useCallback, memo, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

const navItems = [
  { id: "home",       label: "Home"       },
  { id: "about",      label: "About"      },
  { id: "works",      label: "Works"      },
  { id: "experience", label: "Experience" },
  { id: "contact",    label: "Contact"    },
];

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
);

function NavigationComponent({ activeNav, setActiveNav }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle, isDark } = useTheme();
  const location  = useLocation();
  const navigate  = useNavigate();
  const { scrollY } = useScroll();
  const prevY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 50);
    if (y < 80) { setHidden(false); return; }
    setHidden(y > prevY.current && y > 120);
    prevY.current = y;
  });

  const scrollToSection = useCallback((id) => {
    const el = document.querySelector(`#${id}`);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const handleNavClick = useCallback((id) => {
    if (location.pathname !== "/") {
      setMobileMenuOpen(false);
      navigate("/", { state: { targetId: id } });
    } else {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        setTimeout(() => { scrollToSection(id); if (setActiveNav) setActiveNav(id); }, 350);
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
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
        <div
          className="flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500"
          style={{
            background: scrolled ? (isDark ? "rgba(9,9,11,0.88)" : "rgba(250,250,250,0.92)") : "transparent",
            backdropFilter: scrolled ? "blur(24px)" : "none",
            border: scrolled ? "1px solid var(--border)" : "1px solid transparent",
            boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.15)" : "none",
          }}
        >
          {/* Logo */}
          <motion.button onClick={() => handleNavClick("home")} className="flex items-center gap-3 group cursor-pointer" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 rounded-lg" style={{ background: "var(--accent-subtle)" }} />
              <div className="absolute inset-0 rounded-lg" style={{ border: "1px solid var(--accent)", opacity: 0.5 }} />
              <span className="relative font-bold text-sm" style={{ color: "var(--accent)" }}>H</span>
            </div>
            <span className="text-sm font-semibold hidden sm:block" style={{ color: "var(--text-secondary)" }}>Hamza Haikal</span>
          </motion.button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-1 p-1 rounded-full" style={{ border: "1px solid var(--border)", background: "var(--accent-subtle)" }}>
              {navItems.map((item) => (
                <motion.button key={item.id} onClick={() => handleNavClick(item.id)}
                  className="relative px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer"
                  style={{ color: activeNav === item.id ? "var(--text-primary)" : "var(--text-muted)" }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  {activeNav === item.id && (
                    <motion.div layoutId="navPill" className="absolute inset-0 rounded-full"
                      style={{ background: "var(--accent-subtle)", border: "1px solid var(--accent)", opacity: 0.7 }}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }} />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button onClick={toggle} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
              style={{ background: "var(--accent-subtle)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={theme} initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }} className="flex items-center justify-center">
                  {isDark ? <SunIcon /> : <MoonIcon />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Hire Me */}
            <motion.button onClick={() => handleNavClick("contact")}
              whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(139,92,246,0.35)" }} whileTap={{ scale: 0.96 }}
              className="hidden sm:flex items-center px-4 py-2 rounded-full text-xs font-semibold cursor-pointer text-white"
              style={{ background: "var(--accent)" }}>
              Hire Me
            </motion.button>

            {/* Mobile hamburger */}
            <div className="flex md:hidden">
              <motion.button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} whileTap={{ scale: 0.92 }}
                className="p-2 rounded-lg cursor-pointer"
                style={{ background: "var(--accent-subtle)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }} className="md:hidden mx-4 mt-1 rounded-2xl overflow-hidden"
            style={{ background: isDark ? "rgba(9,9,11,0.95)" : "rgba(250,250,250,0.97)", backdropFilter: "blur(24px)", border: "1px solid var(--border)" }}>
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, idx) => (
                <motion.button key={item.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }} onClick={() => handleNavClick(item.id)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm cursor-pointer"
                  style={{
                    background: activeNav === item.id ? "var(--accent-subtle)" : "transparent",
                    border: activeNav === item.id ? "1px solid var(--accent)" : "1px solid transparent",
                    color: activeNav === item.id ? "var(--text-primary)" : "var(--text-muted)",
                  }}>
                  {item.label}
                </motion.button>
              ))}
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}
                onClick={() => handleNavClick("contact")}
                className="block w-full text-center px-4 py-3 mt-3 rounded-xl font-semibold text-sm cursor-pointer text-white"
                style={{ background: "var(--accent)" }}>
                Hire Me
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export const Navigation = memo(NavigationComponent);
