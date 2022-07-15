import { useEffect, useState } from 'react';
import { Activities } from 'src/components/RecentActivityCard/activities';
import { Role, Status, Membership } from 'src/models';
import { useSession } from './useSession';

interface Filters {
  order: Order;
  role?: Role['label'];
  status?: Status<any>['label'];
  period?: {
    start_date: string;
    end_date?: string;
  };
  size?: number;
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc'
}

const useActivity = ({
  order = Order.ASC,
  status,
  period,
  size,
  role
}: Filters) => {
  const {
    user: { memberships }
  } = useSession();
  //   const [filteredJobs, setFilteredJobs] = useState();
  const [filteredMemberships, setFilteredMemberships] =
    useState<Membership[]>();
  const [filteredPartners, setFilteredPartners] = useState();
  const [filteredDiscounts, setFilteredDiscounts] = useState();
  const [recentActivities, setRecentActivities] = useState<any[]>();

  useEffect(() => {
    setFilteredMemberships(handleFilterMemberships());
  }, [memberships]);

  useEffect(
    () => setRecentActivities(getRecentOrganizationActivities()),
    [filteredMemberships]
  );

  const handleFilterMemberships = (): Membership[] => {
    const filters = getFilters();
    const items = memberships.filter((item) => search(item, filters));
    const orderedItems = sortObjectArrayByOrder(items, 'createdAt', order);
    if (size) return orderedItems.slice(size);
    return orderedItems;
  };

  function sortObjectArrayByOrder(items: any[], key: string, order: Order) {
    // if (isObjectArray(items)) {
    if (order === 'desc') {
      return items.sort((a, b) =>
        a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0
      );
    }
    return items.sort((a, b) =>
      a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0
    );
    // }
  }

  //   const getStatus = (x) => status === x)

  const search = (membership: Membership, filters: Filters) => {
    return Object.keys(filters).every((key) => {
      if (typeof membership[key] === 'object')
        return membership[key].label === filters[key];
      else {
        if (typeof filters[key] === 'object' && key === 'period') {
          if (filters[key].end_date) {
            return (
              filters[key].start_date >= membership.createdAt &&
              filters[key].end_date <= membership.createdAt
            );
          }
          return filters[key].start_date >= membership.createdAt;
        }
      }
      return membership[key] === filters[key];
    });
  };

  const getFilters = () => {
    const filters: any = {};
    if (status) filters.status = status;
    if (role) filters.role = role;
    if (period) filters.period = period;

    return filters;
  };

  const getRecentOrganizationActivities = () => {
    if (filteredMemberships) {
      const membershipRequests = filteredMemberships.filter(
        (membership) => membership.status.label === 'requested'
      );
      const membershipJoin = filteredMemberships.filter(
        (membership) => membership.status.label === 'actived'
      );
      const membershipInvitations = filteredMemberships.filter(
        (membership) => membership.status.label === 'invited'
      );
      const membershipAdditions = filteredMemberships.filter(
        (membership) => membership.status.label === 'disabled'
      );
      const membershipRequestActivities = membershipRequests.map(
        (membership) => ({
          membership: { ...membership },
          activity_type: Activities.request_organization
        })
      );
      const membershipJoinActivities = membershipJoin.map((membership) => ({
        membership: { ...membership },
        activity_type: Activities.join_organization
      }));
      const membershipInvitationActivities = membershipInvitations.map(
        (membership) => ({
          membership: { ...membership },
          activity_type: Activities.invite_organization_member
        })
      );
      const membershipAdditionActivities = membershipAdditions.map(
        (membership) => ({
          membership: { ...membership },
          activity_type: Activities.add_organization
        })
      );
      const organizationActivities = [
        ...membershipRequestActivities,
        ...membershipJoinActivities,
        ...membershipInvitationActivities,
        ...membershipAdditionActivities
      ];
      return organizationActivities;
    }
  };

  return {
    filteredDiscounts,
    filteredMemberships,
    filteredPartners,
    recentActivities
  };
};

export default useActivity;
