import { TTrainerDto } from "./trainer";

export type TPayment = {
  trainerId: string;
  amount: number;
  paymentMethod: "card" | "cash" | "transfer";
};

export type TPaymentDto = TPayment & {
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  trainerId: TTrainerDto;
  paymentDate: Date;
};
