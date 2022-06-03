import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LoginFormValues } from "../../components/organisms/LoginForm/loginValidationSchema";
import { User } from "../../models/user";
import fetchConnectedUser from "../api/requests/auth/fetchConnectedUser";
import fetchLoginUser from "../api/requests/auth/fetchLoginUser";

interface AuthContextType {
  user?: User;
  logout: () => Promise<void>;
  login: (data: LoginFormValues) => void;
  error?: any;
  isLoading?: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function getConnectedUser() {
    fetchConnectedUser()
      .then((response) => {
        if ("error" in response) return setError(response.error);

        setUser(response.json());
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(true));
  }

  async function login(data: LoginFormValues) {
    try {
      const response = await fetchLoginUser({
        emailOrUsername: data.email,
        password: data.password,
      });

      if (response.status === 403) {
        setError({ status: true, email: data.email });
      }

      const userToken = await response.json();

      await AsyncStorage.setItem("userToken", userToken.token);

      setError({ status: false, email: "" });
      getConnectedUser();
    } catch (err) {
      console.error(err);
    }
  }

  async function logout() {
    await AsyncStorage.removeItem("userToken");
    setUser(undefined);
  }

  useEffect(() => {
    getConnectedUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout, login, error, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
