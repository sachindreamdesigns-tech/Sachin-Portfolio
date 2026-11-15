// Vercel serverless function: POST /api/contact
// Sends contact-form messages to your inbox using Resend (free tier).
// Set these in Vercel → Project → Settings → Environment Variables:
//   RESEND_API_KEY   your key from resend.com
//   CONTACT_TO       the email that should receive messages

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name = "", email = "", company = "", message = "", company_website } = req.body || {};
  if (company_website) return res.status(200).json({ ok: true }); // bot

  const clean = (s, max) => String(s).trim().slice(0, max);
  const n = clean(name, 100);
  const e = clean(email, 200);
  const c = clean(company, 200);
  const m = clean(message, 5000);

  if (!n || !m || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
    return res.status(400).json({ error: "Please fill in your name, a valid email and a message." });
  }
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO) {
    return res.status(500).json({ error: "Contact form is not configured yet." });
  }

  const esc = (s) => s.replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO],
        reply_to: e,
        subject: `Portfolio message from ${n}${c ? ` (${c})` : ""}`,
        html: `<p><b>Name:</b> ${esc(n)}<br><b>Email:</b> ${esc(e)}<br><b>Company/role:</b> ${esc(c) || "—"}</p><p>${esc(m).replace(/\n/g, "<br>")}</p>`,
      }),
    });
    if (!r.ok) throw new Error(await r.text());
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: "Could not send right now." });
  }
}
