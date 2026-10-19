import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
};

// Wires src/i18n/request.ts (locale + messages per request) into the app.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
