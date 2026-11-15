// When someone flips the coin, take them to the matching page on the other side.
const toBuilderSlug = { care: "eldercare-pwa", "investigation-ai": "investigation-ai", "data-observability": "data-observability" };
const toDesignerSlug = { "eldercare-pwa": "care", "investigation-ai": "investigation-ai", "data-observability": "data-observability" };

export function counterpart(path) {
  if (path.startsWith("/builder")) {
    const sub = path.replace(/^\/builder/, "") || "/";
    if (sub.startsWith("/projects/")) {
      const s = toDesignerSlug[sub.split("/")[2]];
      return s ? `/projects/${s}` : "/projects";
    }
    return { "/about": "/about", "/projects": "/projects", "/stack": "/about", "/lab": "/lab", "/contact": "/contact" }[sub] || "/";
  }
  if (path.startsWith("/projects/")) {
    const s = toBuilderSlug[path.split("/")[2]];
    return s ? `/builder/projects/${s}` : "/builder/projects";
  }
  return {
    "/about": "/builder/about",
    "/projects": "/builder/projects",
    "/experience": "/builder/about",
    "/education": "/builder/about",
    "/lab": "/builder/lab",
    "/contact": "/builder/contact",
  }[path] || "/builder";
}
