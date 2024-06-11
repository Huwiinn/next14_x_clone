"use client";

import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { getSearchResult } from "@/app/(afterLogin)/search/_lib/getSearchResult";
import { useQuery } from "@tanstack/react-query";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

export default function SearchResult({ searchParams }: Props): JSX.Element {
  const { data } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, _3: Props["searchParams"]]
  >({
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchResult,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  console.log("검색결과 data : ", data);

  return (
    <>
      {data?.map((post) => {
        return <Post key={post.postId} post={post} />;
      })}
    </>
  );
}
