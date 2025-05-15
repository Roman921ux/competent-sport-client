import axiosInstance from "@/shared/api/axios-instance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/query-client";
import { TExercise, TExerciseDto } from "@/shared/types/exercise";

type TFormDataAdmin = Omit<TExercise, "typeExercise" | "userCreateExerciseId">;
type TFormDataUser = Omit<TExercise, "userCreateExerciseId">;

export default function useExercise() {
  const { data } = useQuery({
    queryKey: ["exercise"],
    queryFn: async (): Promise<TExerciseDto[]> => {
      const response = await axiosInstance.get("/exercise");
      console.log("запрос на получение упражнений");
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (body: TFormDataAdmin) => {
      const response = await axiosInstance.post("/exercise/admin", body);
      console.log("запрос на создание упражнений");
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercise"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const createUserMutation = useMutation({
    mutationFn: async (body: TFormDataUser) => {
      console.log("body -", body);
      const response = await axiosInstance.post("/exercise/users", body);
      console.log("запрос на создание упражнений");
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercise"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // handlers
  const handleAddExercise = (data: TFormDataAdmin) => {
    createMutation.mutate(data);
  };

  return {
    exercises: data,
    createMutation,
    handleAddExercise,
    createUserMutation,
  };
}
