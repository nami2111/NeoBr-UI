---
description: How to release @neobr/svelte using Changesets
---

Follow these steps to release a new version of the package. Only `packages/svelte`
(`@neobr/svelte`) ships — there is no separate tailwind-preset package anymore.
There is also no hosted CI (GitHub Actions were removed): run every step manually.

Prereqs: Node `>=20.19 || >=22`, pnpm, `npm login` (publishing account with
access to the `@neobr` scope).

### 1. Document your changes

Whenever you make a change that deserves a version bump, run:

```bash
vp run changeset
```

- Select `@neobr/svelte`.
- Choose whether it's a `major`, `minor`, or `patch` bump.
- Provide a brief description of the changes (changelog entry).

### 2. Version the packages

When you are ready to prepare a release, run:

```bash
vp run version-packages
```

This consumes the changeset files and updates `package.json` version +
`CHANGELOG.md`. Review the generated diff before committing.

### 3. Build and verify (manual, no CI)

```bash
vp run -r build            # dist/ is gitignored — must exist before anything resolves @neobr/svelte
vp run -r test             # 308+ tests
cd packages/svelte
vp check                   # format + lint + type-check (per-package — fails at repo root)
vp fmt --check .           # only CHANGELOG.md noise is acceptable
pnpm run exports:check && pnpm run pack:check && pnpm run tree-shake:check
cd ../..
pnpm audit --prod          # 0 vulnerabilities
```

Also verify the docs site builds (`cd apps/docs && pnpm build`).

### 4. Publish to npm

```bash
npm run release            # = vp run build && vp run test && changeset publish
```

`changeset publish` runs `pnpm publish` for the versioned packages. Confirm on
npm that `@neobr/svelte@<new-version>` is live.

Note: `version-packages` bumps the version, but `npm run release` publishes.
If you already ran the build/test/checks in step 3, `npm run release` will run
them again — that's fine, it's the safety gate.
