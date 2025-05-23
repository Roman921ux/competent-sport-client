import { queryClient } from "@/shared/api/query-client";
import { userExerciseApi } from "@/shared/api/user-exercise-api";
import { TSetDto } from "@/shared/types/workout";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function useToggleSet({
  workoutId,
  exerciseId,
  setId,
  set,
}: {
  workoutId: string;
  exerciseId: string;
  setId: string;
  set: TSetDto;
}) {
  // console.log("Render useToggleSet set -", set);
  const [formData, setFormData] = useState<{
    weight: number;
    repeat: number;
    comment: string;
  }>({
    weight: set.weight,
    repeat: set.repeat,
    comment: set.comment,
  });

  useEffect(() => {
    setFormData({
      weight: set.weight,
      repeat: set.repeat,
      comment: set.comment,
    });
  }, [set]);

  const toggleSetMutation = useMutation({
    mutationFn: ({
      workoutId,
      exerciseId,
      setId,
      body,
    }: {
      workoutId: string;
      exerciseId: string;
      setId: string;
      body: {
        weight: number;
        repeat: number;
        comment: string;
      };
    }) =>
      userExerciseApi.toggleSet({
        workoutId,
        exerciseId,
        setId,
        body,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["choose-workout", workoutId],
      });
      // setFormData({
      //   weight: 0,
      //   repeat: 0,
      //   comment: "",
      // });
    },
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
    setOpenPopover: (value: boolean) => void,
  ) => {
    event.preventDefault();
    toggleSetMutation.mutate(
      {
        workoutId,
        exerciseId,
        setId,
        body: formData,
      },
      {
        onSuccess: () => {
          setOpenPopover(false);
        },
      },
    );
  };

  return { formData, handlers: { handleChange, handleSubmit } };
}
