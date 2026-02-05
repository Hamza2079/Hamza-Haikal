import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export function ProjectCard({ project, variants }) {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  // Track individual card scroll position
  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Scale effect when card is near center
  const scale = useTransform(
    cardProgress,
    [0.3, 0.5, 0.7],
    shouldReduceMotion ? [1, 1, 1] : [0.98, 1, 0.98],
  );

  const handleCardClick = () => {
    navigate(`/project/${project.slug}`);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      style={{ scale }}
      className="group h-full cursor-pointer"
      onClick={handleCardClick}
    >
      <motion.div
        whileHover={shouldReduceMotion ? {} : { y: -8 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full rounded-2xl overflow-hidden bg-slate-900/90 border border-slate-800/50 backdrop-blur-xl hover:border-sky-500/30 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-500 flex flex-col"
      >
        {/* Project Image with Hover Overlay */}
        <div className="relative aspect-4/3 overflow-hidden">
          {project.image && (
            <>
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/80 transition-all duration-500" />

              {/* Hover Buttons */}
              <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4">
                <motion.a
                  href={project.demo}
                  target={project.demo === "#" ? undefined : "_blank"}
                  rel="noreferrer"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-sky-500/30 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Live Demo
                </motion.a>

                <motion.a
                  href={project.github}
                  target={project.github === "#" ? undefined : "_blank"}
                  rel="noreferrer"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-full border border-slate-600 shadow-lg transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Code
                </motion.a>
              </div>

              {/* Category Badge on Image */}
              <div className="absolute top-3 left-3 z-10">
                <span className="text-xs text-sky-400 font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-sky-500/30">
                  {project.category}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="relative z-10 p-5 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-sky-300 transition-colors line-clamp-2">
            {project.title}
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/50 hover:border-sky-500/30 hover:text-sky-400 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/50">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
