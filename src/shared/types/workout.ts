import { TExerciseDto } from "./exercise";

// TExercise
export type TSet = {
  weight: number;
  repeat: number;
  comment: string;
};
export type TSetDto = TSet & {
  _id: string;
};

export type TUserExercise = {
  exerciseId: TExerciseDto | undefined;
  comment: string;
  sets: TSetDto[];
};

export type TUserExerciseDto = TUserExercise & {
  _id: string;
};
// TWorkout
export type TWorkout = {
  title: string;
  comment: string;
  exercises: TUserExerciseDto[];
  date: Date;
};

export type TWorkoutDto = TWorkout & {
  userId: string;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};
