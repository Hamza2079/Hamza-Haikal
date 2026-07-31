import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import HomePage from "./components/pages/HomePage";

const ProjectDetail = lazy(() => import("./components/pages/ProjectDetail"));
const ProjectsPage  = lazy(() => import("./components/pages/ProjectsPage"));

/* Brutalist loader — no violet, no glow, just ink */
const PageLoader = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#111111",
    }}
  >
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      {/* Blinking cursor — brutalist loading indicator */}
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#F5F0E8",
        margin: 0,
      }}>
        LOADING<span style={{ color: "#E8721C", animation: "none" }}>_</span>
      </p>
      {/* Hard amber progress indicator */}
      <div style={{
        width: 120,
        height: 2,
        background: "#2E2E2E",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: 0, left: 0,
          width: "40%",
          height: "100%",
          background: "#E8721C",
          animation: "slide-loader 1s ease-in-out infinite alternate",
        }} />
      </div>
    </div>
    <style>{`
      @keyframes slide-loader {
        from { left: -40%; }
        to   { left: 100%; }
      }
    `}</style>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/projects"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProjectsPage />
          </Suspense>
        }
      />
      <Route
        path="/project/:slug"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProjectDetail />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
