import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiPlay, FiArrowUpRight } from "react-icons/fi";
import BuilderLayout, { useBuilderTitle } from "../BuilderLayout.jsx";
import HeroStage from "../../components/HeroStage.jsx";
import TokenPlayground from "../lab/TokenPlayground.jsx";
import { Link } from "../../router.jsx";
import { devProjects, journey, stack } from "../../builderData.js";
import { profile } from "../../data.js";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const CHAPTERS = [
  { id: "opening", label: "Opening" },
  { id: "showreel", label: "Reel" },
  { id: "universe", label: "Universe" },
  { id: "genesis", label: "Genesis" },
  { id: "camera", label: "Camera" },
  { id: "capabilities", label: "Capabilities" },
  { id: "studio", label: "Studio" },
];

/* Progress of an element through the viewport while it's sticky: 0 → 1 */
function useScrollProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current; if (!el) return;
        const r = el.getBoundingClientRect();
        const total = r.height - innerHeight;
        setP(Math.min(1, Math.max(0, -r.top / (total || 1))));
      });
    };
    on();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [ref]);
  return p;
}

/* ---------- 00 Loader ---------- */
function Loader({ onDone }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let v = 0, t;
    const tick = () => {
      v = Math.min(100, v + 3 + Math.random() * 9);
      setN(Math.round(v));
      if (v < 100) t = setTimeout(tick, 60 + Math.random() * 60);
      else t = setTimeout(onDone, 450);
    };
    tick();
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`loader ${n >= 100 ? "is-done" : ""}`} role="status" aria-live="polite">
      <p className="loader__k">Now loading</p>
      <p className="loader__t">The Reel</p>
      <div className="loader__bar"><i style={{ width: `${n}%` }} /></div>
      <p className="loader__n">{n}%</p>
    </div>
  );
}

/* ---------- Right-side chapter rail ---------- */
function Chapters() {
  const [active, setActive] = useState("opening");
  useEffect(() => {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => e.isIntersecting && setActive(e.target.id));
    }, { rootMargin: "-45% 0px -45% 0px" });
    CHAPTERS.forEach((c) => { const el = document.getElementById(c.id); el && io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <nav className="chapters" aria-label="Chapters">
      {CHAPTERS.map((c) => (
        <button key={c.id} type="button" className={active === c.id ? "is-active" : ""} onClick={() => document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth" })} aria-label={`Go to ${c.label}`} data-cursor="Go">
          <span>{c.label}</span><i />
        </button>
      ))}
    </nav>
  );
}

/* ---------- 01 Opening: the "booking" screen ---------- */
function Opening({ onPlay }) {
  return (
    <section id="opening" className="opening" aria-label="Opening">
      <div className="opening__glow" aria-hidden="true" />
      <div className="posters">
        <Link to="/builder/projects/investigation-ai" className="poster poster--side poster--l" data-cursor="View">
          <div className="poster__art poster__art--scan" aria-hidden="true"><i /><i /><i /></div>
          <h2>Investigation</h2>
          <div className="poster__meta"><b>Investigation AI</b><span>Pharma / AI / React</span></div>
          <div className="poster__rate">★ In production</div>
        </Link>

        <button type="button" className="poster poster--main" onClick={onPlay} data-cursor="Play" aria-label="Play the showreel">
          <div className="poster__art poster__art--sun" aria-hidden="true">
            <img src="/doodles/sachin.webp" alt="" />
          </div>
          <h2>Portfolio</h2>
          <div className="poster__meta"><b>Selected Work · Code · Experience</b><span>Design / Frontend / Showcase</span></div>
          <div className="poster__rate">★ 5 yrs in the making</div>
          <span className="poster__play" aria-hidden="true"><FiPlay /></span>
        </button>

        <Link to="/builder/projects/data-observability" className="poster poster--side poster--r" data-cursor="View">
          <div className="poster__art poster__art--bars" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <i key={i} style={{ "--i": i }} />)}</div>
          <h2>Observability</h2>
          <div className="poster__meta"><b>Data Observability</b><span>Data / Dashboards / React</span></div>
          <div className="poster__rate">★ Built end to end</div>
        </Link>
      </div>
      <p className="opening__cta">Click the reel to begin</p>
    </section>
  );
}

/* ---------- 03 Universe: fly through the projects ---------- */
function Universe() {
  const ref = useRef(null);
  const p = useScrollProgress(ref);
  const gap = 900;
  const depth = (devProjects.length + 0.6) * gap;
  const z = p * depth;
  return (
    <section id="universe" ref={ref} className="universe" style={{ height: `${devProjects.length * 70 + 120}vh` }} aria-label="The build universe">
      <div className="universe__sticky">
        <div className="stars" aria-hidden="true" style={{ transform: `scale(${1 + p * 0.6})` }} />
        <div className="universe__world" style={{ transform: `translateZ(${z}px)` }}>
          {devProjects.map((d, i) => {
            const cz = -(i + 1) * gap;
            const dist = cz + z;                // 0 = at the camera
            const vis = dist > 250 ? Math.max(0, 1 - (dist - 250) / 300) : Math.min(1, (dist + 2600) / 1200);
            return (
              <Link
                key={d.slug}
                to={`/builder/projects/${d.slug}`}
                className="u-card"
                data-cursor="Open"
                style={{ transform: `translate(-50%, -50%) translate3d(${i % 2 ? 22 : -22}vw, ${(i % 3) * 6 - 6}vh, ${cz}px)`, opacity: vis, pointerEvents: vis > 0.6 ? "auto" : "none" }}
              >
                <span className="u-card__n">{String(i + 1).padStart(2, "0")}</span>
                <span className="u-card__tag">{d.tag}</span>
                <h3>{d.title}</h3>
                <p>{d.summary}</p>
                <span className="u-card__stack">{d.stack.join(" · ")}</span>
              </Link>
            );
          })}
        </div>
        <div className="chapter-copy">
          <p className="cine-label"><span>03</span> The Build Universe</p>
          <h2>Where the designer's hand meets the <em>machine.</em></h2>
        </div>
        <div className="universe__meter" aria-hidden="true"><i style={{ transform: `scaleX(${p})` }} /></div>
      </div>
    </section>
  );
}

/* ---------- 04 Genesis: the origin story, as a horizontal timeline ---------- */
const GEN_SEGMENT = 360; // px between milestone centres on the timeline

function Genesis() {
  const ref = useRef(null);
  const p = useScrollProgress(ref);
  const idx = Math.min(journey.length - 1, Math.floor(p * journey.length));
  const j = journey[idx];
  const words = j.body.split(" ");
  const local = p * journey.length - idx;
  const segment = typeof window !== "undefined" && window.innerWidth < 640 ? 260 : GEN_SEGMENT;
  const headPx = (idx + local) * segment + segment / 2;

  return (
    <section id="genesis" ref={ref} className="genesis" style={{ height: `${journey.length * 80 + 60}vh` }} aria-label="Genesis">
      <div className="genesis__sticky">
        <p className="cine-label genesis__label"><span>04</span> Genesis: Pixels × Code</p>

        <div className="gen-timeline">
          <div className="gen-timeline__track" style={{ transform: `translateX(calc(50% - ${headPx}px))` }}>
            <i className="gen-timeline__rail" aria-hidden="true" />
            {journey.map((m, i) => {
              const dist = i - (idx + local);
              const on = Math.max(0, 1 - Math.abs(dist));
              return (
                <div
                  key={m.when}
                  className={`gen-timeline__node ${i === idx ? "is-on" : i < idx ? "is-past" : ""}`}
                  style={{ "--seg": `${segment}px`, opacity: 0.35 + on * 0.65, transform: `scale(${0.82 + on * 0.18}) translateY(${(1 - on) * 10}px)` }}
                >
                  <i className="gen-timeline__dot" aria-hidden="true" />
                  <p className="gen-timeline__when">{m.when}</p>
                  <h3 className="gen-timeline__title">{m.title}</h3>
                  {i === idx && (
                    <p className="gen-timeline__body">
                      {words.map((w, wi) => (
                        <span key={wi} style={{ opacity: Math.min(1, 0.15 + Math.max(0, local * 1.6 * words.length - wi) / 3) }}>{w} </span>
                      ))}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <ol className="genesis__dots" aria-hidden="true">{journey.map((_, i) => <li key={i} className={i === idx ? "is-on" : i < idx ? "is-past" : ""} />)}</ol>
      </div>
    </section>
  );
}

/* ---------- 05 Capabilities: shards that assemble as you scroll ---------- */
function Capabilities() {
  const ref = useRef(null);
  const p = useScrollProgress(ref);
  const items = stack.flatMap((g) => g.items.map((it) => ({ ...it, group: g.group })));
  const t = Math.min(1, p * 1.7);           // assembled by ~60% of the section
  const ease = 1 - Math.pow(1 - t, 3);
  return (
    <section id="capabilities" ref={ref} className="caps" style={{ height: "220vh" }} aria-label="Capabilities">
      <div className="caps__sticky">
        <div className="caps__copy">
          <p className="cine-label"><span>06</span> Capabilities</p>
          <h2>Every fragment is a <em>discipline.</em></h2>
          <p className="caps__list">React · JavaScript · Tailwind · Node · MongoDB · Figma · Design Tokens · Claude · Vercel</p>
        </div>
        <div className="shards">
          {items.map((it, i) => {
            const seed = Math.sin(i * 91.7) * 10000; const r = seed - Math.floor(seed);
            const s2 = Math.sin(i * 13.3) * 10000; const r2 = s2 - Math.floor(s2);
            const k = 1 - ease;
            return (
              <div
                key={it.name}
                className={`shard shard--${it.level === "Daily" ? "a" : it.level === "Comfortable" ? "b" : "c"}`}
                style={{
                  transform: `translate(${(r - 0.5) * 900 * k}px, ${(r2 - 0.5) * 700 * k}px) rotate(${(r - 0.5) * 140 * k}deg) scale(${1 - k * 0.4})`,
                  opacity: 0.25 + ease * 0.75,
                  clipPath: k > 0.02 ? `polygon(${8 * k}% 0, 100% ${14 * k}%, ${100 - 10 * k}% 100%, 0 ${100 - 12 * k}%)` : "none",
                }}
              >
                <b>{it.name}</b>
                <span>{it.level}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- 06 Camera: the lab, through a viewfinder ---------- */
function Camera() {
  const [tc, setTc] = useState(0);
  useEffect(() => { const t = setInterval(() => setTc((v) => v + 1), 1000 / 24); return () => clearInterval(t); }, []);
  const f = tc % 24, s = Math.floor(tc / 24) % 60, m = Math.floor(tc / 1440) % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <section id="camera" className="camera" aria-label="Camera: live demos">
      <div className="chapter-copy chapter-copy--static">
        <p className="cine-label"><span>05</span> Camera · Live demos</p>
        <h2>Don't take my word for it. <em>Roll camera.</em></h2>
      </div>
      <div className="viewfinder">
        <span className="vf-c vf-c--tl" /><span className="vf-c vf-c--tr" /><span className="vf-c vf-c--bl" /><span className="vf-c vf-c--br" />
        <div className="vf-hud vf-hud--top"><span className="vf-rec"><i /> REC</span><span>00:{pad(m)}:{pad(s)}:{pad(f)}</span><span>4K · 24FPS</span></div>
        <TokenPlayground />
        <div className="vf-hud vf-hud--bot"><span>ISO 400</span><span>Take 01: Design tokens</span><span>f/1.8</span></div>
      </div>
      <div className="camera__more">
        <Link to="/builder/lab" className="cine-btn" data-cursor="Go">More takes in the Lab <FiArrowUpRight /></Link>
        <span>Including a pharma audit-trail demo · ALCOA+</span>
      </div>
    </section>
  );
}

/* ---------- 07 Studio ---------- */
function Studio() {
  return (
    <section id="studio" className="studio" aria-label="Studio: contact">
      <p className="cine-label"><span>07</span> Studio</p>
      <h2>Let's make something <em>worth watching.</em></h2>
      <div className="studio__row">
        <Link to="/builder/contact" className="cine-btn cine-btn--solid" data-cursor="Go">Start a project <FiArrowUpRight /></Link>
        <a className="studio__mail" href={`mailto:${profile.email}`}>{profile.email}</a>
      </div>
      <div className="credits" aria-label="Credits">
        <div className="credits__roll">
          {[
            ["Directed by", "Sachin M"], ["Designed in", "Figma"], ["Shot in", "React"], ["Lighting", "Design tokens"],
            ["Compliance", "GAMP 5 · ALCOA+"], ["Location", profile.location], ["Available in", "UAE · Netherlands · Luxembourg · Remote"], ["Distributed by", "Vercel"],
          ].map(([k, v]) => <p key={k}><span>{k}</span><b>{v}</b></p>)}
        </div>
      </div>
      <div className="cine-foot__base">
        <span>© {new Date().getFullYear()} Sachin M</span>
        <span><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> · <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a> · <a href={profile.resume} target="_blank" rel="noreferrer">Resume</a></span>
      </div>
    </section>
  );
}

export default function BHome() {
  useBuilderTitle(null);
  const fromFlip = useRef(sessionStorage.getItem("flip-arrive") === "builder");
  const [loading, setLoading] = useState(!fromFlip.current && !sessionStorage.getItem("reel-seen") && !reduced());
  const [zoom, setZoom] = useState(false);

  // Arriving from the coin flip: jump straight to the showreel, where the flip ended.
  useLayoutEffect(() => {
    if (fromFlip.current) {
      const el = document.getElementById("showreel");
      if (el) window.scrollTo({ top: el.offsetTop, behavior: "instant" });
    }
  }, []);

  const done = () => { sessionStorage.setItem("reel-seen", "1"); setLoading(false); };

  const play = () => {
    if (reduced()) return document.getElementById("showreel")?.scrollIntoView();
    setZoom(true);
    setTimeout(() => {
      window.scrollTo({ top: document.getElementById("showreel").offsetTop, behavior: "instant" });
      setTimeout(() => setZoom(false), 50);
    }, 650);
  };

  return (
    <BuilderLayout home>
      {loading && <Loader onDone={done} />}
      <div className={`iris ${zoom ? "is-on" : ""}`} aria-hidden="true" />
      <Chapters />
      <Opening onPlay={play} />
      <HeroStage side="builder" />
      <Universe />
      <Genesis />
      <Camera />
      <Capabilities />
      <Studio />
    </BuilderLayout>
  );
}
