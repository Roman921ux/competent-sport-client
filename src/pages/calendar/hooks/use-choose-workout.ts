import { userWorkoutApi } from "@/shared/api/user-workout-api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useChooseWorkout() {
  const [workoutId, setWorkoutId] = useState<string | null>(null);

  const { data: chooseWorkout, refetch } = useQuery({
    queryKey: ["choose-workout", workoutId as string],
    queryFn: userWorkoutApi.chooseUserWorkout,
    enabled: workoutId !== null,
    // отключает автоматический запрос
  });

  // handlers
  const handleChangeWorkout = (newWorkoutId: string) => {
    setWorkoutId(newWorkoutId);
    refetch();
  };
  return { chooseWorkout, handleChangeWorkout };
}
