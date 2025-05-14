import { queryClient } from "@/shared/api/query-client";
import { userWorkoutApi } from "@/shared/api/user-workout-api";
import { useMutation } from "@tanstack/react-query";

export default function useRemoveWorkout({ workoutId }: { workoutId: string }) {
  const removeWorkoutMutation = useMutation({
    mutationFn: (workoutId: string) =>
      userWorkoutApi.removeUserWorkout(workoutId),
    onSuccess: () => {
      queryClient.setQueryData(["choose-workout", workoutId], null);
      queryClient.invalidateQueries({
        queryKey: ["user-workouts"],
      });
    },
  });
  return { removeWorkoutMutation };
}
