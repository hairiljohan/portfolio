import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.html"),
          launchConsole: path.resolve(__dirname, "launch-console.html"),
          networkChecker: path.resolve(__dirname, "network-checker.html"),
          containerUpdateHelper: path.resolve(
            __dirname,
            "container-update-helper.html"
          ),
          uninstallCleanup: path.resolve(__dirname, "uninstall-cleanup.html"),
          privateLocalAI: path.resolve(__dirname, "private-local-ai.html"),
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
