# Dev Container Maintenance Repo (ios_android)

This repository exists to:

- Maintain and evolve the Docker Dev Container environment (toolchain, Node, OS packages, CLI utilities).
- Test, stage and document dependency and tooling upgrades (Capacitor, Vite, Vitest, Ionic, Radix UI, etc.) before applying them to the real application codebase.
- Isolate and resolve breaking changes early, keeping the production app repo stable.

The actual application source code should NOT live here (other than minimal scaffolding needed to validate the toolchain).

---

## Contents

- Dev container definition (`.devcontainer/`).
- Package dependency set (minimal app shell) for upgrade rehearsal.
- Scripts to standardize version bumps (`set-version.js`, npm scripts).
- Documentation of operational and upgrade procedures (this file).

---

## Quick Start

1. Open in VS Code -> Reopen in Container (Dev Containers extension).
2. Install dependencies:
   ```bash
   rm -rf node_modules
   npm ci || (npm install && npm ci)
   ```
3. Run a development server (if needed to validate upgrades):
   ```bash
   npm run dev
   ```
4. Run unit tests:
   ```bash
   npm test
   ```

---

## Dev Container Lifecycle

| Action                      | Command / UI                                                                      |
| --------------------------- | --------------------------------------------------------------------------------- |
| Rebuild after config change | Command Palette: Dev Containers: Rebuild Container                                |
| Update base image packages  | `apt-get update && apt-get upgrade -y` (add to `postCreateCommand` if persistent) |
| Add a new global tool       | Modify `Dockerfile` or `postCreateCommand`; rebuild                               |
| Open docs link              | `"$BROWSER" https://example.com` (opens in host browser)                          |

---

## Dependency & Security Audit Workflow

Use this standardized sequence when evaluating upgrades:

```bash
# 1. (Optional) Clean
rm -rf node_modules package-lock.json

# 2. Generate lock without install (fast diff) OR install directly
npm install --package-lock-only
# or
npm install

# 3. Reproducible install
rm -rf node_modules
npm ci

# 4. Audits
npm audit                 # full (includes dev)
npm audit --omit=dev      # production surface only
npm audit --audit-level=high
```

If you delete `package-lock.json`, always recreate it before `npm audit` (avoids ENOLOCK). Commit the lockfile after approved changes.

---

## Managing Breaking Changes

1. Create a branch named `upgrade/<topic>-<date>`.
2. Apply version bumps (example: Capacitor plugins, Vite major, Vitest major).
3. If peer conflicts arise (e.g. Vite vs plugin-legacy):
   - Prefer upgrading the plugin to match the newer core version.
   - Only downgrade core if no compatible plugin exists yet.
4. Use `npm ls <package>` to trace why deprecated packages remain.
5. If a vulnerability has no fix (`tmp` via `@ionic/cli`):
   - Document advisory ID in this README (Changelog section).
   - Optionally reduce noise with `.npmrc`:
     ```ini
     audit-level=moderate
     ```
6. After validation, record notes in the Changelog and replicate the vetted changes in the real application repo.

---

## Capacitor Configuration

Keep Capacitor config in `capacitor.config.ts` (not `package.json`):

```typescript
import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "nl.klusgebied.ios",
  appName: "Klusgebied",
  webDir: "dist",
};

export default config;
```

When updating Capacitor:

```bash
npm install @capacitor/core@^7.4.2 @capacitor/android@^7.4.2 @capacitor/ios@^7.4.2
npx cap sync
```

---

## Version Bumping

Scripts:

```bash
npm run set-version
npm run bump-version   # increments per script logic
```

Ensure semantic consistency: use app repo to decide release cadence; this repo focuses on environment readiness.

---

## Typical Upgrade Examples

Upgrade Vitest (resolves older esbuild chain):

```bash
npm install -D vitest@^3.2.4
npm test
```

Align Capacitor plugins:

```bash
npm install @capacitor/app@latest @capacitor/haptics@latest \
  @capacitor/keyboard@latest @capacitor/status-bar@latest
```

Remove an unused legacy plugin (example):

1. Delete import/config usage from `vite.config.*`.
2. `npm uninstall @vitejs/plugin-legacy`.

---

## Handling Docker Storage (Host Optimization)

If Docker data in dev container host filled `/var`, bind-mount to large disk:

```bash
systemctl stop docker
rsync -aHAXx --numeric-ids /var/lib/docker/ /mnt/data/docker/
mv /var/lib/docker /var/lib/docker.old
mkdir /var/lib/docker
mount --bind /mnt/data/docker /var/lib/docker
echo "/mnt/data/docker  /var/lib/docker  none  bind  0  0" >> /etc/fstab
systemctl start docker
# After verification
rm -rf /var/lib/docker.old
```

---

## CI (Suggested Skeleton)

(Stored elsewhere; keep reference here.)

```bash
npm ci
npm run lint --if-present
npm test --if-present
npm audit --omit=dev --audit-level=high
```

---

## Changelog (Environment)

| Date       | Change                                         | Notes                     |
| ---------- | ---------------------------------------------- | ------------------------- |
| 2025-08-19 | Upgraded Capacitor to 7.4.2, Vitest to 3.2.4   | Resolved esbuild advisory |
| 2025-08-19 | Added audit workflow & storage mitigation docs | Initial consolidation     |

(Extend table as changes occur.)

---

## Policies

- Do not store secrets.
- Keep README current with every environment-impacting change.
- Minimize overrides; remove temporary `overrides` once upstream releases fix issues.

---

## Troubleshooting

| Symptom                      | Resolution                                                 |
| ---------------------------- | ---------------------------------------------------------- |
| `npm audit ENOLOCK`          | Create lock: `npm install --package-lock-only`             |
| Peer dependency conflict     | Align versions; prefer upgrading plugin                    |
| Optional dependency failures | Ignore if platform mismatch only                           |
| Full `/var`                  | Prune Docker or bind-mount larger disk (see section above) |

---

## Removal of Tooling

If a tool is deprecated (e.g. plugin-legacy not needed):

1. Remove dependency.
2. Purge config references.
3. Rebuild container.
4. Document in Changelog.

---

## Open External Docs

Use within container:

```bash
"$BROWSER" https://vitejs.dev/guide/
```

---

## License / Ownership

Internal maintenance repository. No production distribution
