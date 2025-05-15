import useRemoveWorkout from "./use-remove-workout";

export default function RemoveWorkoutBtn({ workoutId }: { workoutId: string }) {
  const { removeWorkoutMutation } = useRemoveWorkout({ workoutId });
  return (
    <button
      className="font-medium bg-primary/5 text-primary/90 rounded-[30px] py-3 px-6 w-fit hover:bg-primary/90 hover:text-background"
      onClick={() => {
        if (workoutId) {
          removeWorkoutMutation.mutate(workoutId);
        }
      }}
    >
      Удалить тренировку
    </button>
  );
}
