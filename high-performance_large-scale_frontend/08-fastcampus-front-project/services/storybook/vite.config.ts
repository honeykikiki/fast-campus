/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import type { InlineConfig } from "vitest";
// import type { UserConfig } from "vite";

// interface VitestConfigExport extends UserConfig {
//   test: InlineConfig;
// }

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    include: ["./stories/**/*.test.ts?(x)"],
  },
}); // as VitestConfigExport
