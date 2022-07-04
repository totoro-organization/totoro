import { useState, useEffect } from 'react';
import { getItems } from 'src/services/common.service';
import { Route } from 'src/services/routes';

export type ApiResponse = {
  data: any;
  error: any;
  loading: boolean;
};

export const useApi = (url: Route, query?: any): ApiResponse => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const getAPIData = async () => {
    setLoading(true);
    try {
      const apiResponse = await getItems(url, query);
      setData(apiResponse);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return { data, error, loading };
};