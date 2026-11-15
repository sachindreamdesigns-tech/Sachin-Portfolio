import React from "react";
import BHome from "./pages/BHome.jsx";
import BAbout from "./pages/BAbout.jsx";
import BProjects from "./pages/BProjects.jsx";
import BProjectDetail from "./pages/BProjectDetail.jsx";
import BStack from "./pages/BStack.jsx";
import BLab from "./pages/BLab.jsx";
import BContact from "./pages/BContact.jsx";

// Everything on the builder side lives in this lazily-loaded bundle.
export default function BuilderApp({ path }) {
  const sub = path.replace(/^\/builder/, "") || "/";
  if (sub === "/about") return <BAbout />;
  if (sub === "/projects") return <BProjects />;
  if (sub.startsWith("/projects/")) return <BProjectDetail slug={sub.split("/")[2]} />;
  if (sub === "/stack") return <BStack />;
  if (sub === "/lab") return <BLab />;
  if (sub === "/contact") return <BContact />;
  return <BHome />;
}
