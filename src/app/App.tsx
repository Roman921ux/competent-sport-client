import LoginPage from "@/pages/auth/login-page";
import RegisterPage from "@/pages/auth/register-page";
import CalendarPage from "@/pages/calendar/calendar-page";
import AppLayout from "@/shared/ui/app-layout";
import { Route, Routes } from "react-router-dom";
import Authentication from "./providers/authenication-provider";
import ExercisePage from "@/pages/exercise/exercise-page";
import EditExercisePage from "@/pages/exercise/edit-exercise-page";
import CreateExercisePage from "@/pages/exercise/create-exercise-page";

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
        <Route path="/exercise" element={<ExercisePage />} />
        <Route
          path="/exercise/edit/:exerciseId"
          element={<EditExercisePage />}
        />
        <Route path="/exercise/create" element={<CreateExercisePage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
