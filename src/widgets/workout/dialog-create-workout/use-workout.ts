import { queryClient } from "@/shared/api/query-client";
import { userWorkoutApi } from "@/shared/api/user-workout-api";
import { TExerciseDto } from "@/shared/types/exercise";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

type TFormData = {
  title: string;
  comment: string;
  date: Date;
  exercises: {
    sets: [];
    comment: string;
    exerciseId: string;
  }[];
};

export default function useWorkout() {
  const [formData, setFormData] = useState<TFormData>({
    title: "",
    comment: "",
    date: new Date(),
    exercises: [],
  });

  const createMutation = useMutation({
    mutationFn: (body: TFormData) => userWorkoutApi.createUserWorkout(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-workouts"] });
    },
  });

  // handlers
  const handleSetDate = (newDate: Date | undefined) => {
    if (newDate) {
      setFormData((prev) => ({
        ...prev,
        date: newDate,
      }));
    }
  };

  const handleAddExercise = (exercise: TExerciseDto) => {
    const isExitEx = formData.exercises.some(
      (ex) => ex.exerciseId === exercise._id,
    );
    if (isExitEx) {
      const newExercises = formData.exercises.filter(
        (ex) => ex.exerciseId !== exercise._id,
      );
      setFormData((prev) => ({
        ...prev,
        exercises: newExercises,
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      exercises: [
        ...formData.exercises,
        { exerciseId: exercise._id, sets: [], comment: "" },
      ],
    }));
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    setOpen: (x: boolean) => void,
  ) => {
    e.preventDefault();
    createMutation.mutate(formData);
    setOpen(false);
    setFormData({
      title: "",
      comment: "",
      date: new Date(),
      exercises: [],
    });
  };
  return {
    formData,
    setFormData,
    handlers: {
      handleSubmit,
      handleAddExercise,
      handleSetDate,
    },
  };
}
