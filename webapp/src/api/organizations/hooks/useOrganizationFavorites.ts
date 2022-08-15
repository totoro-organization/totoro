import { useState, useEffect } from 'react';
import { ApiResponse } from 'src/api/shared/interfaces';
import { getOrganizationFavorites } from '../requests';
import { useToast } from 'src/hooks/useToast';

export type useOrganizationFavoritesResponse = {
  data: ApiResponse<any[]>;
  error: any;
  loading: boolean;
  getData: () => Promise<any>
};

export const useOrganizationFavorites = (id: string, query?: any): useOrganizationFavoritesResponse => {
  const [data, setData] = useState<ApiResponse<any[]>>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const { setToast } = useToast();

  const getAPIData = async (): Promise<any> => {
    if(error) setError(null);
    setLoading(true);
    try {
      const response = await getOrganizationFavorites(id, query);
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