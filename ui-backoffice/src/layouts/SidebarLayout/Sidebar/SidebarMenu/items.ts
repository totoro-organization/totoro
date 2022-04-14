import { ReactNode } from 'react';

import TvIcon from '@mui/icons-material/Tv';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import PaletteIcon from '@mui/icons-material/Palette';

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
        link: '/dashboards/stats',
        icon: QueryStatsIcon
      },
      // {
      //   name: 'Messenger',
      //   icon: MmsTwoToneIcon,
      //   link: '/dashboards/messenger'
      // },
    ]
  },
  // {
  //   heading: 'Management',
  //   items: [
  //     {
  //       name: 'Transactions',
  //       icon: TableChartTwoToneIcon,
  //       link: '/management/transactions'
  //     },
  //     {
  //       name: 'User Profile',
  //       icon: AccountCircleTwoToneIcon,
  //       link: '/management/profile',
  //       items: [
  //         {
  //           name: 'Profile Details',
  //           link: '/management/profile/details'
  //         },
  //         {
  //           name: 'User Settings',
  //           link: '/management/profile/settings'
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    heading: 'Gestion',
    items: [
      {
        name: 'Terminaux',
        icon: TvIcon,
        link: '/gestion/terminals'
      },
      {
        name: 'Litiges',
        icon: ReportProblemIcon,
        link: '/gestion/litigations'
      },
      {
        name: 'Partenaires',
        icon: GroupWorkIcon,
        link: '/gestion/partners'
      },
      {
        name: 'Missions',
        icon: AssignmentIcon,
        link: '/gestion/jobs'
      },
      {
        name: 'Utilisateurs',
        icon: PeopleIcon,
        link: '/gestion/users',
        // 
        
      },
    ]
  },
  {
    heading: 'Réglages des applications',
    items: [
      {
        name: 'Apparence',
        icon: PaletteIcon,
        link: '/app-settings/appearance'
      },
      {
        name: 'Objets de litiges',
        icon: ReportProblemIcon,
        link: '/app-settings/litigation-objects'
      },
    ]
  },
];

export default menuItems;
