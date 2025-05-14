export type TExercise = {
  title: string;
  description: string;
  muscleGroups: string[];
  userCreateExerciseId: string;
  typeExercise: "officialExercise" | "communityExercise" | "personalExercise";
};

export type TExerciseDto = TExercise & {
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};
