import useExercise from "./hooks/use-exercise";
import ExerciseList from "@/widgets/exrcise-list";

export default function ExercisePage() {
  const { exercises } = useExercise();

  return (
    <div className="flex flex-col gap-6">
      <ExerciseList exercises={exercises} />
    </div>
  );
}
