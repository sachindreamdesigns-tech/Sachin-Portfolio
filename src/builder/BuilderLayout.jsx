import React, { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import { Link, usePath } from "../router.jsx";
import { builderNav } from "../builderData.js";
import { profile } from "../data.js";

export function useBuilderTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Sachin Builds` : "Sachin Builds — The Builder Side";
  }, [title]);
}

export function LoudHead({ kicker, title, sub, num = "··" }) {
  return (
    <header className="loud__head">
      <p className="cine-label"><span>{num}</span> {kicker}</p>
      <h1>{title}</h1>
      {sub && <p className="loud__lead">{sub}</p>}
    </header>
  );
}

// kept for compatibility with older pages
export function Marquee() { return null; }

/* Custom cursor: a ring that follows the mouse and shows a word over [data-cursor] elements */
function Cursor() {
  const ref = useRef(null);
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.body.classList.add("has-cine-cursor");
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf;
    const check = (target) => {
      const t = target?.closest?.("[data-cursor]");
      setLabel(t ? t.getAttribute("data-cursor") : "");
      ref.current?.classList.toggle("is-link", !t && !!target?.closest?.("a, button, input, select, textarea, label"));
    };
    const move = (e) => { x = e.clientX; y = e.clientY; check(e.target); };
    const scroll = () => check(document.elementFromPoint(x, y));
    const loop = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      if (ref.current) ref.current.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("pointermove", move);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", move); window.removeEventListener("scroll", scroll); document.body.classList.remove("has-cine-cursor"); };
  }, []);
  return (
    <div ref={ref} className={`cine-cursor ${label ? "has-label" : ""}`} aria-hidden="true">
      <span className="cine-cursor__ring"><em>{label}</em></span>
      <span className="cine-cursor__dot" />
    </div>
  );
}

export default function BuilderLayout({ children, home = false }) {
  const path = usePath().replace(/\/+$/, "");
  const [open, setOpen] = useState(false);
  const isActive = (to) => (to === "/builder" ? path === "/builder" : path.startsWith(to));

  useEffect(() => {
    document.documentElement.classList.add("cine");
    return () => document.documentElement.classList.remove("cine");
  }, []);

  return (
    <div className={`loud ${home ? "loud--home" : ""}`}>
      <a href="#main" className="skip">Skip to content</a>
      <div className="grain" aria-hidden="true" />
      <Cursor />

      <header className="cine-nav">
        <Link to="/builder" className="cine-logo">Sachin <em>Builds</em></Link>
        <nav className="cine-links" aria-label="Builder side">
          {builderNav.map((n) => (
            <Link key={n.to} to={n.to} className={isActive(n.to) ? "is-active" : ""} aria-current={isActive(n.to) ? "page" : undefined}>{n.label}</Link>
          ))}
        </nav>
        <div className="cine-nav__right">
          <a className="cine-pill" href={profile.github} target="_blank" rel="noreferrer"><span className="cine-pill__bars" aria-hidden="true"><i /><i /><i /><i /></span>GitHub</a>
          <button type="button" className="cine-pill cine-burger" onClick={() => setOpen(true)} aria-expanded={open}>Menu</button>
        </div>
      </header>

      <div className={`cine-menu ${open ? "is-open" : ""}`} inert={!open} aria-hidden={!open}>
        <button type="button" className="cine-pill cine-menu__close" onClick={() => setOpen(false)}>Close <FiX /></button>
        <ol>
          {builderNav.map((n, i) => (
            <li key={n.to} style={{ "--i": i }}><Link to={n.to} onClick={() => setOpen(false)}><small>0{i + 1}</small>{n.label}</Link></li>
          ))}
        </ol>
      </div>

      <main id="main">{children}</main>

      {!home && (
        <footer className="cine-foot">
          <p className="cine-label"><span>07</span> Studio</p>
          <h2>Let's make something <em>worth watching.</em></h2>
          <div className="cine-foot__row">
            <Link to="/builder/contact" className="cine-btn" data-cursor="Go">Start a project <FiArrowUpRight /></Link>
            <a className="cine-foot__mail" href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <div className="cine-foot__base">
            <span>© {new Date().getFullYear()} Sachin M · Directed in Figma · Shot in React</span>
            <span><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> · <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></span>
          </div>
        </footer>
      )}
    </div>
  );
}
