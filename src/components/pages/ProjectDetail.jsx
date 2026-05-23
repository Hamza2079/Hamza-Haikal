import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CharReveal, TextReveal } from "../ui/TextReveal";
import { projects } from "../../data/portfolioData";
import { Contact } from "../sections/Contact";
import { Navigation } from "../layout/Navigation";
import { ScrollProgressIndicator } from "../ui/ScrollProgressIndicator";
import { useEffect } from "react";

export function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!project) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text-primary)" }}>
      <Navigation />
      <ScrollProgressIndicator />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium mb-10 group transition-colors duration-300"
              style={{ color: "var(--text-muted)" }}>
              <motion.span className="inline-block" whileHover={{ x: -3 }}>←</motion.span>
              <CharReveal text="All Projects" inView={false} stagger={0.06} className="group-hover:underline" />
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <CharReveal text={project.category} inView={false} stagger={0.05}
                className="text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full"
                style={{ background: "var(--accent-subtle)", border: "1px solid var(--accent)", color: "var(--accent)" }} />
              <CharReveal text={project.year} inView={false} delay={0.1} stagger={0.05}
                className="text-sm"
                style={{ color: "var(--text-muted)" }} />
            </div>

            <h1 className="font-black tracking-tight leading-[1.05] pb-4 mb-6"
              style={{ fontSize: "clamp(2.5rem,6vw,5rem)", color: "var(--text-primary)" }}>
              <CharReveal text={project.title} inView={false} stagger={0.04} delay={0.1} />
            </h1>

            <TextReveal text={project.fullDescription} inView={false} delay={0.25} stagger={0.035}
              className="text-lg leading-relaxed max-w-3xl"
              style={{ color: "var(--text-secondary)" }} />

            {/* CTA buttons */}
            <div className="flex gap-4 mt-8">
              <motion.a href={project.demo} target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px var(--accent-glow)" }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white transition-all duration-300"
                style={{ background: "var(--accent)", boxShadow: "0 4px 20px var(--accent-glow)" }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Live Demo
              </motion.a>
              <motion.a href={project.github} target={project.github === "#" ? undefined : "_blank"} rel="noreferrer"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
                style={{ border: "1px solid var(--border-strong)", color: "var(--text-secondary)", background: "var(--bg-surface)" }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View Source
              </motion.a>
            </div>
          </motion.div>

          {/* Project image */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", boxShadow: "0 24px 80px rgba(139,92,246,0.12)" }}>
            <img src={project.image} alt={project.title} className="w-full h-auto" />
          </motion.div>
        </div>
      </section>

      {/* ── Details ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Features */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <CharReveal text="Key Features" inView delay={0.1} stagger={0.05}
                className="text-2xl block font-black mb-7"
                style={{ color: "var(--text-primary)" }} />
              <ul className="space-y-4">
                {project.features.map((feature, idx) => (
                  <motion.li key={idx}
                    initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.07 }}
                    className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 shrink-0"
                      style={{ background: "var(--accent-subtle)", border: "1px solid var(--accent)" }}>
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "var(--accent)" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <CharReveal text={feature} inView delay={idx * 0.06} stagger={0.03}
                      className="text-sm leading-[1.8]"
                      style={{ color: "var(--text-secondary)" }} />
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Tech + Challenges */}
            <div className="space-y-12">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <CharReveal text="Tech Stack" inView stagger={0.05}
                  className="text-2xl block font-black mb-6"
                  style={{ color: "var(--text-primary)" }} />
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-4 py-2 rounded-full text-sm transition-colors duration-200"
                      style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", background: "var(--bg-surface)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                <CharReveal text="Challenges & Solutions" inView delay={0.1} stagger={0.05}
                  className="text-2xl mb-3 block font-black"
                  style={{ color: "var(--text-primary)" }} />
                <TextReveal text={project.challenges} inView delay={0.2} stagger={0.035}
                  className="text-sm leading-[1.9]"
                  style={{ color: "var(--text-secondary)" }} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
}

export default ProjectDetail;
