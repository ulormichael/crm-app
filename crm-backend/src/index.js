import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { PageProvider } from "./contexts/PageContext";
import "./index.css"; // TailwindCSS styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <PageProvider>
      <App />
    </PageProvider>
  </AuthProvider>
);
