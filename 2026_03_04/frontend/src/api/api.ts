import axios from 'axios';
import type { Post } from '../types/Post/Post';
import type { Comment, NewComment } from '../types/Comment/Comment';
import type { Category } from '../types/Category/Category';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchPosts = async (categoryId?: number): Promise<Post[]> => {
  const { data } = await api.get<Post[]>('/posts', {
    params: categoryId ? { categoryId } : undefined,
  });
  return data;
};

export const fetchPost = async (id: number): Promise<Post> => {
  const { data } = await api.get<Post>(`/posts/${id}`);
  return data;
};

export const fetchPostComments = async (postId: number): Promise<Comment[]> => {
  const { data } = await api.get<Comment[]>(`/posts/${postId}/comments`);
  return data;
};

export const addComment = async (comment: NewComment): Promise<Comment> => {
  const { data } = await api.post<Comment>('/comments', comment);
  return data;
};

export const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<Category[]>('/categories');
  return data;
};
