import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import { projects } from "../../data/portfolioData";

export function Works() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

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
        className="max-w-6xl mx-auto space-y-24 relative z-10"
      >
        {projects.map((project, idx) => {
          const cardRef = useRef(null);

          // Track individual card scroll position
          const { scrollYProgress: cardProgress } = useScroll({
            target: cardRef,
            offset: ["start end", "end start"],
          });

          // Scale effect when card is near center (0.4 to 0.6 of viewport)
          const scale = useTransform(
            cardProgress,
            [0.3, 0.5, 0.7],
            shouldReduceMotion ? [1, 1, 1] : [0.98, 1, 0.98],
          );

          return (
            <motion.div
              key={project.title}
              ref={cardRef}
              variants={cardVariants}
              style={{ scale }}
              className="group"
            >
              <a
                href={project.link}
                target={project.link === "#" ? undefined : "_blank"}
                rel="noreferrer"
                className="block"
              >
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-3xl overflow-hidden bg-slate-900/90 border border-slate-800/50 backdrop-blur-xl hover:border-sky-500/30 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-500"
                >
                  {/* Background Image */}
                  {project.image && (
                    <div className="absolute inset-0 z-0">
                      <div
                        className="w-full h-full bg-cover bg-center opacity-60 transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${project.image})` }}
                      />
                      <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-950/90 to-slate-950/80" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                      {/* Left Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xs text-sky-400 font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
                            {project.category}
                          </span>
                          <span className="text-slate-500 text-xs">
                            0{idx + 1}
                          </span>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 group-hover:text-sky-300 transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-slate-400 leading-relaxed mb-6 max-w-2xl">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-3 py-1.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/50 hover:border-sky-500/30 hover:text-sky-400 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right Arrow */}
                      <motion.div
                        whileHover={
                          shouldReduceMotion ? {} : { x: 8, scale: 1.1 }
                        }
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-center"
                      >
                        <div className="w-14 h-14 rounded-full bg-linear-to-br from-sky-500/20 to-emerald-500/20 border border-sky-500/30 flex items-center justify-center group-hover:border-sky-500/50 group-hover:shadow-lg group-hover:shadow-sky-500/20 transition-all">
                          <svg
                            className="w-6 h-6 text-sky-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </a>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

export default Works;
