import { CountUp } from "../components/motion.jsx";
import React from "react";
import Layout, { usePageTitle } from "../components/Layout.jsx";
import HeroStage from "../components/HeroStage.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { Link } from "../router.jsx";
import { stats, projects, experience, about } from "../data.js";

export default function Home() {
  usePageTitle(null);
  const featured = projects.filter((p) => p.featured);

  return (
    <Layout>
      <HeroStage side="designer" />

      <section className="container stats stats--home" aria-label="Highlights">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <strong><CountUp value={s.value} /></strong>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      <section className="section container">
        <div className="section__head section__head--row">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2>Featured projects</h2>
          </div>
          <Link to="/projects" className="text-link">View all projects →</Link>
        </div>
        <div className="work-grid">
          {featured.map((p, i) => <ProjectCard key={p.slug} p={p} featured={i === 0} />)}
        </div>
      </section>

      <section className="section container split">
        <div>
          <p className="eyebrow">About</p>
          <h2>{about.intro}</h2>
          <p className="muted lead">{about.paragraphs[0]}</p>
          <Link to="/about" className="text-link">More about me →</Link>
        </div>
        <div className="mini-exp">
          <p className="eyebrow">Experience</p>
          {experience.map((e) => (
            <div key={e.company} className="mini-exp__row">
              <div>
                <strong>{e.company}</strong>
                <span className="muted">{e.role}</span>
              </div>
              <span className="muted">{e.period}</span>
            </div>
          ))}
          <Link to="/experience" className="text-link">Full experience →</Link>
        </div>
      </section>
    </Layout>
  );
}
