import LoginPage from "@/pages/auth/login-page";
import RegisterPage from "@/pages/auth/register-page";
import CalendarPage from "@/pages/calendar/calendar-page";
import AppLayout from "@/shared/ui/app-layout";
import { Route, Routes } from "react-router-dom";
import Authentication from "./providers/authenication-provider";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Authentication>
            <AppLayout />
          </Authentication>
        }
      >
        <Route index element={<CalendarPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
