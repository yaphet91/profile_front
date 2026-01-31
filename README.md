# Yafiet Frontend

This folder contains the React single-page application that powers Yafiet’s public profile. It consumes content from the Sanity studio in `../yafiet_back` and exposes a secure serverless contact form.

## Prerequisites

- Node.js 18+
- npm 10+
- Access to the shared Sanity project (`nbusimoo` / `production`)

## Getting started

```bash
npm install --cache .npm-cache
npm start
```

The development server runs on `http://localhost:3000`. Navigation is hash-aware, so links such as `/projects/:slug` continue to work even when you deep-link to a section.

## Environment variables

A `.env` file is already checked in with safe defaults:

```
REACT_APP_SANITY_PROJECT_ID=nbusimoo
REACT_APP_SANITY_DATASET=production
REACT_APP_SANITY_API_VERSION=2023-10-01
REACT_APP_SANITY_USE_CDN=true
SASS_SILENCE_DEPRECATIONS=legacy-js-api
```

Update these values locally or in Vercel if you point the app at another dataset. The frontend never needs a Sanity write token anymore—writes go through a serverless function.

## Contact form

- The UI posts to `/api/contact`, implemented in [`api/contact.js`](api/contact.js).
- For local submissions you can run `vercel dev` inside this folder so the function is available while `npm start` is running.
- In production (Vercel) configure the following secrets: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_VERSION` (optional), and **`SANITY_API_TOKEN`** (write access to the `contact` schema only).

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Runs the CRA dev server. |
| `npm test` | Launches Jest in watch mode. |
| `npm run build` | Produces the production bundle in `build/`. |
| `npm run eject` | Keeps CRA’s default behavior—avoid unless you need full control. |

## Production notes

- React 18 replaces the experimental React 19 bits so the app stays on the supported Create React App stack.
- Each data section (`About`, `Work`, `Honors`, `Skills`) now shows loading/error states so editors immediately see if content is missing.
- A `:root` block in `src/index.css` defines the shared color + typography system to keep styling consistent between sections.
