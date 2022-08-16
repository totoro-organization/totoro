import { useState, useEffect } from 'react';
import { ApiResponse } from 'src/api/shared/interfaces';
// import { Organization } from 'src/models';
import { getOrganizationMembers } from '../requests';
import { useToast } from 'src/hooks/useToast';
import { OrganizationMember } from 'src/models/organization';

export type useOrganizationMembersResponse = {
  data: ApiResponse<OrganizationMember[]>;
  error: any;
  loading: boolean;
  getData: () => Promise<any>
};

export const useOrganizationMembers = (id: string, query?: any): useOrganizationMembersResponse => {
  const [data, setData] = useState<ApiResponse<OrganizationMember[]>>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const { setToast } = useToast();

  const getAPIData = async (): Promise<any> => {
    if(error) setError(null);
    try {
      const response = await getOrganizationMembers(id, query);
      if('error' in response) {
        setError(response.message);
        setToast({ variant: 'error', message: response.message, duration: 6000})
        return;
      }
      setData(response);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if(!error) {
      getAPIData();
    }
  }, []);

  return { data, error, loading, getData: getAPIData };
};