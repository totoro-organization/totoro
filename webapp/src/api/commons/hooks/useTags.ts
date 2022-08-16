import { useState, useEffect } from 'react';
import { ApiResponse } from 'src/api/shared/interfaces';
import { useToast } from 'src/hooks/useToast';
import { Tag } from 'src/models';
import { getTags } from '../requests';

export type useTagsResponse = {
  tags: Tag[];
  categories: Tag[];
  error: any;
  loading: boolean;
  getData: () => Promise<any>
};

export const useTags= (query?: any): useTagsResponse => {
    const [data, setData] = useState<ApiResponse<Tag[]>>();
  const [tags, setTags] = useState<Tag[]>();
  const [categories, setCategories] = useState<Tag[]>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const { setToast } = useToast();

  const getAPIData = async (): Promise<any> => {
    if(error) setError(null);
    try {
      const response = await getTags(query);
      if('error' in response) {
        setError(response.message);
        setToast({ variant: 'error', message: response.message, duration: 6000})
        return;
      }
      setData(response);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if(data) {
        const tagArray = data.data.filter((tag: Tag) => tag.type === "mission");
        const categoryArray = data.data.filter((tag: Tag )=> tag.type === "category");
        setTags(tagArray);
        setCategories(categoryArray);
        setLoading(false);
    }
  }, [data])

  useEffect(() => {
    if(!error) {
      getAPIData();
    }
  }, []);

  return { tags, categories, error, loading, getData: getAPIData };
};