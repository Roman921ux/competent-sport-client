export type TTrainer = {
  name: string;
  description: string;
  specialization: string;
  photo: string | null;
  experience: number;
  rating: number;
  contacts: {
    phone: string | null;
    email: string | null;
  };
  isActive: boolean;
};

export type TTrainerDto = TTrainer & {
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};
