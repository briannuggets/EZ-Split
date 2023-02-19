import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Scroll to bottom of page on expansion
const resizeObserver = new ResizeObserver(() =>
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
);
resizeObserver.observe(document.body);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
