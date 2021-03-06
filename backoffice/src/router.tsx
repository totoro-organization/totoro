import { Suspense, lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { PartialRouteObject, RouteProps } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import useSession from './hooks/useSession';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const ProtectedRoute = (props: RouteProps) => {
  const { user } = useSession();

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
  lazy(() => import('src/pages/Management/Partners'))
);
const Admins = Loader(lazy(() => import('src/pages/Management/Admins')));

// single pages
const Litigation = Loader(
  lazy(() => import('src/pages/Management/Litigations/Litigation'))
);
const Job = Loader(lazy(() => import('src/pages/Management/Jobs/Job')));
const Organization = Loader(
  lazy(() => import('src/pages/Management/Organizations/Organization'))
);
const User = Loader(lazy(() => import('src/pages/Management/Users/User')));
const Admin = Loader(lazy(() => import('src/pages/Management/Admins/Admin')));
const Partner = Loader(
  lazy(() => import('src/pages/Management/Partners/Partner'))
);

const UserSettings = Loader(lazy(() => import('src/pages/User/settings')));

/* Accounting */

const Subscriptions = Loader(
  lazy(() => import('src/pages/Accounting/Subscriptions'))
);

/* Dashboards */

const Crypto = Loader(lazy(() => import('src/pages/Dashboards/Crypto')));

/* Apps Configuration */

const ApplicationSettings = Loader(
  lazy(() => import('src/pages/Applications/Settings/Applications'))
);
const TagSettings = Loader(
  lazy(() => import('src/pages/Applications/Settings/Tags'))
);
const RoleSettings = Loader(
  lazy(() => import('src/pages/Applications/Settings/Roles'))
);
const PricingSettings = Loader(
  lazy(() => import('src/pages/Applications/Settings/Pricings'))
);
const StatusSettings = Loader(
  lazy(() => import('src/pages/Applications/Settings/Statuses'))
);
const DifficultySettings = Loader(
  lazy(() => import('src/pages/Applications/Settings/Difficulties'))
);
const LitigationObjectSettings = Loader(
  lazy(() => import('src/pages/Applications/Settings/LitigationObjects'))
);
const DiscountTypeSettings = Loader(
  lazy(() => import('src/pages/Applications/Settings/DiscountTypes'))
);
const ThemeSettings = Loader(
  lazy(() => import('src/pages/Applications/Appearance/Themes'))
);

/* Status */

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
                path: 'partenaires',
                element: <Partners />
              },
              {
                path: 'partenaires/:id',
                element: <Partner />
              },
              {
                path: 'administrateurs',
                element: <Admins />
              },
              {
                path: 'administrateurs/:id',
                element: <Admin />
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
              {
                path: '/',
                element: (
                  <Navigate
                    to="/app-reglages/parametrage/tags"
                    replace
                  />
                )
              },
              {
                path: 'parametrage/applications',
                element: <ApplicationSettings/>
              },
              {
                path: 'parametrage/tags',
                element: <TagSettings />
              },
              {
                path: 'parametrage/roles',
                element: <RoleSettings />
              },
              {
                path: 'parametrage/pricings',
                element: <PricingSettings />
              },
              {
                path: 'parametrage/status',
                element: <StatusSettings />
              },
              {
                path: 'parametrage/difficultes',
                element: <DifficultySettings />
              },
              {
                path: 'parametrage/objets-litiges',
                element: <LitigationObjectSettings />
              },
              {
                path: 'parametrage/types-de-promotion',
                element: <DiscountTypeSettings />
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
                element: <Navigate to="settings" replace />
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
