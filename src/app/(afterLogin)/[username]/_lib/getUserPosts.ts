import { QueryFunction } from "@tanstack/react-query";
import { Post } from "@/model/Post";

const getUserPosts: QueryFunction<Post[], [string, string, string]> = async ({
  queryKey,
}) => {
  const [_1, _2, username] = queryKey;

  const res = await fetch(`http://localhost:9090/api/users/${username}/posts`, {
    next: {
      tags: ["posts", "users", username],
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("해당 유저의 포스팅을 불러오지 못 했습니다.");
  }

  return res.json();
};

export default getUserPosts;
