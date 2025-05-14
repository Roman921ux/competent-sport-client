import { TExerciseDto } from "@/shared/types/exercise";
import { PenIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ExerciseCard({ exercise }: { exercise: TExerciseDto }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/exercise/edit/${exercise._id}`);
  };
  return (
    <div className="relative flex flex-col justify-between gap-10 border rounded-[30px] px-8 py-6 bg-primary/90 text-background">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-normal">{exercise.title}</span>
        <span className="text-xl font-normal text-background/60">
          {exercise.description}
        </span>
      </div>

      <div className="flex gap-2">
        {exercise.muscleGroups.map((muscle) => (
          <div className="rounded-[30px] text-primary/90 bg-background px-4 py-3">
            {muscle}
          </div>
        ))}
      </div>
      <button
        onClick={handleButtonClick}
        className="absolute top-4 right-4 p-3 rounded-[18px] bg-background text-primary/90 w-fit hover:bg-background/90"
      >
        <PenIcon />
      </button>
    </div>
  );
}
