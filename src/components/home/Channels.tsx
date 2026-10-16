/** Where the work goes. A CSS marquee of the channels the bottega publishes
 *  to: one translateX loop over a duplicated list, masked at the edges,
 *  paused on hover and frozen under reduced motion. */
const CHANNELS: [string, string][] = [
  ["Instagram", "#e1306c"],
  ["LinkedIn", "#0a66c2"],
  ["Facebook", "#1877f2"],
  ["TikTok", "#69c9d0"],
  ["YouTube Shorts", "#ff0000"],
  ["X", "#e7e9ea"],
  ["Email journeys", "#a78bfa"],
  ["Brand website", "#22d3ee"],
  ["Event pages", "#f59e0b"],
  ["Meta Ads", "#0081fb"],
  ["Google Ads", "#34a853"],
  ["Pinterest", "#e60023"],
];

export default function Channels() {
  const list = [...CHANNELS, ...CHANNELS];
  return (
    <section aria-label="Channels The Agentcy publishes to" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-20">
      <div className="flex flex-col items-center gap-4">
        <span className="text-[12px] font-semibold tracking-[.12em] text-white/45 uppercase">Il Postino delivers to</span>
        <div className="marquee w-full">
          <div className="marquee-track">
            {list.map(([name, c], i) => (
              <span
                key={`${name}-${i}`}
                aria-hidden={i >= CHANNELS.length}
                className="glass-soft inline-flex flex-none items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-semibold text-white/80"
              >
                <span className="h-2 w-2 rounded-full" style={{ background: c, boxShadow: `0 0 8px ${c}` }} />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
