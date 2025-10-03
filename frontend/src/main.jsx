import React from "react";
import { createRoot } from "react-dom/client";
// Polyfill Node globals required by some libraries (gray-matter) when running in the browser
import { Buffer } from "buffer";
import process from "process";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import App from "./App.jsx";

// Ensure runtime globals are present for dependencies that expect Node-like environment
if (typeof globalThis !== "undefined") {
  if (!globalThis.Buffer) globalThis.Buffer = Buffer;
  if (!globalThis.process) globalThis.process = process;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
