import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User } from "../../models/user";
import fetchConnectedUser from "../api/requests/auth/fetchConnectedUser";

interface AuthContextType {
  user?: User;
  logout?: () => Promise<void>;
  isLoading?: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const userToken = async () => await AsyncStorage.getItem("userToken");

  async function getUserConnected() {
    try {
      if (await userToken()) {
        const connectedUser = await fetchConnectedUser();
        setUser(await connectedUser.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    await AsyncStorage.removeItem("userToken");
    setUser(undefined);
  }

  useEffect(() => {
    getUserConnected();
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
