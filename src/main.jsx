import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { ToastProvider } from "./contexts/ToastProvider.jsx";
import { initAuth } from "./api/http.js";
import { SignalRProvider } from "./contexts/SignalRProvider.jsx";
import "./locales/i18n.js";

initAuth();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SignalRProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </SignalRProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
