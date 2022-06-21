import { Suspense, lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { PartialRouteObject, RouteProps } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import useAuth from './hooks/useAuth';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const ProtectedRoute = (props: RouteProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
   
  return <Route {...props} />;
};

/* Pages */

const FirstLogin = Loader(lazy(() => import('src/pages/SignIn/FirstLogin')));

// Dashboards 

const Crypto = Loader(lazy(() => import('src/pages/Dashboards/Crypto')));

// Applications

const UserProfile = Loader(lazy(() => import('src/pages/User/profile')));
const UserSettings = Loader(lazy(() => import('src/pages/User/settings')));

//Gestion
const Litigation = Loader(lazy(() => import('src/pages/Gestion/Litigation')));
const CreationJob = Loader(lazy(() => import('src/pages/Gestion/Jobs/Create')));
const ListingJobs = Loader(lazy(() => import('src/pages/Gestion/Jobs/List'))); 

// Status

const Status404 = Loader(lazy(() => import('src/pages/Status/Status404')));
const Status500 = Loader(lazy(() => import('src/pages/Status/Status500')));
const StatusComingSoon = Loader(
  lazy(() => import('src/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/pages/Status/Maintenance'))
);

/* Authentication */

const SignIn = Loader(lazy(() => import('src/pages/SignIn')));
const SignUp = Loader(lazy(() => import('src/pages/SignUp')));

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
        element: <ProtectedRoute/>, 
        children: [
          {
            path: '/',
            element: <Navigate to="/dashboards" replace />
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
            path: 'dashboards',
            element: <SidebarLayout />,
            children: [
              {
                path: '/',
                element: <Navigate to="/dashboards/statistiques" replace />
              },
              {
                path: 'statistiques',
                element: <Crypto />
              }
            ]
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
            path: 'gestion',
            element: <SidebarLayout />,
            children: [
              {
                path: '/',
                element: <Navigate to="mission/liste" replace />
              },
              {
                path: 'litiges',
                element: <Litigation />,
              },
              {
                path: 'mission',
                element: <ListingJobs />,
                children: [
                  {
                    path: '/',
                    element: <Navigate to="liste" replace />
                  },
                  {
                    path: 'liste',
                    element: <ListingJobs />
                  },
                  {
                    path: 'creation',
                    element: <CreationJob />
                  }
                ] 
              }
            ]
          }
        ]
      },
      
    ]
  }
];

export default routes;
