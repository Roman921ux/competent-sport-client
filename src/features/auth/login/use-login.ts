import { useAuthContext } from "@/app/providers/auth-context-provider";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

type FormData = {
  email: string;
  password: string;
};

export default function useLogin() {
  const authContext = useAuthContext();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    authContext
      ?.logIn(formData)
      .then(() => toast.success("Авторизация прошла успешно"))
      .catch(() => toast.warning("Ошибка при Авторизация"));
  };
  return {
    formData,
    handleChange,
    handleSubmit,
  };
}
