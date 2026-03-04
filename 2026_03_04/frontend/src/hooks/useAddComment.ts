import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../api/api';
import type { NewComment } from '../types/Comment/Comment';

export const useAddComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: NewComment) => addComment(comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });
};
