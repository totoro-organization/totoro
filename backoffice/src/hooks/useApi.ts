import { useState, useEffect } from 'react';
import { getItems } from 'src/services/common.service';
import { Route } from 'src/services/routes';
import { useToast } from './useToast';

export type ApiResponse = {
  data: any;
  error: any;
  loading: boolean;
  getData: () => Promise<any>
};

export const useApi = (url: Route, query?: any): ApiResponse => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const { setToast } = useToast();

  const getAPIData = async (): Promise<any> => {
    if(error) setError(null);
    setLoading(true);
    try {
      const response = await getItems(url, query);
      if('error' in response) {
        setError(response.message);
        setToast({ variant: 'error', message: response.message, duration: 6000})
        return;
      }
      setData(response);
    } catch (error) {
      setError(error);
      console.log('test');
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