# Kunal Ninawe Portfolio

Next.js portfolio built for hiring managers and technical reviewers. The site frames Kunal as a mid-senior full-stack engineer with strong AI-native and scalable systems fluency, then backs that up with an interactive showcase of real GitHub projects.

## Stack

- Next.js 16 App Router
- React 19
- Material UI 7
- Static export for GitHub Pages
- Vercel-compatible deployment

## What is included

- A custom Material-based portfolio with a hiring-manager friendly narrative
- Interactive project explorer connected to live GitHub repository metadata
- Curated case-study content for:
  - Agent Queues
  - SmartTrip
  - Invoice PDF Field Highlighter
  - ImageGenderDetector
- Data-driven skill and delivery sections that are easy to extend
- GitHub Pages workflow for automatic deployment

## Local development

Use Node 22:

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

## Deploy to Vercel

Vercel is the simplest option for this project:

1. Import the repository into Vercel.
2. Keep the default Next.js framework detection.
3. Deploy.

No extra environment variables are required for the current setup.

## Deploy to GitHub Pages

This repo includes [`.github/workflows/deploy-pages.yml`](/Users/kninawe/Desktop/Github/portfolio/.github/workflows/deploy-pages.yml) for Pages deployment.

1. Push the repository to GitHub.
2. In repository settings, open **Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main`.

The workflow sets the correct base path automatically for the repository name.

## Content editing

Most portfolio content lives in [src/data/portfolio.ts](/Users/kninawe/Desktop/Github/portfolio/src/data/portfolio.ts).

Update that file to:

- add more projects
- change skill positioning
- add new tags and filters
- swap GitHub or live demo links
- refine the hiring-manager copy

Visual assets for the project cards live in [public/projects](/Users/kninawe/Desktop/Github/portfolio/public/projects).
