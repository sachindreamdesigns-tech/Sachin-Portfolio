import React, { useState } from "react";
import { Link } from "../router.jsx";

export function ProjectImage({ src, alt, size = 1024, className = "" }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className={`img-ph ${className}`} aria-hidden="true">
        <span>{alt}</span>
      </div>
    );
  }
  const url = src.startsWith("http") ? `${src}?scale-down-to=${size}` : src;
  return <img className={className} src={url} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}

export default function ProjectCard({ p, featured = false }) {
  return (
    <Link to={`/projects/${p.slug}`} className={`work-card ${featured ? "work-card--featured" : ""}`}>
      <div className="work-card__media">
        <ProjectImage src={p.images[0]} alt={p.title} size={featured ? 2048 : 1024} />
      </div>
      <div className="work-card__body">
        <p className="work-card__tag">{p.industry} · {p.year}</p>
        <h3>{p.title}</h3>
        <p>{p.summary}</p>
        <div className="work-card__foot">
          {p.metric ? (
            <span className="metric"><b>{p.metric.value}</b> {p.metric.label}</span>
          ) : p.nda ? (
            <span className="chip chip--amber">Under NDA</span>
          ) : <span />}
          <span className="arrow" aria-hidden="true">→</span>
        </div>
      </div>
    </Link>
  );
}
