import { useEffect, useState } from "react";

// A tiny router so the site needs no extra packages.
export function navigate(path) {
  if (path === window.location.pathname) return;
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  const hash = path.split("#")[1];
  if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView(), 50);
  else window.scrollTo(0, 0);
}

export function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onChange = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onChange);
    return () => window.removeEventListener("popstate", onChange);
  }, []);
  return path;
}

export function Link({ to, children, onClick, ...rest }) {
  if (to.startsWith("http")) {
    return <a href={to} target="_blank" rel="noreferrer" {...rest}>{children}</a>;
  }
  return (
    <a
      href={to}
      onClick={(e) => {
        onClick?.(e);
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
