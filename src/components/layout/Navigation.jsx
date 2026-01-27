import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useCallback, memo, useEffect } from "react";

const navItems = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "works", label: "Works", href: "#works" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "contact", label: "Contact", href: "#contact" },
];

function NavigationComponent({ activeNav, setActiveNav }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = useCallback((id) => {
    const element = document.querySelector(`#${id}`);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const handleNavClick = useCallback(
    (id) => {
      if (location.pathname !== "/") {
        navigate("/", { state: { targetId: id } });
      } else {
        scrollToSection(id);
        if (setActiveNav) setActiveNav(id);
      }
      setMobileMenuOpen(false);
    },
    [location.pathname, navigate, scrollToSection, setActiveNav],
  );

  // Handle initial scroll from navigation state
  useEffect(() => {
    if (location.state?.targetId) {
      const id = location.state.targetId;
      // Small timeout to ensure DOM is ready and lazy components are mounted
      const timer = setTimeout(() => {
        scrollToSection(id);
        if (setActiveNav) setActiveNav(id);
        // Clear state to prevent scrolling on subsequent renders
        window.history.replaceState({}, document.title);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.state, scrollToSection, setActiveNav]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo */}
        <motion.a
          href="#home"
          className="flex items-center gap-3 group relative z-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-sky-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-sky-500/20">
            H
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-100 group-hover:text-white transition-colors hidden sm:block">
            Hamza Haikal
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1 p-1.5 rounded-full bg-slate-900/80 border border-slate-800/50 backdrop-blur-xl">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                  activeNav === item.id
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeNav === item.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-linear-to-r from-sky-500/20 to-emerald-500/20 border border-sky-500/30"
                    layoutId="activeNavPill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2 relative z-50">
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/50 backdrop-blur-xl text-slate-400"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>

        {/* CTA Button (Desktop) */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-sky-500 to-emerald-500 text-white text-xs font-semibold shadow-lg shadow-sky-500/20"
        >
          <span>Hire Me</span>
        </motion.a>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/50"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                    activeNav === item.id
                      ? "bg-linear-to-r from-sky-500/20 to-emerald-500/20 border border-sky-500/30 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-900/50"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}

              {/* Mobile CTA */}
              <motion.a
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-3 mt-4 rounded-xl bg-linear-to-r from-sky-500 to-emerald-500 text-white font-semibold shadow-lg shadow-sky-500/20"
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// Memoize the component to prevent unnecessary re-renders
export const Navigation = memo(NavigationComponent);
