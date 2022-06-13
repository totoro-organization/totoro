import { ReactNode } from 'react';

import DashboardIcon from '@mui/icons-material/Dashboard';

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
        icon: DashboardIcon
      },
    ]
  },
];

export default menuItems;
