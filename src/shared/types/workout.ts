// TExercise
type TSet = {
  weight: number;
  repeat: string;
  comment: string;
};

export type TExercise = {
  title: string;
  comment: string;
  sets: TSet[];
};

export type TExerciseDto = TExercise & {
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

// TWorkout
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
