import React, { useState } from "react";

const REASONS = ["Data entry error", "Instrument recalibrated", "Reviewer correction", "Other"];
const now = () => new Date().toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", second: "2-digit" });

// A pharma-style form field: no silent edits. Every change needs a reason and is logged.
export default function AuditTrailDemo() {
  const [value, setValue] = useState("22.5");
  const [draft, setDraft] = useState("22.5");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [log, setLog] = useState([
    { at: "Original entry", user: "Demo Analyst", from: "—", to: "22.5", reason: "Initial recording" },
  ]);

  const save = (e) => {
    e.preventDefault();
    if (draft.trim() === value) return setError("Nothing changed.");
    if (!/^-?\d+(\.\d+)?$/.test(draft.trim())) return setError("Enter a number, e.g. 23.1");
    if (!reason) return setError("A reason for change is required. No silent edits.");
    setLog([{ at: now(), user: "You (Demo Reviewer)", from: value, to: draft.trim(), reason }, ...log]);
    setValue(draft.trim());
    setReason("");
    setError("");
  };

  return (
    <div className="lab-box audit">
      <form className="audit__form" onSubmit={save} noValidate>
        <label className="audit__field">
          <span>Batch B-1042 · Granulation temperature (°C)</span>
          <input value={draft} onChange={(e) => { setDraft(e.target.value); setError(""); }} inputMode="decimal" />
        </label>
        <label className="audit__field">
          <span>Reason for change <b>*</b></span>
          <select value={reason} onChange={(e) => { setReason(e.target.value); setError(""); }}>
            <option value="">Select a reason…</option>
            {REASONS.map((r) => <option key={r}>{r}</option>)}
          </select>
        </label>
        <button className="loud__btn loud__btn--sm" type="submit">SAVE & SIGN</button>
        {error && <p className="audit__error" role="alert">{error}</p>}
      </form>

      <div className="audit__log">
        <div className="audit__log-head">
          <span>Audit trail</span>
          <span className="audit__current">Current: <b>{value} °C</b></span>
        </div>
        <ol>
          {log.map((l, i) => (
            <li key={i}>
              <div className="audit__change">
                <s>{l.from}</s> → <b>{l.to}</b>
              </div>
              <div className="audit__meta">{l.user} · {l.at}</div>
              <div className="audit__reason">{l.reason}</div>
            </li>
          ))}
        </ol>
      </div>

      <ul className="alcoa">
        <li><b>A</b>ttributable: every change has a user</li>
        <li><b>C</b>ontemporaneous: timestamped when it happens</li>
        <li><b>O</b>riginal: the first value is never lost</li>
        <li><b>A</b>ccurate: input is validated, reasons required</li>
      </ul>
    </div>
  );
}
