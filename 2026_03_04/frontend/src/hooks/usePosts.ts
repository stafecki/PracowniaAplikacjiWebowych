import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/api';

export const usePosts = (categoryId?: number) => {
  return useQuery({
    queryKey: ['posts', categoryId],
    queryFn: () => fetchPosts(categoryId),
  });
};
