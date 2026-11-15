import React from "react";
import Layout, { PageHeader, usePageTitle } from "../components/Layout.jsx";
import ContactForm from "../components/ContactForm.jsx";
import { profile } from "../data.js";

export default function Contact() {
  usePageTitle("Contact");
  const socials = [
    ["LinkedIn", profile.linkedin],
    ["Behance", profile.behance],
    ["GitHub", profile.github],
    ["Instagram", profile.instagram],
  ].filter(([, url]) => url);

  return (
    <Layout cta={false}>
      <PageHeader
        eyebrow="Contact"
        title="Let's build something together."
        sub="Looking for a designer who can also build, or need a consultation? Send me a message. Available with 30 days' notice."
      />
      <section className="container contact">
        <div className="contact__info">
          <div className="contact__item">
            <span className="contact__label">Email</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <div className="contact__item">
            <span className="contact__label">Phone</span>
            <a href={profile.phoneHref}>{profile.phone}</a>
          </div>
          <div className="contact__item">
            <span className="contact__label">Location</span>
            <span>{profile.location}<br /><span className="muted">{profile.relocation}</span></span>
          </div>
          <div className="contact__item">
            <span className="contact__label">Elsewhere</span>
            <span className="contact__socials">
              {socials.map(([label, url]) => <a key={label} href={url} target="_blank" rel="noreferrer">{label} ↗</a>)}
            </span>
          </div>
        </div>
        <div className="contact__form-card">
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
}
