---
name: FoodSmash Testing Conventions
description: Established test file structure, naming, import style, and assertion patterns in test/nuxt/
type: project
---

Tests live in `test/nuxt/` and run in the Nuxt environment via `@nuxt/test-utils`.

**Import style** (match exactly):
```ts
import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import ComponentOrPage from '../../app/pages/<name>.vue';
```

**Structure**: `describe('<ComponentName>', ...)` wrapping individual `it('should ...')` blocks. No `beforeEach`, no shared wrapper — each test calls `await mountSuspended(...)` independently.

**Assertions**: Use `.find('selector').text()` for text checks, `.findAll('selector')` for lists/counts, `.map(el => el.text())` for array comparisons. Prefer semantic class selectors (`.profile-name`, `.stat-label`) or element+class combos (`h1.profile-name`).

**Auto-imported components** (e.g. `ComboCard`) render fully in the nuxt environment — no stub needed. Assert via the child component's own CSS classes (`.combo-card`, `.combo-title`).

**No `vi` import needed** unless testing `console.log` (see create.test.ts with `vi.spyOn`).

**Why:** The nuxt environment via `mountSuspended` handles Nuxt auto-imports and async setup transparently, so tests stay clean with no manual plugin/stub setup.

**How to apply:** Every new page or component test should follow this exact pattern. Do not introduce beforeEach shared wrappers or snapshot tests unless explicitly requested.
