import { User } from "./User";
import { PostImage } from "./PostImage";
export interface Post {
  postId: number;
  content: string;
  createdAt: Date;
  Images: PostImage[];
  User: User;
}
