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
  SignUpData,
  Organization
} from 'src/models';
import * as authService from 'src/api/auth';
import { APP_PATHS } from 'src/appPaths';
import { useToast } from 'src/hooks/useToast';

interface SessionContextType {
  user?: User;
  getConnectedUser: () => void;
  currentApp: App;
  handleCurrentApp: (app: App) => void;
  loading: boolean;
  error?: any;
  login: (params: LoginData) => void;
  signup: (params: SignUpData) => void;
  logout: () => void;
}

interface App {
  type: 'partner' | 'organization';
  member_id?: string;
  data: Organization | Partner;
  role?: Role;
}

export const SessionContext = createContext<SessionContextType>(
  {} as SessionContextType
);

export function SessionProvider({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>();
  const [currentApp, setCurrentApp] = useState<any>(JSON.parse(localStorage.getItem("currentApp")) ?? null);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const { setToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // If we change page, reset the error state.
  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  useEffect(() => {
    getConnectedUser()
  }, []);

  useEffect(() => {
    if (user) {
      let app = currentApp;
      let data;

      if (!app) {
        if (user.memberships.length) {
          data = user.memberships[0].organization;
          app = {
            type: 'organization',
            data,
            role: user.memberships[0].role,
            member_id: user.memberships[0].id
          };
        } else if (user.partners.length) {
          data = user.partners[0];
          app = { type: 'partner', data };
        } else {
          navigate('/first-login');
          return;
        }
      }
      handleCurrentApp(app);
    }
  }, [user]);

  function getConnectedUser(): void {
    if(localStorage.getItem("token")) {
    authService
      .getConnectedUser()
      .then((response) => {
        if ('error' in response) {
          setError(response.error);
          return;
        }
        setUser(response as User);
      })
      .finally(() => setLoadingInitial(false));
    } else setLoadingInitial(false)
  }

  function login(params: LoginData) {
    setLoading(true);

    authService
      .login(params)
      .then((response) => {
        if ('error' in response) {
          setError(response.error);
          if(response.status_code === 403) {
            if(response.error !== "Access forbidden") {
              navigate(APP_PATHS.ACCOUNT_VERIFICATION);
              return
            }
            setToast({
              variant: 'error',
              message: "Une erreur est survenue : Identifiants incorrects",
              duration: 6000
            })
          } 
          return;
        }
        localStorage.setItem('token', response.token);
        getConnectedUser();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function signup(params: SignUpData) {
    authService.signup(params).then((response) => {
      if ('error' in response) {
        setError(response.error);
        return;
      }
      navigate(APP_PATHS.ACCOUNT_VERIFICATION);
    });
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentApp');
    setUser(undefined);
  }

  function handleCurrentApp(app: App) {
    setCurrentApp(app);
    localStorage.setItem('currentApp', JSON.stringify(app));    
    if (app !== currentApp) {
      return navigate('/');
    }
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
      getConnectedUser,
      loading,
      error,
      login,
      signup,
      logout,
      currentApp,
      handleCurrentApp
    }),
    [user, loading, error, currentApp]
  );

  return (
    <SessionContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </SessionContext.Provider>
  );
}
