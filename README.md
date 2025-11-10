## AIM Hot Mess Application

Hot Mess Tracker — a playful Next.js app that lets you quantify daily chaos with sliders, a dynamic emoji, sarcastic messages, and a local history of your “hot mess score.”

### Features
- **Interactive sliders**: Track items like lateness, lost charger, risky text, and procrastination.
- **Live “Hot Mess” score**: Aggregated score updates in real time with a responsive emoji.
- **Sarcastic feedback**: Score-based messages keep things honest (and fun).
- **History persistence**: Saves the last 10 scores in `localStorage`.
- **Modern UI**: Radix-based UI primitives, Tailwind CSS v4 styles, and Lucide icons.

### Tech Stack
- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, PostCSS
- **UI**: Radix UI, shadcn-style components (`components/ui`), Lucide icons
- **State/Forms**: React Hooks, React Hook Form (available), Zod (available)

---

### Getting Started

Prerequisites:
- Node.js 18.18+ or 20+
- npm (or your preferred package manager)

Install and run locally:

```bash
cd frontend-hot-mess-application
npm install
npm run dev
```

Visit `http://localhost:3000`.

Build and run production:

```bash
cd frontend-hot-mess-application
npm run build
npm start
```

Lint:

```bash
cd frontend-hot-mess-application
npm run lint
```

---

### Project Structure

Top-level:
- `frontend-hot-mess-application/` — Next.js frontend
- `LICENSE` — Project license

Frontend highlights (`frontend-hot-mess-application/`):
- `app/` — App Router pages, layout, global styles
  - `page.tsx` — Renders the `HotMessTracker` on the home page
  - `globals.css` — Tailwind v4 and theme variables
- `components/`
  - `hot-mess-tracker.tsx` — Core feature: sliders, score, emoji, history
  - `ui/` — Reusable UI primitives (Button, Card, Slider, etc.)
- `lib/` — Utilities (`utils.ts`)
- `public/` — Static assets
- `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`
- `package.json` — Scripts and dependencies

---

### How It Works (Brief)
- The tracker manages an array of slider definitions and values in component state.
- The overall score is the average of slider values.
- A dynamic emoji and a sarcastic message are chosen based on the score range.
- “Save Score” stores the rounded score with date in `localStorage` (up to 10 entries).

Key file:
- `frontend-hot-mess-application/components/hot-mess-tracker.tsx`

---

### Customization Tips
- Add/remove sliders by editing the `sliders` array in `hot-mess-tracker.tsx`.
- Tweak color tokens and radii in `app/globals.css` (CSS variables and `@theme inline`).
- Extend UI in `components/ui/` (Radix-based primitives styled with Tailwind).

---

### Deployment
- Works seamlessly on Vercel. After building (`npm run build`), the app can run with `npm start`.
- Ensure your Node runtime on the host is Node 18.18+ or 20+.

---

### License
This project is licensed under the terms of the license in `LICENSE`.


