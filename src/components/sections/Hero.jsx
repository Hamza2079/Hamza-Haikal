import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HeroBackground } from "../three/HeroBackground";
import LightRays from "../three/LightRays";

export function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scaleProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-20 sm:py-0 relative overflow-hidden"
    >
      {/* 3D Particle Background */}
      <HeroBackground />

      {/* Light Rays Effect */}
      <div className="absolute inset-0 z-2">
        <LightRays
          raysOrigin="top-center"
          raysColor="#38bdf8"
          raysSpeed={0.8}
          lightSpread={1.2}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.15}
          pulsating={true}
          fadeDistance={1.0}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-950/30 to-slate-950/80 pointer-events-none z-1" />

      {/* Main Content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: scaleProgress }}
        className="max-w-5xl mx-auto text-center space-y-4 sm:space-y-8 relative z-10"
      >
        {/* Greeting Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs text-slate-300 font-medium tracking-wide">
            Available for work
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-2 sm:space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-slate-100 via-slate-200 to-slate-400">
              Hi, I&apos;m Hamza
            </span>
          </h1>

          <div className="space-y-1">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-sky-400 via-cyan-400 to-emerald-400"
            >
              Frontend Developer
            </motion.h2>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed px-2"
        >
          Building modern, responsive web interfaces with clean code and
          pixel-perfect design. Specialized in React, TypeScript, and creating
          seamless user experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 w-full sm:w-auto px-2 sm:px-0"
        >
          <motion.a
            href="#works"
            className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-linear-to-r from-sky-500 to-emerald-500 text-white font-semibold text-sm overflow-hidden shadow-lg shadow-sky-500/25 w-full sm:w-auto text-center"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px -10px rgba(56, 189, 248, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">View My Work</span>
            <motion.div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>

          <motion.a
            href="#contact"
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-slate-700 text-slate-300 font-semibold text-sm hover:border-slate-500 hover:text-white transition-all duration-300 backdrop-blur-sm w-full sm:w-auto text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Get In Touch
          </motion.a>

          <motion.a
            href="/Hamza_Haikal_Front End Developer_resume (2).pdf"
            download="Hamza_Haikal_CV.pdf"
            className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-transparent bg-linear-to-r from-sky-500/10 to-emerald-500/10 text-slate-300 font-semibold text-sm overflow-hidden backdrop-blur-sm w-full sm:w-auto text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-sky-500 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <div className="absolute inset-0 rounded-full p-[2px] bg-linear-to-r from-sky-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full h-full rounded-full bg-slate-950" />
            </div>
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download CV
            </span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-500 uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-slate-700 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 rounded-full bg-sky-400"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
