import useExercise from "./hooks/use-exercise";
import ExerciseList from "@/widgets/exrcise-list";
import { DialogCreateExercise } from "@/widgets/dialog-create-exercise";

export default function ExercisePage() {
  const { exercises, handleAddExercise } = useExercise();

  return (
    <div className="flex flex-col gap-6">
      <ExerciseList
        exercises={exercises}
        // DialogCreateExerciseSlot={
        //   <DialogCreateExercise handleAddExercise={handleAddExercise} />
        // }
      />
    </div>
  );
}
