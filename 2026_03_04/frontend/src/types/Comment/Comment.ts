export interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  postId: number;
  userId: number | null;
}

export interface NewComment {
  author: string;
  content: string;
  postId: number;
}
