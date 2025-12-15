import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { applyMeta } from "@/utils/meta";
import { META } from "@/data/meta";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

applyMeta(META.home);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
