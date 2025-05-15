import { useAuthContext } from "@/app/providers/auth-context-provider";
import axiosInstance from "@/shared/api/axios-instance";
import { queryClient } from "@/shared/api/query-client";
import { TExerciseDto } from "@/shared/types/exercise";
import { TUserDto } from "@/shared/types/user";
import { useMutation } from "@tanstack/react-query";
import { PenIcon, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ExerciseCard({
  exercise,
  userData,
}: {
  exercise: TExerciseDto;
  userData: TUserDto | undefined;
}) {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const handleRedirectAdminEdit = () => {
    navigate(`/exercise/edit/admin/${exercise._id}`);
  };
  const handleRedirectUserEdit = () => {
    navigate(`/exercise/edit/user/${exercise._id}`);
  };
  const deleteExerciseMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(`/exercise/${exercise?._id}`);
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
  return (
    <div className="relative flex flex-col justify-between gap-10 border rounded-[30px] px-8 py-6 bg-primary/90 text-background">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-normal">{exercise.title}</span>
        <span className="text-xl font-normal text-background/60">
          {exercise.description}
        </span>
      </div>

      <div className="flex gap-2 w-full overflow-x-auto pb-2 scrollbar-hide">
        {exercise.muscleGroups.map((muscle) => (
          <div className="rounded-[30px] flex items-center text-primary/90 bg-background px-4 py-3">
            {muscle}
          </div>
        ))}
      </div>

      {auth?.userRole === "admin" && (
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleRedirectAdminEdit}
            className="p-3 rounded-[18px] bg-background text-primary/90 w-fit hover:bg-background/90"
          >
            <PenIcon />
          </button>
          <button
            onClick={() => deleteExerciseMutation.mutate()}
            className="p-3 rounded-[18px] bg-background text-primary/90 w-fit hover:bg-background/90"
          >
            <Trash />
          </button>
        </div>
      )}
      {auth?.userRole === "basic" &&
        exercise?.typeExercise !== "officialExercise" &&
        userData?._id === exercise?.userCreateExerciseId && (
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleRedirectUserEdit}
              className="p-3 rounded-[18px] bg-background text-primary/90 w-fit hover:bg-background/90"
            >
              <PenIcon />
            </button>
            <button
              onClick={() => deleteExerciseMutation.mutate()}
              className="p-3 rounded-[18px] bg-background text-primary/90 w-fit hover:bg-background/90"
            >
              <Trash />
            </button>
          </div>
        )}
    </div>
  );
}
