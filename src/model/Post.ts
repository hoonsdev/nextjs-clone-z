import { PostImage } from '@/model/PostImage';
import { User } from './User';

export interface Post {
  postId: number;
  User: User;
  content: string;
  createdAt: Date;
  Images: PostImage[];
}
