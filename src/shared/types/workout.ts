export type TExercise = {
  title: string;
};

export type TWorkout = {
  title: string;
  exercises: TExercise[];
};

export type TWorkoutDto = TWorkout & {
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type TExerciseDto = TExercise & {
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};
