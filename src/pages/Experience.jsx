import { CountUp } from "../components/motion.jsx";
import React from "react";
import Layout, { PageHeader, usePageTitle } from "../components/Layout.jsx";
import { experience, achievements, stats, tools, profile } from "../data.js";

export default function Experience() {
  usePageTitle("Experience");
  return (
    <Layout>
      <PageHeader
        eyebrow="Experience"
        title="5 years of designing, leading and building"
        sub="From leading a design team at Cognizant to designing and coding pharma tools at Strides."
      />

      <section className="container stats" aria-label="Highlights">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <strong><CountUp value={s.value} /></strong>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      <section className="section container">
        <ol className="timeline">
          {experience.map((e) => (
            <li key={e.company} className="timeline__item">
              <div className="timeline__when">
                <span>{e.period}</span>
                <span className="muted">{e.location}</span>
              </div>
              <div>
                <h3>{e.role} <span className="muted">· {e.company}</span></h3>
                <ul className="timeline__points">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
                <p className="timeline__label">Projects</p>
                <ul className="chips">{e.projects.map((p) => <li key={p} className="chip">{p}</li>)}</ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section container split">
        <div>
          <p className="eyebrow">Highlights</p>
          <h2>Achievements</h2>
          <ul className="ticks">{achievements.map((a) => <li key={a}>{a}</li>)}</ul>
          <a className="text-link" href={profile.talk} target="_blank" rel="noreferrer">Watch the talk →</a>
        </div>
        <div>
          <p className="eyebrow">Toolkit</p>
          <h2>Tools</h2>
          <ul className="chips">{tools.map((t) => <li key={t} className="chip chip--blue">{t}</li>)}</ul>
        </div>
      </section>
    </Layout>
  );
}
