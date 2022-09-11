import { ReactNode } from 'react';

import DashboardIcon from '@mui/icons-material/Dashboard';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ListIcon from '@mui/icons-material/List';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { APP_PATHS } from 'src/appPaths';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

export const organizationMenuItems: MenuItems[] = [

  {
    heading: 'Dashboards',
    items: [
      // {
      //   name: 'Statistiques',
      //   link: APP_PATHS.ORGANIZATION_DASHBOARDS_STATS,
      //   icon: QueryStatsIcon
      // },
      {
        name:'Résumé',
        icon: DashboardIcon,
        link: APP_PATHS.ORGANIZATION_DASHBOARDS_RESUME
      }
    ]
  },
  {
    heading: 'Gestion',
    items: [
      {
        name: 'Mes missions',
        icon: ListIcon,
        link: APP_PATHS.ORGANIZATION_JOBS
      },
      {
        name: 'Créer une mission',
        icon: AddTaskIcon,
        link: APP_PATHS.ORGANIZATION_ADD_JOB
      }
    ]
  },
];

export const partnerMenuItems: MenuItems[] = [

  {
    heading: 'Dashboards',
    items: [
      {
        name:'Résumé',
        icon: DashboardIcon,
        link: APP_PATHS.PARTNER_DASHBOARDS_RESUME
      }
    ]
  },
  {
    heading: 'Gestion',
    items: [
      {
        name: 'Mes réductions',
        icon: ListIcon,
        link: APP_PATHS.PARTNER_DISCOUNTS
      },
      {
        name: 'Ajouter une réduction',
        icon: AddTaskIcon,
        link: APP_PATHS.PARTNER_ADD_DISCOUNT
      }
    ]
  },
];
