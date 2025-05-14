import axiosInstance from "./axios-instance";

export const userExerciseApi = {
  addSet: async ({
    workoutId,
    exerciseId,
  }: {
    workoutId: string;
    exerciseId: string;
  }) => {
    try {
      const body = {
        weight: 0,
        repeat: 0,
        comment: "",
      };
      const response = await axiosInstance.patch(
        `workout/${workoutId}/exercises/${exerciseId}/set`,
        body,
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  },
  toggleSet: async ({
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
  }) => {
    try {
      const response = await axiosInstance.patch(
        `workout/${workoutId}/exercises/${exerciseId}/set/${setId}`,
        body,
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  removeSet: async ({
    workoutId,
    exerciseId,
    setId,
  }: {
    workoutId: string;
    exerciseId: string;
    setId: string;
  }) => {
    try {
      const response = await axiosInstance.delete(
        `workout/${workoutId}/exercises/${exerciseId}/set/${setId}`,
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  removeExercise: async ({
    workoutId,
    exerciseId,
  }: {
    workoutId: string;
    exerciseId: string;
  }) => {
    try {
      const response = await axiosInstance.delete(
        `workout/${workoutId}/exercises/${exerciseId}`,
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
};
