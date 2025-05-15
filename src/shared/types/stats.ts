import { TExerciseDto } from "./exercise";
import { TSetDto } from "./workout";

export type TStatsEx = {
  comment: string;
  exerciseId: TExerciseDto;
  sets: TSetDto[];
};

export type TStatsExDto = TStatsEx & {
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};
