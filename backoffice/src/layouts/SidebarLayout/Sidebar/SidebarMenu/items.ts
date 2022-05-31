import { ReactNode } from 'react';

import DashboardIcon from '@mui/icons-material/Dashboard';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import SpeedIcon from '@mui/icons-material/Speed';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import PaletteIcon from '@mui/icons-material/Palette';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import StyleIcon from '@mui/icons-material/Style';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

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
  {
    heading: 'Gestion',
    items: [
      {
        name: 'Associations',
        icon: VolunteerActivismIcon,
        link: '/gestion/associations'
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
            name: 'Demandes',
            icon: GroupAddIcon,
            link: '/gestion/partenaires/demandes',
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
      {
        name: 'Administrateurs',
        icon: AdminPanelSettingsIcon,
        link: '/gestion/administrateurs',        
      },
    ]
  },
  {
    heading: 'Comptabilité',
    items: [
      {
        name: 'Abonnements',
        icon: CardMembershipIcon,
        link: '/comptabilite/abonnements'
      },
    ]
  },
  {
    heading: 'Réglages des applications',
    items: [
      {
        name: 'Apparence',
        icon: InvertColorsIcon,
        link: '/app-reglages/apparence',
        items: [
          {
            name: 'Thèmes',
            icon: PaletteIcon,
            link: '/app-reglages/apparence/themes'
          }
        ]
      },
      {
        name: 'Paramétrage',
        icon: SettingsIcon,
        link: '/app-reglages/parametrage',
        items: [
          {
            name: 'Tags',
            icon: StyleIcon,
            link: '/app-reglages/parametrage/tags'
          },
          {
            name: 'Roles',
            icon: AssignmentIndIcon,
            link: '/app-reglages/parametrage/roles'
          },
          {
            name: 'Pricings',
            icon: CardMembershipIcon,
            link: '/app-reglages/parametrage/pricings'
          },
          {
            name: 'Statuts',
            icon: TrendingUpIcon,
            link: '/app-reglages/parametrage/status'
          },
          {
            name: 'Difficultés de mission',
            icon: SpeedIcon,
            link: '/app-reglages/parametrage/difficultes'
          },
          {
            name: 'Objets de litiges',
            icon: ReportProblemIcon,
            link: '/app-reglages/parametrage/objets-litiges'
          },
          {
            name: 'Types de promotions',
            icon: LocalOfferIcon,
            link: '/app-reglages/parametrage/types-de-promotion'
          },
        ]
      },
    ]
  },
];

export default menuItems;
