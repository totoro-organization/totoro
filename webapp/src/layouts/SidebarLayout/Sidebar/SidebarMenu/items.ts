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
        link: '/dashboards/statistiques',
        icon: QueryStatsIcon
      },
      {
        name:'Résumé',
        icon: DashboardIcon,
        link: '/dashboards/resume'
      }
    ]
  },
  {
    heading: 'Gestion',
    items: [
      {
        name: 'Mes missions',
        icon: ListIcon,
        link: '/gestion/missions'
      },
      {
        name: 'Créer une mission',
        icon: AddTaskIcon,
        link: '/gestion/missions/creation'
      }
    ]
  },

];

export default menuItems;
