import React from "react";
import Layout, { PageHeader, usePageTitle } from "../components/Layout.jsx";
import { education, certifications } from "../data.js";

export default function Education() {
  usePageTitle("Education");
  return (
    <Layout>
      <PageHeader
        eyebrow="Education"
        title="Engineering roots, design training"
        sub="An engineering degree taught me precision. Design school taught me empathy. Pharma taught me compliance."
      />

      <section className="container edu">
        {education.map((e) => (
          <div key={e.title} className="edu__card">
            <span className="edu__year">{e.period}</span>
            <h3>{e.title}</h3>
            <p className="edu__school">{e.school}</p>
            <p className="muted">{e.body}</p>
          </div>
        ))}
      </section>

      <section className="section container">
        <div className="section__head">
          <p className="eyebrow">Certifications</p>
          <h2>Pharma quality & compliance</h2>
          <p className="muted lead">Completed at Strides, so I can design software that passes validation and audits.</p>
        </div>
        <div className="certs-grid">
          {certifications.map((c) => (
            <div key={c.title} className="cert">
              <span className="cert__badge" aria-hidden="true">✓</span>
              <div>
                <h3>{c.title}</h3>
                <p className="muted">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
