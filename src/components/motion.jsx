import React, { useEffect, useRef, useState } from "react";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Elements that fade/slide in as you scroll. Add a selector here to animate more things.
const REVEAL = [
  ".section__head", ".work-card", ".stat", ".timeline__item", ".value", ".skill-card", ".tools",
  ".edu__card", ".cert", ".case__section", ".case__hero", ".mini-exp", ".split > div:first-child",
  ".about__photo", ".about__text", ".contact__item", ".contact__form-card", ".cta-band", ".page-head",
  ".loud__card", ".loud__stat", ".journey__item", ".principle", ".stack-card", ".lab-box", ".lab-title",
  ".gh__repo", ".gh__empty", ".d2c__panel", ".loud__section > h2", ".loud__row", ".flow li",
  ".loud__talk", ".loud__footer-cta", ".devcase__facts", ".devcase__section", ".loud-contact__info", ".loud-contact__form",
].join(",");

// Watches the page for new content (route changes, lazy pages) and reveals it on scroll.
export function useScrollReveal() {
  useEffect(() => {
    if (reduced() || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        io.unobserve(el);
        el.classList.add("is-in");
        // Hand control back to the element's own hover transitions once revealed.
        const delay = parseFloat(getComputedStyle(el).getPropertyValue("--i") || 0) * 80;
        setTimeout(() => el.classList.remove("reveal", "is-in"), 900 + delay);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    let t;
    const scan = () => {
      document.querySelectorAll(REVEAL).forEach((el) => {
        if (el.dataset.rv) return;
        el.dataset.rv = "1";
        const siblings = el.parentElement ? [...el.parentElement.children] : [];
        el.style.setProperty("--i", Math.min(siblings.indexOf(el), 6));
        el.classList.add("reveal");
        io.observe(el);
      });
    };
    const mo = new MutationObserver(() => { clearTimeout(t); t = setTimeout(scan, 30); });
    mo.observe(document.getElementById("root"), { childList: true, subtree: true });
    scan();
    return () => { mo.disconnect(); io.disconnect(); clearTimeout(t); };
  }, []);
}

// "20+" counts up from 0 when it scrolls into view.
export function CountUp({ value }) {
  const m = String(value).match(/^(\D*)(\d+)(.*)$/);
  const target = m ? parseInt(m[2], 10) : 0;
  const [n, setN] = useState(reduced() || !m ? target : 0);
  const ref = useRef(null);

  useEffect(() => {
    if (!m || reduced()) return;
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now(), dur = 1100;
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  if (!m) return <>{value}</>;
  return <span ref={ref}>{m[1]}{n}{m[3]}</span>;
}

// Thin bar at the top showing how far down the page you are.
export function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
}
