import React, { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Link, usePath } from "../router.jsx";
import { nav } from "../data.js";

function useTheme() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || "dark");
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    setTheme(next);
  };
  return [theme, toggle];
}

export default function Nav() {
  const path = usePath();
  const [scrolled, setScrolled] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const isActive = (to) => (to === "/" ? path === "/" : path.startsWith(to));

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <header className={`nav ${scrolled ? "nav--scrolled" : ""} ${path === "/" ? "nav--over" : ""}`}>
        <div className="container nav__inner">
          <Link to="/" className="nav__logo">
            <img className="nav__avatar" src="/doodles/avatar-designer.webp" alt="" aria-hidden="true" />
            SACHIN<span className="nav__logo-dot">.</span>
          </Link>
          <nav className="nav__links" aria-label="Main">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className={isActive(n.to) ? "is-active" : ""} aria-current={isActive(n.to) ? "page" : undefined}>{n.label}</Link>
            ))}
          </nav>
          <div className="nav__actions">
            <button type="button" className="pill pill--light pill--sm" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
              {theme === "dark" ? <FiSun /> : <FiMoon />} {theme === "dark" ? "Light" : "Dark"}
            </button>
            <Link to="/contact" className="pill pill--dark pill--sm nav__talk">Let's talk <span className="nav__talk-dot" aria-hidden="true" /></Link>
          </div>
        </div>
      </header>
    </>
  );
}
