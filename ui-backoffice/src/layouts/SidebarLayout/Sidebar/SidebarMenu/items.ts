import { ReactNode } from 'react';

import TvIcon from '@mui/icons-material/Tv';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import PaletteIcon from '@mui/icons-material/Palette';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';

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
    ]
  },
  {
    heading: 'Gestion',
    items: [
      {
        name: 'Terminaux',
        icon: TvIcon,
        link: '/gestion/terminaux'
      },
      {
        name: 'Litiges',
        icon: ReportProblemIcon,
        link: '/gestion/litiges'
      },
      {
        name: 'Partenaires',
        icon: GroupWorkIcon,
        link: '/gestion/partenaires',
        items: [
          {
            name: 'Demandes d\'adhésion',
            icon: GroupAddIcon,
            link: '/gestion/partenaires/adhesion',
          },
          {
            name: 'Membres',
            icon: GroupsIcon,
            link: '/gestion/partenaires/membres'
          }
        ]
      },
      {
        name: 'Missions',
        icon: AssignmentIcon,
        link: '/gestion/missions',
      },
      {
        name: 'Utilisateurs',
        icon: PeopleIcon,
        link: '/gestion/utilisateurs',        
      },
    ]
  },
  {
    heading: 'Réglages des applications',
    items: [
      {
        name: 'Apparence',
        icon: PaletteIcon,
        link: '/app-reglages/apparence'
      },
      {
        name: 'Objets de litiges',
        icon: ReportProblemIcon,
        link: '/app-reglages/objets-litiges'
      },
    ]
  },
];

export default menuItems;
