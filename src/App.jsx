import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import HomePage from "./components/pages/HomePage";

const ProjectDetail = lazy(() => import("./components/pages/ProjectDetail"));
const ProjectsPage  = lazy(() => import("./components/pages/ProjectsPage"));

const PageLoader = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{ background: "#09090B" }}
  >
    <div className="flex flex-col items-center gap-6">
      {/* Minimal violet loader */}
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/60 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
      <p className="text-[11px] text-white/20 uppercase tracking-widest font-medium">Loading</p>
    </div>
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
