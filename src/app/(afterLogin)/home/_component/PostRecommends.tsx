"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getPostRecommends } from "../../_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function PostRecommends() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [string, string],
    number
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0, // [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15]] ...
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000, // fresh => stale, 5분 기준. 현재는 1분으로 수정함.
    // fresh일 동안에는 서버에서 데이터를 가져오지 않는다. stale일 때 가져옴.
    gcTime: 300 * 1000,

    // 중요내용임.
    // staleTime은 항상 gcTime보다 시간이 짧아야합니다. 또한, gcTime은 항상 staleTime보다 시간이 길어야 합니다.
    // staleTime으로 자정한 시간동안 캐싱되어있는 데이터를 사용하려는데, gcTime이 먼저 끝나버리게 되면 inactive되어있던(메모리에 저장되어 있던) 데이터가 날아가버림.
    // ex ) staleTime - 3분 / gcTime - 1분 => [3분동안 캐싱데이터를 사용하려는데, 1분이 지나니 캐싱데이터가 다 사라짐. 사용할 수 없게됨]
    // ✅ gcTime은 staleTime보다 무조건 커야한다.
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

  console.log("data : ", data);

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
