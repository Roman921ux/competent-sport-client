import { TSetDto, TUserExerciseDto } from "@/shared/types/workout";
import SetItem from "./ui/set-item";
import { ReactNode } from "react";
import { Plus } from "lucide-react";

export default function ExerciseUserCard({
  handleAddSetToExercise,
  settingSlot,
  renderToggle,
  exercise,
}: {
  handleAddSetToExercise: (exerciseId: string) => void;
  settingSlot: ReactNode;
  renderToggle: ({
    setItem,
    exerciseId,
    setId,
    set,
  }: {
    setItem: ReactNode;
    exerciseId: string;
    setId: string;
    set: TSetDto;
  }) => ReactNode;
  exercise: TUserExerciseDto;
}) {
  return (
    <div className="border rounded-md p-4 flex flex-col gap-4">
      <div className="flex gap-4">
        {/* <div className="min-w-[100px] min-h-[100px] bg-blue-100 rounded-md" /> */}

        <div className="flex flex-col justify-between gap-4 w-full">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-normal">
                {exercise?.exerciseId?.title}
              </span>
              <span className="text-base font-normal text-muted-foreground">
                {exercise?.exerciseId?.description}
              </span>
            </div>

            <div>{settingSlot}</div>
          </div>

          <div className="flex gap-2">
            {exercise?.sets?.map((set) =>
              renderToggle({
                setItem: <SetItem set={set} />,
                exerciseId: exercise?._id,
                setId: set?._id,
                set,
              }),
            )}
            <div
              onClick={() => handleAddSetToExercise(exercise._id)}
              className="flex items-center gap-2 py-2 px-3 bg-muted hover:bg-muted-foreground/15 rounded-md"
            >
              <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="font-medium text-sm">Создать</span>
            </div>
          </div>
        </div>
      </div>
      <span className="text-muted-foreground">{exercise?.comment}</span>
    </div>
  );
}
