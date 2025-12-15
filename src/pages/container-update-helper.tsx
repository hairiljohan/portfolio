import React from "react";
import ReactDOM from "react-dom/client";
import ContainerUpdateHelperPage from "@/components/ContainerUpdateHelperPage";
import { applyMeta } from "@/utils/meta";
import { META } from "@/data/meta";
import { SpeedInsights } from "@vercel/speed-insights/react";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

applyMeta(META.containerUpdateHelper);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ContainerUpdateHelperPage />
    <SpeedInsights />
  </React.StrictMode>
);
