import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/react-query";

export const getSearchResult: QueryFunction<
  Post[],
  [_1: string, _2: string, searchParams: { q: string; f?: string; pf?: string }]
> = async ({ queryKey }) => {
  const [_1, _2, searchParams] = queryKey;
  // const urlSearchParams = new URLSearchParams(searchParams);

  const res = await fetch(
    `http://localhost:9090/api/posts?cursor=0&q=${encodeURIComponent(
      searchParams.q
    )}`,

    {
      next: {
        tags: ["posts", "search", searchParams.q],
      },
      cache: "no-store",
      credentials: "include",
    }
  );

  http: if (!res.ok) {
    throw new Error("검색 결과 데이터를 불러오는 데 실패했습니다.");
  }

  return res.json();
};

export default getSearchResult;
