import { QueryFunction } from "@tanstack/query-core";
import { Post } from "@/model/Post";

export const getComments: QueryFunction<
  Post[],
  [string, string, string]
> = async ({ queryKey }) => {
  const [_1, id] = queryKey;
  const res = await fetch(`http://localhost:9090/api/posts/${id}/comments`, {
    next: {
      tags: ["posts", id, "comments"],
    },
    cache: "no-store",
  });

  return res.json();
};

export default getComments;
