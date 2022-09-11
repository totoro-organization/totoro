import { useCallback, useEffect, useState } from 'react';
import {
  getOrganizationJobs,
  getOrganizationMembers
} from 'src/api/organizations/requests';
import { Membership } from 'src/models';
import { Order } from 'src/utils/sortByAscOrder';
import { useSession } from './useSession';

interface useOrganizationActivityConfig {
  size?: {
    jobs_size?: number;
    members_size?: number;
  };
}

const useOrganizationActivity = (config?: useOrganizationActivityConfig) => {
  const { currentApp } = useSession();
  const [lastJobs, setLastJobs] = useState([]);
  const [lastMembers, setLastMembers] = useState([]);

  useEffect(() => {
    if (currentApp.data && currentApp.type === 'organization') {
      getLastJobs();
      getLastMembers();
    } else {
      throw new Error('Current app is invalid');
    }
  }, [currentApp]);

  function getLastJobs(): void {
    getOrganizationJobs(currentApp?.data.id, {
      order: Order.DESC,
      size: config?.size?.jobs_size ?? 5,
      page: 1
    }).then((response) => {
      if (response) setLastJobs([response?.data[0]]);
    });
  }

  function getLastMembers(): void {
    getOrganizationMembers(currentApp?.data.id, {
      order: Order.DESC,
      size: config?.size?.members_size ?? 5,
      page: 1
    }).then((response) => {
      if (response) setLastMembers(response?.data);
    });
  }

  return {
    lastJobs,
    lastMembers
  };
};

export default useOrganizationActivity;
