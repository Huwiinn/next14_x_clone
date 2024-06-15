import { User } from "./User";
import { PostImage } from "./PostImage";

interface UserID {
  userId: string;
}
export interface Post {
  postId: number;
  content: string;
  createdAt: Date;
  Images: PostImage[];
  User: User;
  Hearts: UserID[];
  Reposts: UserID[];
  Comments: UserID[];
  _count: { Comments: number; Hearts: number; Reposts: number };
  Parent?: Post; // 답글
  Original?: Post; // 재게시글
}
