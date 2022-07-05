import { ReactNode } from 'react';

import DashboardIcon from '@mui/icons-material/Dashboard';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AssignmentIcon from '@mui/icons-material/Assignment';
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

const menuItems: MenuItems[] = [

  {
    heading: 'Dashboards',
    items: [
      {
        name: 'Statistiques',
        link: '/association/dashboards/statistiques',
        icon: QueryStatsIcon
      },
      {
        name:'Résumé',
        icon: DashboardIcon,
        link: '/association/dashboards/resume'
      }
    ]
  },
  {
    heading: 'Gestion',
    items: [
      {
        name: 'Mes missions',
        icon: ListIcon,
        link: '/association/gestion/missions'
      },
      {
        name: 'Créer une mission',
        icon: AddTaskIcon,
        link: '/association/gestion/missions/creation'
      }
    ]
  },
];

export const PartnerMenuItems: MenuItems[] = [

  {
    heading: 'Dashboards',
    items: [
      {
        name: 'Statistiques',
        link: '/partenaire/dashboards/statistiques',
        icon: QueryStatsIcon
      },
      {
        name:'Résumé',
        icon: DashboardIcon,
        link: '/partenaire/dashboards/resume'
      }
    ]
  },
  {
    heading: 'Gestion',
    items: [
      {
        name: 'Mes réductions',
        icon: ListIcon,
        link: '/partenaire/gestion/reductions'
      },
      {
        name: 'Ajouter une réduction',
        icon: AddTaskIcon,
        link: '/partenaire/gestion/reductions/creation'
      }
    ]
  },
];

export default menuItems;
