import LoginPage from "@/pages/auth/login-page";
import RegisterPage from "@/pages/auth/register-page";
import CalendarPage from "@/pages/calendar/calendar-page";
import AppLayout from "@/shared/ui/app-layout";
import { Route, Routes } from "react-router-dom";
import Authentication from "./providers/authenication-provider";
import ExercisePage from "@/pages/exercise/exercise-page";
import TrainerListPage from "@/pages/trainer/trainer-list-page";
import TrainerPaymentPage from "@/pages/trainer/trainer-payment-page";
import ProfilePage from "@/pages/profile/profile-page";
import ProfileEditPage from "@/pages/profile/profile-edit-page";
import CreateExerciseAdminPage from "@/pages/exercise/create-exercise-admin-page";
import CreateExerciseUserPage from "@/pages/exercise/create-exercise-user-page";
import EditExerciseAdminPage from "@/pages/exercise/edit-exercise-admin-page";
import EditExerciseUserPage from "@/pages/exercise/edit-exercise-user-page";
import AddExerciseToWorkout from "@/pages/calendar/add-exercise-to-workout";
import EditWorkoutPage from "@/pages/calendar/edit-workout-page";
import StatsExercisePage from "@/pages/stats/stats-exercise-page";
import LandingPage from "@/pages/landing/landing-page";

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
          path="/exercise/edit/admin/:exerciseId"
          element={<EditExerciseAdminPage />}
        />
        <Route
          path="/exercise/edit/user/:exerciseId"
          element={<EditExerciseUserPage />}
        />
        <Route
          path="/exercise/admin/create"
          element={<CreateExerciseAdminPage />}
        />
        <Route
          path="/exercise/user/create"
          element={<CreateExerciseUserPage />}
        />
        <Route path="/trainers" element={<TrainerListPage />} />
        <Route path="/trainers/:trainerId" element={<TrainerPaymentPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/stats/:exerciseId" element={<StatsExercisePage />} />
        <Route path="/profile/edit" element={<ProfileEditPage />} />
        <Route
          path="/workout/:workoutId/add-exrcise"
          element={<AddExerciseToWorkout />}
        />
        <Route path="/workout/:workoutId/edit" element={<EditWorkoutPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/landing" element={<LandingPage />} />

      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
