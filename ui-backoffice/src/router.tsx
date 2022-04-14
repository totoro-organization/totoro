import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Pages

const SignIn = Loader(lazy(() => import('src/content/pages/Signin')));

// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications

const Messenger = Loader(lazy(() => import('src/content/applications/Messenger')));
const Transactions = Loader(lazy(() => import('src/content/applications/Transactions')));
const UserProfile = Loader(lazy(() => import('src/content/applications/Users/profile')));
const UserSettings = Loader(lazy(() => import('src/content/applications/Users/settings')));


// Status

const Status404 = Loader(lazy(() => import('src/content/pages/Status/Status404')));
const Status500 = Loader(lazy(() => import('src/content/pages/Status/Status500')));
const StatusComingSoon = Loader(lazy(() => import('src/content/pages/Status/ComingSoon')));
const StatusMaintenance = Loader(lazy(() => import('src/content/pages/Status/Maintenance')));


const routes: PartialRouteObject[] = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <SignIn />
      },
      {
        path: 'signin',
        element: (
          <Navigate
            to="/"
            replace
          />
        )
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: (
              <Navigate
                to="404"
                replace
              />
            )
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
          },
        ]
      },
      {
        path: '*',
        element: <Status404 />
      },
    ]
  },
  {
    path: 'dashboards',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="/dashboards/stats"
            replace
          />
        )
      },
      {
        path: 'stats',
        element: <Crypto />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: 'management',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="/management/transactions"
            replace
          />
        )
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'profile',
        children: [
          {
            path: '/',
            element: (
              <Navigate
                to="details"
                replace
              />
            )
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          },
        ]
      }
    ]
  },
  // {
  //   path: 'components',
  //   element: (
  //     <SidebarLayout />
  //   ),
  //   children: [
  //     {
  //       path: '/',
  //       element: (
  //         <Navigate
  //           to="/components/buttons"
  //           replace
  //         />
  //       )
  //     },
  //     {
  //       path: 'buttons',
  //       element: <Buttons />
  //     },
  //     {
  //       path: 'modals',
  //       element: <Modals />
  //     },
  //     {
  //       path: 'accordions',
  //       element: <Accordions />
  //     },
  //     {
  //       path: 'tabs',
  //       element: <Tabs />
  //     },
  //     {
  //       path: 'badges',
  //       element: <Badges />
  //     },
  //     {
  //       path: 'tooltips',
  //       element: <Tooltips />
  //     },
  //     {
  //       path: 'avatars',
  //       element: <Avatars />
  //     },
  //     {
  //       path: 'cards',
  //       element: <Cards />
  //     },
  //     {
  //       path: 'forms',
  //       element: <Forms />
  //     },
  //   ]
  // }
];

export default routes;
