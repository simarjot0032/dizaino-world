import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

// The site used to use "#/" URLs (e.g. /#/Bedroom). Turn old links and
// bookmarks into the real URL before the router starts.
if (window.location.hash.startsWith("#/")) {
  window.history.replaceState(null, "", window.location.hash.slice(1));
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: "#0e0e0d",
          color: "#ece8e1",
          borderRadius: "999px",
          fontFamily: "Manrope, system-ui, sans-serif",
          fontSize: "0.875rem",
          padding: "10px 18px",
        },
        success: { iconTheme: { primary: "#a8835a", secondary: "#0e0e0d" } },
      }}
    />
  </React.StrictMode>
);
