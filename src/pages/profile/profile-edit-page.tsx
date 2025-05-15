import axiosInstance from "@/shared/api/axios-instance";
import { queryClient } from "@/shared/api/query-client";
import { TUser, TUserDto } from "@/shared/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileEditPage() {
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<TUserDto> => {
      const response = await axiosInstance.get("/users/me");
      console.log("запрос на получение упражнений");
      return response.data;
    },
  });
  const editUser = useMutation({
    mutationFn: async (body: Omit<TUser, "password">) => {
      const response = await axiosInstance.put("/users/me", body);
      console.log("запрос на редактирование данных пользователя");
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const [formData, setFormData] = useState<Omit<TUser, "password">>({
    name: user?.name || "",
    email: user?.email || "",
  });

  const changeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    editUser.mutate(formData, {
      onSuccess: () => {
        navigate("/profile", { replace: true });
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
          Оплата тренировки
        </span>
        <span className="text-2xl font-normal text-primary/90 max-w-3xl">
          При покупке занятия, внимательно ознакомтесь с условиями нашей
          платформы
        </span>
      </div>
      {/* inputs */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label>Имя пользователя</label>
          <input
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            className="border rounded-[30px] py-3 px-6 min-w-lg"
            placeholder="Название упражнения"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Почта</label>
          <input
            className="border rounded-[30px] py-3 px-6"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        </div>
      </div>
      {/* btn */}
      <div className="flex justify-end">
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/profile", { replace: true })}
            className="font-medium text-base bg-primary/5 text-primary/90 rounded-[30px] px-6 py-4"
          >
            Назад
          </button>
          <button className="font-medium text-base bg-primary/90 text-background rounded-[30px] px-6 py-4">
            Изменить
          </button>
        </div>
      </div>
    </form>
  );
}
