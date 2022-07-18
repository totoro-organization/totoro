import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  User,
  Partner,
  Role,
  LoginData,
  Organization,
  Admin
} from 'src/models';
import * as sessionsService from 'src/services/auth.service';

interface SessionContextType {
  user?: Admin;
  getCurrentUser: () => void;
  loading: boolean;
  error?: any;
  login: (params: LoginData) => void;
  logout: () => void;
}


export const SessionContext = createContext<SessionContextType>(
  {} as SessionContextType
);

export function SessionProvider({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<Admin>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();

  // If we change page, reset the error state.
  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  useEffect(() => {
    getCurrentUser()
  }, []);

  function getCurrentUser(): void {
    if(localStorage.getItem("token")) {
    sessionsService
      .getCurrentUser()
      .then((response) => {
        if ('error' in response) {
          setError(response.error);
          return;
        }
        setUser(response as Admin);
      })
      .finally(() => setLoadingInitial(false));
    } else setLoadingInitial(false)
  }

  function login(params: LoginData) {
    setLoading(true);

    sessionsService
      .login(params)
      .then((response) => {
        if ('error' in response) {
          setError(response.error);
          if(response.status_code === 403) navigate('/confirmer-mon-compte')
          return;
        }
        localStorage.setItem('token', response.token);
        getCurrentUser();
      })
      .finally(() => {
        setLoading(false);
        user && navigate('/')
      });
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentApp');
    setUser(undefined);
  }

  //
  // Whenever the `value` passed into a provider changes,
  // the whole tree under the provider re-renders, and
  // that can be very costly! Even in this case, where
  // you only get re-renders when logging in and out
  // we want to keep things very performant.
  const memoedValue = useMemo(
    () => ({
      user,
      getCurrentUser,
      loading,
      error,
      login,
      logout,
    }),
    [user, loading, error]
  );

  return (
    <SessionContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </SessionContext.Provider>
  );
}
