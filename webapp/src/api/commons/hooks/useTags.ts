import { useState, useEffect } from 'react';
import { ApiResponse } from 'src/api/shared/interfaces';
import { useToast } from 'src/hooks/useToast';
import { Tag } from 'src/models';
import { getTags } from '../requests';

export type useOrganizationsResponse = {
  tags: ApiResponse<Tag[]>;
  categories: ApiResponse<Tag[]>;
  error: any;
  loading: boolean;
  getData: () => Promise<any>
};

export const useDifficulties = (query?: any): useOrganizationsResponse => {
  const [tags, setTags] = useState<ApiResponse<Tag[]>>();
  const [categories, setCategories] = useState<ApiResponse<Tag[]>>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const { setToast } = useToast();

  const getAPIData = async (): Promise<any> => {
    if(error) setError(null);
    setLoading(true);
    try {
      const response = await getTags(query);
      if('error' in response) {
        setError(response.message);
        setToast({ variant: 'error', message: response.message, duration: 6000})
        return;
      }
      filterTags(response);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const filterTags = (data) => {
    const tagArray = data.filter((tag: Tag) => tag.type === "mission");
    const categoryArray = data.filter((tag: Tag )=> tag.type === "category");
    setTags(tagArray);
    setCategories(categoryArray);
  }

  useEffect(() => {
    if(!error) {
      getAPIData();
    }
  }, []);

  return { tags, categories, error, loading, getData: getAPIData };
};