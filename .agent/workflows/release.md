---
description: How to release NeoBr-UI packages using Changesets
---

Follow these steps to release a new version of the packages in this monorepo.

### 1. Document your changes

Whenever you make a change that deserves a version bump, run:

```bash
pnpm changeset
```

- Select the packages that were changed.
- Choose whether it's a `major`, `minor`, or `patch` bump.
- Provide a brief description of the changes.

### 2. Version the packages

When you are ready to prepare a release (e.g., at the end of a sprint or feature block), run:

```bash
pnpm version-packages
```

This will:

- Consume the changeset files.
- Update `package.json` versions.
- Generate or update `CHANGELOG.md` files for each package.

### 3. Sync Design System (IMPORTANT)

Ensure the design system is synced before building for release:

```bash
cp packages/svelte/src/lib/styles/design-system.css packages/tailwind-preset/design-system.css
```

### 4. Publish to npm

To build, test, and publish all packages:

```bash
pnpm release
```

Ensure you are logged in to npm (`npm login`) before running this.
