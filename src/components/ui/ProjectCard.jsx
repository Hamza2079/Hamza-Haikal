import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function ProjectCard({ project, variants }) {
  const cardRef  = useRef(null);
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.7],
    shouldReduceMotion ? [1, 1, 1] : [0.98, 1, 0.98],
  );

  const handleClick = () => navigate(`/project/${project.slug}`);

  return (
    <motion.div
      ref={cardRef}
      layout
      variants={variants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ scale }}
      className="group h-full cursor-pointer"
      onClick={handleClick}
    >
      <div
        className="peel-hover relative h-full flex flex-col"
        style={{
          background: 'var(--bg-surface)',
          border: '3px solid var(--border-ink)',
          boxShadow: 'var(--shadow-hard-ink)',
        }}
      >
        {/* Tape anchor — Amber */}
        <div className="tape-anchor" style={{ top: -10, left: 16, width: 88, height: 22, transform: "rotate(-7deg)", zIndex: 20 }} />

        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-[var(--border-ink)]">
          {project.image && (
            <>
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${project.image})`,
                  filter: 'grayscale(50%) contrast(1.05)',
                }}
              />

              {/* Hover actions */}
              <div className="absolute inset-0 flex items-center justify-center gap-3
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 bg-black/60">
                <a
                  href={project.demo}
                  target={project.demo === "#" ? undefined : "_blank"}
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="btn-brutal"
                  style={{ padding: '8px 14px', fontSize: 11 }}
                >
                  Live Demo ↗
                </a>
                <a
                  href={project.github}
                  target={project.github === "#" ? undefined : "_blank"}
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="btn-brutal-ghost"
                  style={{ padding: '8px 14px', fontSize: 11, color: '#fff', borderColor: '#fff' }}
                >
                  GitHub
                </a>
              </div>

              {/* Category tag */}
              <div className="absolute top-3 left-3 z-10">
                <span className="mono-label px-2.5 py-1"
                  style={{
                    color: 'var(--text-inverse)',
                    background: 'var(--text-primary)',
                    border: '1px solid var(--border-ink)',
                  }}>
                  {project.category}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-display font-bold text-lg mb-2 line-clamp-2 uppercase tracking-tight"
            style={{ color: 'var(--text-primary)' }}>
            {project.title}
          </h3>
          <p className="font-body text-xs leading-relaxed mb-4 line-clamp-3 flex-1"
            style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="chip-mono">
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="chip-mono">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
