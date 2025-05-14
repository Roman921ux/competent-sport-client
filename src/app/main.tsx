import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import RouterProvider from "./providers/router-provider.tsx";
import { AuthProvider } from "./providers/auth-context-provider.tsx";
import { CalendarProvider } from "./providers/update-size-calendar-context.tsx";
import QueryProvider from "./providers/query-client-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider>
      <AuthProvider>
        <CalendarProvider>
          <QueryProvider>
            <App />
          </QueryProvider>
        </CalendarProvider>
      </AuthProvider>
    </RouterProvider>
  </StrictMode>,
);
