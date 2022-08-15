import { useState, useEffect } from 'react';
import { ApiResponse } from 'src/api/shared/interfaces';
import { useToast } from 'src/hooks/useToast';
import { JobDifficulty } from 'src/models';
import { getDifficulties } from '../requests';

export type useOrganizationsResponse = {
  data: ApiResponse<JobDifficulty[]>;
  error: any;
  loading: boolean;
  getData: () => Promise<any>
};

export const useDifficulties = (query?: any): useOrganizationsResponse => {
  const [data, setData] = useState<ApiResponse<JobDifficulty[]>>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const { setToast } = useToast();

  const getAPIData = async (): Promise<any> => {
    if(error) setError(null);
    setLoading(true);
    try {
      const response = await getDifficulties(query);
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