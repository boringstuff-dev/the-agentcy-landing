import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/** Locale-aware Link and router: hrefs are written without a locale
 *  ("/privacy") and get the current one's prefix added. */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
