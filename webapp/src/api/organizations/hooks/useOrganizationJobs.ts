import { useState, useEffect } from 'react';
import { ApiResponse } from 'src/api/shared/interfaces';
import { getOrganizationJobs } from '../requests';
import { useToast } from 'src/hooks/useToast';
import { Job } from 'src/models';

export type useOrganizationJobsResponse = {
  data: ApiResponse<Job[]>;
  error: any;
  loading: boolean;
  getData: () => Promise<any>
};

export const useOrganizationJobs = (id: string, query?: any): useOrganizationJobsResponse => {
  const [data, setData] = useState<ApiResponse<Job[]>>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const { setToast } = useToast();

  const getAPIData = async (): Promise<any> => {
    if(error) setError(null);
    try {
      const response = await getOrganizationJobs(id, query);
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