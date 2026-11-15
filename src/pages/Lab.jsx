import React, { useRef, useState } from "react";
import Layout, { PageHeader, usePageTitle } from "../components/Layout.jsx";
import { FiCheck, FiAlertTriangle, FiLoader } from "react-icons/fi";

/*
  A live, interactive demo: flip the switches and watch the sample
  sign-up form (and its score) improve or fall apart in real time.
  This is the point of the Lab — UX isn't a slide, it's something you
  can feel the moment it's missing.
*/
const FACTORS = [
  {
    key: "contrast",
    weight: 18,
    label: "Text contrast",
    good: "Ink reads clearly against the background",
    bad: "Grey-on-grey text, easy to miss",
  },
  {
    key: "feedback",
    weight: 16,
    label: "Interactive feedback",
    good: "Buttons and fields show hover & focus states",
    bad: "Nothing visibly reacts to the cursor",
  },
  {
    key: "validation",
    weight: 18,
    label: "Inline validation",
    good: "Errors show the moment you type",
    bad: "Errors only appear after you submit",
  },
  {
    key: "loading",
    weight: 16,
    label: "Loading feedback",
    good: "Button shows a spinner while saving",
    bad: "Click and… nothing, did it even work?",
  },
  {
    key: "target",
    weight: 16,
    label: "Tap target size",
    good: "Comfortable 44px touch targets",
    bad: "Cramped, easy to mis-tap",
  },
  {
    key: "motion",
    weight: 16,
    label: "Motion & transitions",
    good: "Smooth, purposeful transitions",
    bad: "Instant, jarring state changes",
  },
];

const verdictFor = (score) => {
  if (score >= 85) return { label: "Delightful", note: "Low friction. Users finish the task without thinking about the UI." };
  if (score >= 60) return { label: "Usable", note: "It works, but there's friction a user will notice and remember." };
  if (score >= 35) return { label: "Frustrating", note: "Some users will hesitate, mis-tap, or abandon the form here." };
  return { label: "Users will bounce", note: "This combination is enough to make people give up and leave." };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SignupDemo({ on }) {
  const [email, setEmail] = useState("sachin@");
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | saving | done
  const timer = useRef(null);

  const valid = EMAIL_RE.test(email);
  const showError = !valid && (on.validation ? email.length > 0 : touched);

  const submit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    setStatus("saving");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("done"), on.loading ? 1100 : 1100);
  };

  return (
    <form
      className={`lab-demo ${on.contrast ? "" : "lab-demo--lowcontrast"} ${on.feedback ? "" : "lab-demo--noFeedback"} ${on.target ? "" : "lab-demo--small"} ${on.motion ? "" : "lab-demo--noMotion"}`}
      onSubmit={submit}
      noValidate
    >
      <p className="lab-demo__label">Full name</p>
      <input className="lab-demo__input" defaultValue="Sachin M" />

      <p className="lab-demo__label">Email</p>
      <input
        className={`lab-demo__input ${showError ? "is-error" : ""}`}
        value={email}
        onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
        onBlur={() => setTouched(true)}
      />
      {showError && (
        <p className="lab-demo__hint lab-demo__hint--error"><FiAlertTriangle /> Enter a valid email address</p>
      )}
      {!showError && valid && on.validation && (
        <p className="lab-demo__hint lab-demo__hint--ok"><FiCheck /> Looks good</p>
      )}

      <button type="submit" className="lab-demo__submit" disabled={status === "saving"}>
        {status === "saving" && on.loading ? <><FiLoader className="lab-demo__spin" /> Creating account…</> : status === "done" ? "Account created ✓" : "Create account"}
      </button>
      {status === "saving" && !on.loading && <p className="lab-demo__hint">Nothing visible is happening right now — would you click again?</p>}
    </form>
  );
}

export default function Lab() {
  usePageTitle("Lab");
  const [on, setOn] = useState(() => Object.fromEntries(FACTORS.map((f) => [f.key, true])));
  const score = FACTORS.reduce((s, f) => s + (on[f.key] ? f.weight : 0), 0);
  const verdict = verdictFor(score);
  const toggle = (key) => setOn((s) => ({ ...s, [key]: !s[key] }));
  const allGood = () => setOn(Object.fromEntries(FACTORS.map((f) => [f.key, true])));
  const allBad = () => setOn(Object.fromEntries(FACTORS.map((f) => [f.key, false])));

  return (
    <Layout>
      <PageHeader
        eyebrow="Lab"
        title="UX, made visible"
        sub="Flip a switch, watch the form react. Every one of these is a real decision I make on real products — here you can feel the difference instead of reading about it."
      />

      <section className="container lab">
        <div className="lab__panel">
          <div className="lab__score" style={{ "--pct": `${score}%` }}>
            <div className="lab__gauge">
              <svg viewBox="0 0 120 120" aria-hidden="true">
                <circle cx="60" cy="60" r="52" className="lab__gauge-track" />
                <circle cx="60" cy="60" r="52" className="lab__gauge-fill" style={{ strokeDashoffset: `${327 - (327 * score) / 100}` }} />
              </svg>
              <div className="lab__gauge-num"><b>{score}</b><span>/ 100</span></div>
            </div>
            <p className="lab__verdict">{verdict.label}</p>
            <p className="lab__note muted">{verdict.note}</p>
            <div className="lab__presets">
              <button type="button" className="btn btn--sm btn--ghost" onClick={allGood}>All good</button>
              <button type="button" className="btn btn--sm btn--ghost" onClick={allBad}>All bad</button>
            </div>
          </div>

          <ul className="lab__factors">
            {FACTORS.map((f) => (
              <li key={f.key} className={on[f.key] ? "is-on" : "is-off"}>
                <button type="button" role="switch" aria-checked={on[f.key]} className="lab__switch" onClick={() => toggle(f.key)}>
                  <span className="lab__switch-track"><span className="lab__switch-thumb" /></span>
                </button>
                <div>
                  <p className="lab__factor-label">{f.label} <span className="lab__weight">+{f.weight}</span></p>
                  <p className="lab__factor-desc muted">{on[f.key] ? f.good : f.bad}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lab__preview">
          <p className="lab__preview-label">Live preview — try typing an email, then submit</p>
          <SignupDemo on={on} key="demo" />
        </div>
      </section>
    </Layout>
  );
}
