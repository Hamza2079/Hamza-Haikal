import { motion } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";

function usePrefersReduced() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function TextReveal({
  text,
  className = "",
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

  /* On mobile or reduced motion, fall back to a simple fade-in */
  if (prefersReduced || isMobile) {
    const motionProps = inView
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once } }
      : { initial: { opacity: 0 }, animate: { opacity: 1 } };
    return (
      <motion.span
        {...motionProps}
        transition={{ duration: 0.5, delay }}
        className={className}
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

  const motionProps = inView
    ? { initial: "hidden", whileInView: "visible", viewport: { once } }
    : { initial: "hidden", animate: "visible" };

  return (
    <motion.div
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
  delay = 0,
  stagger = 0.03,
  duration = 0.5,
  inView = false,
  once = true,
  style,
}) {
  const prefersReduced = usePrefersReduced();
  const isMobile = useMediaQuery("(max-width: 768px)");

  /* On mobile or reduced motion, fall back to a simple fade-in */
  if (prefersReduced || isMobile) {
    const motionProps = inView
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once } }
      : { initial: { opacity: 0 }, animate: { opacity: 1 } };
    return (
      <motion.span
        {...motionProps}
        transition={{ duration: 0.5, delay }}
        className={className}
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

  const motionProps = inView
    ? { initial: "hidden", whileInView: "visible", viewport: { once } }
    : { initial: "hidden", animate: "visible" };

  return (
    <motion.span
      variants={containerVariants}
      {...motionProps}
      style={{ display: "inline-flex", flexWrap: "wrap" }}
      className={className}
    >
      {chars.map((char, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block", paddingBottom: "0.25em", marginBottom: "-0.25em" }}>
          <motion.span
            variants={charVariants}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
