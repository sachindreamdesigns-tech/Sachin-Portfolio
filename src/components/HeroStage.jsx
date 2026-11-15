import React, { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiDownload, FiPlay, FiSquare, FiVolume2, FiVolumeX, FiArrowLeft, FiArrowRight, FiMail } from "react-icons/fi";
import { FaLinkedinIn, FaBehance, FaGithub } from "react-icons/fa";
import { SiReact, SiFigma, SiTailwindcss, SiGit } from "react-icons/si";
import Doodle from "./Doodle.jsx";
import { useSpeech } from "./useSpeech.js";
import { Link, navigate } from "../router.jsx";
import { profile, introScript, heroDevSkills, projects } from "../data.js";
import { reelRing } from "../builderData.js";

const FLIP_MS = 1600;
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const ICONS = { react: SiReact, figma: SiFigma, tailwind: SiTailwindcss, git: SiGit };
const imgFor = (slug) => projects.find((p) => p.slug === slug)?.images?.[0];

/* ---------- Floating embers ---------- */
function Embers({ active }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active || reduced()) return;
    const c = ref.current, ctx = c.getContext("2d");
    let w, h, raf;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = () => { w = c.offsetWidth; h = c.offsetHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size();
    const make = (initial) => ({
      x: Math.random() * w, y: initial ? Math.random() * h : h + 10,
      r: 0.5 + Math.random() * 2, vy: 0.2 + Math.random() * 0.8, vx: (Math.random() - 0.5) * 0.4,
      life: Math.random() * 6.28, hue: 22 + Math.random() * 22,
    });
    const ps = Array.from({ length: Math.round(Math.min(90, w / 14)) }, () => make(true));
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.y -= p.vy; p.x += p.vx + Math.sin(p.life) * 0.3; p.life += 0.03;
        if (p.y < -10) Object.assign(p, make(false));
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 100%, 62%, ${0.35 + Math.sin(p.life * 2) * 0.3})`;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 55%, 0.9)`;
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", size);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); };
  }, [active]);
  return <canvas ref={ref} className="stage__embers" aria-hidden="true" />;
}

/* ---------- Ring item ---------- */
function RingItem({ it }) {
  if (it.type === "work") {
    const src = imgFor(it.slug);
    return (
      <Link to={`/projects/${it.slug}`} className="frame frame--work" tabIndex={-1}>
        {src ? <img src={`${src}?scale-down-to=512`} alt="" loading="lazy" onError={(e) => (e.currentTarget.style.display = "none")} /> : null}
        <span className="frame__label">{it.label}</span>
      </Link>
    );
  }
  if (it.type === "tool") {
    const Icon = ICONS[it.icon];
    return <div className="frame frame--tool"><Icon aria-hidden="true" /><span className="frame__label">{it.label}</span></div>;
  }
  if (it.type === "type") return <div className="frame frame--chip"><b className="frame__aa">Aa</b><span>{it.label}</span></div>;
  if (it.type === "colors") return <div className="frame frame--chip frame--colors">{it.colors.map((c) => <span key={c}><i style={{ background: c }} />{c}</span>)}</div>;
  if (it.type === "code") return <div className="frame frame--chip frame--code"><code>{it.label}</code></div>;
  return <div className="frame frame--chip frame--note"><b>{it.label}</b><span>{it.sub}</span></div>;
}

/* ---------- 3D ring orbiting the doodle (drag, arrows, auto-drift) ---------- */
function Ring({ active }) {
  const n = reelRing.length;
  const step = 360 / n;
  const [rot, setRot] = useState(0);
  const target = useRef(0), cur = useRef(0), drag = useRef(null);

  useEffect(() => {
    if (!active) return;
    let raf;
    const loop = () => {
      if (!drag.current && !reduced()) target.current += 0.04;
      cur.current += (target.current - cur.current) * 0.08;
      setRot(cur.current);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [active]);

  useEffect(() => {
    const move = (e) => { if (!drag.current) return; target.current = drag.current.rot + (e.clientX - drag.current.x) * 0.25; };
    const up = () => { drag.current = null; document.body.classList.remove("is-dragging"); };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
  }, []);

  const startDrag = (e) => {
    if (e.button !== 0) return;
    drag.current = { x: e.clientX, rot: target.current };
    document.body.classList.add("is-dragging");
  };

  // Items live on a halo arc above the head, not a full ring around the body.
  const ARC = 92;            // ° either side of top-centre that's visible
  const FADE = 16;           // ° of soft fade at each edge of the arc

  return (
    <>
      <div className="stage__drag" onPointerDown={startDrag} aria-hidden="true" />
      <div className="ring" aria-label="Selected work and tools">
        {reelRing.map((it, i) => {
          const narrow = typeof window !== "undefined" && window.innerWidth < 700;
          const spread = narrow ? 30 : 37;
          const topBase = narrow ? 19 : 15;
          let theta = (i * step + rot) % 360;
          if (theta > 180) theta -= 360;
          if (theta < -180) theta += 360;
          const within = Math.abs(theta) <= ARC;
          const rad = theta * (Math.PI / 180);
          const depth = Math.cos(rad);         // 1 = top-centre (closest), lower toward the arc ends
          const side = Math.sin(rad);
          const edge = Math.max(0, (Math.abs(theta) - (ARC - FADE)) / FADE);
          const fade = within ? 1 - Math.min(1, edge) : 0;
          return (
            <div
              key={i}
              className={`ring__slot ${depth > 0.4 ? "is-front" : "is-back"}`}
              style={{
                left: `${50 + side * spread}%`,
                top: `${topBase + (1 - depth) * 13}%`,
                transform: `translate(-50%, -50%) scale(${0.58 + Math.max(0, depth) * 0.3}) rotateY(${side * -20}deg)`,
                opacity: active ? fade * (0.55 + Math.max(0, depth) * 0.45) : 0,
                zIndex: 50 + Math.round(depth * 10),
                filter: depth > 0.4 ? "none" : `blur(${Math.max(0, 0.4 - depth) * 1.6}px) brightness(${0.75 + Math.max(0, depth) * 0.25})`,
                pointerEvents: active && fade > 0.6 && depth > 0.3 ? "auto" : "none",
              }}
            >
              <RingItem it={it} />
            </div>
          );
        })}
      </div>
      <button type="button" className="stage__arrow stage__arrow--l" onClick={() => (target.current -= step)} aria-label="Rotate ring left"><FiArrowLeft /></button>
      <button type="button" className="stage__arrow stage__arrow--r" onClick={() => (target.current += step)} aria-label="Rotate ring right"><FiArrowRight /></button>
    </>
  );
}

/* ---------- The hero ---------- */
export default function HeroStage({ side }) {
  const arrived = useRef(sessionStorage.getItem("flip-arrive") === side);
  const [shown, setShown] = useState(side);
  const [busy, setBusy] = useState(false);
  const [instant, setInstant] = useState(arrived.current);
  const stageRef = useRef(null);
  const speech = useSpeech();

  useEffect(() => {
    if (arrived.current) sessionStorage.removeItem("flip-arrive");
    const t = setTimeout(() => document.body.classList.remove("is-flipping"), 60);
    const t2 = setTimeout(() => setInstant(false), 120);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const onFlip = async () => {
      if (busy) return;
      setBusy(true);
      speech.stop();
      const to = shown === "designer" ? "builder" : "designer";
      const top = stageRef.current.getBoundingClientRect().top;
      if (Math.abs(top) > 10) {
        window.scrollTo({ top: window.scrollY + top, behavior: "smooth" });
        await new Promise((r) => setTimeout(r, 650));
      }
      document.body.classList.add("is-flipping");
      setShown(to);
      setTimeout(() => {
        sessionStorage.setItem("flip-arrive", to);
        navigate(to === "builder" ? "/builder" : "/");
      }, reduced() ? 0 : FLIP_MS);
    };
    window.addEventListener("hero-flip", onFlip);
    return () => window.removeEventListener("hero-flip", onFlip);
  }, [shown, busy, speech]);

  const isB = shown === "builder";
  const caption = speech.line >= 0 ? introScript[speech.line] : null;
  const tab = (on) => (on ? 0 : -1);

  return (
    <section
      ref={stageRef}
      id={side === "builder" ? "showreel" : undefined}
      className={`stage stage--${shown} stage--home-${side} ${arrived.current ? "stage--arrived" : ""} ${instant ? "stage--instant" : ""} ${busy ? "stage--flipping" : ""}`}
      aria-label={isB ? "Showreel" : "Introduction"}
    >
      <div className="stage__bg stage__bg--designer" aria-hidden="true" />
      <div className="stage__bg stage__bg--builder" aria-hidden="true">
        <div className="sun" />
        <div className="sun__rays" />
        <div className="clouds clouds--1" />
        <div className="clouds clouds--2" />
        <div className="ground" />
        <Embers active={isB} />
      </div>

      {/* Designer copy */}
      <div className="stage__copy stage__copy--designer" aria-hidden={isB}>
        <p className="stage__hello">Hello, I'm Sachin</p>
        <h1 className="stage__title">
          <span>Product designer</span>
          <span>&amp;</span>
          <span className="stage__title-light">developer</span>
        </h1>
        <p className="stage__sub">Designing clear, compliant products for pharma, fintech and enterprise, and building them in React.</p>
        <ul className="stage__devskills" aria-label="Developer skills">
          <li className="stage__devskills-label">I also code:</li>
          {heroDevSkills.map((s) => <li key={s}>{s}</li>)}
        </ul>
        <div className="stage__ctas">
          <Link to="/projects" className="pill pill--dark" tabIndex={tab(!isB)}>View my work <FiArrowUpRight /></Link>
          <a className="stage__cv" href={profile.resume} target="_blank" rel="noreferrer" tabIndex={tab(!isB)}>Download CV <FiDownload /></a>
        </div>
        <div className="stage__social">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" tabIndex={tab(!isB)}><FaLinkedinIn /></a>
          <a href={profile.behance} target="_blank" rel="noreferrer" aria-label="Behance" tabIndex={tab(!isB)}><FaBehance /></a>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" tabIndex={tab(!isB)}><FaGithub /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email" tabIndex={tab(!isB)}><FiMail /></a>
        </div>
      </div>

      {isB && <Ring active={isB} />}

      {/* You */}
      <div className="stage__doodle">
        <div className="stage__scribbles" aria-hidden="true" />
        <div className="stage__flipper">
          <div className="stage__face stage__face--designer"><Doodle variant="designer" talking={speech.talking} /></div>
          <div className="stage__face stage__face--builder"><Doodle variant="builder" alt="Sachin, builder side" /></div>
        </div>
        {caption && !isB && (
          <div className="bubble" role="status" aria-live="polite" key={speech.line}>
            <p>{caption}</p>
            <span className="bubble__count">{speech.line + 1}/{introScript.length}</span>
          </div>
        )}
      </div>

      <div className="stage__intro">
        <button
          type="button"
          className={`pill pill--intro ${speech.active ? "is-on" : ""}`}
          onClick={() => (speech.active ? speech.stop() : speech.play(introScript))}
          tabIndex={tab(!isB)}
        >
          {speech.active ? <><FiSquare /> Stop</> : <><FiPlay /> Let me introduce myself</>}
          {speech.active && <span className="eq" aria-hidden="true"><i /><i /><i /></span>}
        </button>
        <button
          type="button"
          className="pill pill--round"
          onClick={() => speech.setMuted(!speech.muted)}
          aria-label={speech.muted ? "Turn voice on" : "Turn voice off (captions only)"}
          tabIndex={tab(!isB)}
        >
          {speech.muted ? <FiVolumeX /> : <FiVolume2 />}
        </button>
      </div>

      {/* Showreel copy (builder) */}
      <div className="reel-copy" aria-hidden={!isB}>
        <p className="cine-label"><span>02</span> Showreel</p>
        <p className="reel-copy__meta">Selected Work · Code · Experience</p>
      </div>
      <Link to="/builder/projects" className="cine-btn reel-explore" tabIndex={tab(isB)}>Explore work <FiArrowRight /></Link>
      <p className="reel-hint" aria-hidden="true">Drag the ring · Hover a frame · Scroll to dive in</p>
    </section>
  );
}
