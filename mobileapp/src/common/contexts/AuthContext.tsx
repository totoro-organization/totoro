import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { StackParamList } from "../../navigation/StackNavigationParams";
import fetchConnectedUser from "../api/requests/auth/fetchConnectedUser";

interface AuthContextType {
  user?: any;
  logout?: () => Promise<void>;
  isLoading?: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState();
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

  const memoedValue = useMemo(
    () => ({
      user,
      isLoading,
      logout,
    }),
    [user, isLoading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
