import React, { useEffect, useState } from "react";
import { profile } from "../../data.js";

const USER = profile.github.split("/").filter(Boolean).pop();

// Pulls your latest public repos from GitHub, live. Shows nothing broken if there are none yet.
export default function GitHubRepos() {
  const [state, setState] = useState({ status: "loading", repos: [] });

  useEffect(() => {
    let alive = true;
    fetch(`https://api.github.com/users/${USER}/repos?sort=updated&per_page=6`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((repos) => alive && setState({ status: "ok", repos: repos.filter((r) => !r.fork) }))
      .catch(() => alive && setState({ status: "error", repos: [] }));
    return () => { alive = false; };
  }, []);

  if (state.status === "loading") return <p className="gh__note">Loading repos from GitHub…</p>;

  if (!state.repos.length) {
    return (
      <div className="gh__empty">
        <p>My public repos will show up here automatically, straight from GitHub.</p>
        <a className="loud__btn loud__btn--sm" href={profile.github} target="_blank" rel="noreferrer">VISIT MY GITHUB ↗</a>
      </div>
    );
  }

  return (
    <div className="gh">
      {state.repos.map((r) => (
        <a key={r.id} className="gh__repo" href={r.html_url} target="_blank" rel="noreferrer">
          <strong>{r.name}</strong>
          <p>{r.description || "No description yet."}</p>
          <span className="gh__meta">
            {r.language && <span>● {r.language}</span>}
            <span>★ {r.stargazers_count}</span>
            <span>Updated {new Date(r.updated_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
