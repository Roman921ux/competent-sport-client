import axiosInstance from "@/shared/api/axios-instance";
import { cn } from "@/shared/lib/utils";
import { TExercise, TExerciseDto } from "@/shared/types/exercise";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useExercise from "./hooks/use-exercise";

type TFormData = Omit<TExercise, "userCreateExerciseId">;

export default function CreateExerciseUserPage() {
  const { createUserMutation } = useExercise();

  const navigate = useNavigate();
  const { exerciseId } = useParams();

  const { data } = useQuery({
    queryKey: ["exercise"],
    queryFn: async (): Promise<TExerciseDto[]> => {
      const response = await axiosInstance.get("/exercise");
      console.log("запрос на получение упражнений");
      return response.data;
    },
  });
  const findEditExerciseById = data?.find((ex) => ex._id === exerciseId);

  const [muscles] = useState([
    "грудь",
    "трицепс",
    "бицепс",
    "плечи (дельты)",
    "трапеции",
    "спина (широчайшие)",
    "поясница",
    "предплечья",
    "пресс (прямая мышца живота)",
    "косые мышцы живота",
    "ягодицы",
    "квадрицепсы (передняя поверхность бедра)",
    "бицепс бедра (задняя поверхность бедра)",
    "икроножные мышцы",
    "пояснично-крестцовый отдел",
    "аддукторы (внутренняя поверхность бедра)",
    "абдукторы (наружная поверхность бедра)",
  ]);
  const [formData, setFormData] = useState<TFormData>({
    title: findEditExerciseById?.title || "",
    description: findEditExerciseById?.description || "",
    muscleGroups: findEditExerciseById?.muscleGroups || [],
    typeExercise: "communityExercise",
  });

  const handleAddMuscle = (muscle: string) => {
    if (formData.muscleGroups.includes(muscle)) {
      const newMuscleGroups = formData.muscleGroups.filter(
        (oldMuscle) => oldMuscle !== muscle,
      );
      setFormData((prev) => ({
        ...prev,
        muscleGroups: newMuscleGroups,
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      muscleGroups: [...formData.muscleGroups, muscle],
    }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      typeExercise: e.target.value as TFormData["typeExercise"],
    }));
  };

  const changeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUserMutation.mutate(formData, {
      onSuccess: () => {
        navigate("/exercise", { replace: true });
      },
    });

    // setFormData({ title: "", description: "", muscleGroups: [] });
  };

  return (
    <form
      onSubmit={changeSubmit}
      className="mx-auto flex flex-col gap-10 max-w-5xl"
    >
      <div className="flex flex-col gap-2">
        <span className="text-5xl font-black text-primary/90">
          Создание упражнения
        </span>
        <span className="text-2xl font-normal text-primary/90 max-w-lg">
          При создании упражнения, оно попадет в общую базу для всех
          пользователей
        </span>
      </div>
      {/* inputs */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label>Название упражнения</label>
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
          <label>Описание упражнения</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="border rounded-[30px] py-3 px-6 min-w-lg"
            placeholder="Описание упражнения"
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label>Группа мышц</label>
          <div className="grid grid-cols-6 gap-2">
            {muscles.map((muscle) => (
              <div
                onClick={() => handleAddMuscle(muscle)}
                className={cn(
                  "flex justify-between items-center text-xs font-medium rounded-[30px] px-4 py-2 bg-primary/5 hover:bg-primary/90 hover:text-background hover:cursor-pointer",
                  formData.muscleGroups.includes(muscle) &&
                    "bg-primary/90 text-background font-medium",
                )}
              >
                {muscle}
                {formData.muscleGroups.includes(muscle) && (
                  <X className="w-4 h-4 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label>Тип упражнения</label>
          <select
            className="border rounded-[30px] py-3 px-6"
            value={formData.typeExercise}
            onChange={handleChange}
          >
            <option value="communityExercise">Комьюнити упражнение</option>
            <option value="personalExercise">Личное упражение</option>
          </select>
        </div>
      </div>
      {/* btn */}
      <div className="flex justify-end">
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/exercise", { replace: true })}
            className="font-medium text-base bg-primary/5 text-primary/90 rounded-[30px] px-6 py-4"
          >
            Назад
          </button>
          <button
            type="submit"
            className="font-medium text-base bg-primary/90 text-background rounded-[30px] px-6 py-4"
          >
            Создать
          </button>
        </div>
      </div>
    </form>
  );
}
