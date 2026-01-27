import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import HomePage from "./components/pages/HomePage";

// Lazy load project detail page
const ProjectDetail = lazy(() => import("./components/pages/ProjectDetail"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-950">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
      <p className="text-slate-400 text-sm">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
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
