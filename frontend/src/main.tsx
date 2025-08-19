import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme.tsx";
import React from "react";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      {" "}
      <div className="font-display">
        <App />
      </div>
    </ThemeProvider>
  </AuthProvider>,
);
