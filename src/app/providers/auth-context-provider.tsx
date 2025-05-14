import { useLocalStorage } from "@/shared/hooks/use-localStorage";
import axiosInstance from "@/shared/api/axios-instance";
import { createContext, ReactNode, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { TUserDto } from "@/shared/types/user";
// import { userStorageAtom } from "@/shared/model/atoms/user-atom";

// то что приходит в функцию логирования
type LoginData = {
  email: string;
  password: string;
};
type RegisterData = {
  email: string;
  password: string;
  name: string;
};
type LoginDataDto = TUserDto & {
  token: string;
  role: "basic" | "admin";
};
type RegisterDataDto = TUserDto & {
  token: string;
  role: "basic" | "admin";
};

interface AuthContextProps {
  token: string | null;
  logIn: (data: LoginData) => Promise<LoginDataDto>;
  logOut: () => void;
  logUp: (data: RegisterData) => Promise<RegisterDataDto>;
  userRole: "basic" | "admin" | null;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";

  const [userRole, setUserRole] = useLocalStorage<"basic" | "admin" | null>(
    "userRole",
    null,
  );
  const [token, setToken] = useLocalStorage<string | null>("token", null);

  const logIn = async (data: LoginData): Promise<LoginDataDto> => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      console.log("loginRequest", response.data);
      setToken(response.data.token);
      setUserRole(response.data.role);

      navigate(redirectPath, { replace: true });
      return response.data;
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };

  const logUp = async (data: RegisterData): Promise<RegisterDataDto> => {
    try {
      const response = await axiosInstance.post("/auth/register", data);
      console.log("registerCompanyRequest", response.data);
      setToken(response.data.token);
      setUserRole(response.data.role);
      navigate("/login");

      return response.data;
    } catch (error) {
      console.error("Register error", error);
      throw error;
    }
  };

  const logOut = () => {
    navigate("/");
    setTimeout(() => {
      setToken(null);
    }, 100);
  };

  return (
    <AuthContext.Provider value={{ token, logIn, logUp, logOut, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
