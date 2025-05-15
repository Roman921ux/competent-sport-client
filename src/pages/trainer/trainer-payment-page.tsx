import axiosInstance from "@/shared/api/axios-instance";
import { queryClient } from "@/shared/api/query-client";
import { TPayment } from "@/shared/types/payment";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TrainerPaymentPage() {
  const navigate = useNavigate();
  const { trainerId } = useParams();
  const [formData, setFormData] = useState<Omit<TPayment, "trainerId">>({
    amount: 1,
    paymentMethod: "transfer",
  });
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: e.target.value as TPayment["paymentMethod"],
    }));
  };

  const createPayment = useMutation({
    mutationFn: async (body: TPayment) => {
      const response = await axiosInstance.post("/payment-record", body);
      console.log("запрос на создание покпки");
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercise"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const changeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: TPayment = {
      ...formData,
      trainerId: trainerId as string,
    };

    createPayment.mutate(body, {
      onSuccess: () => {
        navigate("/trainers", { replace: true });
      },
    });

    // setFormData({ title: "", description: "", muscleGroups: [] });
  };

  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");

  const formatCardNumber = (value: string) => {
    // Удаляем все не-цифры и ограничиваем 16 цифрами
    const cleanValue = value.replace(/\D/g, "").slice(0, 16);
    // Добавляем пробелы после каждых 4 цифр
    return cleanValue.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleCvvChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Только цифры, максимум 3 символа
    setCvv(e.target.value.replace(/\D/g, "").slice(0, 3));
  };

  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    setExpiry(value);
  };

  // Валидация
  const isCardValid = cardNumber.replace(/\s/g, "").length === 16;
  const isCvvValid = cvv.length === 3;
  const isExpiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry);

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
        {/* данные карты */}
        <div className="flex flex-col gap-2">
          <label>Номер карты</label>
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className={`border rounded-[30px] py-3 px-6 min-w-lg ${
              cardNumber && !isCardValid ? "border-red-500" : ""
            }`}
            placeholder="4242 4242 4242 4242"
            maxLength={19} // 16 цифр + 3 пробела
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Код CVV/CVC</label>
          <input
            type="text"
            value={cvv}
            onChange={handleCvvChange}
            className={`border rounded-[30px] py-3 px-6 min-w-lg ${
              cvv && !isCvvValid ? "border-red-500" : ""
            }`}
            placeholder="123"
            maxLength={3}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Срок действия</label>
          <input
            type="text"
            value={expiry}
            onChange={handleExpiryChange}
            className={`border rounded-[30px] py-3 px-6 min-w-lg ${
              expiry && !isExpiryValid ? "border-red-500" : ""
            }`}
            placeholder="MM/YY"
            maxLength={5}
          />
        </div>

        {/* липове данные закончились */}
        <div className="flex flex-col gap-2">
          <label>Количество тренировок</label>
          <input
            value={formData.amount}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                amount: Number(e.target.value),
              }))
            }
            type="number"
            className="border rounded-[30px] py-3 px-6 min-w-lg"
            placeholder="Название упражнения"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Описание упражнения</label>
          <select
            className="border rounded-[30px] py-3 px-6"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="card">Картой</option>
            <option value="cash">Наличкой</option>
            <option value="transfer">Превод</option>
          </select>
        </div>
      </div>
      {/* btn */}
      <div className="flex justify-end">
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/trainers", { replace: true })}
            className="font-medium text-base bg-primary/5 text-primary/90 rounded-[30px] px-6 py-4"
          >
            Назад
          </button>
          <button className="font-medium text-base bg-primary/90 text-background rounded-[30px] px-6 py-4">
            Оплатить
          </button>
        </div>
      </div>
    </form>
  );
}
