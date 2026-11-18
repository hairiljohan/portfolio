import path from "path";
import { defineConfig, type PreviewServer, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";

import { redirects } from "./vercel.json";

function servePageRedirects(server: ViteDevServer | PreviewServer) {
  const pages = redirects.filter(rule => rule.source.endsWith(".html"));
  server.middlewares.use((req, res, next) => {
    const url = new URL(req.url ?? "/", "http://localhost");
    const rule = pages.find(page => page.source === url.pathname);
    if (!rule) return next();
    res.writeHead(rule.permanent ? 308 : 307, { Location: rule.destination + url.search });
    res.end();
  });
}

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [
      react(),
      { name: "page-redirects", configureServer: servePageRedirects, configurePreviewServer: servePageRedirects },
    ],
    build: {
      target: "es2020",
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.html"),
          launchConsole: path.resolve(__dirname, "launch-console.html"),
          dockSense: path.resolve(__dirname, "docksense.html"),
          repoWatch: path.resolve(__dirname, "repowatch.html"),
          logit: path.resolve(__dirname, "logit.html"),
          tabula: path.resolve(__dirname, "tabula.html"),
          theaterView: path.resolve(__dirname, "theaterview.html"),
          netSwitch: path.resolve(__dirname, "netswitch.html"),
        },
        output: {
          manualChunks: {
            "vendor-react": ["react", "react-dom"],
          },
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
