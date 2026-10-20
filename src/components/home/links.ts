export const APP_LOGIN = "https://app.the-agentcy.ai/auth/login";

/** A bare domain or URL, e.g. "acme.com", "www.acme.it/menu", "https://acme.co". */
const URL_RE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i;

export function looksLikeUrl(s: string) {
  return URL_RE.test(s.trim());
}

/** A pasted site as a full URL. */
export function siteUrl(site: string) {
  return /^https?:\/\//i.test(site) ? site : `https://${site}`;
}

/** Where the landing chat bar sends a visitor: the app's auth page, with the
 *  typed brief carried over as `?ask=` so the studio can prefill Ask after
 *  sign-up. A pasted website is expanded into the autopilot opener first
 *  (`chat.autopilotPrompt` in the messages, in the visitor's language), so
 *  the agent builds Brand DNA from the site, audits the channels and drafts
 *  the month, instead of the user starting from a blank chat. */
export function askHref(prompt: string, autopilotPrompt: (url: string) => string) {
  const p = prompt.trim();
  if (!p) return APP_LOGIN;
  const ask = looksLikeUrl(p) ? autopilotPrompt(siteUrl(p)) : p;
  return `${APP_LOGIN}?ask=${encodeURIComponent(ask)}`;
}

export const EXPLAINER_VIDEO =
  "https://olrhbwoobepaijsgyfwn.supabase.co/storage/v1/object/public/academy/explainer/video.mp4";
export const EXPLAINER_POSTER =
  "https://olrhbwoobepaijsgyfwn.supabase.co/storage/v1/object/public/academy/explainer/poster.jpg";

export function track(event: string) {
  (window as unknown as { plausible?: (n: string) => void }).plausible?.(event);
}
