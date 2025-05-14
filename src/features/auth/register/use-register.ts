import { useAuthContext } from "@/app/providers/auth-context-provider";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

type FormData = {
  email: string;
  password: string;
  name: string;
};

export default function useRegister() {
  const authContext = useAuthContext();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.password.length < 6) {
      return toast.warning("Пароль должен быть минимум из 6 символов");
    }

    authContext
      ?.logUp(formData)
      .then(() => toast.success("Регистрация прошла успешно"))
      .catch(() => toast.warning("Ошибка при регистрации"));
  };
  return {
    formData,
    handleChange,
    handleSubmit,
  };
}
