# Kunal Ninawe Portfolio

Next.js portfolio built for recruiters and hiring managers.
The site presents Kunal as a product engineer who owns a surface end to end, and backs that with verified wins from OpenCFO, an interactive skill map, the experience timeline, public side projects, and published writing.

Live: https://ninawekunal.github.io/portfolio/

## Stack

- Next.js 16 App Router, static export
- React 19
- Material UI 7
- GitHub Pages via GitHub Actions

## Sections

| Section | Source of truth | Notes |
| --- | --- | --- |
| Wins | `src/data/wins.ts` | One card per win. Title, one metric, who felt it, then problem / fix / result / tradeoff on tap. Filterable by theme. |
| Skillset | `src/data/offer.ts` | Six lanes. Every proof line points at a real change, not a generic claim. |
| Experience | `src/data/portfolio.ts` (`experienceTimeline`) | Timeline boundaries are also listed in `ExperienceSection.tsx` (`REQUESTED_MILESTONES`, `EXPERIENCE_SEGMENT_TOKENS`). Update both when a role changes. |
| Projects | `src/data/portfolio.ts` (`projects`) | Public repos only. |
| Writing | `src/data/writing.ts` | Published posts with a three-line takeaway box. |
| Education | `src/data/portfolio.ts` | Degrees and certifications. |

Numbers in the wins and experience sections come from the job-search kit (`WINS.md`, `BULLET-BANK.md`).
Keep them in sync when a number changes there.

## Local development

Use Node 22 or newer:

```bash
nvm use
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

To check performance locally after a build:

```bash
npx serve out -l 4173
npx lighthouse http://localhost:4173/ --preset=desktop --view
```

## Deploy to GitHub Pages

`.github/workflows/deploy-pages.yml` builds on every push to `main` and deploys the `out` folder.
The workflow sets the base path from the repository name, and `src/lib/assetPath.ts` prefixes static asset URLs with it.

## Performance notes

- Fonts are limited to four files (IBM Plex Sans 400/600/700, Space Grotesk 700).
- Experience, Projects, and Education load as separate chunks so the first screen hydrates first.
- The top bar tracks the active section with an IntersectionObserver instead of reading layout on every scroll event.
- The profile photo ships as a small avatar for the header and a compressed full image for the modal.
