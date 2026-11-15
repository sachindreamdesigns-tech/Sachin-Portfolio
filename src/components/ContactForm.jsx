import React, { useState } from "react";
import { profile } from "../data.js";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.company_website) return; // spam trap
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return <div className="form-note form-note--ok">Thanks! Your message is on its way. I usually reply within a day.</div>;
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field-row">
        <label className="field">
          <span>Name</span>
          <input name="name" required autoComplete="name" />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <label className="field">
        <span>Company or role (optional)</span>
        <input name="company" autoComplete="organization" />
      </label>
      <label className="field">
        <span>Message</span>
        <textarea name="message" rows="5" required />
      </label>
      <input className="hp" name="company_website" tabIndex="-1" autoComplete="off" aria-hidden="true" />
      <button className="btn btn--primary" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p className="form-note form-note--err">
          That didn't go through. Email me directly at <a href={`mailto:${profile.email}`}>{profile.email}</a>.
        </p>
      )}
    </form>
  );
}
