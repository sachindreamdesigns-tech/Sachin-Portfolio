import React from "react";
import BuilderLayout, { useBuilderTitle } from "../BuilderLayout.jsx";
import DevCard, { DidChips } from "../DevCard.jsx";
import { Link } from "../../router.jsx";
import { devProjects } from "../../builderData.js";

export default function BProjectDetail({ slug }) {
  const idx = devProjects.findIndex((p) => p.slug === slug);
  const p = devProjects[idx];
  useBuilderTitle(p ? p.title : "Not found");

  if (!p) {
    return (
      <BuilderLayout>
        <section className="loud__head">
          <h1>404. Nothing <em>shipped here.</em></h1>
          <Link to="/builder/projects" className="loud__btn">All projects</Link>
        </section>
      </BuilderLayout>
    );
  }
  const next = [1, 2].map((n) => devProjects[(idx + n) % devProjects.length]);

  return (
    <BuilderLayout>
      <article className="loud__head devcase">
        <Link to="/builder/projects" className="loud__back">← All projects</Link>
        <p className="cine-label"><span>{String(idx + 1).padStart(2, "0")}</span> {p.tag} · {p.year}</p>
        <h1>{p.title}</h1>
        <p className="loud__lead">{p.summary}</p>

        <div className="devcase__facts">
          <div>
            <span className="devcase__label">I did</span>
            <DidChips did={p.did} />
          </div>
          <div>
            <span className="devcase__label">Stack</span>
            <ul className="stack-pills stack-pills--big">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div>
            <span className="devcase__label">Links</span>
            <div className="devcase__links">
              {p.live && <a className="loud__btn loud__btn--sm" href={p.live} target="_blank" rel="noreferrer">Live ↗</a>}
              {p.code && <a className="loud__btn loud__btn--sm" href={p.code} target="_blank" rel="noreferrer">Code ↗</a>}
              {p.designLink && <Link className="loud__btn loud__btn--sm loud__btn--ghost" to={p.designLink}>Design case study ↗</Link>}
              {p.nda && <span className="nda-tag">Under NDA</span>}
            </div>
          </div>
        </div>

        {p.sections.map((s) => (
          <section key={s.heading} className="devcase__section">
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
          </section>
        ))}
      </article>

      <section className="loud__section">
        <h2>Keep <em>watching.</em></h2>
        <div className="loud__grid">
          {next.map((n, i) => <DevCard key={n.slug} p={n} i={i + 1} />)}
        </div>
      </section>
    </BuilderLayout>
  );
}
