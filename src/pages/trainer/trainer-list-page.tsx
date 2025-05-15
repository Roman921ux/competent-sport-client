import TrainerCard from "@/enteties/trainer/trainer-card";
import axiosInstance from "@/shared/api/axios-instance";
import { cn } from "@/shared/lib/utils";
import { TTrainerDto } from "@/shared/types/trainer";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function TrainerListPage() {
  const [statusTrainer, setStatusTrainer] = useState<boolean>(true);
  const [inputSeacrh, setInputSeacrh] = useState("");

  const { data: trainers } = useQuery({
    queryKey: ["trainer"],
    queryFn: async (): Promise<TTrainerDto[]> => {
      const response = await axiosInstance.get("/trainer");
      console.log("запрос на получение трнеров");
      return response.data;
    },
  });

  const trainerFilter = trainers
    ?.filter((trainer) =>
      trainer.name.toLowerCase().includes(inputSeacrh.toLowerCase()),
    )
    .filter((trainer) => trainer.isActive === statusTrainer);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <span className="text-5xl font-black text-primary/90">Тренера</span>
        <span className="text-2xl font-normal text-primary/90 max-w-lg">
          Используйте посиковую строку и сортировку, для поиска тренера{" "}
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
              onClick={() => setStatusTrainer(true)}
              className={cn(
                "font-medium bg-primary/5 text-primary/90 rounded-[30px] py-3 px-6",
                statusTrainer === true && "bg-primary/90 text-background",
              )}
            >
              Свободен
            </button>
            <button
              onClick={() => setStatusTrainer(false)}
              className={cn(
                "font-medium bg-primary/5 text-primary/90 rounded-[30px] py-3 px-6",
                statusTrainer === false && "bg-primary/90 text-background",
              )}
            >
              Занят
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-fit grid gap-8 grid-cols-3">
          {trainerFilter?.map((trainer) => <TrainerCard trainer={trainer} />)}
        </div>
      </div>
    </div>
  );
}
