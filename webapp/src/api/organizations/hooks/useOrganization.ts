import { useState, useEffect } from 'react';
import { Organization } from 'src/models';
import { getOrganization } from '../requests';
import { useToast } from 'src/hooks/useToast';

export type useOrganizationResponse = {
  data: Organization;
  error: any;
  loading: boolean;
  getData: () => Promise<any>
};

export const useOrganization = (id: string): useOrganizationResponse => {
  const [data, setData] = useState<Organization>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const { setToast } = useToast();

  const getAPIData = async (): Promise<any> => {
    if(error) setError(null);
    try {
      const response = await getOrganization(id);
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