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

// tables
const Jobs = Loader(lazy(() => import('src/pages/Management/Jobs')));
const Users = Loader(lazy(() => import('src/pages/Management/Users')));
const Organizations = Loader(
  lazy(() => import('src/pages/Management/Organizations'))
);
const Litigations = Loader(
  lazy(() => import('src/pages/Management/Litigations'))
);
const Partners = Loader(
  lazy(() => import('src/pages/Management/Partners/Members'))
);
const Admins = Loader(lazy(() => import('src/pages/Management/Admins')));
const MembershipRequests = Loader(
  lazy(() => import('src/pages/Management/Partners/MembershipRequests'))
);

// single pages
const Litigation = Loader(
  lazy(() => import('src/pages/Management/Litigations/Litigation'))
);
const Job = Loader(lazy(() => import('src/pages/Management/Jobs/Job')));
const Organization = Loader(
  lazy(() => import('src/pages/Management/Organizations/Organization'))
);
const User = Loader(lazy(() => import('src/pages/Management/Users/User')));
const Partner = Loader(
  lazy(() => import('src/pages/Management/Partners/Members/Partner'))
);
const MembershipRequest = Loader(
  lazy(() => import('src/pages/Management/Partners/MembershipRequests/Request'))
);

/* Accounting */

const Subscriptions = Loader(
  lazy(() => import('src/pages/Accounting/Subscriptions'))
);

/* Dashboards */

const Crypto = Loader(lazy(() => import('src/pages/Dashboards/Crypto')));

/* Apps Configuration */

const TagSettings = Loader(
  lazy(() => import('src/pages/AppsConfiguration/Settings/Tags'))
);
const SubscriptionSettings = Loader(
  lazy(() => import('src/pages/AppsConfiguration/Settings/Subscriptions'))
);
const StatusSettings = Loader(
  lazy(() => import('src/pages/AppsConfiguration/Settings/Status'))
);
const LitigationObjectSettings = Loader(
  lazy(() => import('src/pages/AppsConfiguration/Settings/LitigationObjects'))
);
const ThemeSettings = Loader(
  lazy(() => import('src/pages/AppsConfiguration/Appearance/Themes'))
);

// Applications

const UserProfile = Loader(lazy(() => import('src/pages/User/profile')));
const UserSettings = Loader(lazy(() => import('src/pages/User/settings')));

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
            path: 'gestion',
            element: <SidebarLayout />,
            children: [
              {
                path: '/',
                element: <Navigate to="/gestion/missions" replace />
              },
              {
                path: 'missions',
                element: <Jobs />
              },
              {
                path: 'missions/:id',
                element: <Job />
              },
              {
                path: 'utilisateurs',
                element: <Users />
              },
              {
                path: 'utilisateurs/:id',
                element: <User />
              },
              {
                path: 'associations',
                element: <Organizations />
              },
              {
                path: 'associations/:id',
                element: <Organization />
              },
              {
                path: 'litiges',
                element: <Litigations />
              },
              {
                path: 'litiges/:id',
                element: <Litigation />
              },
              {
                path: 'partenaires/demandes',
                element: <MembershipRequests />
              },
              {
                path: 'partenaires/demandes/:id',
                element: <MembershipRequest />
              },
              {
                path: 'partenaires/membres',
                element: <Partners />
              },
              {
                path: 'partenaires/membres/:id',
                element: <Partner />
              },
              {
                path: 'administrateurs',
                element: <Admins />
              }
            ]
          },
          {
            path: 'comptabilite',
            element: <SidebarLayout />,
            children: [
              {
                path: '/',
                element: <Navigate to="abonnements" replace />
              },
              {
                path: 'abonnements',
                element: <Subscriptions />
              }
            ]
          },
          {
            path: 'app-reglages',
            element: <SidebarLayout />,
            children: [
              // {
              //   path: '/',
              //   element: (
              //     <Navigate
              //       to="/app-reglages/missions"
              //       replace
              //     />
              //   )
              // },
              {
                path: 'parametrage/tags',
                element: <TagSettings />
              },
              {
                path: 'parametrage/abonnements',
                element: <SubscriptionSettings />
              },
              {
                path: 'parametrage/status',
                element: <StatusSettings />
              },
              {
                path: 'parametrage/objets-litiges',
                element: <LitigationObjectSettings />
              },
              {
                path: 'apparence/themes',
                element: <ThemeSettings />
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
          }
        ]
      },
      
    ]
  }
];

export default routes;
