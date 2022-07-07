import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Partner, Role, LoginData, SignUpData, Organization } from 'src/models';
import * as sessionsService from 'src/services/auth.service';

interface SessionContextType {
  user?: User;
  currentApp: App,
  handleCurrentApp: (app: App) => void,
  loading: boolean;
  error?: any;
  login: (params: LoginData) => void;
  signup: (params: SignUpData) => void;
  logout: () => void;
}

interface App {
  type: 'partner' | 'organization';
  member_id?: string;
  data: Organization | Partner,
  role?: Role
}

export const SessionContext = createContext<SessionContextType>({} as SessionContextType);

export function SessionProvider({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>();
  const [currentApp, setCurrentApp] = useState<any>({});
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
    sessionsService
      .getCurrentUser()
      .then((response) => {
        if ('error' in response) {
          setError(response.error);
          return;
        }
        setUser(response as User);
      })
      .catch((_error) => {})
      .finally(() => setLoadingInitial(false));
  }, []);

  useEffect(() => {
    if (user) {

      let app = JSON.parse(localStorage.getItem('currentApp')) ?? null;
      let data;
      
      if (!app) {
        if (user.memberships.length) {
          data = user.memberships[0].organization;
          app = { type: 'organization', data, role: user.memberships[0].role, member_id: user.memberships[0].id };
        } else if (user.partners.length) {
          data = user.partners[0];
          app = { type: 'partner', data };
        } else {
          navigate('/first-login');
          return
        }
      } 
      handleCurrentApp(app)
    }
  }, [user]);


  function login(params: LoginData) {
    setLoading(true);

    sessionsService
      .login(params)
      .then((response) => {
        if ('error' in response) {
          setError(response.error);
          return;
        }
        localStorage.setItem('token', response.token);
      })
      .then((_) => {
        sessionsService.getCurrentUser().then((response) => {
          if ('error' in response) {
            setError(response.error);
            return;
          }
          setUser(response as User);
          navigate('/')
        });
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  function signup(params: SignUpData) {
    sessionsService.signup(params).then((response) => {
      if ('error' in response) {
        setError(response.error);
        return;
      }
      navigate('/login');
    });
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentApp');
    setUser(undefined);
  }

  function handleCurrentApp(app: App) {
    setCurrentApp(app);
    localStorage.setItem('currentApp', JSON.stringify(app))
    if(app.type !== currentApp) {
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



