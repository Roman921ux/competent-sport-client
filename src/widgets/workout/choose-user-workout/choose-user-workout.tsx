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
import { PenIcon, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 pt-6">
      <div className="flex flex-col gap-8 items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-5xl font-black text-primary/90">
            {chooseWorkout?.title}
          </span>
          <span className="flex gap-2 items-center text-2xl font-normal text-primary/90 max-w-lg">
            <div
              onClick={() => navigate(`/workout/${chooseWorkout?._id}/edit`)}
              className="hover:bg-primary/5 rounded-[12px] p-2"
            >
              <PenIcon className="w-5 h-5" />
            </div>
            {chooseWorkout?.comment}
          </span>
        </div>
        <div className="w-full flex items-end justify-between">
          {chooseWorkout?.date && (
            <span className="text-base font-semibold text-primary/80 ">
              Дата: {chooseWorkout?.date.toString().split("T")[0]}
            </span>
          )}

          <div className="flex gap-2">
            {chooseWorkout && (
              <RemoveWorkoutBtn workoutId={chooseWorkout._id} />
            )}
            {chooseWorkout && (
              <button
                onClick={() =>
                  navigate(`/workout/${chooseWorkout?._id}/add-exrcise`)
                }
                className="flex items-center gap-2 font-medium bg-primary/5 text-primary/90 rounded-[30px] py-3 px-6 w-fit hover:bg-primary/90 hover:text-background"
              >
                <Plus className="w-5 h-5" /> Упражнение
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {chooseWorkout?.exercises?.map((exercise) => {
          if (exercise?.exerciseId) {
            return (
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
                    statsExerciseId={exercise.exerciseId._id}
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
            );
          }
          return;
        })}
      </div>
    </div>
  );
}
