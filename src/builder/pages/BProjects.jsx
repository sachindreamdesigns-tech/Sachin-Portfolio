import React from "react";
import BuilderLayout, { LoudHead, useBuilderTitle } from "../BuilderLayout.jsx";
import DevCard from "../DevCard.jsx";
import GitHubRepos from "../lab/GitHubRepos.jsx";
import { devProjects } from "../../builderData.js";

export default function BProjects() {
  useBuilderTitle("Projects");
  const q = new URLSearchParams(window.location.search).get("q") || "";
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const list = words.length
    ? devProjects.filter((p) => words.some((w) => [p.title, p.tag, p.summary, ...p.stack, ...p.sections.map((x) => x.body)].join(" ").toLowerCase().includes(w)))
    : devProjects;
  return (
    <BuilderLayout>
      <LoudHead
        kicker="Projects · Code"
        title={<>Things I designed <em>and built.</em></>}
        num="02"
        sub={q ? `Results for “${q}”.` : "Only projects where I wrote the code. Most pharma work is under NDA, so those pages share what I can."}
      />
      <section className="loud__section loud__section--tight">
        <div className="loud__grid">
          {list.map((p, i) => <DevCard key={p.slug} p={p} i={i} />)}
          {!list.length && <p className="loud__note">Nothing matched “{q}”. Here's everything instead: <a href="/builder/projects">all projects</a>.</p>}
        </div>
      </section>
      <section className="loud__section">
        <h2>Fresh from <em>GitHub.</em></h2>
        <GitHubRepos />
      </section>
    </BuilderLayout>
  );
}
