// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Target Cursor - Custom cursor that follows mouse
export function TargetCursor() {
  const cursorRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    // Only show on desktop (not touch devices)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  const springConfig = { damping: 20, stiffness: 300 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  return (
    <motion.div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 hidden md:block"
      style={{
        left: cursorX,
        top: cursorY,
        x: "-50%",
        y: "-50%",
      }}
    >
      <motion.div
        className="h-6 w-6 rounded-full border-2 border-sky-400/80"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-0 h-2 w-2 rounded-full bg-sky-400 m-auto"
        animate={{ scale: [1, 0.8, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.div>
  );
}

// Electric Border - Animated border effect
export function ElectricBorder({
  children,
  className = "",
  borderColor = "rgba(56, 189, 248, 0.6)",
}) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute -inset-[2px] rounded-[inherit] overflow-hidden"
        style={{
          background: `linear-gradient(90deg, transparent, ${borderColor}, transparent)`,
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["200% 0", "-200% 0"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute -inset-[2px] rounded-[inherit] overflow-hidden"
        style={{
          background: `linear-gradient(270deg, transparent, ${borderColor}, transparent)`,
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["-200% 0", "200% 0"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          delay: 1.5,
        }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}

// Shiny Text - Shimmer effect on text
export function ShinyText({
  children,
  className = "",
  gradientFrom = "rgb(56, 189, 248)",
  gradientTo = "rgb(52, 211, 153)",
}) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      style={{
        background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo}, ${gradientFrom})`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
      animate={{
        backgroundPosition: ["0% 0", "200% 0"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}

// Logo Loop - Rotating logo carousel
export function LogoLoop({ items = [], className = "", speed = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, speed);

    return () => clearInterval(interval);
  }, [items.length, speed]);

  return (
    <motion.div
      className={`flex items-center justify-center ${className}`}
      key={currentIndex}
      initial={{ opacity: 0, rotateY: -90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: 90 }}
      transition={{ duration: 0.5 }}
    >
      {items[currentIndex]?.icon && (
        <span className="text-2xl">{items[currentIndex].icon}</span>
      )}
    </motion.div>
  );
}

// Magic Bento - Animated grid layout
export function MagicBento({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

// Pill Nav - Rounded navigation tabs
export function PillNav({ items = [], activeId, onItemClick, className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {items.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => onItemClick?.(item.id)}
          className={`relative px-4 py-2 rounded-full text-xs font-medium transition-colors ${
            activeId === item.id
              ? "text-slate-50"
              : "text-slate-400 hover:text-slate-300"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeId === item.id && (
            <motion.div
              className="absolute inset-0 rounded-full bg-linear-to-r from-sky-400/20 to-cyan-400/20 border border-sky-400/30"
              layoutId="activePill"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{item.label}</span>
        </motion.button>
      ))}
    </div>
  );
}

// Profile Card - Animated profile card
export function ProfileCard({ name, role, bio, children, className = "" }) {
  return (
    <motion.div
      className={`${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      {name && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-100">{name}</h3>
          {role && <p className="text-sm text-sky-400">{role}</p>}
          {bio && <p className="mt-2 text-xs text-slate-300">{bio}</p>}
        </div>
      )}
      {children}
    </motion.div>
  );
}

// Light Rays - Animated light ray effects
export function LightRays() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-full w-px bg-linear-to-b from-transparent via-sky-400/20 to-transparent"
          style={{
            left: `${20 + i * 20}%`,
            transform: `rotate(${-15 + i * 7.5}deg)`,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scaleY: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
