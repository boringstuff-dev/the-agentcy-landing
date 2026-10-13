import type { ReactNode } from "react";

/** Fade-up as the block scrolls into view. Pure CSS (see `.reveal` in
 *  globals.css): no client JS, and the content is visible immediately in
 *  browsers without scroll-driven animations. `delay` is accepted for call
 *  sites that stagger cards, but staggering is handled by the per-element
 *  scroll timeline, so it is a no-op. */
export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return <div className={`reveal ${className}`.trim()}>{children}</div>;
}
