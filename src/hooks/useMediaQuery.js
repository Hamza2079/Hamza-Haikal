import { useState, useEffect } from "react";

/**
 * Custom hook for responsive behavior and mobile detection
 * @param {string} query - Media query string (e.g., '(max-width: 768px)')
 * @returns {boolean} - Whether the media query matches
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    const handler = (event) => setMatches(event.matches);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

/**
 * Hook to detect mobile devices
 * @returns {boolean} - True if viewport is mobile size (< 768px)
 */
export function useIsMobile() {
  return useMediaQuery("(max-width: 768px)");
}

/**
 * Hook to detect if user prefers reduced motion
 * @returns {boolean} - True if user prefers reduced motion
 */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
