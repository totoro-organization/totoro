import { useState, useEffect } from 'react';
import { requestAxios } from 'src/services/requestApi';

export type ApiResponse = {
  data: any;
  error: any;
  loading: Boolean;
};

export const useApi = (url: string): ApiResponse => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const getAPIData = async () => {
    setLoading(true);
    try {
      const apiResponse = await requestAxios('GET', url);
      setData(apiResponse);
      console.log(apiResponse);
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