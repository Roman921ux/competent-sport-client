import ExerciseUserCard from "@/enteties/exercise-user-card/exercise-user-card";
import {
  DropdownMenuSetting,
  PopoverToggleSet,
  RemoveSetBtn,
} from "@/features/exercise-user-card";
import { TSetDto, TWorkoutDto } from "@/shared/types/workout";
import useAddSetToExercise from "./use-add-set-to-exercise";
import { ReactNode } from "react";
import { RemoveWorkoutBtn } from "@/features/user-workout";

type TRenderToggleProps = {
  setItem: ReactNode;
  exerciseId: string;
  setId: string;
  set: TSetDto;
};
type TRemoveActionType = {
  workoutId: string;
  exerciseId: string;
  setId: string;
};

export default function ChooseUserWorkout({
  chooseWorkout,
}: {
  chooseWorkout: TWorkoutDto | undefined;
}) {
  const addSetToExerciseMutation = useAddSetToExercise({
    workoutId: chooseWorkout?._id,
  });

  return (
    <div className="flex flex-col gap-3 pt-6">
      <div className="flex justify-between">
        <span className="text-2xl">{chooseWorkout?.title}</span>
        {chooseWorkout && <RemoveWorkoutBtn workoutId={chooseWorkout._id} />}
      </div>
      <div className="space-y-2">
        {chooseWorkout?.exercises?.map((exercise) => (
          <ExerciseUserCard
            handleAddSetToExercise={(exerciseId) =>
              addSetToExerciseMutation.mutate({
                workoutId: chooseWorkout._id,
                exerciseId,
              })
            }
            key={exercise.exerciseId._id}
            exercise={exercise}
            settingSlot={
              <DropdownMenuSetting
                exerciseId={exercise._id}
                workoutId={chooseWorkout._id}
              />
            }
            renderToggle={(props: TRenderToggleProps) => {
              return (
                <PopoverToggleSet
                  removeActionSlot={(props: TRemoveActionType) => (
                    <RemoveSetBtn {...props} />
                  )}
                  workoutId={chooseWorkout?._id}
                  {...props}
                >
                  {props.setItem}
                </PopoverToggleSet>
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}
