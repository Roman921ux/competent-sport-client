import { TTrainerDto } from "@/shared/types/trainer";
import { useNavigate } from "react-router-dom";

export default function TrainerCard({ trainer }: { trainer: TTrainerDto }) {
  const navigate = useNavigate();
  return (
    <div className="p-4 flex flex-col gap-4 border w-fit rounded-[30px]">
      <div className="overflow-hidden bg-blue-300 w-[420px] h-[420px] rounded-[18px]">
        {trainer?.photo && (
          <img src={trainer?.photo} className="object-cover w-full h-full" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-2xl font-medium">{trainer?.name}</span>
        <span className="text-xl font-medium text-primary/80">
          {trainer?.specialization}
        </span>
      </div>
      <span className="text-xl font-normal text-primary/60">
        Скажи пока своей жирной заднице
      </span>
      <ul className="flex flex-col">
        <li className="text-base font-normal text-primary/80">
          Телефон - {trainer?.contacts?.phone}
        </li>

        <li className="text-base font-normal text-primary/80">
          Почта - {trainer?.contacts?.email}
        </li>
      </ul>
      <div className="flex gap-4">
        <div className="w-full flex items-center flex-col gap-0 p-4 bg-primary/5 rounded-[18px]">
          <span className="font-medium text-base text-primary/60">Рейтинг</span>
          <span className="font-medium text-base">{trainer?.rating}</span>
        </div>
        <div className="w-full flex items-center flex-col gap-0 p-4 bg-primary/5 rounded-[18px]">
          <span className="font-medium text-base text-primary/60">Стаж</span>
          <span className="font-medium text-base">
            {trainer?.experience} лет
          </span>
        </div>
      </div>
      {trainer?.isActive === true && (
        <button
          onClick={() => navigate(`/trainers/${trainer?._id}`)}
          className="px-4 py-6 bg-primary/90 text-background font-medium text-base rounded-[18px]"
        >
          Записаться
        </button>
      )}
    </div>
  );
}
