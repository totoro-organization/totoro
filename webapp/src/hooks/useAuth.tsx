import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Membership, Partner, Role, LoginData, SignUpData } from 'src/models';
import * as sessionsService from 'src/services/auth.service';

interface AuthContextType {
  user?: User;
  // memberships?: Membership[],
  // partners?: Partner[],
  currentApp: App,
  loading: boolean;
  error?: any;
  login: (params: LoginData) => void;
  signup: (params: SignUpData) => void;
  logout: () => void;
}

interface App {
  type: 'partner' | 'organization';
  id: string;
  role?: Role
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>();
  // const [memberships, setMemberships] = useState<Array<Membership>>();
  // const [partners, setPartners] = useState<Array<Partner>>();
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
        setUser(response);
      })
      .catch((_error) => {})
      .finally(() => setLoadingInitial(false));
  }, []);

  useEffect(() => {
    if (user) {

      let app = JSON.parse(localStorage.getItem('currentApp')) ?? null;
      let app_id;
      
      if (!app) {
        if (user.memberships.length) {
          app_id = JSON.stringify(user.memberships[0].organization.id);
          app = { type: 'organization', id: app_id, role: user.memberships[0].role };
        } else if (user.partners.length) {
          app_id = JSON.stringify(user.memberships[0].organization.id);
          app = { type: 'partner', id: app_id };
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
          setUser(response);
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
    localStorage.setItem('currentApp', JSON.stringify(app));
    navigate('/');
  }
  // Make the provider update only when it should.
  // We only want to force re-renders if the user,
  // loading or error states change.
  //
  // Whenever the `value` passed into a provider changes,
  // the whole tree under the provider re-renders, and
  // that can be very costly! Even in this case, where
  // you only get re-renders when logging in and out
  // we want to keep things very performant.
  const memoedValue = useMemo(
    () => ({
      user,
      // memberships,
      // partners,
      loading,
      error,
      login,
      signup,
      logout,
      currentApp,
      handleCurrentApp
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
