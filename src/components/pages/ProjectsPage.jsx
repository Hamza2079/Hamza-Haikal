import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Navigation } from "../layout/Navigation";
import { ScrollProgressIndicator } from "../ui/ScrollProgressIndicator";
import { CharReveal, TextReveal } from "../ui/TextReveal";
import { ProjectCard } from "../ui/ProjectCard";
import { projects } from "../../data/portfolioData";

// Contact section for the bottom of the page
import Contact from "../sections/Contact";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Landing Pages", "Vanilla JS", "React", "Next.js"];

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
      <Navigation />
      <ScrollProgressIndicator />

      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Back to Home Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 transition-colors mb-8 group"
            style={{ color: 'var(--text-muted)' }}
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
              <CharReveal text="All" inView={false} stagger={0.06} />{' '}
              <span className="text-gradient-violet"><CharReveal text="Projects." inView={false} delay={0.15} stagger={0.05} /></span>
            </h1>
            <TextReveal text="Explore my complete portfolio of web applications, landing pages, and experiments."
              inView={false} delay={0.25} stagger={0.04}
              className="text-base max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--text-secondary)' }} />
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category, idx) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActiveCategory(category)}
                style={{
                  padding: "8px 16px", borderRadius: 999, fontSize: 13, fontWeight: 500,
                  cursor: "pointer", border: activeCategory === category ? "none" : "1px solid var(--border)",
                  transition: "all 0.3s",
                  background: activeCategory === category ? "var(--accent)" : "var(--accent-subtle)",
                  color: activeCategory === category ? "#fff" : "var(--text-secondary)",
                  boxShadow: activeCategory === category ? "0 4px 20px var(--accent-glow)" : "none",
                }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-base" style={{ color: 'var(--text-muted)' }}>
                No projects found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <Contact />
    </div>
  );
}
