import React, { Suspense, lazy, useEffect, useState } from "react";
import { usePath, navigate } from "./router.jsx";
import { counterpart } from "./flipMap.js";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Experience from "./pages/Experience.jsx";
import Education from "./pages/Education.jsx";
import Contact from "./pages/Contact.jsx";
import Lab from "./pages/Lab.jsx";
import CoinFlip from "./components/CoinFlip.jsx";
import FlipButton from "./components/FlipButton.jsx";
import { useScrollReveal, ScrollProgress } from "./components/motion.jsx";

// The builder side only downloads when someone flips, so recruiters get a fast first page.
const loadBuilder = () => import("./builder/BuilderApp.jsx");
const BuilderApp = lazy(loadBuilder);

export default function App() {
  const path = usePath().replace(/\/+$/, "") || "/";
  const onBuilder = path.startsWith("/builder");
  const [flip, setFlip] = useState(null);
  useScrollReveal();

  // Old links like /work/finance still work
  useEffect(() => {
    if (path.startsWith("/work/")) navigate(path.replace("/work/", "/projects/"));
  }, [path]);

  const startFlip = () => {
    // On the two home pages, the hero itself performs the transformation.
    if (path === "/" || path === "/builder") return window.dispatchEvent(new Event("hero-flip"));
    const target = counterpart(path);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return navigate(target);
    if (!onBuilder) loadBuilder(); // warm up while the coin spins
    setFlip({ from: onBuilder ? "builder" : "designer", to: onBuilder ? "designer" : "builder", target });
  };

  let page;
  if (onBuilder) page = <BuilderApp path={path} />;
  else if (path === "/about") page = <About />;
  else if (path === "/projects") page = <Projects />;
  else if (path.startsWith("/projects/")) page = <ProjectDetail slug={path.split("/")[2]} />;
  else if (path === "/experience") page = <Experience />;
  else if (path === "/education") page = <Education />;
  else if (path === "/lab") page = <Lab />;
  else if (path === "/contact") page = <Contact />;
  else page = <Home />;

  return (
    <div className={onBuilder ? "side-builder" : "side-designer"}>
      <ScrollProgress />
      <Suspense fallback={<div className="loading" />}>
        <div key={path} className="page-enter">{page}</div>
      </Suspense>
      <FlipButton onBuilder={onBuilder} onClick={startFlip} />
      {flip && (
        <CoinFlip
          from={flip.from}
          to={flip.to}
          onLanded={() => navigate(flip.target)}
          onDone={() => setFlip(null)}
        />
      )}
    </div>
  );
}
