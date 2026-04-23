# Doctor listing

Next.js 14 + React + Tailwind. Doctors load from `public/doctors.json`.

## Deploying on Vercel

Vercel builds from the **folder that contains** `package.json` and `app/` next to each other.

- If this repo’s root **is** this project (you see `app/`, `package.json`, `public/` at the top of the repo on GitHub), import the repo and deploy — you should **not** see the default Next.js welcome page if `app/page.tsx` is pushed.
- If your GitHub repo has an **extra parent folder** (e.g. `Assinment/doctor-listing-app/...` at the top), set **Vercel → your project → Settings → General → Root Directory** to `doctor-listing-app`, then trigger a **Redeploy**. Otherwise Vercel may build an empty or wrong folder and you get the starter page.
- Confirm the **branch** you deploy (usually `main`) includes your latest commit with the doctor UI.

### If you see `404: NOT_FOUND` (Vercel’s grey error box)

That response is from **Vercel’s edge**, not your Next.js `not-found` page. It usually means **no working deployment is attached** to that URL.

1. **Vercel → your project → Deployments** — open the **latest** deployment. It must be **Ready** (green). If it’s **Error**, open **Build Logs** and fix what failed (wrong root directory is the most common fix).
2. **Settings → General → Root Directory** — must be empty **or** set to the folder that directly contains `package.json` + `app/` (see above). Save, then **Redeploy**.
3. **Settings → General → Build & Development Settings** — for a normal Next app, **do not** set a custom **Output Directory** unless you know you need it; leave it default so Vercel can use the Next.js output.
4. Open the site using **Visit** on a **successful** deployment from the Deployments list (that URL always matches a real build). If that works but `*.vercel.app` does not, promote that deployment to **Production** or redeploy to production.

## Getting Started

```bash
npm install
npm run dev
```

## Features

- Browse doctors with name, specialization, experience, rating, and fee
- Search by name (short debounce)
- Filter by specialization (pills)
- Load more
- Loading skeleton while JSON loads
- Inline error + retry if the file fails
- Empty state when filters match nothing
- Fully responsive (mobile + desktop)

## Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- TypeScript

## Project layout

`app/` and `components/` for UI, `types/` for the `Doctor` shape, `hooks/` and `lib/` for fetching and filtering logic.
