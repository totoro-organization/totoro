import { useState, useEffect } from 'react';
import { requestAxios } from 'src/services/requestApi';
import { Route } from 'src/services/routes';

export type ApiResponse = {
  data: any;
  error: any;
  loading: boolean;
};

export const useApi = (url: Route): ApiResponse => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const getAPIData = async () => {
    setLoading(true);
    try {
      const apiResponse = await requestAxios('GET', url);
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