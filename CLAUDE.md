# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

FoodSmash is a Nuxt 4 app for sharing and discovering food combinations. It was built as a demo project for teaching the Gemini CLI.

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build
npm run preview    # Preview production build
npm test           # Run all tests
npx vitest run test/nuxt/create.test.ts  # Run a single test file
```

## Architecture

**Framework:** Nuxt 4 with Vue 3 Composition API and TypeScript. The `app/` directory is the Nuxt source root (Nuxt 4 convention).

**Routing:** File-based via `app/pages/`. Two routes exist: `/` (index) and `/create`.

**Layout:** `app/layouts/default.vue` wraps all pages with a sticky nav and footer. Global CSS variables (Spotify-inspired dark theme) are defined in `app/assets/css/main.css` and imported via `nuxt.config.ts`.

**Components:** `app/components/` — auto-imported by Nuxt. `ComboCard` renders a food combo with title, description, and tags. `FeatureCard` renders an icon + text feature block using a `lucide-vue-next` icon component passed as a prop.

**State:** All state is local (`ref`) within pages — there is no global store. The Create page logs submitted combo data to the console instead of persisting it.

**Testing:** Vitest with `@nuxt/test-utils`. Tests in `test/nuxt/` run in the `nuxt` environment using `mountSuspended`. There are no unit or e2e tests currently — only nuxt-environment component tests.

**Gemini CLI:** `.gemini/commands/` contains custom slash commands (`commit-message.toml`, `component.toml`) for use with the Gemini CLI. `GEMINI.md` is the Gemini equivalent of this file.