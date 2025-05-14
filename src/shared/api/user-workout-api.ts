import axiosInstance from "@/shared/api/axios-instance";
import { TWorkoutDto } from "../types/workout";
import { QueryFunction } from "@tanstack/react-query";

type TFormDataCreateWorkout = {
  title: string;
  comment: string;
  date: Date;
  exercises: {
    exerciseId: string;
  }[];
};

export const userWorkoutApi = {
  createUserWorkout: async (body: TFormDataCreateWorkout) => {
    try {
      const response = await axiosInstance.post("/workout", body);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  chooseUserWorkout: (async ({ queryKey }): Promise<TWorkoutDto> => {
    const [, id] = queryKey as [string, string];
    const response = await axiosInstance.get(`/workout/${id}`);
    console.log("запрос прошел", response.data);
    return response.data;
  }) satisfies QueryFunction<TWorkoutDto, [string, string]>,
  removeUserWorkout: async (workoutId: string) => {
    try {
      const response = await axiosInstance.delete(`/workout/${workoutId}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
};
