import { useState, useEffect } from 'react';
import { useToast } from 'src/hooks/useToast';
import { JobDifficulty } from 'src/models';
import { sortObjectArrayByAscOrder } from 'src/utils/sortByAscOrder';
import { getDifficulties } from '../requests';

export type useDifficultiesResponse = {
  data: JobDifficulty[];
  error: any;
  loading: boolean;
  getData: () => Promise<any>
};

export const useDifficulties = (query?: any): useDifficultiesResponse => {
  const [data, setData] = useState<JobDifficulty[]>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const { setToast } = useToast();

  const getAPIData = async (): Promise<any> => {
    if(error) setError(null);
    try {
    setLoading(true)
      const response = await getDifficulties(query);
      if('error' in response) {
        setError(response.message);
        setToast({ variant: 'error', message: response.message, duration: 6000})
        return;
      }
      const ascDifficulties = sortObjectArrayByAscOrder(
        response?.data,
        'level'
      );    
      setData(ascDifficulties);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!error) {
      getAPIData();
    }
  }, []);

  return { data, error, loading, getData: getAPIData };
};