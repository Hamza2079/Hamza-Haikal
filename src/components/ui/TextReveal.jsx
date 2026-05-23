import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

function usePrefersReduced() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * Only marks the element as "ready to animate" after it has been
 * continuously in view for `settleMs` ms.  Prevents a once-fired animation
 * from completing instantly inside sticky / scroll-hijacked containers.
 */
function useSettledInView(ref, { once = true, amount = 0.15, settleMs = 80 } = {}) {
  const isInView = useInView(ref, { once: false, amount });
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (settled && once) return;
    if (!isInView) { setSettled(false); return; }

    const id = setTimeout(() => setSettled(true), settleMs);
    return () => clearTimeout(id);
  }, [isInView, once, settled, settleMs]);

  return settled;
}

export function TextReveal({
  text,
  className = "",
  textClass = "",
  delay = 0,
  stagger = 0.06,
  duration = 0.75,
  once = true,
  tag: Tag = "div",
  inView = false,
  style,
}) {
  const prefersReduced = usePrefersReduced();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const ref = useRef(null);
  const settled = useSettledInView(ref, { once, amount: 0.15 });

  /* Reduced-motion or mobile: plain fade, no stagger */
  if (prefersReduced || isMobile) {
    const motionProps = inView
      ? { initial: { opacity: 0 }, animate: settled ? { opacity: 1 } : { opacity: 0 } }
      : { initial: { opacity: 0 }, animate: { opacity: 1 } };
    return (
      <motion.span
        ref={ref}
        {...motionProps}
        transition={{ duration: 0.5, delay }}
        className={`${className} ${textClass}`}
        style={style}
      >
        {text}
      </motion.span>
    );
  }

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const wordVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const animateState = inView ? (settled ? "visible" : "hidden") : undefined;

  const motionProps = inView
    ? { initial: "hidden", animate: animateState }
    : { initial: "hidden", animate: "visible" };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      {...motionProps}
      className={`overflow-hidden ${className}`}
      style={{ display: "flex", flexWrap: "wrap", gap: "0 0.25em", ...style }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block", paddingBottom: "0.30em", marginBottom: "-0.25em" }}>
          <motion.span
            variants={wordVariants}
            style={{ display: "inline-block" }}
            className={textClass}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

export function CharReveal({
  text,
  className = "",
  textClass = "",
  delay = 0,
  stagger = 0.03,
  duration = 0.5,
  inView = false,
  once = true,
  style,
}) {
  const prefersReduced = usePrefersReduced();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const ref = useRef(null);
  const settled = useSettledInView(ref, { once, amount: 0.15 });

  /* Reduced-motion or mobile: plain fade, no stagger */
  if (prefersReduced || isMobile) {
    const motionProps = inView
      ? { initial: { opacity: 0 }, animate: settled ? { opacity: 1 } : { opacity: 0 } }
      : { initial: { opacity: 0 }, animate: { opacity: 1 } };
    return (
      <motion.span
        ref={ref}
        {...motionProps}
        transition={{ duration: 0.5, delay }}
        className={`${className} ${textClass}`}
        style={style}
      >
        {text}
      </motion.span>
    );
  }

  const chars = text.split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const charVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const animateState = inView ? (settled ? "visible" : "hidden") : undefined;

  const motionProps = inView
    ? { initial: "hidden", animate: animateState }
    : { initial: "hidden", animate: "visible" };

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      {...motionProps}
      style={{ display: "inline-flex", flexWrap: "wrap", transform: "translateZ(0)", ...style }}
      className={className}
    >
      {chars.map((char, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block", paddingBottom: "0.25em", marginBottom: "-0.25em" }}>
          <motion.span
            variants={charVariants}
            style={{ display: "inline-block" }}
            className={textClass}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
