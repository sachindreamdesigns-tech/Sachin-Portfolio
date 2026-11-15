import React from "react";
import Layout, { usePageTitle } from "../components/Layout.jsx";
import ProjectCard, { ProjectImage } from "../components/ProjectCard.jsx";
import { Link } from "../router.jsx";
import { projects } from "../data.js";

export default function ProjectDetail({ slug }) {
  const idx = projects.findIndex((p) => p.slug === slug);
  const p = projects[idx];
  usePageTitle(p ? p.title : "Not found");

  if (!p) {
    return (
      <Layout>
        <section className="container page-head">
          <h1>That project doesn't exist.</h1>
          <Link to="/projects" className="btn btn--primary">View all projects</Link>
        </section>
      </Layout>
    );
  }

  const related = [1, 2].map((n) => projects[(idx + n) % projects.length]);

  return (
    <Layout>
      <article className="case container">
        <Link to="/projects" className="back">← All projects</Link>
        <p className="eyebrow">{p.industry}</p>
        <h1 className="case__title">{p.title}</h1>
        <p className="case__lead">{p.summary}</p>

        <dl className="case__facts">
          <div><dt>Industry</dt><dd>{p.industry}</dd></div>
          <div><dt>Client</dt><dd>{p.client}</dd></div>
          <div><dt>Service</dt><dd>{p.service}</dd></div>
          <div><dt>Year</dt><dd>{p.year}</dd></div>
          {p.metric && <div><dt>Impact</dt><dd className="case__metric">{p.metric.value} {p.metric.label}</dd></div>}
        </dl>
      </article>

      <div className="container case__hero">
        <ProjectImage src={p.images[0]} alt={p.title} size={2048} className="case__img" />
      </div>
      {p.note && <p className="container case__note">{p.note}</p>}

      <article className="case container">
        {p.sections.map((s) => (
          <section key={s.heading} className="case__section">
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
          </section>
        ))}
      </article>

      {p.images.slice(1).map((img, i) => (
        <div key={img} className="container case__hero">
          <ProjectImage src={img} alt={`${p.title} screen ${i + 2}`} size={2048} className="case__img" />
        </div>
      ))}

      <section className="section container">
        <div className="section__head section__head--row">
          <h2>Related projects</h2>
          <Link to="/projects" className="text-link">View all projects →</Link>
        </div>
        <div className="work-grid">
          {related.map((r) => <ProjectCard key={r.slug} p={r} />)}
        </div>
      </section>
    </Layout>
  );
}
