import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./auth-context-provider";

export default function Authentication({
  children,
}: {
  children: ReactNode;
  permissions?: [string];
}) {
  const authContext = useAuthContext();
  const location = useLocation();

  // проверка, что роли не соответсвуют, но пользователь зарегистрирован
  // по хорошему здесь можно запросить данные пользователя(если есть token) и проверить его роль
  // if (
  //   permissions &&
  //   authContext?.user?.roles &&
  //   permissions?.includes(authContext?.user?.roles) === false
  // ) {
  //   return <Navigate to="/" />;
  // }

  if (!authContext?.token) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
}
