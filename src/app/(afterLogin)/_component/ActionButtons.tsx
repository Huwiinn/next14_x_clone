"use client";
import style from "./post.module.css";
import cx from "classnames";
import { MouseEventHandler } from "react";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Post } from "@/model/Post";
import { useSession } from "next-auth/react";

type Props = { white?: boolean; post: Post };

export default function ActionButtons({ white, post }: Props) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  // 내가 코멘트 작성을 했는지 판단
  const commented = !!post.Comments.find(
    (v) => v.userId === session?.user?.email
  );
  // 내가 리포스팅 했는지 판단
  const reposted = !!post.Reposts.find(
    (v) => v.userId === session?.user?.email
  );
  // 내가 좋아요 했는지 판단
  const liked = !!post.Hearts.find((v) => v.userId === session?.user?.email);
  const { postId } = post;

  const onClickComment = () => {};
  const onClickRepost = () => {};

  const heart = useMutation({
    mutationFn: () => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}/heart`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    },
    onMutate() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);

      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "posts") {
          const value: Post | InfiniteData<Post[]> | undefined =
            queryClient.getQueryData(queryKey);

          if (value && "pages" in value) {
            console.log("array : ", value);
            const obj = value.pages.flat().find((v) => v.postId === postId);
            if (obj) {
              // 존재하는지 확인
              const pageIndex = value.pages.findIndex((page) =>
                page.includes(obj)
              );
              const index = value.pages[pageIndex].findIndex(
                (v) => v.postId === postId
              );
              console.log("index : ", index);
              const shallow = { ...value };
              value.pages = { ...value.pages };
              value.pages[pageIndex] = { ...value.pages[pageIndex] };
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                Hearts: [{ userId: session?.user?.email as string }],
                _count: {
                  ...shallow.pages[pageIndex][index]._count,
                  Hearts: shallow.pages[pageIndex][index]._count.Hearts + 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            // 싱글 포스트인 경우
            if (value.postId === postId) {
              const shallow = {
                ...value,
                Hearts: [{ userId: session?.user?.email as string }],
                _count: {
                  ...value._count,
                  Hearts: value._count.Hearts + 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
    onError() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);

      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "posts") {
          const value: Post | InfiniteData<Post[]> | undefined =
            queryClient.getQueryData(queryKey);

          if (value && "pages" in value) {
            console.log("array : ", value);
            const obj = value.pages.flat().find((v) => v.postId === postId);
            if (obj) {
              // 존재하는지 확인
              const pageIndex = value.pages.findIndex((page) =>
                page.includes(obj)
              );
              const index = value.pages[pageIndex].findIndex(
                (v) => v.postId === postId
              );
              console.log("index : ", index);
              const shallow = { ...value };
              value.pages = { ...value.pages };
              value.pages[pageIndex] = { ...value.pages[pageIndex] };
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                Hearts: shallow.pages[pageIndex][index].Hearts.filter(
                  (v) => v.userId !== session?.user?.email
                ),
                _count: {
                  ...shallow.pages[pageIndex][index]._count,
                  Hearts: shallow.pages[pageIndex][index]._count.Hearts - 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            // 싱글 포스트인 경우
            if (value.postId === postId) {
              const shallow = {
                ...value,
                Hearts: value.Hearts.filter(
                  (v) => v.userId !== session?.user?.email
                ),
                _count: {
                  ...value._count,
                  Hearts: value._count.Hearts - 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
    onSettled() {
      // .invalidateQueries() << queryKey가 ['posts']로 시작하는 쿼리를 전부 다 invalidate(최신화시켜라)해라.
      // 해당 함수를 사용하여 해당 쿼리키와 일치하는 쿼리는 다음에 접근할 때, 자동으로 다시 데이터를 가져오게 된다.
      // 전체 게시글들을 새로고침하고 싶거나 할 때 사용한다.
      queryClient.invalidateQueries({
        queryKey: ["posts", "recommends"],
      });
    },
  });

  const unHeart = useMutation({
    mutationFn: () => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}/heart`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
    },
    onMutate() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);

      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "posts") {
          const value: Post | InfiniteData<Post[]> | undefined =
            queryClient.getQueryData(queryKey);

          if (value && "pages" in value) {
            console.log("array : ", value);
            const obj = value.pages.flat().find((v) => v.postId === postId);
            if (obj) {
              // 존재하는지 확인
              const pageIndex = value.pages.findIndex((page) =>
                page.includes(obj)
              );
              const index = value.pages[pageIndex].findIndex(
                (v) => v.postId === postId
              );
              console.log("index : ", index);
              const shallow = { ...value };
              value.pages = { ...value.pages };
              value.pages[pageIndex] = { ...value.pages[pageIndex] };
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                Hearts: shallow.pages[pageIndex][index].Hearts.filter(
                  (v) => v.userId !== session?.user?.email
                ),
                _count: {
                  ...shallow.pages[pageIndex][index]._count,
                  Hearts: shallow.pages[pageIndex][index]._count.Hearts - 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            // 싱글 포스트인 경우
            if (value.postId === postId) {
              const shallow = {
                ...value,
                Hearts: value.Hearts.filter(
                  (v) => v.userId !== session?.user?.email
                ),
                _count: {
                  ...value._count,
                  Hearts: value._count.Hearts - 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
    onError() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);

      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "posts") {
          const value: Post | InfiniteData<Post[]> | undefined =
            queryClient.getQueryData(queryKey);

          if (value && "pages" in value) {
            console.log("array : ", value);
            const obj = value.pages.flat().find((v) => v.postId === postId);
            if (obj) {
              // 존재하는지 확인
              const pageIndex = value.pages.findIndex((page) =>
                page.includes(obj)
              );
              const index = value.pages[pageIndex].findIndex(
                (v) => v.postId === postId
              );
              console.log("index : ", index);
              const shallow = { ...value };
              value.pages = { ...value.pages };
              value.pages[pageIndex] = { ...value.pages[pageIndex] };
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                Hearts: [{ userId: session?.user?.email as string }],
                _count: {
                  ...shallow.pages[pageIndex][index]._count,
                  Hearts: shallow.pages[pageIndex][index]._count.Hearts + 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            // 싱글 포스트인 경우
            if (value.postId === postId) {
              const shallow = {
                ...value,
                Hearts: [{ userId: session?.user?.email as string }],
                _count: {
                  ...value._count,
                  Hearts: value._count.Hearts + 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
    onSettled() {},
  });

  const onClickHeart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (liked) {
      unHeart.mutate();
    } else {
      heart.mutate();
    }
  };

  return (
    <div className={style.actionButtons}>
      <div
        className={cx(
          style.commentButton,
          { [style.commented]: commented }
          // white && style.white
        )}>
        <button title="댓글 아이콘 버튼" onClick={onClickComment}>
          <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
            </g>
          </svg>
        </button>
        <div className={style.count}>{post._count.Comments}</div>
      </div>
      <div
        className={cx(
          style.repostButton,
          reposted && style.reposted
          // white && style.white
        )}>
        <button title="리트윗 아이콘 버튼" onClick={onClickRepost}>
          <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
            </g>
          </svg>
        </button>
        <div className={style.count}>{post._count.Reposts}</div>
      </div>
      <div
        className={cx(
          [style.heartButton, liked && style.liked]
          // white && style.white
        )}>
        <button title="좋아요 아이콘 버튼" onClick={onClickHeart}>
          <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
            </g>
          </svg>
        </button>
        <div className={style.count}>{post._count.Hearts}</div>
      </div>
      {/* <button
        onClick={onToggle}
        className={cx(btnToggle ? style.bgColor : style.bgColor2)}>
        test classNames
      </button>
      <button
        onClick={onToggle2}
        className={style.testCx}
        disabled={btnToggle2}>
        test
      </button> */}
    </div>
  );
}
