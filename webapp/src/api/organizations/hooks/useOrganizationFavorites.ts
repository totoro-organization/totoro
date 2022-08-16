import { useState, useEffect } from 'react';
import { ApiResponse } from 'src/api/shared/interfaces';
import { getOrganizationFavorites } from '../requests';
import { useToast } from 'src/hooks/useToast';
import { OrganizationFavorite } from 'src/models/organization';

export type useOrganizationFavoritesResponse = {
  data: ApiResponse<OrganizationFavorite[]>;
  error: any;
  loading: boolean;
  getData: () => Promise<any>
};

export const useOrganizationFavorites = (id: string, query?: any): useOrganizationFavoritesResponse => {
  const [data, setData] = useState<ApiResponse<OrganizationFavorite[]>>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const { setToast } = useToast();

  const getAPIData = async (): Promise<any> => {
    if(error) setError(null);
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