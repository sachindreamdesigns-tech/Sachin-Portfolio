import React from "react";
import Layout, { PageHeader, usePageTitle } from "../components/Layout.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { projects } from "../data.js";

export default function Projects() {
  usePageTitle("Projects");
  return (
    <Layout>
      <PageHeader
        eyebrow="Projects"
        title="Work I'm proud of"
        sub="Pharma, fintech, healthcare, real estate and gaming. Click any project for the full story."
      />
      <section className="container work-grid work-grid--page">
        {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}
      </section>
    </Layout>
  );
}
