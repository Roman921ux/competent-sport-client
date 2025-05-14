import { Button } from "@/shared/shadcn-ui/components/ui/button";
import useRemoveWorkout from "./use-remove-workout";

export default function RemoveWorkoutBtn({ workoutId }: { workoutId: string }) {
  const { removeWorkoutMutation } = useRemoveWorkout({ workoutId });
  return (
    <Button
      variant="secondary"
      onClick={() => {
        if (workoutId) {
          removeWorkoutMutation.mutate(workoutId);
        }
      }}
    >
      Удалить тренировку
    </Button>
  );
}
