import React, { useEffect, useState } from "react";
import { FiArrowUpRight, FiMoon, FiSun, FiX } from "react-icons/fi";
import { Link, usePath } from "../router.jsx";
import { nav, profile } from "../data.js";

function useTheme() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || "light");
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
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const isActive = (to) => (to === "/" ? path === "/" : path.startsWith(to));

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? "nav--scrolled" : ""} ${path === "/" ? "nav--over" : ""}`}>
        <div className="container nav__inner">
          <Link to="/" className="nav__logo">
            <img className="nav__avatar" src="/doodles/avatar-designer.webp" alt="" aria-hidden="true" />
            SACHIN<span className="nav__logo-dot">.</span>
          </Link>
          <div className="nav__actions">
            <button type="button" className="pill pill--light pill--sm" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
              {theme === "dark" ? <FiSun /> : <FiMoon />} {theme === "dark" ? "Light" : "Dark"}
            </button>
            <Link to="/contact" className="pill pill--dark pill--sm nav__talk">Let's talk <span className="nav__talk-dot" aria-hidden="true" /></Link>
            <button type="button" className="pill pill--light pill--sm" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="site-menu">
              Menu <span className="nav__dots" aria-hidden="true">··</span>
            </button>
          </div>
        </div>
      </header>

      <div id="site-menu" className={`menu ${open ? "menu--open" : ""}`} role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!open} inert={!open}>
        <div className="container menu__top">
          <span className="nav__logo nav__logo--inv">SACHIN<span className="nav__logo-dot">.</span></span>
          <button type="button" className="pill pill--ghost-inv pill--sm" onClick={() => setOpen(false)} autoFocus>Close <FiX /></button>
        </div>
        <div className="container menu__body">
          <nav aria-label="Main">
            <ol className="menu__links">
              {nav.map((n, i) => (
                <li key={n.to} style={{ "--i": i }}>
                  <Link to={n.to} onClick={() => setOpen(false)} className={isActive(n.to) ? "is-active" : ""} aria-current={isActive(n.to) ? "page" : undefined}>
                    <small>0{i + 1}</small>{n.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <aside className="menu__side">
            <p className="menu__label">Get in touch</p>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.phoneHref}>{profile.phone}</a>
            <p className="menu__label">Elsewhere</p>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <FiArrowUpRight /></a>
            <a href={profile.behance} target="_blank" rel="noreferrer">Behance <FiArrowUpRight /></a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub <FiArrowUpRight /></a>
            <a className="pill pill--blue menu__resume" href={profile.resume} target="_blank" rel="noreferrer">Download resume</a>
          </aside>
        </div>
      </div>
    </>
  );
}
