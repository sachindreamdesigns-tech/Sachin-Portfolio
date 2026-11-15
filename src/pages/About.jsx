import React from "react";
import Layout, { PageHeader, usePageTitle } from "../components/Layout.jsx";
import { about, skills, tools, profile } from "../data.js";

export default function About() {
  usePageTitle("About");
  return (
    <Layout>
      <PageHeader eyebrow="About me" title={about.intro} />
      <section className="container about">
        <div className="about__photo">
          <img src={`${profile.photo}?scale-down-to=1024`} alt="Sachin M" onError={(e) => (e.currentTarget.style.display = "none")} />
        </div>
        <div className="about__text">
          {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
          <div className="hero__cta">
            <a className="btn btn--primary" href={profile.resume} target="_blank" rel="noreferrer">Download resume</a>
            <a className="btn btn--ghost" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="values">
          {about.values.map((v, i) => (
            <div key={v.title} className="value">
              <span className="value__num">0{i + 1}</span>
              <h3>{v.title}</h3>
              <p className="muted">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section__head">
          <p className="eyebrow">Skills</p>
          <h2>What I bring</h2>
        </div>
        <div className="skills-grid">
          {skills.map((g) => (
            <div className="skill-card" key={g.group}>
              <h3>{g.group}</h3>
              <ul className="chips">{g.items.map((s) => <li key={s} className="chip">{s}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="tools">
          <h3>Tools I use every day</h3>
          <ul className="chips">{tools.map((t) => <li key={t} className="chip chip--blue">{t}</li>)}</ul>
        </div>
      </section>
    </Layout>
  );
}
