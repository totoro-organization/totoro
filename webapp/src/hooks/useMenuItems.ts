import { useSession } from './useSession';
import {
  MenuItems,
  organizationMenuItems,
  partnerMenuItems
} from 'src/layouts/SidebarLayout/Sidebar/SidebarMenu/items';

const useMenuItems = (): MenuItems[] => {
  const { currentApp } = useSession();
  if (currentApp.type === 'partner') return partnerMenuItems;
  return organizationMenuItems;
};

export default useMenuItems;
