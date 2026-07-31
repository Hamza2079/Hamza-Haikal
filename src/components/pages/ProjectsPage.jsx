import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Navigation } from "../layout/Navigation";
import { ScrollProgressIndicator } from "../ui/ScrollProgressIndicator";
import { ProjectCard } from "../ui/ProjectCard";
import { projects } from "../../data/portfolioData";
import { useIsMobile } from "../../hooks/useMediaQuery";
import Contact from "../sections/Contact";

export default function ProjectsPage() {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTech, setSelectedTech] = useState("All");

  // Available categories
  const categories = ["All", "Next.js", "React", "Vanilla JS", "Landing Pages"];

  // Extract popular tech tags across all projects
  const popularTechs = useMemo(() => {
    const techCountMap = {};
    projects.forEach((p) => {
      p.tech?.forEach((t) => {
        techCountMap[t] = (techCountMap[t] || 0) + 1;
      });
    });
    // Sort tech by frequency, pick top 8
    const sortedTechs = Object.keys(techCountMap).sort((a, b) => techCountMap[b] - techCountMap[a]);
    return ["All", ...sortedTechs.slice(0, 8)];
  }, []);

  // Filtered projects logic
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 1. Category filter
      const matchesCategory = activeCategory === "All" || project.category === activeCategory;

      // 2. Tech tag filter
      const matchesTech = selectedTech === "All" || (project.tech && project.tech.includes(selectedTech));

      // 3. Search query filter (matches title, description, category, or tech)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        (project.tech && project.tech.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesTech && matchesSearch;
    });
  }, [searchQuery, activeCategory, selectedTech]);

  const hasActiveFilters = searchQuery !== "" || activeCategory !== "All" || selectedTech !== "All";

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setSelectedTech("All");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)", overflowX: "hidden" }}>
      <Navigation />
      <ScrollProgressIndicator />

      <main style={{ paddingTop: isMobile ? 80 : 110, paddingBottom: 64 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: isMobile ? "0 20px" : "0 48px" }}>
          
          {/* ── Top Bar: Back to Home + Page Label ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
            <Link
              to="/"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                textDecoration: "none",
              }}
            >
              ← BACK TO HOME
            </Link>

            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "var(--accent)",
            }}>
              // COMPLETE_ARCHIVE
            </span>
          </div>

          {/* ── Header Headline ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 36 }}
          >
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: isMobile ? "clamp(2.5rem, 10vw, 4rem)" : "clamp(3.5rem, 6vw, 5.5rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              lineHeight: 0.88,
              color: "var(--text-primary)",
              margin: 0,
            }}>
              ALL <span style={{ color: "var(--accent)" }}>PROJECTS.</span>
            </h1>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: isMobile ? 14 : 16,
              color: "var(--text-secondary)",
              maxWidth: 540,
              marginTop: 12,
              lineHeight: 1.6,
            }}>
              Explore the full repository of production web applications, landing pages, and interactive UI systems.
            </p>
          </motion.div>

          {/* ── Search & Filters Control Panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              border: "2px solid var(--border-ink)",
              boxShadow: "var(--shadow-hard-ink)",
              background: "var(--bg-surface)",
              padding: isMobile ? "20px 16px" : "28px 32px",
              marginBottom: 40,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {/* 1. Live Search Bar */}
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH BY TITLE, TECH, OR KEYWORD..."
                style={{
                  width: "100%",
                  padding: "14px 44px 14px 16px",
                  background: "var(--bg-elevated)",
                  border: "2px solid var(--border-strong)",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border-strong)")}
              />
              {/* Search Icon / Clear Button */}
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "var(--accent)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              ) : (
                <span
                  style={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                    fontSize: 14,
                    pointerEvents: "none",
                  }}
                >
                  🔍
                </span>
              )}
            </div>

            {/* 2. Category Filter Tabs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "var(--text-muted)",
              }}>
                CATEGORY_FILTER:
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        padding: "8px 16px",
                        background: isActive ? "var(--accent)" : "var(--bg-elevated)",
                        color: isActive ? "#111111" : "var(--text-secondary)",
                        border: isActive ? "2px solid var(--accent)" : "1px solid var(--border)",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Tech Stack Quick Filters */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "var(--text-muted)",
              }}>
                TECH_STACK_FILTER:
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {popularTechs.map((tech) => {
                  const isActive = selectedTech === tech;
                  return (
                    <button
                      key={tech}
                      onClick={() => setSelectedTech(tech)}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        padding: "5px 12px",
                        background: isActive ? "var(--border-ink)" : "transparent",
                        color: isActive ? "var(--bg)" : "var(--text-muted)",
                        border: `1px solid ${isActive ? "var(--border-ink)" : "var(--border)"}`,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {tech === "All" ? "ALL TECHS" : tech}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Results Bar & Reset Button */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid var(--border)",
              paddingTop: 14,
              marginTop: 4,
              flexWrap: "wrap",
              gap: 12,
            }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fontWeight: 700,
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
              }}>
                SHOWING {filteredProjects.length} OF {projects.length} PROJECTS
              </span>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--accent)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  RESET ALL FILTERS ↺
                </button>
              )}
            </div>
          </motion.div>

          {/* ── Projects Grid ── */}
          {filteredProjects.length > 0 ? (
            <motion.div
              layout
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 24,
              }}
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    variants={{
                      hidden: { opacity: 0, y: 16, scale: 0.98 },
                      visible: { opacity: 1, y: 0, scale: 1 },
                      exit: { opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.2 } },
                    }}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* No Results State */
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                border: "2px solid var(--border-ink)",
                background: "var(--bg-surface)",
                padding: "60px 24px",
                textAlign: "center",
                boxShadow: "var(--shadow-hard-ink)",
              }}
            >
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 700,
                color: "var(--accent)",
                letterSpacing: "0.14em",
                display: "block",
                marginBottom: 12,
              }}>
                // NO_MATCHES_FOUND
              </span>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 24,
                textTransform: "uppercase",
                color: "var(--text-primary)",
                margin: "0 0 12px 0",
              }}>
                NO PROJECTS MATCH YOUR SEARCH
              </h3>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "var(--text-muted)",
                maxWidth: 400,
                margin: "0 auto 24px auto",
              }}>
                Try clearing your search query or switching categories to see more work.
              </p>
              <button
                onClick={handleResetFilters}
                className="btn-brutal"
                style={{ fontSize: 11 }}
              >
                RESET ALL FILTERS ↺
              </button>
            </motion.div>
          )}

        </div>
      </main>

      <Contact />
    </div>
  );
}
