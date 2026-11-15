import React, { useEffect } from "react";
import Nav from "./Nav.jsx";
import { Link } from "../router.jsx";
import { nav, profile } from "../data.js";

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Sachin M` : "Sachin M — Product Designer & Frontend Developer";
  }, [title]);
}

export function PageHeader({ eyebrow, title, sub }) {
  return (
    <header className="page-head container">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {sub && <p className="page-head__sub">{sub}</p>}
    </header>
  );
}

export function CtaBand() {
  return (
    <section className="container cta-band">
      <div>
        <h2>Looking for a designer who can also build?</h2>
        <p>Hiring, or need a consultation? I'd love to hear about it. Available with 30 days' notice.</p>
      </div>
      <Link to="/contact" className="btn btn--amber">Let's talk →</Link>
    </section>
  );
}

export default function Layout({ children, cta = true }) {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Nav />
      <main id="main">{children}</main>
      {cta && <CtaBand />}
      <footer className="footer">
        <div className="container footer__inner">
          <div>
            <p className="footer__name">Sachin M</p>
            <p className="muted">Product Designer & Frontend Developer<br />{profile.location}</p>
          </div>
          <nav className="footer__links" aria-label="Footer">
            {nav.map((n) => <Link key={n.to} to={n.to}>{n.label}</Link>)}
          </nav>
          <div className="footer__links">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={profile.behance} target="_blank" rel="noreferrer">Behance</a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            {profile.instagram && <a href={profile.instagram} target="_blank" rel="noreferrer">Instagram</a>}
          </div>
        </div>
        <div className="container footer__base">
          <span>© {new Date().getFullYear()} Sachin M. Designed in Figma, built in React.</span>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
