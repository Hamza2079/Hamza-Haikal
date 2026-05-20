import { useState, useEffect, lazy, Suspense, useRef } from "react";
import { Navigation }            from "../layout/Navigation";
import { Hero }                  from "../sections/Hero";
import { About }                 from "../sections/About";
import { ScrollProgressIndicator } from "../ui/ScrollProgressIndicator";
import { useIsMobile } from "../../hooks/useMediaQuery";
import Lenis from "lenis";

// Lazy load heavier sections
const Works      = lazy(() => import("../sections/Works"));
const Experience = lazy(() => import("../sections/Experience"));
const Contact    = lazy(() => import("../sections/Contact"));

const SectionLoader = () => (
  <div className="h-32 flex items-center justify-center">
    <div className="flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/40 animate-pulse"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
);

function HomePage() {
  const [activeNav, setActiveNav] = useState("home");
  const observerRef = useRef(null);
  const lenisRef    = useRef(null);
  const isMobile = useIsMobile();

  // ── Lenis smooth scroll (disabled on mobile for perf) ──
  useEffect(() => {
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wrapper: window,
      content: document.documentElement,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    const raf = (time) => {
      lenis.raf(time);
      window.dispatchEvent(new Event("scroll"));
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, [isMobile]);

  // ── Section intersection observer ──
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      });
    }, observerOptions);

    const observeAll = () => {
      document.querySelectorAll("section[id]").forEach((s) =>
        observerRef.current.observe(s)
      );
    };

    observeAll();

    const mutationObs = new MutationObserver(observeAll);
    const main = document.querySelector("main");
    if (main) mutationObs.observe(main, { childList: true, subtree: true });

    return () => {
      observerRef.current?.disconnect();
      mutationObs.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text-primary)" }}>
      <Navigation activeNav={activeNav} setActiveNav={setActiveNav} />
      <ScrollProgressIndicator />

      <main className="relative">
        <Hero />
        <About />

        <Suspense fallback={<SectionLoader />}>
          <Works />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}

export default HomePage;
