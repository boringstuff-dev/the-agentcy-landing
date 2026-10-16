export const APP_LOGIN = "https://app.the-agentcy.ai/auth/login";

/** Where the landing chat bar sends a visitor: the app's auth page, with the
 *  typed brief carried over as `?ask=` so the studio can prefill Ask after
 *  sign-up. */
export function askHref(prompt: string) {
  const p = prompt.trim();
  return p ? `${APP_LOGIN}?ask=${encodeURIComponent(p)}` : APP_LOGIN;
}

export const EXPLAINER_VIDEO =
  "https://olrhbwoobepaijsgyfwn.supabase.co/storage/v1/object/public/academy/explainer/video.mp4";
export const EXPLAINER_POSTER =
  "https://olrhbwoobepaijsgyfwn.supabase.co/storage/v1/object/public/academy/explainer/poster.jpg";

export function track(event: string) {
  (window as unknown as { plausible?: (n: string) => void }).plausible?.(event);
}
