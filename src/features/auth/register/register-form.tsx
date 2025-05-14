import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/shadcn-ui/components/ui/button";
import { Input } from "@/shared/shadcn-ui/components/ui/input";
import { Label } from "@/shared/shadcn-ui/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import useRegister from "./use-register";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { formData, handleChange, handleSubmit } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Создай свой аккаунт</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Введи свою почту и придумай пароль
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Имя</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Иван Резен"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Почта</Label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2 relative">
          <div className="flex items-center">
            <Label htmlFor="password">Пароль</Label>
            {/* <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a> */}
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="**********"
            required
          />

          <span
            onClick={togglePasswordVisibility}
            className="absolute top-10 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {!showPassword ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </span>
        </div>

        <Button type="submit" className="w-full">
          Зарегистрироваться
        </Button>
      </div>
      <div className="text-center text-sm">
        Уже есть аккаунт?{" "}
        <a href="/login" className="underline underline-offset-4">
          Войти{" "}
        </a>
      </div>
    </form>
  );
}
