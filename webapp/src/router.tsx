import { Suspense, lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { PartialRouteObject, RouteProps } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import { useSession } from './hooks/useSession';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const ProtectedRoute = (props: RouteProps) => {
  const session = useSession();

  if (!session.user) return <Navigate to="/login" />;
  return <Route {...props} />;
};

/* Partner */
const AppIndexRoute = () => {
  const session = useSession();

  if (session.currentApp.type === 'organization')
    return <Navigate to="/association/dashboards/resume" replace />;

  return <Navigate to="/partenaire/dashboards/resume" replace />;
};

/* Applications - Organization */
// Gestion
const CreationJob = Loader(
  lazy(() => import('src/pages/applications/Organization/Gestion/Jobs/Create'))
);
const ListingJobs = Loader(
  lazy(() => import('src/pages/applications/Organization/Gestion/Jobs/List'))
);
const JobParticipant = Loader(
  lazy(
    () => import('src/pages/applications/Organization/Gestion/Jobs/Participant')
  )
);
const Job = Loader(
  lazy(() => import('src/pages/applications/Organization/Gestion/Jobs'))
);
// Dashboards
const Crypto = Loader(
  lazy(() => import('src/pages/applications/Organization/Dashboards/Crypto'))
);
const Resume = Loader(
  lazy(() => import('src/pages/applications/Organization/Dashboards/Resume'))
);

/* Applications - Partner */


/* PAGES */

/* Authentication */
const SignIn = Loader(lazy(() => import('src/pages/SignIn')));
const SignUp = Loader(lazy(() => import('src/pages/SignUp')));
const AccountConfirmation = Loader(lazy(() => import('src/pages/AccountConfirmation')));
const FirstLogin = Loader(lazy(() => import('src/pages/SignIn/FirstLogin')));

/* User */
const UserProfile = Loader(lazy(() => import('src/pages/User/profile')));
const UserSettings = Loader(lazy(() => import('src/pages/User/settings')));

/* Status */
const Status404 = Loader(lazy(() => import('src/pages/Status/Status404')));
const Status500 = Loader(lazy(() => import('src/pages/Status/Status500')));
const StatusComingSoon = Loader(
  lazy(() => import('src/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/pages/Status/Maintenance'))
);

const routes: PartialRouteObject[] = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: 'login',
        element: <SignIn />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'confirmer-mon-compte',
        element: <AccountConfirmation/>
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <AppIndexRoute />
          },
          {
            path: '/first-login',
            element: <FirstLogin />
          },
          {
            path: 'status',
            children: [
              {
                path: '/',
                element: <Navigate to="404" replace />
              },
              {
                path: '404',
                element: <Status404 />
              },
              {
                path: '500',
                element: <Status500 />
              },
              {
                path: 'maintenance',
                element: <StatusMaintenance />
              },
              {
                path: 'coming-soon',
                element: <StatusComingSoon />
              }
            ]
          },
          {
            path: '*',
            element: <Status404 />
          },
          {
            path: 'profile',
            element: <SidebarLayout />,
            children: [
              {
                path: '/',
                element: <Navigate to="details" replace />
              },
              {
                path: 'details',
                element: <UserProfile />
              },
              {
                path: 'settings',
                element: <UserSettings />
              }
            ]
          },
          {
            path: 'association',
            children: [
              {
                path: '/',
                element: <Navigate to="dashboards" replace />
              },
              {
                path: 'dashboards',
                element: <SidebarLayout />,
                children: [
                  {
                    path: '/',
                    element: <Navigate to="resume" replace />
                  },
                  {
                    path: 'statistiques',
                    element: <Crypto />
                  },
                  {
                    path: 'resume',
                    element: <Resume />
                  }
                ]
              },
              {
                path: 'gestion',
                element: <SidebarLayout />,
                children: [
                  {
                    path: '/',
                    element: <Navigate to="missions" replace />
                  },
                  {
                    path: '/missions',
                    element: <ListingJobs />
                  },
                  {
                    path: '/missions/creation',
                    element: <CreationJob />
                  },
                  {
                    path: '/missions/:jobId/participant/:id',
                    element: <JobParticipant />
                  }
                ]
              }
            ]
          },
          {
            path: 'partenaire',
            children: [
              {
                path: '/',
                element: <Navigate to="dashboards" replace />
              },
              {
                path: 'dashboards',
                element: <SidebarLayout />,
                children: [
                  {
                    path: '/',
                    element: <Navigate to="resume" replace />
                  },
                  {
                    path: 'statistiques',
                    element: <Crypto />
                  },
                  {
                    path: 'resume',
                    element: <Resume />
                  }
                ]
              },
              {
                path: 'gestion',
                element: <SidebarLayout />,
                children: [
                  {
                    path: '/',
                    element: <Navigate to="reductions" replace />
                  },
                  {
                    path: '/reductions',
                    element: <ListingJobs />
                  },
                  {
                    path: '/reductions/creation',
                    element: <CreationJob />
                  }
                ]
              },
              {
                path: 'missions/:id',
                element: <Job />
              },
              {
                path: 'missions/:id',
                element: <Job />
              },
              {
                path: '/missions/creation',
                element: <CreationJob />
              }
            ]
          }
        ]
      }
    ]
  }
];

export default routes;
