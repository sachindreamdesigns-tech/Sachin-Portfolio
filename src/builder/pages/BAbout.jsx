import React from "react";
import BuilderLayout, { LoudHead, useBuilderTitle } from "../BuilderLayout.jsx";
import { journey, principles } from "../../builderData.js";
import { profile } from "../../data.js";

export default function BAbout() {
  useBuilderTitle("About");
  return (
    <BuilderLayout>
      <LoudHead
        kicker="About · The builder" num="01"
        title={<>From pixels to <em>pull requests.</em></>}
        sub="I spent years handing designs to developers. Now I'm the developer too. Here's how I got here."
      />

      <section className="loud__section">
        <ol className="journey">
          {journey.map((j, i) => (
            <li key={j.when} className={`journey__item journey__item--${i % 4}`}>
              <span className="journey__when">{j.when}</span>
              <h3>{j.title}</h3>
              <p>{j.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="loud__section">
        <h2>How I <em>build.</em></h2>
        <div className="principles">
          {principles.map((p, i) => (
            <div key={p.title} className="principle">
              <span className="principle__num">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="loud__section loud__talk">
        <div>
          <h2>Why <em>both?</em></h2>
          <p>Designers who code catch problems before they ship. Developers who design know why a pixel matters. I'd rather be both.</p>
        </div>
        <a className="loud__btn" href={profile.resume} target="_blank" rel="noreferrer">Get my resume ↓</a>
      </section>
    </BuilderLayout>
  );
}
