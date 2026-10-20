import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/browser",
  outputDir: "/tmp/portfolio-test-results",
  fullyParallel: true,
  use: { baseURL: "http://127.0.0.1:3000", reducedMotion: "reduce" },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    { name: "webkit", use: { browserName: "webkit" } },
  ],
  webServer: {
    command: "npm run dev -- --host 127.0.0.1",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
  },
});
