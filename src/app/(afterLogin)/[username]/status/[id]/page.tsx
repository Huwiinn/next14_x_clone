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

type Props = {
  params: { id: string };
};

const SinglePage = async ({ params }: Props) => {
  const { id } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
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
          <CommentForm />
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
