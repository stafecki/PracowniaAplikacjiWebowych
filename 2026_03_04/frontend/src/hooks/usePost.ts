import { useQuery } from '@tanstack/react-query';
import { fetchPost } from '../api/api';

export const usePost = (id: number) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    enabled: !!id,
  });
};
