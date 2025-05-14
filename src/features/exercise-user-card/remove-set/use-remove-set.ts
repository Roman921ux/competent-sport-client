import { queryClient } from "@/shared/api/query-client";
import { userExerciseApi } from "@/shared/api/user-exercise-api";
import { useMutation } from "@tanstack/react-query";

export default function useRemoveSet({ workoutId }: { workoutId: string }) {
  const removeSetMutation = useMutation({
    mutationFn: ({
      workoutId,
      exerciseId,
      setId,
    }: {
      workoutId: string;
      exerciseId: string;
      setId: string;
    }) =>
      userExerciseApi.removeSet({
        workoutId,
        exerciseId,
        setId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["choose-workout", workoutId],
      });
    },
  });
  return removeSetMutation;
}
