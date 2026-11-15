import React from "react";
import BuilderLayout, { LoudHead, useBuilderTitle } from "../BuilderLayout.jsx";
import { stack } from "../../builderData.js";

const levelClass = { Daily: "lvl--daily", Comfortable: "lvl--comfy", "Working knowledge": "lvl--learn" };

export default function BStack() {
  useBuilderTitle("Stack");
  return (
    <BuilderLayout>
      <LoudHead
        kicker="Stack · Tools" num="03"
        title={<>The <em>toolbox.</em></>}
        sub="No made-up percentages. Just what I use daily, what I'm comfortable with, and what I'm still getting better at."
      />
      <section className="loud__section loud__section--tight">
        <div className="lvl-legend">
          <span className="lvl lvl--daily">Daily</span>
          <span className="lvl lvl--comfy">Comfortable</span>
          <span className="lvl lvl--learn">Working knowledge</span>
        </div>
        <div className="stack-grid">
          {stack.map((g, i) => (
            <div key={g.group} className={`stack-card stack-card--${i % 4}`}>
              <h3>{g.group}</h3>
              <ul>
                {g.items.map((it) => (
                  <li key={it.name}>
                    <span>{it.name}</span>
                    <span className={`lvl ${levelClass[it.level]}`}>{it.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="loud__section">
        <h2>My AI-assisted <em>workflow.</em></h2>
        <ol className="flow">
          <li><b>01</b><span>Research & flows</span><small>Figma, user interviews</small></li>
          <li><b>02</b><span>Design system</span><small>Tokens + components in Figma</small></li>
          <li><b>03</b><span>Scaffold fast</span><small>Lovable, Claude, Gemini</small></li>
          <li><b>04</b><span>Hand-finish in React</span><small>Accessibility, states, edge cases</small></li>
          <li><b>05</b><span>Ship & test</span><small>Git, Vercel, usability tests</small></li>
        </ol>
      </section>
    </BuilderLayout>
  );
}
