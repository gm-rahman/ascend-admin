# Ascend Admin

Production-ready frontend starter for a project admin dashboard using Next.js 16, React 19, TypeScript, Tailwind CSS 4, and Zustand.

## Included

- App Router based Next.js setup
- TypeScript and ESLint configuration
- Tailwind CSS 4 with a custom dashboard theme
- Zustand state store for UI state
- Typed mock dashboard data
- Feature-based folder structure for scalable frontend work
- `.env` and `.env.example` for local and shared environment setup

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run check
```

## Suggested structure

```text
src/
  app/
  components/
    layout/
  config/
  features/
    dashboard/
      components/
      data/
      types.ts
  lib/
  store/
```

## Environment variables

Copy values from `.env.example` and adjust as needed:

- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_API_BASE_URL`
