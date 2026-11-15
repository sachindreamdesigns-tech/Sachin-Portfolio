import React from "react";
import { Link } from "../router.jsx";

export function DidChips({ did }) {
  const parts = [["Design", did.design], ["Frontend", did.frontend], ["Backend", did.backend]];
  return (
    <ul className="did" aria-label="What I did">
      {parts.map(([label, yes]) => (
        <li key={label} className={yes ? "did--yes" : "did--no"}>{yes ? "✓" : "–"} {label}</li>
      ))}
    </ul>
  );
}

export default function DevCard({ p, i }) {
  return (
    <Link to={`/builder/projects/${p.slug}`} className={`loud__card loud__card--${i % 4}`}>
      <span className="loud__card-tag">{p.tag}</span>
      <h3>{p.title}</h3>
      <p>{p.summary}</p>
      <ul className="stack-pills">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
      <span className="loud__card-meta">{p.nda ? "NDA · " : ""}{p.year}</span>
      <span className="loud__card-go" aria-hidden="true">↗</span>
    </Link>
  );
}
