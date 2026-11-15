import React, { useEffect, useState } from "react";

const SPIN_MS = 900;
const FADE_MS = 300;

// Full-screen overlay with a two-sided coin. Front = current side, back = destination.
export default function CoinFlip({ from, to, onLanded, onDone }) {
  const [phase, setPhase] = useState("enter"); // enter -> spin -> leave

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("spin"), 30);
    const t2 = setTimeout(() => {
      onLanded();
      setPhase("leave");
    }, SPIN_MS + 250);
    const t3 = setTimeout(onDone, SPIN_MS + 250 + FADE_MS);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <div className={`coinflip coinflip--${phase} coinflip--to-${to}`} role="status" aria-live="polite">
      <span className="sr-only">Switching to the {to} side</span>
      <span className="coinflip__burst" aria-hidden="true" style={{ "--spin": `${SPIN_MS}ms` }}>
        {Array.from({ length: 10 }, (_, i) => <i key={i} style={{ "--a": `${i * 36}deg` }} />)}
      </span>
      <div className="coin" style={{ "--spin": `${SPIN_MS}ms` }}>
        <div className="coin__face coin__face--front">
          <img src={`/doodles/avatar-${from}.webp`} alt="" />
        </div>
        <div className="coin__face coin__face--back">
          <img src={`/doodles/avatar-${to}.webp`} alt="" />
        </div>
      </div>
      <p className="coinflip__label">{to === "builder" ? "The builder side" : "The designer side"}</p>
    </div>
  );
}
