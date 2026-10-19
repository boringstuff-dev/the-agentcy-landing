import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/** Locale routing: picks the visitor's language on first visit (cookie,
 *  then Accept-Language), redirects to /it when that is Italian, and
 *  rewrites the unprefixed English URLs onto the [locale] segment. */
export default createMiddleware(routing);

export const config = {
  // Everything except API routes, Next/Vercel internals and files with an
  // extension (images, videos, icons, robots.txt…).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
