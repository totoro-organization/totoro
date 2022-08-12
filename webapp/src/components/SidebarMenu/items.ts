import { ReactNode } from 'react';

import DashboardIcon from '@mui/icons-material/Dashboard';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ListIcon from '@mui/icons-material/List';
import AddTaskIcon from '@mui/icons-material/AddTask';

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
      {
        name: 'Statistiques',
        link: '/organization/dashboards/stats',
        icon: QueryStatsIcon
      },
      {
        name:'Résumé',
        icon: DashboardIcon,
        link: '/organization/dashboards/resume'
      }
    ]
  },
  {
    heading: 'Gestion',
    items: [
      {
        name: 'Mes missions',
        icon: ListIcon,
        link: '/organization/management/jobs'
      },
      {
        name: 'Créer une mission',
        icon: AddTaskIcon,
        link: '/organization/management/jobs/creation'
      }
    ]
  },
];

export const partnerMenuItems: MenuItems[] = [

  {
    heading: 'Dashboards',
    items: [
      {
        name: 'Statistiques',
        link: '/partner/dashboards/stats',
        icon: QueryStatsIcon
      },
      {
        name:'Résumé',
        icon: DashboardIcon,
        link: '/partner/dashboards/resume'
      }
    ]
  },
  {
    heading: 'Gestion',
    items: [
      {
        name: 'Mes réductions',
        icon: ListIcon,
        link: '/partner/management/reductions'
      },
      {
        name: 'Ajouter une réduction',
        icon: AddTaskIcon,
        link: '/partner/management/reductions/creation'
      }
    ]
  },
];
