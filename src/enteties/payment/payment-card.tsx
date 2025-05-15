import { TPaymentDto } from "@/shared/types/payment";

export default function PaymentCard({ payment }: { payment: TPaymentDto }) {
  return (
    <div className="bg-primary/90 p-8 flex flex-col gap-8 rounded-[30px]">
      <div className="flex flex-col gap-1">
        <span className="text-2xl font-normal text-background/100">
          Тренеровка с {payment?.trainerId?.name}
        </span>
        <span className="text-xl font-normal text-background/80">
          {payment?.trainerId?.contacts.phone}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-2xl font-medium text-background/60">
          {payment?.paymentDate.toString().split("T")[0]}
        </span>
        <span className="text-xl font-normal text-background/80">
          Кол-во тренировок: {payment?.amount}
        </span>
      </div>
    </div>
  );
}
