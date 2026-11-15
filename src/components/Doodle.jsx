import React, { useEffect, useState } from "react";

/*
  Two doodles: "designer" (public/doodles/sachin-designer.webp) and
  "builder" (public/doodles/sachin.webp). Each has its own mouth/jaw
  geometry tuned to where the face sits on that image, in % of the
  image box. If you swap in a new doodle, adjust these numbers so the
  mouth lines up.
*/
const VARIANTS = {
  designer: {
    src: "/doodles/sachin-designer.webp",
    ratio: "505 / 1492",
    mouth: { x: 51.3, y: 10.8, w: 6 },
    jaw: "polygon(43.2% 10.8%, 60.2% 10.8%, 61.7% 12.0%, 58.7% 13.7%, 51.7% 14.3%, 44.7% 13.7%, 41.2% 12.0%)",
  },
  builder: {
    src: "/doodles/sachin.webp",
    ratio: "365 / 1100",
    mouth: { x: 45.3, y: 11.0, w: 7 },
    jaw: "polygon(37% 11.0%, 54.5% 11.0%, 56% 12.2%, 53% 13.9%, 46% 14.5%, 39% 13.9%, 35.5% 12.2%)",
  },
};

function useMouth(talking) {
  const [open, setOpen] = useState(0);
  useEffect(() => {
    if (!talking) { setOpen(0); return; }
    let t;
    const tick = () => {
      setOpen((o) => (o > 0.3 ? Math.random() * 0.2 : 0.55 + Math.random() * 0.45));
      t = setTimeout(tick, 80 + Math.random() * 120);
    };
    tick();
    return () => clearTimeout(t);
  }, [talking]);
  return open;
}

export default function Doodle({ variant = "designer", talking = false, className = "", alt = "Doodle of Sachin" }) {
  const open = useMouth(talking);
  const v = VARIANTS[variant] || VARIANTS.designer;
  return (
    <div className={`me ${talking ? "me--talking" : ""} ${className}`} style={{ aspectRatio: v.ratio }}>
      <img className="me__img" src={v.src} alt={alt} draggable="false" />
      <span className="me__mouth" aria-hidden="true" style={{ left: `${v.mouth.x}%`, top: `${v.mouth.y}%`, width: `${v.mouth.w}%`, opacity: open ? 1 : 0 }} />
      <img
        className="me__jaw"
        src={v.src}
        alt=""
        aria-hidden="true"
        draggable="false"
        style={{ clipPath: v.jaw, transform: `translateY(${(open * 0.55).toFixed(3)}%)` }}
      />
    </div>
  );
}
