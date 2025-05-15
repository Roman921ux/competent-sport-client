import { useNavigate, useParams } from "react-router-dom";
import useExercise from "../exercise/hooks/use-exercise";
import { queryClient } from "@/shared/api/query-client";
import axiosInstance from "@/shared/api/axios-instance";
import { useMutation } from "@tanstack/react-query";

export default function AddExerciseToWorkout() {
  const { workoutId } = useParams();
  const { exercises } = useExercise();
  const navigate = useNavigate();

  const addExToWorkoutMutation = useMutation({
    mutationFn: async (exerciseId: string) => {
      const response = await axiosInstance.patch(
        `/workout/${workoutId}/exercises/${exerciseId}`,
      );
      console.log("запрос на создание упражнений");
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["choose-workout"] });
      navigate(-1);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-5xl font-black text-primary/90">
          Список упражнений
        </span>
        <span className="text-2xl font-normal text-primary/90 max-w-lg">
          Выберите нужно упражнение и нажмте на кнопку добавть
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {exercises?.map((exercise) => (
          <div className="relative flex flex-col justify-between gap-10 border rounded-[30px] px-8 py-6 bg-primary/90 text-background">
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-normal">{exercise.title}</span>
              <span className="text-xl font-normal text-background/60">
                {exercise.description}
              </span>
            </div>

            <div className="flex gap-2">
              {exercise.muscleGroups.map((muscle) => (
                <div className="rounded-[30px] text-primary/90 bg-background/90 px-4 py-2">
                  {muscle}
                </div>
              ))}
            </div>

            <div className="w-full flex justify-end">
              <button
                onClick={() => addExToWorkoutMutation.mutate(exercise?._id)}
                className="bg-background hover:bg-background/80 text-primary px-4 py-3 rounded-[18px]"
              >
                Добавить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
