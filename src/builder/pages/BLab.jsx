import React from "react";
import BuilderLayout, { LoudHead, useBuilderTitle } from "../BuilderLayout.jsx";
import TokenPlayground from "../lab/TokenPlayground.jsx";
import AuditTrailDemo from "../lab/AuditTrailDemo.jsx";
import GitHubRepos from "../lab/GitHubRepos.jsx";

export default function BLab() {
  useBuilderTitle("Lab");
  return (
    <BuilderLayout>
      <LoudHead
        kicker="The Lab · Live demos" num="04"
        title={<>Don't take my word for it. <em>Click.</em></>}
        sub="Small working demos of how I think about design systems and regulated software. Everything here is real React running in your browser."
      />

      <section className="loud__section loud__section--tight">
        <div className="lab-title">
          <span className="lab-num">01</span>
          <div>
            <h2>Design token <em>playground.</em></h2>
            <p>Change a token and the whole component updates, with the CSS ready to copy. This is how a design system stays in sync with code.</p>
          </div>
        </div>
        <TokenPlayground />
      </section>

      <section className="loud__section">
        <div className="lab-title">
          <span className="lab-num">02</span>
          <div>
            <h2>No silent <em>edits.</em></h2>
            <p>In pharma software, you can't just overwrite a number. Try changing the value below: it needs a reason, gets signed and timestamped, and the original is kept. This is ALCOA+ data integrity, the kind of UI I build at Strides.</p>
          </div>
        </div>
        <AuditTrailDemo />
      </section>

      <section className="loud__section">
        <div className="lab-title">
          <span className="lab-num">03</span>
          <div>
            <h2>Live from <em>GitHub.</em></h2>
            <p>Fetched from the GitHub API every time you open this page.</p>
          </div>
        </div>
        <GitHubRepos />
      </section>
    </BuilderLayout>
  );
}
