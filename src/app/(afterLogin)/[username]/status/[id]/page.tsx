import BackButton from "@/app/(afterLogin)/_component/BackButton";
import style from "./singlePost.module.css";
import React from "react";
import CommentForm from "./_component/CommentForm";
import SinglePost from "./_component/SinglePost";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getComments } from "./_lib/getComments";
import { getSinglePost } from "./_lib/getSinglePost";
import Comments from "./_component/Comments";
import { getUserServer } from "../../_lib/getUserServer";
import { User } from "@/model/User";
import { Post } from "@/model/Post";
import { getSinglePostServer } from "./_lib/getSinglePostServer";

type Props = {
  params: { id: string; username: string };
};

export async function generateMetadata({ params }: Props) {
  const user: User = await getUserServer({
    queryKey: ["users", params.username],
  });
  const post: Post = await getSinglePostServer({
    queryKey: ["posts", params.id],
  });

  return {
    title: `${user.nickname} | ${user.id} X`,
    description: `${user.nickname} | ${user.id} 프로필`,
    openGraph: {
      title: `${user.nickname} | ${user.id} X`,
      description: `${user.nickname} | ${user.id} 프로필`,
      images:
        post.Images.length > 0
          ? post.Images?.map((v) => ({
              url: `${process.env.NEXT_PUBLIC_BASE_URL}${v.link}`, // 게시글에 이미지가 있을 때,
              width: 400,
              height: 400,
            }))
          : [
              {
                url: `${process.env.NEXT_PUBLIC_BASE_URL}${user.image}`, // /upload [게시글에 이미지가 없을 때, 유저 이미지 첨부]
                width: 400,
                height: 400,
              },
            ],
    },
  };
}

const SinglePage = async ({ params }: Props) => {
  const { id } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePostServer,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
  });

  const dehydrateState = dehydrate(queryClient);

  return (
    <div className={style.main}>
      <HydrationBoundary state={dehydrateState}>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>게시하기</h3>
        </div>
        <div className={style.postAndCommentFormSection}>
          <SinglePost id={id} />
          <CommentForm id={id} />
          <div>
            {/* 답글들이 보여질 곳임 */}
            <Comments id={id} />
          </div>
        </div>
      </HydrationBoundary>
    </div>
  );
};

export default SinglePage;
