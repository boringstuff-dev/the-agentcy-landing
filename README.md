This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Hero background video

The landing page supports an autoplay hero background video.

Put these files in `public/`:
- `hero-bg.mp4` (recommended: 6–12s loop, H.264, 1080p, ~3–8MB)
- `hero-bg.jpg` (poster frame / fallback)

The hero keeps rendering even if the video is missing (you'll just see the existing gradient background).

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Languages

The site is in English and Italian, built with [next-intl](https://next-intl.dev):

- English keeps the bare URLs (`/`, `/features/smart-tag`); Italian lives under `/it` (`/it/features/smart-tag`).
- On a first visit, `src/proxy.ts` picks the language from the browser (`Accept-Language`) and sends Italian browsers to `/it`. The EN/IT switcher (nav, footer, catalog pages) stores the choice in the `NEXT_LOCALE` cookie, which wins from then on.
- Every page sets a canonical URL and `hreflang` alternates (`src/i18n/metadata.ts`).

Where the words live:

- `messages/<locale>.json` holds every string on the site, including the solutions, features and events catalogs (`content.<kind>.groups`, `.items` for the mega menus, `.pages` for the `/<kind>/[slug]` pages). `src/lib/{solutions,features,events}.tsx` keep only icons, routes and accent colours.
- The privacy and data-deletion texts are components in `src/content/legal/` (`PrivacyEn.tsx`, `PrivacyIt.tsx`, …), because they are long rich text. English is the reference version.
- The `/docs` API reference body (Scalar and the MCP reference) stays in English; only its chrome is translated.

### Adding a language

1. Add its code to `locales` in `src/i18n/routing.ts`, plus its name in `LOCALE_NAMES` and Open Graph code in `OG_LOCALES`.
2. Copy `messages/en.json` to `messages/<code>.json` and translate the values (keep the keys). Any key you leave out falls back to English, so a partial file still works.
3. Optionally add `src/content/legal/PrivacyXx.tsx` and `DataDeletionXx.tsx` and register them in the `BODY` map of the two legal pages; without them those pages show the English text.

The compact switcher in the top nav assumes two languages; with a third, swap it for the full pill (`<LanguageSwitcher />` without `compact`).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
