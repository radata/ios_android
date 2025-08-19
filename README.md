# ios_android

Project to keep devcontainer updated and in sync

## Capacitor Configuration

The Capacitor configuration is defined in [`capacitor.config.ts`](./capacitor.config.ts):

```typescript
import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "nl.klusgebied.ios",
  appName: "Klusgebied",
  webDir: "dist",
};

export default config;
```

**Note:** Do not add Capacitor config to `package.json`.  
Keep it in `capacitor.config.ts` at

npx repomix@latest
