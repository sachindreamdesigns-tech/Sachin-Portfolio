import { useCallback, useEffect, useRef, useState } from "react";

// Reads lines aloud with the browser's built-in voice and shows them as captions.
// Falls back to captions only if the browser has no speech support or sound is off.
export function useSpeech() {
  const [line, setLine] = useState(-1);      // index of the line being spoken, -1 = idle
  const [talking, setTalking] = useState(false);
  const [muted, setMuted] = useState(false);
  const run = useRef(0);
  const timer = useRef(null);
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

  const stop = useCallback(() => {
    run.current++;
    clearTimeout(timer.current);
    try { synth && synth.cancel(); } catch {}
    setTalking(false);
    setLine(-1);
  }, [synth]);

  const pickVoice = () => {
    if (!synth) return null;
    const voices = synth.getVoices();
    return voices.find((v) => v.lang === "en-IN") || voices.find((v) => /en-GB|en-US/.test(v.lang)) || voices[0] || null;
  };

  const play = useCallback((lines) => {
    stop();
    const id = ++run.current;
    const say = (i) => {
      if (id !== run.current) return;
      if (i >= lines.length) { setTalking(false); timer.current = setTimeout(() => id === run.current && setLine(-1), 2500); return; }
      setLine(i);
      setTalking(true);
      let done = false;
      const started = Date.now();
      const minDur = 600 + lines[i].length * 45; // keep captions readable even if the voice fails
      const next = () => {
        if (done || id !== run.current) return;
        const left = minDur - (Date.now() - started);
        if (left > 0) { clearTimeout(timer.current); timer.current = setTimeout(next, left); return; }
        done = true;
        clearTimeout(timer.current);
        setTalking(false);
        timer.current = setTimeout(() => say(i + 1), 350);
      };
      if (synth && !muted) {
        try {
          const u = new SpeechSynthesisUtterance(lines[i]);
          const v = pickVoice();
          if (v) u.voice = v;
          u.rate = 1; u.pitch = 1.05;
          u.onend = next;
          u.onerror = next;
          synth.speak(u);
          // Safety net in case the browser never fires onend
          timer.current = setTimeout(next, 900 + lines[i].length * 85);
          return;
        } catch {}
      }
      timer.current = setTimeout(next, 700 + lines[i].length * 55);
    };
    say(0);
  }, [muted, stop, synth]);

  useEffect(() => stop, [stop]);
  useEffect(() => { if (muted) try { synth && synth.cancel(); } catch {} }, [muted, synth]);

  return { line, talking, active: line >= 0, play, stop, muted, setMuted };
}
