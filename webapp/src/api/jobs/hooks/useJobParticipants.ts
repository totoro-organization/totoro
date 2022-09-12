import { useState, useEffect } from 'react';
import { ApiResponse } from 'src/api/shared/interfaces';
import { useToast } from 'src/hooks/useToast';
import { JobParticipant } from 'src/models/job';
import { getJobParticipants } from '../requests';

export type useJobParticipantsResponse = {
  data: ApiResponse<JobParticipant[]>;
  error: any;
  loading: boolean;
  getData: () => Promise<any>
};

export const useJobParticipants = (id: string, query?: any): useJobParticipantsResponse => {
  const [data, setData] = useState<ApiResponse<JobParticipant[]>>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const { setToast } = useToast();

  const getAPIData = async (): Promise<any> => {
    if(error) setError(null);
    try {
      const response = await getJobParticipants(id, query);
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