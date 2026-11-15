import React, { useState } from "react";

const SWATCHES = [
  { name: "Blue", hex: "#2563EB" },
  { name: "Amber", hex: "#F59E0B" },
  { name: "Emerald", hex: "#059669" },
  { name: "Rose", hex: "#E11D48" },
  { name: "Violet", hex: "#7C3AED" },
];

// Live demo: change design tokens and watch a mini UI and its code update.
export default function TokenPlayground() {
  const [primary, setPrimary] = useState(SWATCHES[0].hex);
  const [radius, setRadius] = useState(14);
  const [space, setSpace] = useState(16);
  const [dark, setDark] = useState(false);
  const [copied, setCopied] = useState(false);

  const css = `:root {
  --color-primary: ${primary};
  --radius: ${radius}px;
  --space: ${space}px;
  --surface: ${dark ? "#0F172A" : "#FFFFFF"};
  --text: ${dark ? "#F8FAFC" : "#0F172A"};
}`;

  const copy = async () => {
    try { await navigator.clipboard.writeText(css); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };

  const vars = {
    "--p": primary, "--r": `${radius}px`, "--s": `${space}px`,
    "--surface": dark ? "#0F172A" : "#FFFFFF", "--t": dark ? "#F8FAFC" : "#0F172A",
    "--m": dark ? "#94A3B8" : "#64748B", "--l": dark ? "#1E293B" : "#E5E7EB",
  };

  return (
    <div className="lab-box">
      <div className="tp">
        <div className="tp__controls">
          <fieldset>
            <legend>Primary colour</legend>
            <div className="tp__swatches">
              {SWATCHES.map((s) => (
                <button key={s.hex} type="button" className={`tp__swatch ${primary === s.hex ? "is-on" : ""}`} style={{ background: s.hex }} onClick={() => setPrimary(s.hex)} aria-label={s.name} aria-pressed={primary === s.hex} />
              ))}
            </div>
          </fieldset>
          <label className="tp__range">
            <span>Corner radius <b>{radius}px</b></span>
            <input type="range" min="0" max="28" value={radius} onChange={(e) => setRadius(+e.target.value)} />
          </label>
          <label className="tp__range">
            <span>Spacing <b>{space}px</b></span>
            <input type="range" min="8" max="28" step="2" value={space} onChange={(e) => setSpace(+e.target.value)} />
          </label>
          <label className="tp__toggle">
            <input type="checkbox" checked={dark} onChange={(e) => setDark(e.target.checked)} />
            <span>Dark surface</span>
          </label>
        </div>

        <div className="tp__preview" style={vars}>
          <div className="tp-card">
            <div className="tp-card__top">
              <span className="tp-badge">New</span>
              <span className="tp-muted">Order #2048</span>
            </div>
            <h4>Transfer ₹25,000 to Priya</h4>
            <p className="tp-muted">Arrives in about 2 minutes. No fees today.</p>
            <label className="tp-field">
              <span>Note</span>
              <input placeholder="Rent for November" />
            </label>
            <div className="tp-actions">
              <button type="button" className="tp-btn tp-btn--ghost">Cancel</button>
              <button type="button" className="tp-btn">Send money</button>
            </div>
          </div>
        </div>
      </div>

      <div className="tp__code">
        <div className="tp__code-head">
          <span>tokens.css</span>
          <button type="button" onClick={copy}>{copied ? "Copied ✓" : "Copy"}</button>
        </div>
        <pre><code>{css}</code></pre>
      </div>
    </div>
  );
}
