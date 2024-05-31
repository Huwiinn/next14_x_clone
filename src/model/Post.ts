import { User } from "./User";
import { PostImage } from "./PostImage";
export interface Post {
  postId: number;
  content: string;
  createdAt: Date;
  images: PostImage[];
  user: User;
}
