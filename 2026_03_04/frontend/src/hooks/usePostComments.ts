import { useQuery } from '@tanstack/react-query';
import { fetchPostComments } from '../api/api';

export const usePostComments = (postId: number) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchPostComments(postId),
    enabled: !!postId,
  });
};
