import { StrictMode, type ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { META } from "./data/meta";
import { applyMeta } from "./utils/meta";

// Page components stay in their own entry files so Vite can split their code.
export function mountPage(page: ReactNode, metaKey: keyof typeof META) {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }

  applyMeta(META[metaKey]);

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      {page}
      <SpeedInsights />
      <Analytics />
    </StrictMode>,
  );
}
