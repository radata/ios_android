===== FILE: cypress.config.ts =====
```typescript
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});```
===== END OF FILE: cypress.config.ts =====

===== FILE: View.xib =====
```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<document type="com.apple.InterfaceBuilder3.CocoaTouch.XIB" version="3.0" toolsVersion="13142" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" useTraitCollections="YES" useSafeAreas="YES" colorMatched="YES">
    <dependencies>
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="12042"/>
        <capability name="Safe area layout guides" minToolsVersion="9.0"/>
        <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>
    </dependencies>
    <objects>
        <placeholder placeholderIdentifier="IBFilesOwner" id="-1" userLabel="File's Owner"/>
        <placeholder placeholderIdentifier="IBFirstResponder" id="-2" customClass="UIResponder"/>
        <view contentMode="scaleToFill" id="iN0-l3-epB">
            <rect key="frame" x="0.0" y="0.0" width="375" height="667"/>
            <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
            <color key="backgroundColor" systemColor="systemBackgroundColor" cocoaTouchSystemColor="whiteColor"/>
            <viewLayoutGuide key="safeArea" id="vUN-kp-3ea"/>
        </view>
    </objects>
</document>
```
===== END OF FILE: View.xib =====

===== FILE: README.md =====
```markdown
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
```
===== END OF FILE: README.md =====

===== FILE: .devcontainer/Dockerfile =====
```
FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu

# Install Node.js (LTS) and common CLIs
ARG NODE_VERSION=22
RUN apt-get update \
    && apt-get install -y curl git build-essential ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest \
    && npm install -g @capacitor/cli @ionic/cli

# Create vscode user (image base already includes vscode user)
USER vscode
WORKDIR /workspace

# Ensure npm global bin is on PATH
ENV PATH="/home/vscode/.npm-global/bin:${PATH}"
```
===== END OF FILE: .devcontainer/Dockerfile =====

===== FILE: .devcontainer/devcontainer.json =====
```json
{
    "name": "Klusgebied Dev Container",
    "build": {
        "dockerfile": "Dockerfile"
    },
    "workspaceFolder": "/workspace",
    "workspaceMount": "source=${localWorkspaceFolder},target=/workspace,type=bind,consistency=cached",
    "customizations": {
        "vscode": {
            "settings": {
                "terminal.integrated.shell.linux": "/bin/bash",
                "typescript.tsdk": "./node_modules/typescript/lib"
            },
            "extensions": [
                "esbenp.prettier-vscode",
                "dbaeumer.vscode-eslint",
                "ms-vscode.vscode-typescript-next"
            ]
        }
    },
    "postCreateCommand": "npm install",
    "forwardPorts": [
        5173,
        8100,
        9229
    ],
    "remoteUser": "vscode"
}```
===== END OF FILE: .devcontainer/devcontainer.json =====

===== FILE: package.json =====
```json
{
  "name": "klusgebied",
  "private": true,
  "version": "1.0+8",
  "type": "module",
  "scripts": {
    "dev": "vite --host",
    "build": "vite build",
    "preview": "vite preview",
    "test.e2e": "cypress run",
    "test.unit": "vitest",
    "lint": "eslint",
    "android:dev": "ionic capacitor run android -l --external",
    "android:ide": "ionic capacitor open android",
    "ios": "ionic capacitor run ios",
    "ios:dev": "ionic capacitor run ios -l --external",
    "ios:ide": "ionic capacitor open ios",
    "set-version": "node set-version.js",
    "bump-version": "node set-version.js --bump"
  },
  "dependencies": {
    "@capacitor/android": "7.2.0",
    "@capacitor/app": "7.0.1",
    "@capacitor/clipboard": "^7.0.1",
    "@capacitor/core": "7.2.0",
    "@capacitor/haptics": "7.0.1",
    "@capacitor/ios": "^7.2.0",
    "@capacitor/keyboard": "7.0.1",
    "@capacitor/status-bar": "7.0.1",
    "@hookform/resolvers": "^5.0.1",
    "@ionic/react": "^8.5.0",
    "@ionic/react-router": "^8.5.0",
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-alert-dialog": "^1.1.1",
    "@radix-ui/react-aspect-ratio": "^1.1.0",
    "@radix-ui/react-avatar": "^1.1.0",
    "@radix-ui/react-checkbox": "^1.1.1",
    "@radix-ui/react-collapsible": "^1.1.0",
    "@radix-ui/react-context-menu": "^2.2.1",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.1",
    "@radix-ui/react-hover-card": "^1.1.1",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-menubar": "^1.1.1",
    "@radix-ui/react-navigation-menu": "^1.2.0",
    "@radix-ui/react-popover": "^1.1.1",
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-radio-group": "^1.2.0",
    "@radix-ui/react-scroll-area": "^1.1.0",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slider": "^1.2.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-switch": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-toast": "^1.2.1",
    "@radix-ui/react-toggle": "^1.1.0",
    "@radix-ui/react-toggle-group": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.4",
    "@supabase/auth-ui-react": "^0.4.7",
    "@supabase/auth-ui-shared": "^0.1.8",
    "@supabase/supabase-js": "^2.55.0",
    "@tanstack/react-query": "^5.76.0",
    "@types/react-router": "^5.1.20",
    "@types/react-router-dom": "^5.3.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.6.0",
    "ionicons": "^7.4.0",
    "jotai": "^2.12.4",
    "lodash": "^4.17.21",
    "lucide-react": "^0.508.0",
    "moment": "^2.30.1",
    "posthog-js": "^1.256.0",
    "react": "19.0.0",
    "react-compare-slider": "^3.1.0",
    "react-dom": "19.0.0",
    "react-hook-form": "^7.56.3",
    "react-modal-sheet": "^4.4.0",
    "react-otp-input": "^3.1.1",
    "react-resizable-panels": "^3.0.1",
    "react-router": "^5.3.4",
    "react-router-dom": "^5.3.4",
    "tailwind-merge": "^3.2.0",
    "virtua": "^0.41.2",
    "zod": "^4.0.17"
  },
  "devDependencies": {
    "@capacitor/cli": "7.2.0",
    "@ionic/cli": "^7.2.1",
    "@tailwindcss/vite": "^4.1.5",
    "@testing-library/dom": ">=7.21.4",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^16.2.0",
    "@testing-library/user-event": "^14.4.3",
    "@types/lodash": "^4.17.16",
    "@types/react": "19.0.10",
    "@types/react-dom": "19.0.4",
    "@vitejs/plugin-legacy": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.1",
    "cypress": "^13.5.0",
    "eslint": "^9.20.1",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^15.15.0",
    "jsdom": "^22.1.0",
    "tailwindcss": "^4.1.5",
    "terser": "^5.4.0",
    "typescript": "^5.1.6",
    "typescript-eslint": "^8.24.0",
    "vite": "~5.2.0",
    "vitest": "^0.34.6"
  },
  "description": "An Ionic project"
}
```
===== END OF FILE: package.json =====

===== FILE: ionic.config.json =====
```json
{
  "name": "Klusgebied",
  "integrations": {
    "capacitor": {}
  },
  "type": "react-vite"
}
```
===== END OF FILE: ionic.config.json =====

===== FILE: set-version.js =====
```javascript
import * as fs from "fs";
import readline from "readline";
import * as process from "process";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readPackageJson = () => {
  const data = fs.readFileSync("package.json", "utf8");
  return JSON.parse(data);
};

const readAndroidGradle = () => {
  const data = fs.readFileSync("android/app/build.gradle", "utf8");
  return data;
};

const readIOSFile = () => {
  const data = fs.readFileSync("ios/App/App.xcodeproj/project.pbxproj", "utf8");
  return data;
};

const promptUser = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const getAndroidVersionInfo = (gradleData) => {
  //get android version name
  const versionNameLine = gradleData
    .split("\n")
    .find((line) => line.includes("versionName"));
  if (!versionNameLine) {
    throw new Error("Could not find versionName for Android.");
  }
  const androidVersionName = versionNameLine.split('"')[1];

  //get android version code
  const versionCodeLine = gradleData
    .split("\n")
    .find((line) => line.includes("versionCode"));
  if (!versionCodeLine) {
    throw new Error("Could not find versionCode for Android.");
  }
  const androidVersionCode = versionCodeLine.match(/\d+/)[0];
  return { androidVersionName, androidVersionCode };
};

const getIOSVersionInfo = (iosData) => {
  //get ios version name
  const versionNameLine = iosData
    .split("\n")
    .find((line) => line.includes("MARKETING_VERSION"));
  if (!versionNameLine) {
    throw new Error("Could not find versionName for iOS.");
  }
  let iosVersionName = versionNameLine.split("=")[1].trim().replace(";", "");

  //get ios version code
  const versionCodeLine = iosData
    .split("\n")
    .find((line) => line.includes("CURRENT_PROJECT_VERSION"));
  if (!versionCodeLine) {
    throw new Error("Could not find versionCode for iOS.");
  }
  const iosVersionCode = versionCodeLine.match(/\d+/)[0];
  return { iosVersionName, iosVersionCode };
};

const updatePackageVersion = (data) => {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync("package.json", jsonData, "utf8");
};

const updateAndroidVersion = (data) => {
  fs.writeFileSync("android/app/build.gradle", data, "utf8");
};

const updateIosVersion = (data) => {
  fs.writeFileSync("ios/App/App.xcodeproj/project.pbxproj", data, "utf8");
};

const run = async () => {
  const packageData = readPackageJson();
  const androidData = readAndroidGradle();
  const iosData = readIOSFile();

  //get original version info
  const { androidVersionName, androidVersionCode } =
    getAndroidVersionInfo(androidData);
  const { iosVersionName, iosVersionCode } = getIOSVersionInfo(iosData);

  const suggestedVersionCode =
    androidVersionCode > iosVersionCode ? androidVersionCode : iosVersionCode;

  const parsedVersionCode = parseInt(suggestedVersionCode);
  if (Number.isNaN(parsedVersionCode) || !Number.isInteger(parsedVersionCode)) {
    throw new Error(
      `Invalid current version code ${suggestedVersionCode}. It should be a number.`
    );
  }

  // if passed flag '--bump' just increment the suggested version code and use it
  if (process.argv[2] === "--read-build-version") {
    console.log(parsedVersionCode);
    process.exit(0);
  }

  console.log("package.json:", packageData.version);

  console.log("android:", androidVersionName + "+" + androidVersionCode);

  console.log("iOS:", iosVersionName + "+" + iosVersionCode);

  let newVersionName;
  let newVersionCode;
  // if passed flag '--bump' just increment the suggested version code and use it
  if (process.argv[2] === "--bump") {
    const bumpedVersionCode = parseInt(suggestedVersionCode) + 1;
    console.log(
      `Bumping version code from ${suggestedVersionCode} to ${bumpedVersionCode}`
    );
    newVersionName = iosVersionName;
    newVersionCode = bumpedVersionCode;
  } else {
    //input new version name
    newVersionName = await promptUser(
      `Enter new version name (${iosVersionName}): `
    );
    //input new version code
    newVersionCode = await promptUser(
      `Enter new version code(${parseInt(suggestedVersionCode)}): `
    );
  }

  // validate version name
  if (newVersionName == "") {
    newVersionName = iosVersionName;
  } else {
    if (
      !(
        /^\d+\.\d+\.\d+$/.test(newVersionName) ||
        /^\d+\.\d+$/.test(newVersionName)
      )
    ) {
      console.error(
        "Invalid version name format. Expected format is x.y.z or x.y"
      );
      process.exit(1);
    }
  }

  // validate version code
  if (newVersionCode == "") {
    newVersionCode = parseInt(suggestedVersionCode);
  }

  if (isNaN(newVersionCode)) {
    console.error("Invalid version code. It should be a number.");
    process.exit(1);
  }

  if (newVersionCode < parseInt(suggestedVersionCode)) {
    console.error(
      `Invalid version code. It should be bigger than ${parseInt(
        suggestedVersionCode
      )}`
    );
    process.exit(1);
  }

  //package update
  let originPackageVersion = packageData.version;
  let packageVersionParts = originPackageVersion.split("+");
  packageVersionParts[0] = newVersionName;
  packageVersionParts[1] = newVersionCode;
  packageData.version = `${newVersionName}+${newVersionCode}`;

  updatePackageVersion(packageData);

  //android verion update
  let updatedAndroidData = androidData.replace(
    /(versionCode\s)(\d+)/,
    `$1${newVersionCode}`
  );
  updatedAndroidData = updatedAndroidData.replace(
    /(versionName\s")([^"]*)(")/,
    `$1${newVersionName}"`
  );
  updateAndroidVersion(updatedAndroidData);

  //ios versin update
  let updatedIOSData = iosData.replace(
    /(CURRENT_PROJECT_VERSION = )(\d+)(;)/g,
    `$1${newVersionCode}$3`
  );

  updatedIOSData = updatedIOSData.replace(
    /(MARKETING_VERSION = )([^;]*)(;)/g,
    `$1${newVersionName}$3`
  );
  updateIosVersion(updatedIOSData);

  //successful
  console.log(
    `***** Version is successfully updated to [${newVersionName}+${newVersionCode}]`
  );
  process.exit(0);
};

run();
```
===== END OF FILE: set-version.js =====

===== FILE: vite.config.ts =====
```typescript
/// <reference types="vitest" />

import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), legacy()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
```
===== END OF FILE: vite.config.ts =====

===== FILE: capacitor.config.ts =====
```typescript
import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "nl.klusgebied.ios",
  appName: "Klusgebied",
  webDir: "dist",
};

export default config;
```
===== END OF FILE: capacitor.config.ts =====

===== FILE: .browserslistrc =====
```
Chrome >=79
ChromeAndroid >=79
Firefox >=70
Edge >=79
Safari >=14
iOS >=14```
===== END OF FILE: .browserslistrc =====

===== FILE: eslint.config.js =====
```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'cypress.config.ts'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
  },
)
```
===== END OF FILE: eslint.config.js =====

===== FILE: tsconfig.node.json =====
```json
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```
===== END OF FILE: tsconfig.node.json =====

===== FILE: tsconfig.json =====
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```
===== END OF FILE: tsconfig.json =====

