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
      variants={variants}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ scale }}
      className="group h-full cursor-pointer"
      onClick={handleClick}
    >
      <motion.div
        whileHover={shouldReduceMotion ? {} : { y: -6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full rounded-2xl overflow-hidden border flex flex-col"
        style={{
          background: 'var(--bg-surface)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {project.image && (
            <>
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 transition-all duration-500 group-hover:opacity-75"
                style={{ background: 'var(--bg)', opacity: 0 }} />

              {/* Hover actions */}
              <div className="absolute inset-0 flex items-center justify-center gap-3
                             opacity-0 group-hover:opacity-100 transition-opacity duration-400 p-4">
                <a
                  href={project.demo}
                  target={project.demo === "#" ? undefined : "_blank"}
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    padding: '8px 16px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                    background: 'var(--accent)', color: '#fff', textDecoration: 'none',
                    boxShadow: '0 4px 20px var(--accent-glow)',
                  }}
                >
                  Live Demo
                </a>
                <a
                  href={project.github}
                  target={project.github === "#" ? undefined : "_blank"}
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    padding: '8px 16px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                    background: 'var(--accent-subtle)', border: '1px solid var(--border-strong)',
                    color: 'var(--text-primary)', textDecoration: 'none', backdropFilter: 'blur(8px)',
                  }}
                >
                  GitHub
                </a>
              </div>

              {/* Category tag */}
              <div className="absolute top-3 left-3 z-10">
                <span className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full"
                  style={{
                    color: '#fff', background: 'rgba(9,9,11,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}>
                  {project.category}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-base font-bold mb-2 line-clamp-2 leading-snug"
            style={{ color: 'var(--text-primary)' }}>
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed mb-4 line-clamp-3 flex-1"
            style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t}
                className="text-[10px] px-2.5 py-1 rounded-full border"
                style={{
                  borderColor: 'var(--border)', background: 'var(--accent-subtle)',
                  color: 'var(--text-secondary)',
                }}>
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-[10px] px-2.5 py-1 rounded-full"
                style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
