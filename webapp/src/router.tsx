import { Suspense, lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { PartialRouteObject, RouteProps } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import { useSession } from './hooks/useSession';
import { APP_PATHS } from './appPaths';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const ProtectedRoute = (props: RouteProps) => {
  const session = useSession();

  if (!session.user) return <Navigate to={APP_PATHS.LOGIN} />;
  return <Route {...props} />;
};

/* Partner */
const AppIndexRoute = () => {
  const session = useSession();

  if (session.currentApp.type === 'organization')
    return <Navigate to={APP_PATHS.ORGANIZATION_DASHBOARDS_RESUME} replace />;

  return <Navigate to={APP_PATHS.PARTNER_DASHBOARDS_RESUME} replace />;
};

/* Applications - Organization */
// Gestion
const CreationJob = Loader(
  lazy(() => import('src/pages/applications/Organization/Management/Jobs/Create'))
);
const ListingJobs = Loader(
  lazy(() => import('src/pages/applications/Organization/Management/Jobs/List'))
);
const JobParticipant = Loader(
  lazy(
    () => import('src/pages/applications/Organization/Management/Jobs/Participant')
  )
);
const Job = Loader(
  lazy(() => import('src/pages/applications/Organization/Management/Jobs'))
);
// Add
const AddOrganization = Loader(
  lazy(() => import('src/pages/applications/Organization/Add'))
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
const ForgotPassword = Loader(lazy(() => import('src/pages/ForgotPassword')));
const ResetPassword = Loader(lazy(() => import('src/pages/ResetPassword')));
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
        path: APP_PATHS.LOGIN,
        element: <SignIn />
      },
      {
        path: APP_PATHS.SIGNUP,
        element: <SignUp />
      },
      {
        path: APP_PATHS.ACCOUNT_VERIFICATION,
        element: <AccountConfirmation/>
      },
      {
        path: APP_PATHS.FORGOT_PASSWORD,
        element: <ForgotPassword/>
      },
      {
        path: APP_PATHS.RESET_PASSWORD,
        element: <ResetPassword/>
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <AppIndexRoute />
          },
          {
            path: APP_PATHS.FIRST_LOGIN,
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
            path: 'organization',
            element: <SidebarLayout />,
            children: [
              {
                path: '/',
                element: <Navigate to="dashboards" replace />
              },
              {
                path: 'dashboards',
                children: [
                  {
                    path: '/',
                    element: <Navigate to="resume" replace />
                  },
                  {
                    path: 'stats',
                    element: <Crypto />
                  },
                  {
                    path: 'resume',
                    element: <Resume />
                  }
                ]
              },
              {
                path: 'add',
                element: <AddOrganization/>
              },
              {
                path: 'jobs',
                children: [
                  {
                    path: '/',
                    element: <ListingJobs />,
                  },
                  {
                    path: '/:jobId',
                    element: <Job />
                  },
                  {
                    path: '/:jobId/participant/:id',
                    element: <JobParticipant />
                  }
                ]
              },
              {
                path: 'add-job',
                element: <CreationJob />
              },
            ]
          },
          {
            path: 'partner',
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
                    path: 'stats',
                    element: <Crypto />
                  },
                  {
                    path: 'resume',
                    element: <Resume />
                  }
                ]
              },
              {
                path: 'management',
                element: <SidebarLayout />,
                children: [
                  {
                    path: '/',
                    element: <Navigate to="discounts" replace />
                  },
                  {
                    path: '/discounts',
                    element: <ListingJobs />
                  },
                  {
                    path: 'discounts/:id',
                    element: <Job />
                  },
                  {
                    path: '/discounts/add',
                    element: <CreationJob />
                  }
                ]
              },
            ]
          }
        ]
      }
    ]
  }
];

export default routes;
