import axiosInstance from "@/shared/api/axios-instance";
import { queryClient } from "@/shared/api/query-client";
import { TWorkoutDto } from "@/shared/types/workout";
import { DatePicker } from "@/shared/ui/date-picker";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditWorkoutPage() {
  const { workoutId } = useParams();
  const navigate = useNavigate();

  const { data: chooseWorkout } = useQuery({
    queryKey: ["choose-workout", workoutId],
    queryFn: async ({ queryKey }): Promise<TWorkoutDto> => {
      // Получаем параметры из queryKey
      const [, id] = queryKey;
      const response = await axiosInstance.get(`/workout/${id}`);
      return response.data;
    },
    enabled: !!workoutId,
  });

  const [formData, setFormData] = useState({
    title: chooseWorkout?.title || "",
    comment: chooseWorkout?.comment || "",
    date: chooseWorkout?.date || new Date(),
  });

  const handleSetDate = (newDate: Date | undefined) => {
    if (newDate) {
      setFormData((prev) => ({
        ...prev,
        date: newDate,
      }));
    }
  };

  const editWorkoutMutation = useMutation({
    mutationFn: async (body: {
      title: string;
      comment: string;
      date: Date;
    }) => {
      console.log("body -", body);
      const response = await axiosInstance.patch(`/workout/${workoutId}`, body);
      console.log("запрос на создание упражнений");
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["choose-workout", workoutId],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const changeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    editWorkoutMutation.mutate(formData, {
      onSuccess: () => {
        navigate("/", { replace: true });
      },
    });

    // setFormData({ title: "", description: "", muscleGroups: [] });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-5xl font-black text-primary/90">
          Редактироание тренировки
        </span>
        <span className="text-2xl font-normal text-primary/90 max-w-lg">
          Измените нужны поля и нажмите кнопку "Сохранить"
        </span>
      </div>
      <form onSubmit={changeSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label>Название треировки</label>
          <input
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="border rounded-[30px] py-3 px-6 min-w-lg"
            placeholder="Название упражнения"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Комментарий к тренировке</label>
          <input
            value={formData.comment}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, comment: e.target.value }))
            }
            className="border rounded-[30px] py-3 px-6 min-w-lg"
            placeholder="Название упражнения"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Название упражнения</label>
          <DatePicker
            date={formData.date}
            setDate={
              handleSetDate as Dispatch<SetStateAction<Date | undefined>>
            }
          />
        </div>
        {/* btn */}
        <div className="flex justify-end">
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/", { replace: true })}
              className="font-medium text-base bg-primary/5 text-primary/90 rounded-[30px] px-6 py-4"
            >
              Назад
            </button>
            <button
              type="submit"
              className="font-medium text-base bg-primary/90 text-background rounded-[30px] px-6 py-4"
            >
              Сохранить
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
