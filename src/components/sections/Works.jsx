import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ProjectCard } from "../ui/ProjectCard";
import { projects } from "../../data/portfolioData";

export function Works() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Show only first 4 projects
  const displayedProjects = projects.slice(0, 4);

  // Scroll progress for the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth spring animation for progress bar
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Container variants for stagger animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  // Card variants with blur effect
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-linear-to-b from-sky-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[300px] bg-linear-to-l from-emerald-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sky-400 text-sm font-semibold uppercase tracking-wider"
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-2 bg-clip-text text-transparent bg-linear-to-r from-slate-100 via-slate-200 to-slate-400"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-400 text-lg mt-4 max-w-2xl mx-auto"
          >
            A selection of my recent work in web development and modern UI
            experiences.
          </motion.p>
        </motion.div>
      </div>

      {/* Projects Grid with Stagger Animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10"
      >
        {displayedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            variants={cardVariants}
          />
        ))}
      </motion.div>

      {/* See More Button */}
      <div className="flex justify-center mt-12 relative z-10">
        <Link to="/projects">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-2 px-8 py-3 rounded-full bg-slate-900 border border-slate-700 hover:border-sky-500/50 hover:bg-slate-800 transition-all duration-300"
          >
            <span className="text-slate-300 group-hover:text-white font-medium">
              Explore All Projects
            </span>
            <span className="w-8 h-8 rounded-full bg-sky-500/10 flex items-center justify-center group-hover:bg-sky-500 transition-colors duration-300">
              <svg
                className="w-4 h-4 text-sky-400 group-hover:text-white transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </motion.button>
        </Link>
      </div>
    </section>
  );
}

export default Works;
