import { queryClient } from "@/shared/api/query-client";
import { userExerciseApi } from "@/shared/api/user-exercise-api";
import { useMutation } from "@tanstack/react-query";

export default function useSettingCard({ workoutId }: { workoutId: string }) {
  const removeExerciseMutation = useMutation({
    mutationFn: ({
      workoutId,
      exerciseId,
    }: {
      workoutId: string;
      exerciseId: string;
    }) =>
      userExerciseApi.removeExercise({
        workoutId,
        exerciseId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["choose-workout", workoutId],
      });
    },
  });

  return { removeExerciseMutation };
}
