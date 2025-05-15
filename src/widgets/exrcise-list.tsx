import ExerciseCard from "@/enteties/exercise-card/exercise-card";
import { TExerciseDto } from "@/shared/types/exercise";
import { useState } from "react";
import { useAuthContext } from "@/app/providers/auth-context-provider";
import { cn } from "@/shared/lib/utils";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TUserDto } from "@/shared/types/user";
import axiosInstance from "@/shared/api/axios-instance";

export default function ExerciseList({
  exercises,
}: {
  exercises: TExerciseDto[] | undefined;
}) {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<TUserDto> => {
      const response = await axiosInstance.get("/users/me");
      console.log("запрос на получение упражнений");
      return response.data;
    },
  });
  const auth = useAuthContext();
  const navigate = useNavigate();
  const [inputSeacrh, setInputSeacrh] = useState("");
  const [exCategory, setExCategory] = useState<
    "officialExercise" | "communityExercise" | "personalExercise"
  >("officialExercise");

  const exerciseFilter = exercises
    ?.filter((ex) => ex.title.toLowerCase().includes(inputSeacrh.toLowerCase()))
    .filter((ex) => {
      if (exCategory === "personalExercise") {
        return (
          user?._id === ex?.userCreateExerciseId &&
          ex?.typeExercise === "personalExercise"
        );
      }
      return ex?.typeExercise === exCategory;
    });
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <span className="text-5xl font-black text-primary/90">Упражнения</span>
        <span className="text-2xl font-normal text-primary/90 max-w-lg">
          Меняй категорию или используй поиск, чтобы найти то, что тебе нужно
        </span>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-8">
          <input
            value={inputSeacrh}
            onChange={(e) => setInputSeacrh(e.target.value)}
            className="border rounded-[30px] py-3 px-6 min-w-lg"
            placeholder="Поиск по названию ..."
          />
          <div className="flex gap-2">
            <button
              onClick={() => setExCategory("officialExercise")}
              className={cn(
                "font-medium bg-primary/5 text-primary/90 rounded-[30px] py-3 px-6",
                exCategory === "officialExercise" &&
                  "bg-primary/90 text-background",
              )}
            >
              Официальные
            </button>
            <button
              onClick={() => setExCategory("communityExercise")}
              className={cn(
                "font-medium bg-primary/5 text-primary/90 rounded-[30px] py-3 px-6",
                exCategory === "communityExercise" &&
                  "bg-primary/90 text-background",
              )}
            >
              Сообщества
            </button>
            <button
              onClick={() => setExCategory("personalExercise")}
              className={cn(
                "font-medium bg-primary/5 text-primary/90 rounded-[30px] py-3 px-6",
                exCategory === "personalExercise" &&
                  "bg-primary/90 text-background",
              )}
            >
              Ваши
            </button>
          </div>
        </div>
        {/* {auth?.userRole !== "basic" && DialogCreateExerciseSlot} */}
        <div className="flex gap-2">
          {auth?.userRole === "admin" && (
            <button
              onClick={() => navigate("/exercise/admin/create")}
              className="font-medium bg-primary/5 text-primary/90 rounded-[30px] py-3 px-6 w-fit hover:bg-primary/90 hover:text-background"
            >
              Создать публичное
            </button>
          )}
          <button
            onClick={() => navigate("/exercise/user/create")}
            className="font-medium bg-primary/5 text-primary/90 rounded-[30px] py-3 px-6 w-fit hover:bg-primary/90 hover:text-background"
          >
            Создать свое
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {exerciseFilter?.map((exercise) => (
          <ExerciseCard exercise={exercise} userData={user} />
        ))}
      </div>
    </div>
  );
}
