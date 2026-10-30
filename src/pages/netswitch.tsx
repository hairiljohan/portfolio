import React from "react";
import ReactDOM from "react-dom/client";
import NetSwitchPage from "@/components/NetSwitchPage";
import { applyMeta } from "@/utils/meta";
import { META } from "@/data/meta";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

applyMeta(META.netSwitch);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <NetSwitchPage />
    <SpeedInsights />
    <Analytics />
  </React.StrictMode>,
);
