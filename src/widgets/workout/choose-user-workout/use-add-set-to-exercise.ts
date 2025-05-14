import { queryClient } from "@/shared/api/query-client";
import { userExerciseApi } from "@/shared/api/user-exercise-api";
import { useMutation } from "@tanstack/react-query";

export default function useAddSetToExercise({
  workoutId,
}: {
  workoutId: string | undefined;
}) {
  const addSetToExerciseMutation = useMutation({
    mutationFn: ({
      workoutId,
      exerciseId,
    }: {
      workoutId: string;
      exerciseId: string;
    }) =>
      userExerciseApi.addSet({
        workoutId,
        exerciseId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["choose-workout", workoutId],
      });
    },
  });

  return addSetToExerciseMutation;
}
