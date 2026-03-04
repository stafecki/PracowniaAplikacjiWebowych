export interface Post {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  categoryId: number | null;
  authorId: number | null;
}

