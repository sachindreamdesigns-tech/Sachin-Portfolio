import React from "react";
import BuilderLayout, { LoudHead, useBuilderTitle } from "../BuilderLayout.jsx";
import ContactForm from "../../components/ContactForm.jsx";
import { profile } from "../../data.js";

export default function BContact() {
  useBuilderTitle("Contact");
  return (
    <BuilderLayout>
      <LoudHead
        kicker="Contact" num="05"
        title={<>Got a product <em>to ship?</em></>}
        sub="Hiring for a design + frontend role, or need someone who can take an idea from Figma to production? Let's talk."
      />
      <section className="loud__section loud__section--tight loud-contact">
        <div className="loud-contact__info">
          <a href={`mailto:${profile.email}`} className="loud-contact__big">{profile.email}</a>
          <a href={profile.phoneHref}>{profile.phone}</a>
          <p>{profile.location}<br />{profile.relocation}</p>
          <div className="loud-contact__links">
            <a className="loud__btn loud__btn--sm" href={profile.github} target="_blank" rel="noreferrer">GITHUB</a>
            <a className="loud__btn loud__btn--sm" href={profile.linkedin} target="_blank" rel="noreferrer">LINKEDIN</a>
            <a className="loud__btn loud__btn--sm" href={profile.resume} target="_blank" rel="noreferrer">RESUME</a>
          </div>
        </div>
        <div className="loud-contact__form">
          <ContactForm />
        </div>
      </section>
    </BuilderLayout>
  );
}
