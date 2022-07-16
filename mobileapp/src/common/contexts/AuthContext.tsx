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
import useUserConnected from "../api/hooks/useUserConnected";
import fetchLoginUser from "../api/requests/auth/fetchLoginUser";

interface AuthContextType {
  user?: User | null;
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
  const { userConnected, isLoading } = useUserConnected();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<any>();

  async function login(data: LoginFormValues) {
    try {
      const response = await fetchLoginUser({
        emailOrUsername: data.email,
        password: data.password,
      });

      if (response.status === 403) {
        setError({ status: true, email: data.email });
        setUser(null);
      }

      const userToken = await response.json();

      await AsyncStorage.setItem("userToken", userToken.token);

      setError({ status: false, email: "" });
      setUser(userConnected);
    } catch (err) {
      console.error(err);
    }
  }

  async function logout() {
    await AsyncStorage.removeItem("userToken");
    setUser(null);
  }

  useEffect(() => {
    setUser(userConnected);
  }, [user, userConnected]);

  const memoedValue = useMemo(
    () => ({
      user,
      logout,
      login,
      error,
      isLoading,
    }),
    [user, isLoading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
