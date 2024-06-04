"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getFollowingPosts } from "../../_lib/getFollowingPosts";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "../loading";

export default function FollowingPosts() {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery<
      IPost[],
      Object,
      InfiniteData<IPost[]>,
      [string, string],
      number
    >({
      queryKey: ["posts", "followings"],
      queryFn: getFollowingPosts,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
      staleTime: 60 * 1000, // fresh => stale, 5분 기준. 현재는 1분으로 수정함.
      // fresh일 동안에는 서버에서 데이터를 가져오지 않는다. stale일 때 가져옴.
      gcTime: 300 * 1000,
    });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    // 화면에 보일 때 실행

    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetching]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {data?.pages.map((page, idx) => (
        <Fragment key={idx}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div
        ref={ref}
        style={{ height: "10px", width: "50px", background: "red" }}
      />
    </>
  );
}
