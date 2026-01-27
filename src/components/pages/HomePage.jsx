import { useState, useEffect, lazy, Suspense, useRef } from "react";
import { Navigation } from "../layout/Navigation";
import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { ScrollProgressIndicator } from "../ui/ScrollProgressIndicator";

// Lazy load heavy components
const Works = lazy(() => import("../sections/Works"));
const Experience = lazy(() => import("../sections/Experience"));
const Contact = lazy(() => import("../sections/Contact"));

// Loading fallback component
const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
      <p className="text-slate-400 text-sm">Loading...</p>
    </div>
  </div>
);

function HomePage() {
  const [activeNav, setActiveNav] = useState("home");
  const observerRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    };

    // Create IntersectionObserver
    observerRef.current = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    // Function to observe all sections
    const observeAllSections = () => {
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        observerRef.current.observe(section);
      });
    };

    // Initial observation
    observeAllSections();

    // MutationObserver to watch for lazy-loaded sections
    const mutationObserver = new MutationObserver(() => {
      // Re-observe all sections when DOM changes (lazy sections load)
      observeAllSections();
    });

    // Observe the main element for child additions
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mutationObserver.observe(mainElement, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      // Cleanup
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      {/* Navigation */}
      <Navigation activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* Global Scroll Progress Indicator */}
      <ScrollProgressIndicator />

      <main className="relative">
        <Hero />
        <About />

        {/* Lazy loaded sections */}
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
