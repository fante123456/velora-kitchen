# Velora Kitchen

Website for Velora Kitchen, a modern casual dining restaurant in Manchester.
Velora Kitchen is a fictional brand created for **MX AI Academy Challenge 2**. The reviews, team names and booking form are demo content, and the form does not send anything.

**Live site:** https://velora-kitchen.ammar-rajabi.com

## Tech

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- `next/font` (Fraunces + DM Sans), `next/image`, lucide-react icons
- Photos from Unsplash (credited on the Gallery page)

## Pages

- **Home**: hero, introduction, featured dishes, why visit, demo reviews, booking call to action
- **About**: story, chef and team, values, atmosphere
- **Menu**: starters, mains, desserts and drinks with GBP prices and V / VG / GF tags
- **Gallery**: food, interior, tables, chef and drinks, plus photo credits
- **Contact**: address, phone, email, opening hours, map link and a validated booking request form

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

To build a static copy for Apache hosting such as o2switch, run `node scripts/build-o2switch.mjs /`. The files go into `out/`.
