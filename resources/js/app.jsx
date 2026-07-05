import "../css/app.css";
import "react-loading-skeleton/dist/skeleton.css";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

createInertiaApp({
  title: (title) => {
    // Fallback ensures the brand stays in the tab title even if VITE_APP_NAME
    // isn't present at build time. Keep casing in sync with config('app.name').
    const appName = (import.meta.env.VITE_APP_NAME || "Atta Cargo").trim();

    if (!title || title === appName) {
      return appName;
    }

    return `${title} - ${appName}`;
  },
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.jsx");
    return pages[`./Pages/${name}.jsx`]();
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
