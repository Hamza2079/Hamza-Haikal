import { motion } from "framer-motion";
import { experiences, techStack } from "../../data/portfolioData";
import { FaReact, FaHtml5, FaCss3Alt, FaGitAlt } from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiVite,
  SiFramer,
} from "react-icons/si";

// Icon mapping
const iconMap = {
  FaReact,
  SiJavascript,
  SiTypescript,
  FaHtml5,
  FaCss3Alt,
  SiTailwindcss,
  SiNextdotjs,
  FaGitAlt,
  SiVite,
  SiFramer,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Experience() {
  // Triple the tech stack for seamless infinite loop
  const infiniteTechStack = [...techStack, ...techStack, ...techStack];

  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 py-24 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[600px] h-[400px] bg-linear-to-l from-emerald-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">
            Experience
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-2 bg-clip-text text-transparent bg-linear-to-r from-slate-100 via-slate-200 to-slate-400">
            My Journey
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-xl">
            The technologies and teams that shaped my craft.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-sky-500/50 via-emerald-500/50 to-transparent md:-translate-x-1/2" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company}
              variants={itemVariants}
              className={`relative flex items-center mb-12 ${
                idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 -translate-x-1/2 z-20">
                <motion.div
                  whileHover={{ scale: 1.5 }}
                  className="w-full h-full rounded-full bg-linear-to-br from-sky-400 to-emerald-400 shadow-lg shadow-sky-500/30"
                />
              </div>

              {/* Content Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className={`w-full md:w-[calc(50%-2rem)] ${
                  idx % 2 === 0 ? "md:pr-8 pl-8 md:pl-0" : "md:pl-8 pl-8"
                }`}
              >
                <div className="relative p-6 rounded-2xl bg-slate-900/70 border border-slate-800/50 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 group">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-sky-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors">
                        {exp.company}
                      </h3>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                        {exp.type}
                      </span>
                    </div>

                    <p className="text-sky-400 font-medium mb-2">{exp.role}</p>
                    <p className="text-sm text-slate-400 leading-relaxed mb-3">
                      {exp.description}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      {exp.period}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack Infinite Loop */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 pt-16 border-t border-slate-800/50"
        >
          <div className="text-center mb-12">
            <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">
              Tech Stack
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-2 bg-clip-text text-transparent bg-linear-to-r from-slate-100 to-slate-400">
              Technologies I Work With
            </h3>
          </div>

          {/* Infinite Scrolling Container */}
          <div className="relative overflow-hidden pt-4">
            {/* Gradient Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

            {/* Scrolling Track - Using CSS animation for true infinite loop */}
            <div className="flex gap-8 animate-infinite-scroll hover:[animation-play-state:paused]">
              {infiniteTechStack.map((tech, idx) => {
                const IconComponent = iconMap[tech.icon];
                return (
                  <div
                    key={`${tech.name}-${idx}`}
                    className="shrink-0 w-32 h-32 flex flex-col items-center justify-center gap-3 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-sky-500/30 transition-all duration-300 group cursor-pointer relative hover:scale-110 hover:-translate-y-2"
                  >
                    {IconComponent && (
                      <IconComponent
                        className="text-5xl group-hover:scale-110 transition-transform"
                        style={{ color: tech.color }}
                      />
                    )}
                    <span className="text-xs font-medium text-slate-400 group-hover:text-sky-400 transition-colors text-center px-2">
                      {tech.name}
                    </span>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-sky-500/0 to-emerald-500/0 group-hover:from-sky-500/10 group-hover:to-emerald-500/10 transition-all duration-300 pointer-events-none" />
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Experience;
