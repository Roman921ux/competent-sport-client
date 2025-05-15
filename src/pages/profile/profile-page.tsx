import { useAuthContext } from "@/app/providers/auth-context-provider";
import PaymentCard from "@/enteties/payment/payment-card";
import axiosInstance from "@/shared/api/axios-instance";
import { TPaymentDto } from "@/shared/types/payment";
import { TUserDto } from "@/shared/types/user";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const auth = useAuthContext();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<TUserDto> => {
      const response = await axiosInstance.get("/users/me");
      console.log("запрос на получение упражнений");
      return response.data;
    },
  });
  const { data: payments } = useQuery({
    queryKey: ["payment"],
    queryFn: async (): Promise<TPaymentDto[]> => {
      const response = await axiosInstance.get("/payment-record");
      console.log("запрос на получение истории покупок");
      return response.data;
    },
  });
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <span className="text-5xl font-black text-primary/90">Профиль</span>
          <span className="text-2xl font-normal text-primary/90 max-w-lg">
            Вы можете отредактировать профиль или выйти из аккаунта
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/profile/edit", { replace: true })}
            className="font-medium text-base bg-primary/5 text-primary/90 rounded-[30px] px-6 py-4"
          >
            Редактировать
          </button>
          <button
            onClick={() => auth?.logOut()}
            className="font-medium text-base bg-primary/90 text-background rounded-[30px] px-6 py-4"
          >
            Выйти
          </button>
        </div>
      </div>
      {/* данные пользователя */}
      <div className="flex items-center gap-6">
        <div className="overflow-hidden  w-[100px] h-[100px] rounded-[30px]">
          <img
            src="https://images.unsplash.com/photo-1468581264429-2548ef9eb732?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2VhfGVufDB8fDB8fHww"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-3xl">{user?.name}</span>
          <span className="font-normal text-2xl text-primary/60">
            {user?.email}
          </span>
        </div>
      </div>
      {/* покупки пользователя */}
      <div className="flex flex-col gap-4 mt-8">
        <span className="text-xl font-normal">История покупок</span>
        <div className="w-ful grid grid-cols-2 gap-6">
          {payments?.map((payment) => <PaymentCard payment={payment} />)}
        </div>
      </div>
    </div>
  );
}
