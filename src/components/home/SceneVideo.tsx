"use client";

import { useEffect, useRef, useState } from "react";

const WANTS_VIDEO = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

/** The hero loop. Mounted only on wide viewports with motion allowed (so
 *  phones never fetch a byte of it: a hidden <video preload> still
 *  downloads metadata), plays only while on screen, pauses when scrolled
 *  away, and calls play() itself because `autoplay` alone is not honoured
 *  by every embedded or power-saving browser. Muted, inline, no controls. */
export default function SceneVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [wanted, setWanted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(WANTS_VIDEO);
    const sync = () => setWanted(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !wanted) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          v.play().catch(() => {
            /* autoplay refused: the poster stays, which is the still */
          });
        } else {
          v.pause();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [wanted]);

  if (!wanted) return null;

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
